---
guide_id: "templates-reutilizaveis"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 2-engineering
tags: [templates, reusability, productivity, DRY]
related_guides: ["../1-fundamentals/02-tipos-de-prompts", "02-composicao-de-prompts"]
prerequisites: ["../1-fundamentals/01-o-que-e-prompt-engineering", "../1-fundamentals/02-tipos-de-prompts"]
next_steps: ["02-composicao-de-prompts"]
concepts_defined: ["template-base", "placeholders", "versioning-templates", "template-library"]
concepts_referenced: ["tipos-prompts", "contexto", "role-playing"]
---

# 🔧 Templates Reutilizáveis: Nunca Mais Escreva o Mesmo Prompt Duas Vezes

## Introdução: O Problema da Repetição

Imagine que você trabalha como desenvolvedor backend e, toda semana, precisa:
- Revisar código de PRs
- Criar documentação de APIs
- Debugar erros de produção
- Implementar novas features
- Otimizar queries lentas

Se toda vez você escrever um prompt do zero, está **desperdiçando 80% do seu tempo** reinventando a roda.

É como se um chef profissional não tivesse receitas - cada vez que fosse fazer um bolo, teria que descobrir do zero as proporções, temperatura, tempo...

**Templates resolvem isso.**

## O Que é um Template de Prompt?

Um template é um **prompt pré-estruturado** com **placeholders** (espaços em branco) que você preenche conforme o contexto específico.

Pense em templates como:
- **Formulários** - estrutura fixa, você preenche os campos
- **Mad Libs** - texto com lacunas para completar
- **Receitas** - passos fixos, ingredientes variáveis

### Anatomia de um Template

```
┌─────────────────────────────────────┐
│ [PARTE FIXA] - Sempre igual         │  ← Role, instruções gerais
├─────────────────────────────────────┤
│ [PLACEHOLDER_1] - Você preenche     │  ← Contexto específico
│ [PLACEHOLDER_2] - Você preenche     │  ← Task específica
├─────────────────────────────────────┤
│ [PARTE FIXA] - Sempre igual         │  ← Formato de saída
└─────────────────────────────────────┘
```

## Por Que Templates Funcionam?

### 1. **Economizam Tempo** ⏱️
- Escrever template: 10-15 minutos (uma vez)
- Usar template: 1-2 minutos (sempre)
- Se você usa 10+ vezes, economizou horas

### 2. **Garantem Consistência** 🎯
- Sempre inclui partes importantes
- Não esquece contexto crítico
- Resultados previsíveis

### 3. **Facilitam Evolução** 📈
- Melhorias no template beneficiam todos os usos futuros
- Versionamento claro
- Aprendizado capturado

### 4. **Reduzem Carga Cognitiva** 🧠
- Não precisa pensar "como formular isso?"
- Foca no problema, não na estrutura do prompt
- Libera energia mental para o que importa

## Template vs Prompt Ad-Hoc: Comparação

### ❌ Prompt Ad-Hoc (Toda Vez do Zero)

```
"Revise este código"
[código]

Resultado: Resposta genérica, inconsistente
Tempo: 5-10 minutos pensando no prompt
```

### ✅ Template Reutilizável

```
TEMPLATE_CODE_REVIEW_V2:

Você é um tech lead experiente revisando PR antes de merge.

CONTEXTO:
- Projeto: [PROJETO]
- Stack: [STACK]
- Criticidade: [CRITICIDADE]

CÓDIGO:
[CODIGO]

REVISE CONSIDERANDO:
✓ Segurança (vulnerabilidades, validações)
✓ Performance (queries N+1, loops desnecessários)
✓ Manutenibilidade (nomes, complexidade, duplicação)
✓ Testes (cobertura, casos edge)

FORMATO:
1. Score geral (1-10)
2. Problemas críticos (blockers)
3. Sugestões de melhoria (nice-to-have)
4. Código refatorado (se aplicável)
```

**Resultado:** Análise profunda, consistente, acionável
**Tempo:** 1 minuto (preencher placeholders)

## Como Criar Bons Templates

### Princípio 1: **Capture o Padrão, Não o Detalhe**

**❌ Template Específico Demais:**
```
Você é um desenvolvedor Node.js especializado em Express
que trabalha no projeto de e-commerce da empresa X...
```
**Problema:** Só serve para esse projeto específico.

**✅ Template Genérico o Suficiente:**
```
Você é um desenvolvedor [LINGUAGEM] especializado em [FRAMEWORK]
que trabalha em [TIPO_PROJETO]...
```
**Benefício:** Serve para múltiplos projetos.

---

### Princípio 2: **Placeholders Claros e Autodescritivos**

**❌ Placeholders Vagos:**
```
Role: [X]
Contexto: [Y]
Task: [Z]
```
**Problema:** Não fica claro o que preencher.

**✅ Placeholders Descritivos:**
```
Role: [ESPECIALIDADE_TECNICA - ex: DBA PostgreSQL, Arquiteto de Microservices]
Contexto: [STACK_ATUAL + INFRAESTRUTURA + CONSTRAINTS]
Task: [ACAO_ESPECIFICA + CRITERIOS_SUCESSO]
```
**Benefício:** Autoexplicativo, reduz erros.

---

### Princípio 3: **Inclua Instruções de Uso**

Todo template deve começar com:
```markdown
## TEMPLATE: [Nome]
**Quando usar:** [Situações aplicáveis]
**Não usar para:** [Situações onde não funciona]
**Tempo de preenchimento:** ~X minutos
**Última atualização:** YYYY-MM-DD (v1.2)

## Placeholders:
- [PLACEHOLDER_1]: Descrição, exemplo
- [PLACEHOLDER_2]: Descrição, exemplo

## Exemplo de uso:
[Exemplo preenchido]
```

---

### Princípio 4: **Versione e Itere**

Templates não nascem perfeitos. Evolua-os:

```
v1.0 (2024-01-15): Versão inicial
v1.1 (2024-02-10): Adicionado contexto de infraestrutura
v1.2 (2024-03-05): Melhorado formato de saída (tabela → lista)
v2.0 (2024-04-20): Refatorado para suportar múltiplas linguagens
```

**Dica:** Use o próprio template 10+ vezes antes de considerar "estável".

---

## Biblioteca de Templates Prontos

### 📝 Template 1: Code Review Completo

```markdown
═══════════════════════════════════════════════════════════
TEMPLATE: CODE_REVIEW_V2
Quando usar: Review de PRs, análise de código legado
Tempo: ~2min
═══════════════════════════════════════════════════════════

Você é um [ROLE - ex: Tech Lead, Security Engineer, Performance Specialist]
com foco em [DOMINIO - ex: backend APIs, frontend React, infra DevOps].

CONTEXTO DO PROJETO:
- Projeto: [NOME_PROJETO]
- Stack: [TECNOLOGIAS]
- Escala: [USUARIOS/CARGA]
- Criticidade: [BAIXA/MEDIA/ALTA/CRITICA]

CÓDIGO A REVISAR:
[CODIGO]

REVISE FOCANDO EM:
✓ [ASPECTO_1 - ex: Segurança]
✓ [ASPECTO_2 - ex: Performance]
✓ [ASPECTO_3 - ex: Manutenibilidade]
[OPCIONAL: Adicione aspectos específicos]

FORMATO DE SAÍDA:
1. **Score Geral:** X/10 com justificativa
2. **Blockers:** Problemas que impedem merge
3. **Sugestões:** Melhorias recomendadas (prioridade alta → baixa)
4. **Código Refatorado:** Se houver problemas críticos

INSTRUÇÕES EXTRAS:
- Seja construtivo (foco em educar, não criticar)
- Sugira alternativas específicas
- Cite documentação/boas práticas quando relevante
```

**Exemplo de uso preenchido:**
```markdown
Você é um Tech Lead com foco em backend APIs.

CONTEXTO DO PROJETO:
- Projeto: API de Pagamentos (fintech)
- Stack: Node.js 18, Express, PostgreSQL, Redis
- Escala: 50k transações/dia, pico de 200 req/s
- Criticidade: CRÍTICA (dinheiro envolvido)

CÓDIGO A REVISAR:
[código do endpoint de checkout]

REVISE FOCANDO EM:
✓ Segurança (SQL injection, validação de input)
✓ Integridade de dados (transações, rollback)
✓ Observabilidade (logs, métricas)

[resto igual ao template]
```

---

### 🐛 Template 2: Debugging Sistemático

```markdown
═══════════════════════════════════════════════════════════
TEMPLATE: DEBUG_SISTEMATICO_V1
Quando usar: Bugs intermitentes, erros de produção
Tempo: ~3min
═══════════════════════════════════════════════════════════

Você é um engenheiro sênior especializado em debugging
de sistemas [TIPO_SISTEMA - ex: distribuídos, monolíticos, serverless].

SINTOMAS DO BUG:
- Comportamento observado: [DESCRICAO]
- Frequência: [SEMPRE/INTERMITENTE] ([X]% das vezes)
- Quando começou: [DATA/EVENTO]
- Ambiente: [DEV/STAGING/PROD]

COMPORTAMENTO ESPERADO:
[O_QUE_DEVERIA_ACONTECER]

CÓDIGO RELEVANTE:
[CODIGO]

CONTEXTO TÉCNICO:
- Stack: [TECNOLOGIAS]
- Infraestrutura: [ONDE_RODA]
- Dependências: [SERVICOS_EXTERNOS]
- Carga atual: [METRICAS]

LOGS/ERROS:
```
[LOGS_RELEVANTES]
```

ANÁLISE NECESSÁRIA:
1. **Causa Raiz:** Qual é o problema fundamental?
2. **Por Que Intermitente?** Se aplicável (race condition? cache? rede?)
3. **Reprodução:** Como simular em ambiente controlado?
4. **Solução:** Fix específico com código
5. **Prevenção:** Como evitar problemas similares? (testes, validações)

FORMATO:
- Seja metódico (tipo debugging científico)
- Considere múltiplas hipóteses
- Explique o raciocínio (não só a resposta)
```

---

### 📚 Template 3: Documentação de API

```markdown
═══════════════════════════════════════════════════════════
TEMPLATE: DOC_API_REST_V1
Quando usar: Documentar endpoints REST para desenvolvedores
Tempo: ~2min
═══════════════════════════════════════════════════════════

Você é um technical writer especializado em documentação de APIs.

API A DOCUMENTAR:
[CODIGO_DO_ENDPOINT]

CONTEXTO:
- Framework: [FRAMEWORK]
- Autenticação: [TIPO - ex: JWT, API Key, OAuth]
- Rate Limit: [LIMITE]
- Audiência: [DEVS_INTERNOS/EXTERNOS]

DOCUMENTE SEGUINDO FORMATO:

### [METODO] /caminho/do/endpoint
[Descrição de 1-2 linhas do que faz]

**Autenticação:** [Sim/Não] ([tipo])

**Headers:**
| Header | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| Authorization | string | Sim | Bearer token |

**Query Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição | Exemplo |
|-----------|------|-------------|-----------|---------|

**Body:**
```json
{
  "campo": "tipo (descrição)"
}
```

**Response 200 (Success):**
```json
{
  "campo": "valor exemplo"
}
```

**Response 4XX/5XX (Errors):**
| Código | Descrição | Quando acontece |
|--------|-----------|-----------------|
| 400 | Bad Request | Validação falhou |
| 401 | Unauthorized | Token inválido |

**Exemplo com curl:**
```bash
curl -X [METODO] \
  '[URL]' \
  -H 'Authorization: Bearer TOKEN' \
  -d '[BODY]'
```

**Notas:**
- [CONSIDERACOES_IMPORTANTES]
```

---

### ⚡ Template 4: Otimização de Performance

```markdown
═══════════════════════════════════════════════════════════
TEMPLATE: OTIMIZACAO_PERFORMANCE_V1
Quando usar: Código lento, queries demoradas, bottlenecks
Tempo: ~3min
═══════════════════════════════════════════════════════════

Você é um engenheiro de performance especializado em [DOMINIO - ex: backend, frontend, DB].

PROBLEMA:
[CODIGO_OU_OPERACAO] está demorando [TEMPO_ATUAL] mas deveria ser < [TEMPO_ALVO].

CONTEXTO:
- Linguagem/Framework: [STACK]
- Escala: [VOLUME_DADOS/USUARIOS]
- Ambiente: [HARDWARE/CLOUD]
- Profiling feito? [SIM/NAO] (se sim, anexar)

CÓDIGO/QUERY ATUAL:
[CODIGO]

METRICAS ATUAIS:
- Tempo médio: [VALOR]
- P95: [VALOR]
- P99: [VALOR]
- Throughput: [VALOR]

ANALISE E OTIMIZE:
1. **Bottleneck Identificado:** Qual é o gargalo principal?
2. **Explicação:** Por que é lento? (O(n²)? Query sem índice? I/O bloqueante?)
3. **Solução Otimizada:** Código melhorado com justificativa
4. **Ganho Esperado:** Estimativa de melhoria (X vezes mais rápido)
5. **Trade-offs:** O que estamos sacrificando? (memória? complexidade?)
6. **Validação:** Como medir se melhorou? (benchmark, profiling)

NÃO OTIMIZE:
- Partes que já são O(1) ou suficientemente rápidas
- Micro-otimizações irrelevantes (<5% ganho)
```

---

### 🏗️ Template 5: Design de Arquitetura

```markdown
═══════════════════════════════════════════════════════════
TEMPLATE: DESIGN_ARQUITETURA_V2
Quando usar: Novos sistemas, refatoração arquitetural
Tempo: ~5min
═══════════════════════════════════════════════════════════

Você é um arquiteto de software com [X] anos de experiência
em [DOMINIO - ex: e-commerce, fintech, SaaS B2B].

REQUISITOS DO SISTEMA:
**Funcionais:**
- [FEATURE_1]
- [FEATURE_2]
- [FEATURE_3]

**Não-Funcionais:**
- Escala: [USUARIOS/CARGA]
- Disponibilidade: [SLA - ex: 99.9%]
- Latência: [TARGET - ex: p95 < 200ms]
- Segurança: [COMPLIANCE - ex: PCI-DSS, GDPR]

CONSTRAINTS:
- Budget: [VALOR/MES]
- Time: [TAMANHO_SKILL]
- Prazo: [TIMELINE]
- Stack atual: [TECNOLOGIAS_JA_USADAS]

DESENHE ARQUITETURA:
1. **Diagrama de Componentes** (ASCII art ou Mermaid)
2. **Stack Tecnológico** (com justificativas - por que X em vez de Y?)
3. **Principais Decisões Arquiteturais** (monolito vs micro? SQL vs NoSQL?)
4. **Pontos de Integração** (APIs, mensageria, etc)
5. **Estratégia de Deploy** (cloud, on-premise, híbrido)
6. **Observabilidade** (logs, métricas, alertas)
7. **Plano de Implementação** (fases, ordem, dependências)
8. **Riscos Técnicos** (o que pode dar errado? mitigações?)

FORMATO:
- Use diagramas sempre que possível
- Justifique escolhas técnicas (não só "porque é legal")
- Considere trade-offs explicitamente
- Pense em operação (como deployar? como debugar?)
```

---

## Sistema de Placeholders: Convenções

Para manter consistência, use este padrão:

### Sintaxe de Placeholder

```
[CATEGORIA_DESCRICAO]
```

**Exemplos:**
- `[STACK]` - genérico
- `[STACK_BACKEND]` - específico
- `[STACK_FRONTEND_FRAMEWORK]` - muito específico

### Categorias Comuns

| Categoria | Uso | Exemplo |
|-----------|-----|---------|
| `[ROLE_*]` | Especialidade técnica | `[ROLE_DBA_POSTGRESQL]` |
| `[STACK_*]` | Tecnologias | `[STACK_BACKEND]`, `[STACK_DB]` |
| `[PROJETO_*]` | Contexto de projeto | `[PROJETO_NOME]`, `[PROJETO_ESCALA]` |
| `[CODIGO_*]` | Código a analisar | `[CODIGO_ENDPOINT]`, `[CODIGO_QUERY]` |
| `[OBJETIVO_*]` | Meta/resultado | `[OBJETIVO_PERFORMANCE]` |
| `[FORMATO_*]` | Estrutura de saída | `[FORMATO_MARKDOWN]`, `[FORMATO_JSON]` |

### Placeholders Opcionais

Use `[OPCIONAL: ...]` para partes não obrigatórias:

```
ANALISE:
✓ Segurança
✓ Performance
[OPCIONAL: Adicione aspectos extras - ex: acessibilidade, SEO]
```

---

## Organizando Sua Biblioteca de Templates

### Estrutura de Diretórios Recomendada

```
templates/
├── README.md (índice de todos templates)
├── code-review/
│   ├── template-review-geral-v2.md
│   ├── template-review-seguranca-v1.md
│   └── template-review-performance-v1.md
├── debugging/
│   ├── template-debug-sistematico-v1.md
│   └── template-debug-producao-v1.md
├── documentation/
│   ├── template-doc-api-rest-v1.md
│   └── template-doc-arquitetura-v1.md
├── implementation/
│   ├── template-feature-nova-v1.md
│   └── template-refatoracao-v1.md
└── architecture/
    ├── template-design-sistema-v2.md
    └── template-design-microservice-v1.md
```

### Metadados no Template

Cada template deve ter:

```markdown
---
template_id: "code-review-geral"
version: "2.0"
created: "2024-01-15"
updated: "2024-04-20"
author: "Seu Nome"
category: "code-review"
tags: ["review", "quality", "backend"]
uses: 47  # quantas vezes foi usado
rating: 4.8/5.0  # feedback dos usuários
---
```

---

## Como Evoluir Templates

### 1. **Capture Feedback em Uso Real**

Sempre que usar um template, anote:
- ✅ O que funcionou bem
- ❌ O que faltou
- 💡 Ideias de melhoria

```markdown
## CHANGELOG:
2024-04-20 (v2.0):
- ADDED: Campo para contexto de infraestrutura
- CHANGED: Formato de saída (tabela → lista bullet)
- REMOVED: Seção "Histórico" (raramente preenchida)
- FIX: Placeholder [STACK] estava ambíguo, dividido em [STACK_BACKEND] e [STACK_FRONTEND]

2024-02-10 (v1.1):
- ADDED: Exemplo de uso preenchido
- FIX: Instruções mais claras para [ROLE]
```

### 2. **Versione Semanticamente**

```
MAJOR.MINOR.PATCH

MAJOR: Mudanças que quebram compatibilidade (placeholders removidos/renomeados)
MINOR: Adições (novos placeholders, seções extras)
PATCH: Correções (clareza, typos, exemplos)
```

**Exemplo:**
- v1.0 → v1.1: Adicionado campo opcional (minor)
- v1.1 → v2.0: Renomeado [STACK] para [STACK_BACKEND] (major - quebra)
- v2.0 → v2.0.1: Corrigido exemplo (patch)

### 3. **Teste Antes de Promover**

```
draft → beta → stable

draft: Primeira versão, use internamente
beta: Funciona bem, compartilhe com time pequeno
stable: Testado 20+ vezes, documentado, pronto para uso geral
```

### 4. **Deprecação Gradual**

Não delete templates antigos abruptamente:

```markdown
## ⚠️ DEPRECATED
Este template foi substituído por `template-code-review-v2.md`.

**Motivo:** Nova versão tem melhor estrutura de saída e mais contexto.

**Migração:** [Link para guia de migração]

**Sunset date:** 2024-12-31 (após esta data, será removido)
```

---

## Antipadrões de Templates

### 🚫 Antipadrão 1: Template Monolítico

```markdown
❌ TEMPLATE_FAZ_TUDO_V1:
[1000 linhas cobrindo review + debug + doc + arquitetura...]
```

**Problema:** Difícil de usar, manter, evoluir.

**Solução:** Templates pequenos e específicos.

---

### 🚫 Antipadrão 2: Placeholder Sem Descrição

```markdown
❌ [X]
❌ [CONTEXTO]
❌ [INFO]
```

**Problema:** Ninguém sabe o que preencher.

**Solução:** `[CONTEXTO_STACK_E_INFRA]` com exemplo.

---

### 🚫 Antipadrão 3: Nunca Atualizar

```markdown
❌ Template criado em 2020, nunca revisado, cheio de práticas antigas
```

**Problema:** Template vira legado, ninguém usa.

**Solução:** Review trimestral, capture feedback.

---

### 🚫 Antipadrão 4: Zero Exemplos

```markdown
❌ Template com placeholders mas sem exemplo preenchido
```

**Problema:** Usuário não entende como usar.

**Solução:** Sempre inclua "Exemplo de Uso".

---

## Checklist de Qualidade de Template

Antes de considerar um template "pronto":

✓ **Clareza:**
  - Placeholders são autodescritivos?
  - Instruções são claras?
  - Há exemplo de uso?

✓ **Completude:**
  - Cobre todos aspectos necessários?
  - Formato de saída está definido?
  - Critérios de sucesso estão claros?

✓ **Flexibilidade:**
  - Serve para múltiplos contextos?
  - Não é específico demais?
  - Tem placeholders opcionais para casos especiais?

✓ **Manutenibilidade:**
  - Versionado?
  - Changelog documentado?
  - Metadados completos?

✓ **Usabilidade:**
  - Tempo de preenchimento < 5 minutos?
  - Reduz trabalho vs escrever do zero?
  - Você usaria este template?

---

## Métricas de Sucesso

Como saber se seus templates estão funcionando?

### Métricas Quantitativas

1. **Taxa de Uso:** Quantas vezes é usado por semana?
2. **Tempo Economizado:** (Tempo sem template - Tempo com template) × Usos
3. **Taxa de Adoção:** % do time que usa regularmente
4. **Versões:** Templates que evoluem são úteis

### Métricas Qualitativas

1. **Feedback:** O que as pessoas dizem?
2. **Contribuições:** Pessoas sugerem melhorias?
3. **Forks:** Templates são adaptados para novos contextos?

**Meta:** Um bom template é usado 20+ vezes e evolui baseado em feedback real.

---

## Próximos Passos

Agora que você domina templates:

- **[02-composicao-de-prompts.md]** - Combine múltiplos templates
- **[03-chains-e-sequencias.md]** - Crie workflows com templates encadeados
- **[../4-workflows/]** - Veja templates aplicados em workflows completos

## 🌱 Reflexão Final

Templates são como ferramentas especializadas. Você não precisa de 100 templates - precisa dos **certos** para seu domínio.

**Comece hoje:**
1. Identifique 1 tarefa que você faz toda semana
2. Documente como você faz (vire template)
3. Use 5+ vezes, refine conforme necessário
4. Compartilhe com seu time

Em 3 meses, você terá uma biblioteca que economiza horas por semana.

---

**Tags:** #templates #reusability #productivity #DRY #engineering

**Relacionados:**
- [[../1-fundamentals/02-tipos-de-prompts]] - Base para categorizar templates
- [[02-composicao-de-prompts]] - Como combinar templates
- [[../4-workflows/02-biblioteca-workflows]] - Templates em ação
- [[../PATTERN-LIBRARY]] - Catálogo completo de templates
