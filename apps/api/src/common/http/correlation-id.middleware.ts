import { randomUUID } from 'node:crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import type { ActorRequest } from '../auth/actor-request.js';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(request: ActorRequest, response: Response, next: NextFunction): void {
    const requestedId = request.header('x-correlation-id');
    const correlationId =
      requestedId && UUID_PATTERN.test(requestedId)
        ? requestedId
        : randomUUID();

    request.correlationId = correlationId;
    response.setHeader('x-correlation-id', correlationId);
    next();
  }
}
