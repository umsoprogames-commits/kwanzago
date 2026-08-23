import { Module } from '@nestjs/common';
import { OwnerScopePolicy } from './owner-scope.policy.js';

@Module({
  providers: [OwnerScopePolicy],
  exports: [OwnerScopePolicy],
})
export class AuthorizationModule {}
