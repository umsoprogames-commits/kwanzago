CREATE TYPE "user_state" AS ENUM ('ACTIVE', 'BLOCKED');
CREATE TYPE "profile_type" AS ENUM ('PASSENGER', 'COLLECTOR', 'OWNER', 'ADMIN');

CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "external_subject" VARCHAR(128) NOT NULL,
    "state" "user_state" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "type" "profile_type" NOT NULL,
    "owner_scope_id" UUID,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "profiles_owner_scope_by_type" CHECK (
      ("type" IN ('OWNER', 'COLLECTOR') AND "owner_scope_id" IS NOT NULL)
      OR ("type" IN ('PASSENGER', 'ADMIN') AND "owner_scope_id" IS NULL)
    )
);

CREATE UNIQUE INDEX "users_external_subject_key" ON "users"("external_subject");
CREATE UNIQUE INDEX "profiles_user_id_type_key" ON "profiles"("user_id", "type");
CREATE INDEX "profiles_owner_scope_id_type_idx" ON "profiles"("owner_scope_id", "type");

ALTER TABLE "profiles"
ADD CONSTRAINT "profiles_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
