# Instruções para agentes de desenvolvimento

## Missão

Construir uma demo segura e rastreável em que um QR estático apenas identifica
a carteira, o passageiro confirma cada débito no próprio dispositivo e um
ledger equilibrado separa receita pendente, disponível e reserva operacional.

## Fonte de verdade

Antes de código:

1. Ler `SPEC_STATUS.md`.
2. Confirmar o trabalho em `specs/00-scope.md`.
3. Localizar o requisito em `specs/01-product.md`.
4. Confirmar domínio, segurança, OpenAPI, aceitação e ticket.
5. Se houver conflito, parar e actualizar a spec antes do código.

Ordem de precedência:

1. `SPEC_STATUS.md`.
2. `specs/00-scope.md` e `specs/01-product.md`.
3. `specs/02-domain-ledger.md` e `specs/03-security.md`.
4. `contracts/openapi.yaml`.
5. Specs especializadas, aceitação e tickets.

## Stack obrigatória

- `apps/api`: NestJS, PostgreSQL e Prisma.
- `apps/passenger_app`: Flutter Mobile do passageiro, Android primeiro.
- `apps/collector_app`: Flutter Mobile do cobrador, Android primeiro.
- `apps/owner_dashboard`: Flutter Web do proprietário.
- `packages/api_client`: Dart gerado de `contracts/openapi.yaml`.

Cartão, BI, NFC, ESP32, rota, viagem e turno são extensões futuras e não fazem
parte do core v0.4.

## Guardrails obrigatórios

- Nunca processar fundos reais no ambiente de demo.
- Nunca afirmar integração real com EMIS, banco, PSP, KYC, SMS ou Estado.
- Nunca tratar o QR como autorização; ele apenas identifica um alias público.
- Nunca debitar sem confirmação online no dispositivo registado do passageiro.
- Nunca guardar PIN, OTP, segredo, token, alias integral ou geolocalização
  exacta em logs.
- Nunca actualizar saldo como contador autoritativo.
- Nunca confiar em actor, owner, collector, passenger, vehicle ou device
  fornecido no body quando esse contexto pertence à sessão autenticada.
- Nunca criar segundo débito num retry com a mesma chave e payload.
- Nunca reutilizar uma chave idempotente com payload diferente.
- Nunca editar ou apagar movimento publicado; correcção usa reversão.
- Nunca creditar o cobrador como proprietário dos fundos.
- Nunca chamar `OWNER_PENDING` de saldo disponível.
- Nunca financiar reserva operacional a partir de `OWNER_PENDING`.
- Nunca adicionar endpoint sem requisito, teste e ticket.
- Nunca criar modelo Dart manual que contradiga o OpenAPI.

## Fluxo SDD por ticket

1. Mover ticket para `Em curso`.
2. Criar ou actualizar teste de aceitação.
3. Alterar contrato antes do handler quando existir mudança HTTP.
4. Implementar a menor fatia vertical.
5. Executar lint, typecheck, unitários, integração e aceitação aplicáveis.
6. Guardar evidência e actualizar rastreabilidade.
7. Mover ticket para `Em revisão`, nunca directamente para concluído.

## Qualidade mínima

- Migrações reversíveis e seed sintético.
- Transacções financeiras e idempotência com concorrência testada.
- RBAC e isolamento por perfil/owner.
- Redacção de logs testada.
- OpenAPI validado e cliente Dart regenerado quando aplicável.
- UI com loading, vazio, erro, offline e sucesso.
- Correlação ponta a ponta por `correlationId`.

## Definition of Done

Um ticket está concluído quando:

- critérios de aceitação passam;
- requisitos associados estão cobertos;
- OpenAPI e clientes permanecem sincronizados;
- migrations e rollback foram exercitados quando aplicável;
- observabilidade e erros seguros existem;
- documentação e Notion reflectem o estado;
- não existem segredos nem dados reais no repositório.
