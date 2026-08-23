export enum ActorRole {
  PASSENGER = 'PASSENGER',
  COLLECTOR = 'COLLECTOR',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export interface ActorContext {
  readonly subjectId: string;
  readonly userId: string;
  readonly profileId: string;
  readonly role: ActorRole;
  readonly ownerId?: string;
  readonly deviceId?: string;
}
