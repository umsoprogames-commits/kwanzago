import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ActorRequest } from './actor-request.js';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ActorRequest>();

    if (!request.actor) {
      throw new UnauthorizedException('Sessão autenticada obrigatória.');
    }

    return true;
  }
}
