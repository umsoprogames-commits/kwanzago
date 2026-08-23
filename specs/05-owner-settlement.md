# Proprietário, reserva e liquidação

## Valor para o proprietário

O owner vê receita digital verificável por cobrador/viatura, deixa de depender de entrega manual e consegue separar liquidez disponível de custos operacionais.

## Fluxo

1. Pagamento aprovado credita `OWNER_PENDING`.
2. Dashboard mostra pendente, sem chamá-lo de disponível.
3. Fecho D+0/D+1 gera `SettlementBatch` idempotente.
4. Lote move `OWNER_PENDING` para `OWNER_AVAILABLE`.
5. Owner pode reservar uma parte disponível para operação.
6. Collector pede despesa; a regra/owner decide. MVP apenas simula a movimentação externa.

## Regras

- O collector nunca move livremente saldo do owner.
- Despesa acima do limite exige aprovação do owner.
- O dinheiro pendente do dia não financia a reserva operacional.
- PSP é responsável por qualquer custódia e liquidação reais em produção.
