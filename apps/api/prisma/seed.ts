import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  LedgerAccountType,
  LedgerEntryKind,
  LedgerSide,
  ProfileType,
  PrismaClient,
} from '../src/generated/prisma/client.js';
import { DEMO_IDS, DEMO_QR_PAYLOAD } from '../src/demo/demo-identities.js';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL é obrigatória para executar o seed.');
}

if (process.env.DEMO_MODE !== 'true') {
  throw new Error('O seed sintético só pode executar com DEMO_MODE=true.');
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function seedIdentity(
  id: string,
  externalSubject: string,
  profileId: string,
  type: ProfileType,
  ownerScopeId: string | null,
): Promise<void> {
  await prisma.user.upsert({
    where: { id },
    update: { externalSubject, state: 'ACTIVE' },
    create: { id, externalSubject },
  });
  await prisma.profile.upsert({
    where: { userId_type: { userId: id, type } },
    update: { active: true, ownerScopeId },
    create: { id: profileId, userId: id, type, ownerScopeId },
  });
}

async function seed(): Promise<void> {
  await seedIdentity(
    DEMO_IDS.passengerUserId,
    'demo-passenger-001',
    DEMO_IDS.passengerProfileId,
    ProfileType.PASSENGER,
    null,
  );
  await seedIdentity(
    DEMO_IDS.collectorUserId,
    'demo-collector-001',
    DEMO_IDS.collectorProfileId,
    ProfileType.COLLECTOR,
    DEMO_IDS.ownerScopeId,
  );
  await seedIdentity(
    DEMO_IDS.ownerUserId,
    'demo-owner-001',
    DEMO_IDS.ownerProfileId,
    ProfileType.OWNER,
    DEMO_IDS.ownerScopeId,
  );

  await prisma.wallet.upsert({
    where: { passengerProfileId: DEMO_IDS.passengerProfileId },
    update: { currency: 'AOA' },
    create: {
      id: DEMO_IDS.walletId,
      passengerProfileId: DEMO_IDS.passengerProfileId,
      currency: 'AOA',
    },
  });
  await prisma.paymentAlias.upsert({
    where: { id: DEMO_IDS.aliasId },
    update: { qrPayload: DEMO_QR_PAYLOAD, state: 'ACTIVE' },
    create: {
      id: DEMO_IDS.aliasId,
      walletId: DEMO_IDS.walletId,
      qrPayload: DEMO_QR_PAYLOAD,
    },
  });
  await prisma.fareRule.upsert({
    where: { id: DEMO_IDS.fareRuleId },
    update: { amountMinor: 50_000, active: true },
    create: {
      id: DEMO_IDS.fareRuleId,
      ownerScopeId: DEMO_IDS.ownerScopeId,
      amountMinor: 50_000,
    },
  });

  await Promise.all([
    prisma.ledgerAccount.upsert({
      where: { id: DEMO_IDS.systemClearingAccountId },
      update: { type: LedgerAccountType.SYSTEM_CLEARING },
      create: {
        id: DEMO_IDS.systemClearingAccountId,
        type: LedgerAccountType.SYSTEM_CLEARING,
      },
    }),
    prisma.ledgerAccount.upsert({
      where: { id: DEMO_IDS.passengerAccountId },
      update: {
        type: LedgerAccountType.PASSENGER_AVAILABLE,
        walletId: DEMO_IDS.walletId,
      },
      create: {
        id: DEMO_IDS.passengerAccountId,
        type: LedgerAccountType.PASSENGER_AVAILABLE,
        walletId: DEMO_IDS.walletId,
      },
    }),
    prisma.ledgerAccount.upsert({
      where: { id: DEMO_IDS.ownerPendingAccountId },
      update: {
        type: LedgerAccountType.OWNER_PENDING,
        ownerScopeId: DEMO_IDS.ownerScopeId,
      },
      create: {
        id: DEMO_IDS.ownerPendingAccountId,
        type: LedgerAccountType.OWNER_PENDING,
        ownerScopeId: DEMO_IDS.ownerScopeId,
      },
    }),
    prisma.ledgerAccount.upsert({
      where: { id: DEMO_IDS.ownerAvailableAccountId },
      update: {
        type: LedgerAccountType.OWNER_AVAILABLE,
        ownerScopeId: DEMO_IDS.ownerScopeId,
      },
      create: {
        id: DEMO_IDS.ownerAvailableAccountId,
        type: LedgerAccountType.OWNER_AVAILABLE,
        ownerScopeId: DEMO_IDS.ownerScopeId,
      },
    }),
    prisma.ledgerAccount.upsert({
      where: { id: DEMO_IDS.operatingReservedAccountId },
      update: {
        type: LedgerAccountType.OPERATING_RESERVED,
        ownerScopeId: DEMO_IDS.ownerScopeId,
      },
      create: {
        id: DEMO_IDS.operatingReservedAccountId,
        type: LedgerAccountType.OPERATING_RESERVED,
        ownerScopeId: DEMO_IDS.ownerScopeId,
      },
    }),
  ]);

  const openingEntry = await prisma.ledgerEntry.upsert({
    where: { reference: 'demo-load:passenger-001' },
    update: {},
    create: {
      kind: LedgerEntryKind.DEMO_LOAD,
      reference: 'demo-load:passenger-001',
    },
  });
  const existingOpeningLines = await prisma.ledgerLine.count({
    where: { entryId: openingEntry.id },
  });
  if (existingOpeningLines === 0) {
    await prisma.ledgerLine.createMany({
      data: [
        {
          entryId: openingEntry.id,
          accountId: DEMO_IDS.systemClearingAccountId,
          side: LedgerSide.DEBIT,
          amountMinor: 500_000,
        },
        {
          entryId: openingEntry.id,
          accountId: DEMO_IDS.passengerAccountId,
          side: LedgerSide.CREDIT,
          amountMinor: 500_000,
        },
      ],
    });
  }
}

try {
  await seed();
} finally {
  await prisma.$disconnect();
}
