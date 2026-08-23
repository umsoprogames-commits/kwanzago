#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

export NODE_ENV="${NODE_ENV:-test}"
export DEMO_MODE="${DEMO_MODE:-true}"
export DATABASE_URL="${DATABASE_URL:-postgresql://kwanzago:kwanzago_demo_local@127.0.0.1:55432/kwanzago?schema=public}"
export JWT_ISSUER="${JWT_ISSUER:-https://auth.demo.kwanzago.ao}"
export JWT_AUDIENCE="${JWT_AUDIENCE:-kwanzago-api}"
export DEMO_PASSENGER_TOKEN="${DEMO_PASSENGER_TOKEN:-demo-passenger-token-001}"
export DEMO_COLLECTOR_TOKEN="${DEMO_COLLECTOR_TOKEN:-demo-collector-token-001}"
export DEMO_OWNER_TOKEN="${DEMO_OWNER_TOKEN:-demo-owner-token-001}"
export DEMO_PASSENGER_PIN="${DEMO_PASSENGER_PIN:-2468}"

cd "${REPO_ROOT}"

npm run specs:validate
npm run api:prisma:validate
npm run api:prisma:generate
npm run api:format:check
npm run api:lint
npm run api:typecheck
npm run api:test
npm run api:test:e2e
npm run api:build
