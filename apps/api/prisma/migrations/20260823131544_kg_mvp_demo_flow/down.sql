ALTER TABLE "ledger_lines" DROP CONSTRAINT IF EXISTS "ledger_lines_account_id_fkey";
ALTER TABLE "ledger_lines" DROP CONSTRAINT IF EXISTS "ledger_lines_entry_id_fkey";
ALTER TABLE "payment_aliases" DROP CONSTRAINT IF EXISTS "payment_aliases_wallet_id_fkey";

DROP TABLE IF EXISTS "operating_allowances";
DROP TABLE IF EXISTS "settlement_batches";
DROP TABLE IF EXISTS "ledger_lines";
DROP TABLE IF EXISTS "ledger_entries";
DROP TABLE IF EXISTS "ledger_accounts";
DROP TABLE IF EXISTS "payments";
DROP TABLE IF EXISTS "payment_intents";
DROP TABLE IF EXISTS "fare_rules";
DROP TABLE IF EXISTS "payment_aliases";
DROP TABLE IF EXISTS "wallets";

DROP TYPE IF EXISTS "settlement_state";
DROP TYPE IF EXISTS "ledger_side";
DROP TYPE IF EXISTS "ledger_entry_kind";
DROP TYPE IF EXISTS "ledger_account_type";
DROP TYPE IF EXISTS "payment_state";
DROP TYPE IF EXISTS "payment_intent_state";
DROP TYPE IF EXISTS "payment_alias_state";
