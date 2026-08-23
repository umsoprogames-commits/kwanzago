# Registo de fontes

## Regra de uso

Cada afirmação deve preservar a sua proveniência. Um documento do team define uma hipótese; não prova que o mercado se comporta dessa forma. Material de formação fornece um método; não valida o problema específico. Factos de mercado, regulação, parceiros e tecnologia oficial precisam de fonte externa primária antes do piloto.

## Inventário

| ID | Ficheiro | Tipo de evidência | Uso actual na v0.4 |
| --- | --- | --- | --- |
| SRC-001 | `2632_LHK-_20Desafios.pdf.pdf` | `CHALLENGE_BRIEF` | Problema original, público-alvo e critérios de rapidez, simplicidade e confirmação imediata. |
| SRC-002 | `Co_CC_81pia_20de_202618_LHK_20__20Value_20Proposition_20Canvas.pdf.pdf` | `TRAINING_MATERIAL` | Método para actividades, dores, ganhos, mapa de valor, fit e hipóteses testáveis. |
| SRC-003 | `conceito-carteira-nfc-azul-e-branco.pdf` | `TEAM_CONCEPT` | Antecedente histórico; NFC e a arquitectura proposta não pertencem ao núcleo v0.4. |
| SRC-004 | `4eff6380-a21c-469f-951c-ad258e452b35.pdf` | `DUPLICATE_EXPORT` | Cópia binariamente idêntica de SRC-003; não conta como evidência adicional. |
| SRC-005 | `01_Modelo_Jobs_to_be_Done.docx` | `INTERNAL_SYNTHESIS` | JTBD do dono de uma ou várias viaturas e critérios de sucesso do acerto. |
| SRC-006 | `02_Modelo_Arvore_de_Problemas.docx` | `INTERNAL_SYNTHESIS` | Causas, problema central, consequências e cadeia causal a validar. |
| SRC-007 | `03_Modelo_Persona_Dono_da_Viatura.docx` | `INTERNAL_SYNTHESIS` | Persona provisória, dores, ganhos e linguagem do ICP. |
| SRC-008 | `04_Value_Proposition_Canvas_e_Modelo_de_Negocios.docx` | `INTERNAL_SYNTHESIS` | Proposta de valor, modelo híbrido e hipótese de preço. |
| SRC-009 | `Empreendedorismo Social.pdf` | `TRAINING_MATERIAL` | Critérios de relevância, viabilidade, sustentabilidade, impacto e Social Business Canvas. |

## Integridade

- SRC-003 e SRC-004 possuem o mesmo SHA-256 e são a mesma versão lógica.
- Os ficheiros originais permanecem em `evidence/source-materials/` apenas na
  máquina de trabalho e são ignorados pelo Git. Esta pasta versiona a
  proveniência histórica leve, nunca uma especificação normativa.
- A baseline v0.4 não adopta números de mercado, integração, legalidade, NFC ou compatibilidade do BI apenas porque aparecem num documento interno.

## Síntese das implicações

1. O ICP comercial é o dono de uma ou várias viaturas; gestor de frota é utilizador delegado.
2. O JTBD prioritário é verificar a receita digital por viatura e apoiar o acerto diário.
3. Motorista e cobrador precisam de evidência que os proteja, sem vigilância desnecessária.
4. O sistema só verifica pagamentos que passam pela plataforma. Numerário e despesas são declarações separadas.
5. Uma percentagem por transacção contradiz o risco económico de micropagamentos e deve ser testada, não codificada.
6. O impacto esperado é uma hipótese causal. Medem-se primeiro outputs e outcomes com baseline.

## Notas integradas

- `SRC-005-jtbd.md`
- `SRC-006-problem-tree.md`
- `SRC-007-persona-owner.md`
- `SRC-008-vpc-business-model.md`
- `SRC-009-social-entrepreneurship.md`

## Lacunas de evidência

- Entrevistas independentes com donos, motoristas, cobradores e passageiros.
- Processo real de acerto, incluindo regras diferentes por dono ou rota.
- Disposição a pagar por subscrição, aluguer de hardware e fee percentual.
- Custos reais de rail, conectividade, hardware, suporte e cash-in.
- Base legal, segurança e interface oficial do BI.
- Baseline de tempo de acerto, conflitos, percentagem digital e exposição a numerário.
