import { Module } from '@nestjs/common';
import {
  CollectorDemoController,
  OwnerDemoController,
  PassengerDemoController,
} from './demo-payments.controller.js';
import { DemoPaymentsService } from './demo-payments.service.js';

@Module({
  controllers: [
    PassengerDemoController,
    CollectorDemoController,
    OwnerDemoController,
  ],
  providers: [DemoPaymentsService],
})
export class DemoPaymentsModule {}
