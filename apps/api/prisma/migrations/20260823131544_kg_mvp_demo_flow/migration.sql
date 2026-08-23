-- CreateEnum
CREATE TYPE "payment_alias_state" AS ENUM ('ACTIVE', 'BLOCKED', 'REPLACED');

-- CreateEnum
CREATE TYPE "payment_intent_state" AS ENUM ('PENDING_CONFIRMATION', 'APPROVED', 'DECLINED', 'EXPIRED', 'CANCELLED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "payment_state" AS ENUM ('POSTED', 'DECLINED', 'REVERSED');

-- CreateEnum
CREATE TYPE "ledger_account_type" AS ENUM ('SYSTEM_CLEARING', 'PASSENGER_AVAILABLE', 'OWNER_PENDING', 'OWNER_AVAILABLE', 'OPERATING_RESERVED');

-- CreateEnum
CREATE TYPE "ledger_entry_kind" AS ENUM ('DEMO_LOAD', 'PAYMENT', 'SETTLEMENT', 'OPERATING_ALLOWANCE');

-- CreateEnum
CREATE TYPE "ledger_side" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "settlement_state" AS ENUM ('OPEN', 'CLOSED', 'AVAILABLE', 'FAILED');

-- CreateTable
CREATE TABLE "wallets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "passenger_profile_id" UUID NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'AOA',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_aliases" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "wallet_id" UUID NOT NULL,
    "qr_payload" VARCHAR(128) NOT NULL,
    "state" "payment_alias_state" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_aliases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fare_rules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_scope_id" UUID NOT NULL,
    "amount_minor" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fare_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_intents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "wallet_id" UUID NOT NULL,
    "alias_id" UUID NOT NULL,
    "collector_profile_id" UUID NOT NULL,
    "owner_scope_id" UUID NOT NULL,
    "fare_rule_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_amount_minor" INTEGER NOT NULL,
    "total_amount_minor" INTEGER NOT NULL,
    "state" "payment_intent_state" NOT NULL DEFAULT 'PENDING_CONFIRMATION',
    "step_up_required" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "create_idempotency_key" UUID NOT NULL,
    "create_payload_hash" CHAR(64) NOT NULL,
    "approve_idempotency_key" UUID,
    "approve_payload_hash" CHAR(64),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_intents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "intent_id" UUID NOT NULL,
    "ledger_entry_id" UUID NOT NULL,
    "total_amount_minor" INTEGER NOT NULL,
    "receipt_code" VARCHAR(32) NOT NULL,
    "state" "payment_state" NOT NULL DEFAULT 'POSTED',
    "posted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_accounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "ledger_account_type" NOT NULL,
    "wallet_id" UUID,
    "owner_scope_id" UUID,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'AOA',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ledger_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "kind" "ledger_entry_kind" NOT NULL,
    "reference" VARCHAR(128) NOT NULL,
    "posted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ledger_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_lines" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entry_id" UUID NOT NULL,
    "account_id" UUID NOT NULL,
    "side" "ledger_side" NOT NULL,
    "amount_minor" INTEGER NOT NULL,

    CONSTRAINT "ledger_lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settlement_batches" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_scope_id" UUID NOT NULL,
    "idempotency_key" UUID NOT NULL,
    "amount_minor" INTEGER NOT NULL,
    "state" "settlement_state" NOT NULL DEFAULT 'AVAILABLE',
    "ledger_entry_id" UUID NOT NULL,
    "available_at" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settlement_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operating_allowances" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_scope_id" UUID NOT NULL,
    "collector_profile_id" UUID NOT NULL,
    "amount_minor" INTEGER NOT NULL,
    "idempotency_key" UUID NOT NULL,
    "ledger_entry_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operating_allowances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallets_passenger_profile_id_key" ON "wallets"("passenger_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_aliases_qr_payload_key" ON "payment_aliases"("qr_payload");

-- CreateIndex
CREATE INDEX "payment_aliases_wallet_id_state_idx" ON "payment_aliases"("wallet_id", "state");

-- CreateIndex
CREATE INDEX "fare_rules_owner_scope_id_active_idx" ON "fare_rules"("owner_scope_id", "active");

-- CreateIndex
CREATE INDEX "payment_intents_wallet_id_state_idx" ON "payment_intents"("wallet_id", "state");

-- CreateIndex
CREATE INDEX "payment_intents_owner_scope_id_state_idx" ON "payment_intents"("owner_scope_id", "state");

-- CreateIndex
CREATE UNIQUE INDEX "payment_intents_collector_profile_id_create_idempotency_key_key" ON "payment_intents"("collector_profile_id", "create_idempotency_key");

-- CreateIndex
CREATE UNIQUE INDEX "payments_intent_id_key" ON "payments"("intent_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_ledger_entry_id_key" ON "payments"("ledger_entry_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_receipt_code_key" ON "payments"("receipt_code");

-- CreateIndex
CREATE INDEX "ledger_accounts_wallet_id_type_idx" ON "ledger_accounts"("wallet_id", "type");

-- CreateIndex
CREATE INDEX "ledger_accounts_owner_scope_id_type_idx" ON "ledger_accounts"("owner_scope_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ledger_entries_reference_key" ON "ledger_entries"("reference");

-- CreateIndex
CREATE INDEX "ledger_lines_account_id_side_idx" ON "ledger_lines"("account_id", "side");

-- CreateIndex
CREATE INDEX "ledger_lines_entry_id_idx" ON "ledger_lines"("entry_id");

-- CreateIndex
CREATE UNIQUE INDEX "settlement_batches_ledger_entry_id_key" ON "settlement_batches"("ledger_entry_id");

-- CreateIndex
CREATE UNIQUE INDEX "settlement_batches_owner_scope_id_idempotency_key_key" ON "settlement_batches"("owner_scope_id", "idempotency_key");

-- CreateIndex
CREATE UNIQUE INDEX "operating_allowances_ledger_entry_id_key" ON "operating_allowances"("ledger_entry_id");

-- CreateIndex
CREATE UNIQUE INDEX "operating_allowances_owner_scope_id_idempotency_key_key" ON "operating_allowances"("owner_scope_id", "idempotency_key");

-- AddForeignKey
ALTER TABLE "payment_aliases" ADD CONSTRAINT "payment_aliases_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_lines" ADD CONSTRAINT "ledger_lines_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "ledger_entries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_lines" ADD CONSTRAINT "ledger_lines_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "ledger_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
