# KwanzaGo SDD v0.4.0

Monorepo da demo KwanzaGo baseada em QR estático controlável, confirmação
online no dispositivo do passageiro, PIN por risco e receita pendente do
proprietário com fecho controlado.

## Fonte de verdade

Existe uma única baseline normativa local:

- `specs/` define produto, domínio, segurança, clientes e aceitação;
- `contracts/openapi.yaml` define a API;
- `tickets/backlog.md` define a sequência de execução.

`SPEC_STATUS.md` regista as decisões vigentes. `sources/` e `evidence/` mantêm
apenas proveniência histórica e nunca substituem a baseline. A v0.4 substitui o
antigo núcleo NFC/BI, ESP32, rotas, turnos e viagens.

Antes de código, execute:

```bash
npm run specs:validate
```

## Estado actual

O KG-001 estabelece a fundação do backend em `apps/api`: NestJS, PostgreSQL,
Prisma, configuração segura, identidade/perfis, autorização por papel e âmbito
do proprietário, correlação e redacção de logs. Nenhum endpoint funcional é
criado nesta fatia.

O cliente Dart em `packages/api_client` é gerado exclusivamente de
`contracts/openapi.yaml`; não devem ser criados modelos manuais concorrentes.

## Backend local

Requer Node.js compatível com `.nvmrc`, npm, Docker e Docker Compose.

```bash
npm ci --ignore-scripts
npm rebuild @prisma/engines esbuild
cp apps/api/.env.example apps/api/.env
docker compose -f apps/api/compose.yaml up -d --wait
npm --workspace @kwanzago/api run db:migrate
npm --workspace @kwanzago/api run db:seed
npm run api:check
```

Todos os dados e segredos de exemplo são sintéticos. Esta demo não processa
fundos reais nem representa integração com EMIS, banco, PSP ou Estado.

Consulte `apps/api/README.md` para operação e rollback do banco local.

## Contrato e cliente Dart

Depois de uma alteração aprovada em `contracts/openapi.yaml`:

```bash
scripts/generate_api_client.sh
```

O gerador valida o OpenAPI, regenera o pacote Dart e executa o respectivo
`build_runner`. Código gerado não deve ser editado manualmente.

## Ordem de leitura

1. `SPEC_STATUS.md`
2. `specs/00-scope.md`
3. `specs/01-product.md`
4. `specs/02-domain-ledger.md`
5. `specs/03-security.md`
6. `contracts/openapi.yaml`
7. `specs/04-flutter.md`
8. `specs/05-owner-settlement.md`
9. `specs/06-acceptance.md`
10. `tickets/backlog.md`

## Regras invioláveis

- QR estático identifica a carteira; nunca autoriza débito sozinho.
- Todo débito exige confirmação no dispositivo do passageiro.
- PIN é obrigatório para múltiplos passageiros, valor elevado ou risco alto.
- O ledger de dupla entrada é a fonte de verdade; saldo não é contador.
- Pagamentos creditam `OWNER_PENDING`; só o fecho move valor elegível para
  `OWNER_AVAILABLE`.
- Sem rede não existe aprovação.
- Fundo real, liquidação bancária, KYC, SMS e geolocalização são mocks no MVP.

## Artefactos no Notion

- Hub: https://app.notion.com/p/3c414ba90ba681138b38da825b5b1e3d
- Specs: https://app.notion.com/p/3d2ac16990544d1786d95ce7e935530c
- Backlog: https://app.notion.com/p/f5457c6ef00241ce856eed2f870648dc
