# Evidência — MVP demonstrável QR v0.4

Data: 2026-08-23

Ambiente descartável: PostgreSQL local iniciado por `apps/api/compose.yaml`,
com `DEMO_MODE=true` e dados exclusivamente sintéticos.

Fluxo exercitado contra a API local:

1. Carteira do passageiro inicia em 500.000 AOA derivados das linhas do
   ledger, sem campo de saldo autoritativo.
2. Cobrador autenticado cria uma intenção para o QR estático, quantidade 2 e
   tarifa demo de 50.000 AOA: total 100.000 AOA e `stepUpRequired=true`.
3. Passageiro autenticado aprova com o PIN sintético configurado. É criado um
   pagamento publicado e uma receita `KG-*`; a carteira passa a 400.000 AOA.
4. O painel do proprietário mostra 100.000 AOA de receita verificada e
   pendente. A liquidação move exactamente os 100.000 AOA para disponível.
5. A repetição da aprovação e da liquidação com a mesma `Idempotency-Key`
   devolveu o mesmo pagamento/lote, sem novas linhas de ledger.
6. A reserva operacional de 25.000 AOA moveu disponível para reservado; a
   repetição com a mesma chave devolveu a mesma reserva.

Resultado final: receita verificada 100.000 AOA, pendente 0 AOA, disponível
75.000 AOA e reserva operacional 25.000 AOA. Não foram processados fundos
reais nem contactado qualquer PSP, banco, EMIS ou serviço do Estado.
