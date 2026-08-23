import { Injectable, type NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NextFunction, Response } from 'express';
import { demoActors } from '../../demo/demo-identities.js';
import type { ActorRequest } from './actor-request.js';

@Injectable()
export class DemoSessionMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(request: ActorRequest, _response: Response, next: NextFunction): void {
    const authorization = request.header('authorization');

    if (
      authorization ===
      `Bearer ${this.config.getOrThrow('DEMO_PASSENGER_TOKEN')}`
    ) {
      request.actor = demoActors.passenger;
    } else if (
      authorization ===
      `Bearer ${this.config.getOrThrow('DEMO_COLLECTOR_TOKEN')}`
    ) {
      request.actor = demoActors.collector;
    } else if (
      authorization === `Bearer ${this.config.getOrThrow('DEMO_OWNER_TOKEN')}`
    ) {
      request.actor = demoActors.owner;
    }

    next();
  }
}
