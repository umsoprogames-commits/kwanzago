# Domínio e ledger

## Entidades

`User`, `Profile`, `Operator`, `Vehicle`, `CollectorAssignment`, `CollectorDevice`, `PassengerWallet`, `PaymentAlias`, `FareRule`, `PaymentIntent`, `PaymentAuthorization`, `Payment`, `SettlementBatch`, `OperatingAllowance`, `ExpenseRequest`, `LedgerTransaction`, `LedgerEntry`, `AuditEvent`, `RiskSignal`.

## Estados

| Entidade | Estados |
|---|---|
| PaymentAlias | ACTIVE, BLOCKED, REPLACED |
| PaymentIntent | PENDING_CONFIRMATION, APPROVED, DECLINED, EXPIRED, CANCELLED, UNKNOWN |
| Payment | POSTED, DECLINED, REVERSED |
| SettlementBatch | OPEN, CLOSED, AVAILABLE, FAILED |
| ExpenseRequest | PENDING_OWNER, APPROVED, REJECTED, USED, CANCELLED |

## Contas do ledger

| Evento | Débito | Crédito |
|---|---|---|
| Carga simulada | SYSTEM_CLEARING | PASSENGER_AVAILABLE |
| Pagamento | PASSENGER_AVAILABLE | OWNER_PENDING |
| Fecho | OWNER_PENDING | OWNER_AVAILABLE |
| Reserva | OWNER_AVAILABLE | OPERATING_RESERVED |
| Uso autorizado | OPERATING_RESERVED | OPERATING_USED |

## Invariantes

- Cada transacção equilibra débitos e créditos.
- `PaymentIntent` não publica entrada no ledger.
- Um `Idempotency-Key`+payload só gera uma decisão final.
- O cobrador não é credor das cobranças.
- Reserva operacional vem de `OWNER_AVAILABLE`.
- Nenhuma entrada `POSTED` é editada ou apagada; correcção usa reversão.
