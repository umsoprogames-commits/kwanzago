# Estado das especificações

Versão: `0.4.0`

Última actualização: `2026-08-23`

Estado da baseline: `READY_FOR_BACKEND_BUILD`

Estado para fundos reais: `BLOCKED_BY_EXTERNAL_APPROVALS`

## Baseline activa

A v0.4 substitui integralmente o núcleo funcional v0.3.1. Existe uma única
baseline normativa na raiz: `specs/`, `contracts/openapi.yaml` e
`tickets/backlog.md`.

## Decisões fechadas

| ID | Decisão | Estado |
|---|---|---|
| D-040 | O QR estático contém apenas um alias público aleatório e revogável. | ACCEPTED |
| D-041 | Todo débito exige confirmação online no dispositivo registado do passageiro. | ACCEPTED |
| D-042 | PIN reforçado é exigido por quantidade, valor ou risco. | ACCEPTED |
| D-043 | O ledger de dupla entrada é a fonte financeira de verdade. | ACCEPTED |
| D-044 | Pagamento move valor de `PASSENGER_AVAILABLE` para `OWNER_PENDING`. | ACCEPTED |
| D-045 | Fecho idempotente move apenas valor elegível de `OWNER_PENDING` para `OWNER_AVAILABLE`. | ACCEPTED |
| D-046 | Reserva operacional nasce exclusivamente de `OWNER_AVAILABLE`. | ACCEPTED |
| D-047 | O cobrador recebe prova da cobrança, mas nunca propriedade dos fundos. | ACCEPTED |
| D-048 | Backend é NestJS, PostgreSQL e Prisma. | ACCEPTED |
| D-049 | Passageiro e cobrador usam Flutter Mobile; proprietário usa Flutter Web. | ACCEPTED |
| D-050 | PSP, KYC, SMS, fundos e liquidação bancária reais são mocks explícitos. | ACCEPTED |
| D-051 | Cartão, BI, NFC e hardware dedicado são adaptadores futuros. | ACCEPTED |

## Fora do núcleo v0.4

- NFC, BI, cartão e ESP32.
- Rotas, viagens e turnos.
- Aprovação offline.
- Fundos ou liquidação bancária reais.
- GPS contínuo.

## Bloqueadores para fundos reais

- Parceiro PSP ou banco autorizado e matriz de responsabilidades.
- KYC/AML, limites, custódia e liquidação definidos pelo parceiro.
- Parecer jurídico e política de privacidade/retenção.
- Auditoria de segurança, resposta a incidentes e continuidade.

## Histórico

| Versão | Data | Alteração |
|---|---|---|
| 0.4.0 | 2026-08-23 | QR estático controlável, confirmação no dispositivo, PIN por risco, cobrador, receita pendente e fecho controlado. |
