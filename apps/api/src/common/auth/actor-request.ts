import type { Request } from 'express';
import type { ActorContext } from './actor-context.js';

export interface ActorRequest extends Request {
  actor?: ActorContext;
  correlationId?: string;
}
