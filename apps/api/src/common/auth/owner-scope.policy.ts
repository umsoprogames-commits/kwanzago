import { ForbiddenException, Injectable } from '@nestjs/common';
import { ActorRole, type ActorContext } from './actor-context.js';

@Injectable()
export class OwnerScopePolicy {
  getRequiredOwnerId(actor: ActorContext): string {
    if (
      (actor.role !== ActorRole.OWNER && actor.role !== ActorRole.COLLECTOR) ||
      !actor.ownerId
    ) {
      throw new ForbiddenException('Âmbito do proprietário obrigatório.');
    }

    return actor.ownerId;
  }

  assertCanAccessOwner(actor: ActorContext, resourceOwnerId: string): void {
    if (actor.role === ActorRole.ADMIN) {
      return;
    }

    if (this.getRequiredOwnerId(actor) !== resourceOwnerId) {
      throw new ForbiddenException('Acesso fora do proprietário autenticado.');
    }
  }
}
