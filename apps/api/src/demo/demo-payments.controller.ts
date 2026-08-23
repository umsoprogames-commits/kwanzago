import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ActorRole } from '../common/auth/actor-context.js';
import type { ActorRequest } from '../common/auth/actor-request.js';
import { Roles } from '../common/auth/roles.decorator.js';
import { DemoPaymentsService } from './demo-payments.service.js';

@Controller('passenger')
@Roles(ActorRole.PASSENGER)
export class PassengerDemoController {
  constructor(private readonly payments: DemoPaymentsService) {}

  @Get('wallet')
  getWallet(@Req() request: ActorRequest) {
    return this.payments.getWallet(request.actor!);
  }

  @Get('payment-alias')
  getPaymentAlias(@Req() request: ActorRequest) {
    return this.payments.getPaymentAlias(request.actor!);
  }

  @Post('payment-alias/block')
  blockPaymentAlias(@Req() request: ActorRequest) {
    return this.payments.blockPaymentAlias(request.actor!);
  }

  @Post('payment-alias/replace')
  replacePaymentAlias(@Req() request: ActorRequest) {
    return this.payments.replacePaymentAlias(request.actor!);
  }

  @Post('payment-intents/:intentId/approve')
  approvePaymentIntent(
    @Req() request: ActorRequest,
    @Param('intentId') intentId: string,
    @Body() body: unknown,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
  ) {
    return this.payments.approvePaymentIntent(
      request.actor!,
      intentId,
      body,
      idempotencyKey,
    );
  }

  @Post('payment-intents/:intentId/decline')
  declinePaymentIntent(
    @Req() request: ActorRequest,
    @Param('intentId') intentId: string,
  ) {
    return this.payments.declinePaymentIntent(request.actor!, intentId);
  }
}

@Controller('collector')
@Roles(ActorRole.COLLECTOR)
export class CollectorDemoController {
  constructor(private readonly payments: DemoPaymentsService) {}

  @Post('payment-intents')
  createPaymentIntent(
    @Req() request: ActorRequest,
    @Body() body: unknown,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
  ) {
    return this.payments.createPaymentIntent(
      request.actor!,
      body,
      idempotencyKey,
    );
  }
}

@Controller('owner')
@Roles(ActorRole.OWNER)
export class OwnerDemoController {
  constructor(private readonly payments: DemoPaymentsService) {}

  @Get('overview')
  getOverview(@Req() request: ActorRequest) {
    return this.payments.getOwnerOverview(request.actor!);
  }

  @Post('settlements/close')
  closeSettlement(
    @Req() request: ActorRequest,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
  ) {
    return this.payments.closeOwnerSettlement(request.actor!, idempotencyKey);
  }

  @Post('operating-allowances')
  createOperatingAllowance(
    @Req() request: ActorRequest,
    @Body() body: unknown,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
  ) {
    return this.payments.createOperatingAllowance(
      request.actor!,
      body,
      idempotencyKey,
    );
  }
}
