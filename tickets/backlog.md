# Backlog executável v0.4

Estado de execução: **KG-001 Em revisão**. Os restantes tickets permanecem
**Por fazer** até que as suas dependências estejam satisfeitas.

| Ordem | Código | Ticket | P | Dependências |
|---:|---|---|---|---|
| 1 | KG-001 | Fundação: monorepo, perfis e autorização | P0 | - |
| 2 | KG-002 | Contas do ledger e posting engine | P0 | KG-001 |
| 3 | KG-003 | OTP, sessão e dispositivo do passageiro | P0 | KG-001 |
| 4 | KG-004 | Carteira e carga simulada | P0 | KG-002, KG-003 |
| 5 | KG-005 | Owner, viatura, cobrador e dispositivo | P0 | KG-001 |
| 6 | KG-006 | Tarifa fixa e limites | P0 | KG-005 |
| 7 | KG-007 | Alias QR estático revogável | P0 | KG-004 |
| 8 | KG-008 | Criação de PaymentIntent | P0 | KG-005, 006, 007 |
| 9 | KG-009 | Confirmação e PIN reforçado | P0 | KG-003, 008 |
| 10 | KG-010 | Posting atómico, recibo e UNKNOWN | P0 | KG-002, 009 |
| 11 | KG-011 | Dashboard financeiro do owner | P0 | KG-010 |
| 12 | KG-012 | SettlementBatch D+0/D+1 | P0 | KG-002, 010 |
| 13 | KG-013 | Reserva e pedido de despesa | P0 | KG-005, 012 |
| 14 | KG-014 | Flutter Passageiro | P0 | KG-004, 007, 009 |
| 15 | KG-015 | Flutter Cobrador | P0 | KG-008, 010, 013 |
| 16 | KG-016 | Flutter Web Owner | P0 | KG-011, 012, 013 |
| 17 | KG-017 | Risco, geo pontual e cooling period | P0 | KG-003, 009 |
| 18 | KG-018 | Auditoria, privacidade e limites | P0 | KG-001, 010, 017 |
| 19 | KG-019 | OpenAPI e clientes tipados | P0 | KG-004, 013 |
| 20 | KG-020 | Seeds, demo e suite de aceitação | P0 | KG-014..019 |
| 21 | KG-021 | Adaptador futuro cartão/BI | P2 | KG-010 |

## KG-001 - Fundação: monorepo, perfis e autorização

**Estado:** Em revisão

**Requisitos:** FR-PRD-013, FR-PRD-016, FR-PRD-017 e regras de isolamento de
`specs/03-security.md`.

**Aceitação técnica desta fatia:**

- A API NestJS compila, executa testes e valida configuração sem segredos no
  repositório.
- PostgreSQL/Prisma modelam utilizador, perfil e vínculo de owner/collector sem
  implementar saldo como contador.
- Contexto autenticado deriva actor e âmbito da sessão, não do body.
- Guardas recusam sessão ausente, perfil incompatível e acesso fora do owner.
- Logs e erros não expõem token, PIN, alias integral ou PII.
- Nenhum endpoint funcional é criado fora de `contracts/openapi.yaml`.

**Evidência:** `evidence/KG-001.md`.
