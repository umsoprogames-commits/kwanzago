# API KwanzaGo

API NestJS, PostgreSQL e Prisma do MVP QR v0.4. A demonstração local expõe a
fatia QR para intenção de cobrança, confirmação pelo passageiro com PIN por
risco, linhas de ledger, receita pendente, liquidação e reserva operacional.
Todos os fundos, tokens e dados são sintéticos; não existe integração bancária
ou processamento de pagamento real.

## Preparação local

A partir da raiz do repositório:

```bash
npm ci --ignore-scripts
npm rebuild @prisma/engines esbuild
cp apps/api/.env.example apps/api/.env
docker compose -f apps/api/compose.yaml up -d --wait
npm --workspace @kwanzago/api run db:migrate
npm --workspace @kwanzago/api run db:seed
npm run api:check
```

O install ignora scripts transitivos e reconstrói explicitamente apenas os
binários necessários. Todos os valores de `.env.example` e do Compose são
exclusivamente sintéticos para a demo local. O ficheiro `.env` não é versionado.

Para iniciar a API em desenvolvimento:

```bash
npm --workspace @kwanzago/api run start:dev
```

A API usa o prefixo `/v1`. O middleware cria ou propaga um `correlationId`, e
os logs passam pela redacção de campos sensíveis. O contexto de autorização é
derivado da sessão autenticada; IDs de proprietário, viatura ou dispositivo no
body nunca são fonte de autorização.

## Demonstração rápida

Com o banco semeado, existem três sessões sintéticas no `.env.example`:
passageiro, cobrador e proprietário. O QR inicial é
`kwg_demo_qr_passenger_001` e a tarifa demo é
`10000000-0000-4000-8000-000000000050` (50.000 AOA). Crie a intenção como
cobrador com `Idempotency-Key`, aprove-a como passageiro e use o PIN sintético
configurado quando a quantidade for superior a uma. Em seguida, consulte
`GET /v1/owner/overview` e feche a liquidação em
`POST /v1/owner/settlements/close`.

Os endpoints e schemas são os do [`contracts/openapi.yaml`](../../contracts/openapi.yaml).
O teste manual completo desta fatia está registado em
[`evidence/MVP-DEMO.md`](../../evidence/MVP-DEMO.md).

## Prisma

O cliente Prisma é gerado em `apps/api/src/generated/prisma/` e não é
versionado:

```bash
npm run api:prisma:validate
npm run api:prisma:generate
```

As migrations ficam em `apps/api/prisma/migrations/`. Cada migration inclui o
rollback manual `down.sql`, que deve ser exercitado num banco descartável antes
de revisão.

## Encerrar o banco local

```bash
docker compose -f apps/api/compose.yaml down
```

Use `down -v` apenas quando pretender descartar explicitamente os dados locais.
