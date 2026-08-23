import { SetMetadata } from '@nestjs/common';
import type { ActorRole } from './actor-context.js';

export const ROLES_METADATA = 'kwanzago:roles';

export const Roles = (
  ...roles: ActorRole[]
): MethodDecorator & ClassDecorator => SetMetadata(ROLES_METADATA, roles);
