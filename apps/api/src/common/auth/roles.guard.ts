import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ActorRole } from './actor-context.js';
import type { ActorRequest } from './actor-request.js';
import { ROLES_METADATA } from './roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<ActorRole[]>(
      ROLES_METADATA,
      [context.getHandler(), context.getClass()],
    );

    if (!allowedRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<ActorRequest>();
    if (!request.actor || !allowedRoles.includes(request.actor.role)) {
      throw new ForbiddenException('Perfil sem permissão para esta operação.');
    }

    return true;
  }
}
