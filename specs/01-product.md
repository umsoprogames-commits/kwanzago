# Especificação do produto

## Fluxo de pagamento

1. Owner cria tarifa e atribui cobrador a uma viatura.
2. Collector escolhe quantidade; app calcula total.
3. Collector lê QR estático do passageiro.
4. Backend valida alias e cria `PENDING_CONFIRMATION` por 90 segundos.
5. Passageiro recebe pedido com cobrador, viatura, quantidade, tarifa e total.
6. Passageiro aprova. Quantidade > 1, valor acima do limiar ou risco requer PIN.
7. Backend publica débito `PASSENGER_AVAILABLE` e crédito `OWNER_PENDING` no mesmo commit.
8. Os dois apps recebem o resultado. Owner vê receita pendente.

## Requisitos P0

- FR-PRD-001: criar uma carteira AOA de teste por passageiro.
- FR-PRD-002: saldo e histórico são derivados de `POSTED`.
- FR-PRD-003: carga `PENDING` não altera saldo; `SETTLED` é idempotente.
- FR-PRD-004: QR contém alias aleatório, revogável e sem dados financeiros.
- FR-PRD-005: bloquear/substituir QR preserva saldo e histórico.
- FR-PRD-006: cobrador escolhe quantidade 1..8 e vê total antes de ler QR.
- FR-PRD-007: PaymentIntent fixa cobrador, viatura, tarifa, quantidade, total e expiração.
- FR-PRD-008: todo débito exige confirmação no dispositivo do passageiro.
- FR-PRD-009: PIN reforçado para múltiplos, valor elevado ou risco.
- FR-PRD-010: intent aprovado é imutável; não pode sofrer alteração pelo cobrador.
- FR-PRD-011: débito e crédito pendente são uma transacção atómica.
- FR-PRD-012: expor estados PENDING_CONFIRMATION, POSTED, DECLINED, EXPIRED, UNKNOWN.
- FR-PRD-013: owner gere tarifa, cobradores, viaturas e limites.
- FR-PRD-014: owner vê receita verificada, pendente, disponível e reserva.
- FR-PRD-015: owner configura e consulta fechamento D+0/D+1.
- FR-PRD-016: collector só vê seus recebimentos/contexto/reserva autorizada.
- FR-PRD-017: manter auditoria de eventos financeiros e de segurança.
- FR-PRD-018: exibir claramente integrações simuladas no ambiente de demo.
