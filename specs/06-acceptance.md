# Aceitação e Definition of Done

## Cenários P0

AC-001 carga pendente não altera saldo.
AC-002 callback repetido não duplica crédito.
AC-003 QR cria intenção sem movimento financeiro.
AC-004 QR bloqueado recusa antes da intenção.
AC-005 quantity=2 mostra valor exacto ao passageiro.
AC-006 aprovação normal faz débito+crédito pendente atómicos.
AC-007 múltiplos exigem PIN.
AC-008 collector não altera intent aprovado.
AC-009 idempotência não duplica débito.
AC-010 sem rede não aprova.
AC-011 UNKNOWN é resolvido por consulta da mesma chave.
AC-012 collector não vê dados/saldo do owner.
AC-013 owner distingue pendente de disponível.
AC-014 fecho calcula e transfere apenas pendente elegível.
AC-015 reserva só usa disponível.
AC-016 despesa acima do limite fica pendente do owner.
AC-017 mudança sensível activa cooling period.
AC-018 audit log não contém PIN, alias integral ou geo exacta.

## Done por ticket

- Testes relacionados passam.
- OpenAPI e cliente Flutter são sincronizados.
- Estados de erro/sucesso/vazio existem.
- Nenhum segredo é guardado em log.
- Nenhuma referência a NFC/BI/ESP32/turno/rota/viagem foi introduzida no core.
