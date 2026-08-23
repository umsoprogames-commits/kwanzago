import { ActorRole, type ActorContext } from '../common/auth/actor-context.js';

export const DEMO_IDS = {
  ownerScopeId: '10000000-0000-4000-8000-000000000001',
  passengerUserId: '10000000-0000-4000-8000-000000000010',
  passengerProfileId: '10000000-0000-4000-8000-000000000011',
  collectorUserId: '10000000-0000-4000-8000-000000000020',
  collectorProfileId: '10000000-0000-4000-8000-000000000021',
  ownerUserId: '10000000-0000-4000-8000-000000000030',
  ownerProfileId: '10000000-0000-4000-8000-000000000031',
  walletId: '10000000-0000-4000-8000-000000000040',
  aliasId: '10000000-0000-4000-8000-000000000041',
  fareRuleId: '10000000-0000-4000-8000-000000000050',
  systemClearingAccountId: '10000000-0000-4000-8000-000000000060',
  passengerAccountId: '10000000-0000-4000-8000-000000000061',
  ownerPendingAccountId: '10000000-0000-4000-8000-000000000062',
  ownerAvailableAccountId: '10000000-0000-4000-8000-000000000063',
  operatingReservedAccountId: '10000000-0000-4000-8000-000000000064',
} as const;

export const DEMO_QR_PAYLOAD = 'kwg_demo_qr_passenger_001';

export const demoActors = {
  passenger: {
    subjectId: 'demo-passenger-001',
    userId: DEMO_IDS.passengerUserId,
    profileId: DEMO_IDS.passengerProfileId,
    role: ActorRole.PASSENGER,
  },
  collector: {
    subjectId: 'demo-collector-001',
    userId: DEMO_IDS.collectorUserId,
    profileId: DEMO_IDS.collectorProfileId,
    role: ActorRole.COLLECTOR,
    ownerId: DEMO_IDS.ownerScopeId,
  },
  owner: {
    subjectId: 'demo-owner-001',
    userId: DEMO_IDS.ownerUserId,
    profileId: DEMO_IDS.ownerProfileId,
    role: ActorRole.OWNER,
    ownerId: DEMO_IDS.ownerScopeId,
  },
} satisfies Record<string, ActorContext>;
