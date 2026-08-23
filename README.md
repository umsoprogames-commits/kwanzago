# Pagamentos nos táxis azuis e brancos

Baseline de Spec Driven Development para construir e demonstrar uma camada de aceitação NFC, carteira pré-paga simulada, receita digital verificável e acerto por viatura.

Versão: `0.3.1`

Estado: `READY_FOR_HACKATHON_BUILD`

Data base: `2026-08-23`

## Estrutura do repositório

| Caminho | Finalidade |
| --- | --- |
| `specs/` | Baseline normativa SDD 0.3.1. |
| `contracts/openapi.yaml` | Contrato OpenAPI 3.1 normativo. |
| `tickets/` | Backlog canónico e exportação individual dos tickets em `tickets/notion/`. |
| `sources/` | Registo normalizado das fontes e fichas exportadas em `sources/notion/`. |
| `docs/notion/` | Hub, páginas, índice e metadados da documentação exportada do Notion. |
| `prototype/gpt-sites/` | Protótipo React/Vinext publicado, conservado como referência visual. |
| `evidence/source-materials/` | PDFs, DOCX e arquivo SDD originais, sem valor normativo. |
| `scripts/validate_specs.py` | Validação automática da coerência da baseline. |
| `scripts/bootstrap_flutter.sh` | Instalação local e verificável do Flutter fixado em `.flutter-version`. |
| `scripts/bootstrap_android.sh` | Instalação local do Android SDK após aceitação pessoal das licenças. |
| `scripts/generate_api_client.sh` | Validação do OpenAPI e geração reproduzível do cliente Dart. |
| `scripts/flutter_ci.sh` | Formatação, análise, testes e build release do dashboard. |

As aplicações Flutter ficam em `apps/` e os packages Dart partilhados em
`packages/`. A API NestJS e o firmware serão criados nos tickets próprios em
`apps/api` e `firmware/terminal`. O protótipo React não substitui essas
implementações.

## Desenvolvimento Flutter

O Flutter é instalado dentro de `.tooling/`, sem alterar a instalação global
da máquina. A versão actualmente fixada é Flutter 3.47.1 com Dart 3.13.1.

```bash
scripts/bootstrap_flutter.sh
scripts/generate_api_client.sh
scripts/flutter_ci.sh
```

Para executar o dashboard Flutter Web:

```bash
cd apps/operator_dashboard
../../scripts/flutterw run -d chrome \
  --dart-define=APP_ENV=demo \
  --dart-define=API_BASE_URL=http://localhost:3000/v1
```

O Android SDK também é instalado localmente, mas a aceitação das licenças deve
ser feita pela pessoa responsável na própria máquina:

```bash
scripts/bootstrap_android.sh
cd apps/passenger_app
../../scripts/flutterw run \
  --dart-define=APP_ENV=demo \
  --dart-define=API_BASE_URL=http://10.0.2.2:3000/v1
```

Os wrappers `scripts/flutterw` e `scripts/dartw` isolam caches do Pub, Gradle e
analisador dentro do repositório. Estes artefactos locais e os builds são
ignorados pelo controlo de versão.

## Resultado esperado

Um passageiro cria a conta sem deslocação, obtém uma referência fictícia de carregamento, activa a credencial por código temporário e paga por toque num terminal ESP32. O backend publica o pagamento num ledger de dupla entrada e o dono vê a receita digital verificada na viatura e no turno correctos. Quando existe declaração de numerário e despesas no fecho do turno, o acerto mostra esses valores separadamente, sem os apresentar como verificados.

## Limite de segurança

O MVP usa valores fictícios e UID apenas para demonstrar identificação. Nenhum fundo real é mantido pela plataforma. Produção exige PSP ou banco autorizado, integração oficial do BI ou cartão com secure element e validações jurídicas e regulatórias.

## Stack fechada

| Camada | Decisão |
| --- | --- |
| Passageiro | Flutter Mobile, Android primeiro |
| Operador | Flutter Web, aplicação separada |
| Código partilhado | Dart packages para API, modelos e design system |
| Backend | NestJS, PostgreSQL e Prisma |
| Cache | Redis opcional, nunca fonte financeira |
| Terminal | ESP32-S3, PN532, display, keypad, buzzer/LED e Wi-Fi na demo |
| Contrato | OpenAPI 3.1, fonte do cliente Dart gerado |
| Desenvolvimento | SDD, tickets rastreáveis e Codex 5.6 como agente de implementação |

## Como trabalhar com este pacote

1. Ler `SPEC_STATUS.md` e `specs/00-gap-analysis.md`.
2. Implementar apenas requisitos de `specs/01-product.md`.
3. Respeitar estados e invariantes de `specs/02-domain.md`.
4. Gerar o cliente Dart a partir de `contracts/openapi.yaml`.
5. Usar as specs de arquitectura, firmware, experiência e segurança.
6. Demonstrar conformidade por `specs/08-acceptance-tests.md`.
7. Confirmar cobertura em `specs/09-traceability.md`.
8. Executar os tickets de `tickets/BACKLOG.md` na ordem definida.
9. Consultar `sources/README.md` antes de usar uma afirmação de descoberta ou mercado.
10. Usar `specs/15-mvp-scope.md` para decidir o que bloqueia a conclusão do MVP.

Para consultar o conteúdo enriquecido exactamente como foi exportado do
Notion, começar por `docs/notion/hub.md`. Para trabalhar no protótipo, consultar
`prototype/gpt-sites/LOCAL-CODEX-HANDOFF.md` e
`prototype/gpt-sites/SPEC-COMPLIANCE.md`.

## Ordem de precedência

1. `SPEC_STATUS.md`.
2. `specs/01-product.md`.
3. `specs/02-domain.md`.
4. `contracts/openapi.yaml`.
5. Specs especializadas.
6. Tickets, plano, exemplos e mocks.

Um ticket ou exemplo nunca altera um requisito normativo.

## Conteúdo

| Ficheiro | Finalidade |
| --- | --- |
| `AGENTS.md` | Guardrails para Codex e pessoas |
| `SPEC_STATUS.md` | Decisões, hipóteses e bloqueadores externos |
| `specs/00-gap-analysis.md` | Lacunas encontradas e resolução |
| `specs/01-product.md` | Actores, jornadas, escopo e requisitos |
| `specs/02-domain.md` | Entidades, estados, invariantes e concorrência |
| `specs/03-architecture.md` | Componentes, fronteiras e fluxos |
| `specs/04-api.md` | Semântica e catálogo da API |
| `contracts/openapi.yaml` | Contrato HTTP normativo |
| `specs/05-firmware.md` | Terminal ESP32 e protocolo |
| `specs/06-experience.md` | Flutter Mobile, Flutter Web e terminal |
| `specs/07-security-privacy.md` | Segurança, privacidade e fraude |
| `specs/08-acceptance-tests.md` | Cenários de aceitação |
| `specs/09-traceability.md` | Requisito para endpoint, teste e ticket |
| `specs/10-implementation-plan.md` | Fases, caminho crítico e Definition of Done |
| `specs/11-demo-mocks.md` | Fronteira entre real e simulado |
| `specs/12-adrs.md` | Decisões arquitecturais |
| `specs/13-discovery-evidence.md` | ICP, JTBD, persona, problema e plano de validação |
| `specs/14-social-impact.md` | Social Business Canvas, teoria de mudança, métricas e guardrails |
| `specs/15-mvp-scope.md` | Escopo fechado do MVP, 52 requisitos e gate de conclusão |
| `sources/README.md` | Registo de fontes, proveniência e implicações |
| `tickets/BACKLOG.md` | Backlog executável |
| `tickets/backlog.csv` | Importação e planeamento |
| `scripts/validate_specs.py` | Validação automática |

## Linguagem normativa

- `DEVE` e `NÃO DEVE`: obrigatório.
- `DEVERIA`: recomendado, exige justificação para desvio.
- `PODE`: opcional.
- `DEMO`: dinheiro e integrações externas simulados.
- `PILOTO`: ambiente controlado com parceiro autorizado.
- `PRODUÇÃO`: fundos reais, conformidade, suporte e continuidade.

## Regra de mudança

Uma alteração funcional só fica concluída quando requisito, domínio, OpenAPI, teste, rastreabilidade e ticket permanecem coerentes.

# kwanzago
