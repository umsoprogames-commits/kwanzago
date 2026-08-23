# Escopo e decisão de produto

## Proposta

KwanzaGo é uma carteira digital: o passageiro mostra um QR estático controlável; o cobrador cria a cobrança e lê o QR; o passageiro confirma no próprio dispositivo; o proprietário vê receita, reserva operacional e liquidação.

## Perfis

| Perfil | Pode fazer | Não pode fazer |
|---|---|---|
| Passageiro | Carregar, mostrar/bloquear QR, aprovar/recusar, consultar saldo | Alterar cobrança já confirmada |
| Cobrador | Definir quantidade, ler QR, consultar recebimentos próprios, pedir despesa | Ver saldo do proprietário ou autorizar-se a si próprio |
| Proprietário | Configurar tarifa, equipa, reserva, fecho e limites | Debitar passageiro sem confirmação |

## P0

1. Carteira, carga simulada, saldo e histórico.
2. QR estático com alias revogável.
3. Tarifa fixa e quantidade de 1 a 8 passageiros.
4. PaymentIntent e confirmação no dispositivo.
5. PIN reforçado.
6. Ledger atómico e recibos.
7. Receita pendente, disponível, reserva operacional e fecho.
8. Flutter para passageiro, cobrador e proprietário.
9. Segurança, auditoria e testes.

## Fora do núcleo

Rotas, viagens, turnos, GPS contínuo, NFC, BI, cartão, ESP32, aprovação offline, fundos reais e integração PSP real.
