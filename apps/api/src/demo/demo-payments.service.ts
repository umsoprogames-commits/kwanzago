import { createHash, randomUUID } from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import {
  LedgerAccountType,
  LedgerEntryKind,
  LedgerSide,
  PaymentAliasState,
  PaymentIntentState,
  PaymentState,
  type Payment,
  type PaymentIntent,
  type SettlementBatch,
} from '../generated/prisma/client.js';
import type { ActorContext } from '../common/auth/actor-context.js';
import { PrismaService } from '../database/prisma.service.js';

const CURRENCY = 'AOA';
const createIntentSchema = z
  .object({
    paymentAlias: z.string().min(12).max(128),
    quantity: z.number().int().min(1).max(8),
    fareRuleId: z.string().uuid(),
  })
  .strict();
const approveIntentSchema = z
  .object({
    approvalMethod: z.enum(['BIOMETRIC', 'PIN']),
    pin: z
      .string()
      .regex(/^\d{4,6}$/)
      .optional(),
    deviceProof: z.string().min(8).max(512),
  })
  .strict();
const allowanceSchema = z
  .object({
    collectorId: z.string().uuid(),
    amountMinor: z.number().int().positive(),
  })
  .strict();

type LedgerClient = Pick<PrismaService, 'ledgerLine'>;

function parseInput<T>(schema: z.ZodType<T>, input: unknown): T {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    throw new BadRequestException('Pedido inválido para esta operação.');
  }
  return parsed.data;
}

function requireIdempotencyKey(value: string | undefined): string {
  if (!value || !z.string().uuid().safeParse(value).success) {
    throw new BadRequestException('Idempotency-Key UUID obrigatório.');
  }
  return value;
}

function payloadHash(payload: object): string {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

function money(amountMinor: number) {
  return { amountMinor, currency: CURRENCY };
}

@Injectable()
export class DemoPaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async getWallet(actor: ActorContext) {
    const wallet = await this.getPassengerWallet(actor);
    const account = await this.prisma.ledgerAccount.findFirst({
      where: {
        walletId: wallet.id,
        type: LedgerAccountType.PASSENGER_AVAILABLE,
      },
    });
    if (!account)
      throw new NotFoundException('Carteira de demonstração indisponível.');

    return {
      id: wallet.id,
      available: money(await this.balance(this.prisma, account.id)),
      currency: CURRENCY,
    };
  }

  async getPaymentAlias(actor: ActorContext) {
    const wallet = await this.getPassengerWallet(actor);
    const alias = await this.prisma.paymentAlias.findFirst({
      where: { walletId: wallet.id, state: PaymentAliasState.ACTIVE },
    });
    if (!alias) throw new NotFoundException('QR activo não encontrado.');
    return this.toAlias(alias);
  }

  async blockPaymentAlias(actor: ActorContext) {
    const wallet = await this.getPassengerWallet(actor);
    await this.prisma.paymentAlias.updateMany({
      where: { walletId: wallet.id, state: PaymentAliasState.ACTIVE },
      data: { state: PaymentAliasState.BLOCKED },
    });
    return { state: PaymentAliasState.BLOCKED };
  }

  async replacePaymentAlias(actor: ActorContext) {
    const wallet = await this.getPassengerWallet(actor);
    return this.prisma.$transaction(async (tx) => {
      await tx.paymentAlias.updateMany({
        where: { walletId: wallet.id, state: PaymentAliasState.ACTIVE },
        data: { state: PaymentAliasState.REPLACED },
      });
      const alias = await tx.paymentAlias.create({
        data: {
          walletId: wallet.id,
          qrPayload: `kwg_${randomUUID().replaceAll('-', '')}`,
        },
      });
      return this.toAlias(alias);
    });
  }

  async createPaymentIntent(
    actor: ActorContext,
    rawInput: unknown,
    rawIdempotencyKey: string | undefined,
  ) {
    const input = parseInput(createIntentSchema, rawInput);
    const idempotencyKey = requireIdempotencyKey(rawIdempotencyKey);
    const hash = payloadHash(input);
    const ownerScopeId = actor.ownerId;
    if (!ownerScopeId)
      throw new ConflictException('Âmbito do cobrador indisponível.');

    const existing = await this.prisma.paymentIntent.findUnique({
      where: {
        collectorProfileId_createIdempotencyKey: {
          collectorProfileId: actor.profileId,
          createIdempotencyKey: idempotencyKey,
        },
      },
    });
    if (existing) {
      if (existing.createPayloadHash !== hash) {
        throw new ConflictException(
          'Idempotency-Key já usado com outro pedido.',
        );
      }
      return this.toIntent(existing);
    }

    const [alias, fareRule] = await Promise.all([
      this.prisma.paymentAlias.findUnique({
        where: { qrPayload: input.paymentAlias },
      }),
      this.prisma.fareRule.findFirst({
        where: { id: input.fareRuleId, ownerScopeId, active: true },
      }),
    ]);
    if (!alias || alias.state !== PaymentAliasState.ACTIVE) {
      throw new ConflictException('QR indisponível para cobrança.');
    }
    if (!fareRule)
      throw new ConflictException('Tarifa indisponível para este cobrador.');

    const totalAmountMinor = fareRule.amountMinor * input.quantity;
    const intent = await this.prisma.paymentIntent.create({
      data: {
        walletId: alias.walletId,
        aliasId: alias.id,
        collectorProfileId: actor.profileId,
        ownerScopeId,
        fareRuleId: fareRule.id,
        quantity: input.quantity,
        unitAmountMinor: fareRule.amountMinor,
        totalAmountMinor,
        stepUpRequired: input.quantity > 1 || totalAmountMinor >= 100_000,
        expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        createIdempotencyKey: idempotencyKey,
        createPayloadHash: hash,
      },
    });
    return this.toIntent(intent);
  }

  async approvePaymentIntent(
    actor: ActorContext,
    intentId: string,
    rawInput: unknown,
    rawIdempotencyKey: string | undefined,
  ) {
    const input = parseInput(approveIntentSchema, rawInput);
    const idempotencyKey = requireIdempotencyKey(rawIdempotencyKey);
    const hash = payloadHash({
      approvalMethod: input.approvalMethod,
      deviceProof: input.deviceProof,
    });
    const wallet = await this.getPassengerWallet(actor);

    return this.prisma.$transaction(async (tx) => {
      const intent = await tx.paymentIntent.findUnique({
        where: { id: intentId },
      });
      if (!intent || intent.walletId !== wallet.id) {
        throw new NotFoundException(
          'Intenção não encontrada para este passageiro.',
        );
      }
      if (intent.state === PaymentIntentState.APPROVED) {
        if (
          intent.approveIdempotencyKey === idempotencyKey &&
          intent.approvePayloadHash === hash
        ) {
          const payment = await tx.payment.findUniqueOrThrow({
            where: { intentId },
          });
          return this.toPaymentResult(payment);
        }
        throw new ConflictException('Intenção já aprovada.');
      }
      if (intent.state !== PaymentIntentState.PENDING_CONFIRMATION) {
        throw new ConflictException('Intenção não está pendente.');
      }
      if (intent.expiresAt.getTime() <= Date.now()) {
        await tx.paymentIntent.update({
          where: { id: intent.id },
          data: { state: PaymentIntentState.EXPIRED },
        });
        throw new ConflictException('Intenção expirada.');
      }
      if (intent.stepUpRequired) {
        if (
          input.approvalMethod !== 'PIN' ||
          input.pin !== this.config.getOrThrow('DEMO_PASSENGER_PIN')
        ) {
          throw new ConflictException('PIN reforçado obrigatório ou inválido.');
        }
      }

      const passengerAccount = await tx.ledgerAccount.findFirst({
        where: {
          walletId: wallet.id,
          type: LedgerAccountType.PASSENGER_AVAILABLE,
        },
      });
      const ownerPendingAccount = await tx.ledgerAccount.findFirst({
        where: {
          ownerScopeId: intent.ownerScopeId,
          type: LedgerAccountType.OWNER_PENDING,
        },
      });
      if (!passengerAccount || !ownerPendingAccount) {
        throw new ConflictException('Contas da demonstração indisponíveis.');
      }
      if (
        (await this.balance(tx, passengerAccount.id)) < intent.totalAmountMinor
      ) {
        throw new ConflictException('Saldo de demonstração insuficiente.');
      }

      const entry = await tx.ledgerEntry.create({
        data: {
          kind: LedgerEntryKind.PAYMENT,
          reference: `payment:${intent.id}`,
        },
      });
      await tx.ledgerLine.createMany({
        data: [
          {
            entryId: entry.id,
            accountId: passengerAccount.id,
            side: LedgerSide.DEBIT,
            amountMinor: intent.totalAmountMinor,
          },
          {
            entryId: entry.id,
            accountId: ownerPendingAccount.id,
            side: LedgerSide.CREDIT,
            amountMinor: intent.totalAmountMinor,
          },
        ],
      });
      await tx.paymentIntent.update({
        where: { id: intent.id },
        data: {
          state: PaymentIntentState.APPROVED,
          approveIdempotencyKey: idempotencyKey,
          approvePayloadHash: hash,
        },
      });
      const payment = await tx.payment.create({
        data: {
          intentId: intent.id,
          ledgerEntryId: entry.id,
          totalAmountMinor: intent.totalAmountMinor,
          receiptCode: `KG-${intent.id.replaceAll('-', '').slice(0, 12).toUpperCase()}`,
          state: PaymentState.POSTED,
        },
      });
      return this.toPaymentResult(payment);
    });
  }

  async declinePaymentIntent(actor: ActorContext, intentId: string) {
    const wallet = await this.getPassengerWallet(actor);
    const intent = await this.prisma.paymentIntent.findUnique({
      where: { id: intentId },
    });
    if (!intent || intent.walletId !== wallet.id) {
      throw new NotFoundException(
        'Intenção não encontrada para este passageiro.',
      );
    }
    if (intent.state === PaymentIntentState.PENDING_CONFIRMATION) {
      await this.prisma.paymentIntent.update({
        where: { id: intent.id },
        data: { state: PaymentIntentState.DECLINED },
      });
    }
    return { state: PaymentIntentState.DECLINED };
  }

  async getOwnerOverview(actor: ActorContext) {
    const ownerScopeId = this.requireOwnerScope(actor);
    const [pendingAccount, availableAccount, reservedAccount, intents] =
      await Promise.all([
        this.findOwnerAccount(ownerScopeId, LedgerAccountType.OWNER_PENDING),
        this.findOwnerAccount(ownerScopeId, LedgerAccountType.OWNER_AVAILABLE),
        this.findOwnerAccount(
          ownerScopeId,
          LedgerAccountType.OPERATING_RESERVED,
        ),
        this.prisma.paymentIntent.findMany({
          where: { ownerScopeId, state: PaymentIntentState.APPROVED },
          select: { id: true },
        }),
      ]);
    const verified =
      intents.length === 0
        ? 0
        : ((
            await this.prisma.payment.aggregate({
              where: { intentId: { in: intents.map((intent) => intent.id) } },
              _sum: { totalAmountMinor: true },
            })
          )._sum.totalAmountMinor ?? 0);

    return {
      verifiedRevenue: money(verified),
      pending: money(await this.balance(this.prisma, pendingAccount.id)),
      available: money(await this.balance(this.prisma, availableAccount.id)),
      operatingReserved: money(
        await this.balance(this.prisma, reservedAccount.id),
      ),
      nextSettlementAt: new Date().toISOString(),
    };
  }

  async closeOwnerSettlement(
    actor: ActorContext,
    rawIdempotencyKey: string | undefined,
  ) {
    const ownerScopeId = this.requireOwnerScope(actor);
    const idempotencyKey = requireIdempotencyKey(rawIdempotencyKey);
    const existing = await this.prisma.settlementBatch.findUnique({
      where: { ownerScopeId_idempotencyKey: { ownerScopeId, idempotencyKey } },
    });
    if (existing) return this.toSettlement(existing);

    return this.prisma.$transaction(async (tx) => {
      const pendingAccount = await this.findOwnerAccount(
        ownerScopeId,
        LedgerAccountType.OWNER_PENDING,
        tx,
      );
      const availableAccount = await this.findOwnerAccount(
        ownerScopeId,
        LedgerAccountType.OWNER_AVAILABLE,
        tx,
      );
      const amountMinor = await this.balance(tx, pendingAccount.id);
      const entry = await tx.ledgerEntry.create({
        data: {
          kind: LedgerEntryKind.SETTLEMENT,
          reference: `settlement:${ownerScopeId}:${idempotencyKey}`,
        },
      });
      if (amountMinor > 0) {
        await tx.ledgerLine.createMany({
          data: [
            {
              entryId: entry.id,
              accountId: pendingAccount.id,
              side: LedgerSide.DEBIT,
              amountMinor,
            },
            {
              entryId: entry.id,
              accountId: availableAccount.id,
              side: LedgerSide.CREDIT,
              amountMinor,
            },
          ],
        });
      }
      const settlement = await tx.settlementBatch.create({
        data: {
          ownerScopeId,
          idempotencyKey,
          amountMinor,
          ledgerEntryId: entry.id,
          availableAt: new Date(),
        },
      });
      return this.toSettlement(settlement);
    });
  }

  async createOperatingAllowance(
    actor: ActorContext,
    rawInput: unknown,
    rawIdempotencyKey: string | undefined,
  ) {
    const ownerScopeId = this.requireOwnerScope(actor);
    const input = parseInput(allowanceSchema, rawInput);
    const idempotencyKey = requireIdempotencyKey(rawIdempotencyKey);
    const existing = await this.prisma.operatingAllowance.findUnique({
      where: { ownerScopeId_idempotencyKey: { ownerScopeId, idempotencyKey } },
    });
    if (existing) return { id: existing.id, amountMinor: existing.amountMinor };

    const collector = await this.prisma.profile.findUnique({
      where: { id: input.collectorId },
    });
    if (
      !collector ||
      collector.type !== 'COLLECTOR' ||
      collector.ownerScopeId !== ownerScopeId ||
      !collector.active
    ) {
      throw new ConflictException(
        'Cobrador não pertence ao proprietário autenticado.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const availableAccount = await this.findOwnerAccount(
        ownerScopeId,
        LedgerAccountType.OWNER_AVAILABLE,
        tx,
      );
      const reservedAccount = await this.findOwnerAccount(
        ownerScopeId,
        LedgerAccountType.OPERATING_RESERVED,
        tx,
      );
      if ((await this.balance(tx, availableAccount.id)) < input.amountMinor) {
        throw new ConflictException(
          'Saldo disponível insuficiente para reserva.',
        );
      }
      const entry = await tx.ledgerEntry.create({
        data: {
          kind: LedgerEntryKind.OPERATING_ALLOWANCE,
          reference: `allowance:${ownerScopeId}:${idempotencyKey}`,
        },
      });
      await tx.ledgerLine.createMany({
        data: [
          {
            entryId: entry.id,
            accountId: availableAccount.id,
            side: LedgerSide.DEBIT,
            amountMinor: input.amountMinor,
          },
          {
            entryId: entry.id,
            accountId: reservedAccount.id,
            side: LedgerSide.CREDIT,
            amountMinor: input.amountMinor,
          },
        ],
      });
      const allowance = await tx.operatingAllowance.create({
        data: {
          ownerScopeId,
          collectorProfileId: collector.id,
          amountMinor: input.amountMinor,
          idempotencyKey,
          ledgerEntryId: entry.id,
        },
      });
      return { id: allowance.id, amountMinor: allowance.amountMinor };
    });
  }

  private async getPassengerWallet(actor: ActorContext) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { passengerProfileId: actor.profileId },
    });
    if (!wallet)
      throw new NotFoundException('Carteira de demonstração não encontrada.');
    return wallet;
  }

  private requireOwnerScope(actor: ActorContext): string {
    if (!actor.ownerId)
      throw new ConflictException('Âmbito do proprietário indisponível.');
    return actor.ownerId;
  }

  private async findOwnerAccount(
    ownerScopeId: string,
    type: LedgerAccountType,
    client: Pick<PrismaService, 'ledgerAccount'> = this.prisma,
  ) {
    const account = await client.ledgerAccount.findFirst({
      where: { ownerScopeId, type },
    });
    if (!account)
      throw new ConflictException('Conta do proprietário indisponível.');
    return account;
  }

  private async balance(
    client: LedgerClient,
    accountId: string,
  ): Promise<number> {
    const [debits, credits] = await Promise.all([
      client.ledgerLine.aggregate({
        where: { accountId, side: LedgerSide.DEBIT },
        _sum: { amountMinor: true },
      }),
      client.ledgerLine.aggregate({
        where: { accountId, side: LedgerSide.CREDIT },
        _sum: { amountMinor: true },
      }),
    ]);
    return (credits._sum.amountMinor ?? 0) - (debits._sum.amountMinor ?? 0);
  }

  private toAlias(alias: {
    id: string;
    qrPayload: string;
    state: PaymentAliasState;
  }) {
    return { id: alias.id, qrPayload: alias.qrPayload, state: alias.state };
  }

  private toIntent(intent: PaymentIntent) {
    return {
      id: intent.id,
      state: intent.state,
      quantity: intent.quantity,
      unitAmountMinor: intent.unitAmountMinor,
      totalAmountMinor: intent.totalAmountMinor,
      expiresAt: intent.expiresAt.toISOString(),
      stepUpRequired: intent.stepUpRequired,
      collector: { profileId: intent.collectorProfileId },
    };
  }

  private toPaymentResult(payment: Payment) {
    return {
      paymentId: payment.id,
      state: payment.state === PaymentState.POSTED ? 'POSTED' : 'UNKNOWN',
      totalAmountMinor: payment.totalAmountMinor,
      receiptCode: payment.receiptCode,
    };
  }

  private toSettlement(settlement: SettlementBatch) {
    return {
      id: settlement.id,
      state: settlement.state,
      amountMinor: settlement.amountMinor,
      availableAt: settlement.availableAt.toISOString(),
    };
  }
}
