import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ActorRole, type ActorContext } from './actor-context.js';
import type { ActorRequest } from './actor-request.js';
import { AuthenticatedGuard } from './authenticated.guard.js';
import { OwnerScopePolicy } from './owner-scope.policy.js';
import { RolesGuard } from './roles.guard.js';

const ownerActor: ActorContext = {
  subjectId: 'subject-owner',
  userId: '10000000-0000-4000-8000-000000000010',
  profileId: '10000000-0000-4000-8000-000000000011',
  role: ActorRole.OWNER,
  ownerId: '10000000-0000-4000-8000-000000000001',
};

function executionContext(actor?: ActorContext): ExecutionContext {
  const request = { actor } as ActorRequest;

  return {
    switchToHttp: () => ({ getRequest: () => request }),
    getHandler: () => authorizationTestHandler,
    getClass: () => AuthorizationTestController,
  } as unknown as ExecutionContext;
}

class AuthorizationTestController {}
function authorizationTestHandler(): void {}

describe('autorização', () => {
  it('recusa pedidos sem contexto autenticado', () => {
    expect(() =>
      new AuthenticatedGuard().canActivate(executionContext()),
    ).toThrow(UnauthorizedException);
  });

  it('recusa perfil incompatível', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([ActorRole.COLLECTOR]),
    } as unknown as Reflector;

    expect(() =>
      new RolesGuard(reflector).canActivate(executionContext(ownerActor)),
    ).toThrow(ForbiddenException);
  });

  it('deriva o âmbito do owner da sessão e recusa outro owner', () => {
    const policy = new OwnerScopePolicy();

    expect(policy.getRequiredOwnerId(ownerActor)).toBe(ownerActor.ownerId);
    expect(() =>
      policy.assertCanAccessOwner(
        ownerActor,
        '20000000-0000-4000-8000-000000000002',
      ),
    ).toThrow(ForbiddenException);
  });

  it('permite o perfil autorizado', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([ActorRole.OWNER]),
    } as unknown as Reflector;

    expect(
      new RolesGuard(reflector).canActivate(executionContext(ownerActor)),
    ).toBe(true);
  });
});
