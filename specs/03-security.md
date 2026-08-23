# Segurança e risco

## QR estático

- É um identificador público de alta entropia, nunca um instrumento de autorização.
- Uma fotografia só pode iniciar uma intenção; o passageiro ainda precisa aprovar.
- Pode ser bloqueado, substituído e associado a uma única carteira.

## Confirmação

- Confirmação no dispositivo registado para todos os débitos.
- PIN hash de 4 a 6 dígitos para múltiplos, limiar elevado ou risco.
- PIN não sai para o collector e não entra em logs.

## Risco

- Rate limit por utilizador, alias, device, collector e IP.
- Idempotência e hash de payload para comandos financeiros.
- Device proof, root/jailbreak, velocity, mudança de dispositivo e localização pontual compõem o risco.
- Geolocalização exige consentimento, é pontual e não bloqueia transacção normal apenas por ausência.
- Mudança de PIN/telefone/dispositivo, recuperação e carga alta activam cooling period de 12h.
- Sem backend online: recusar, não enfileirar para aprovação offline.

## Privacidade

- Logs mascaram alias e não persistem coordenadas precisas, PIN ou PII desnecessária.
- O proprietário vê agregados e transacções comerciais, não o saldo nem o historial completo do passageiro.
