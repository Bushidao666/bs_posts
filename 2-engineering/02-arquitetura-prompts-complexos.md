---
guide_id: "arquitetura-prompts-complexos"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 2-engineering
tags: [arquitetura, complexidade, estrutura, navegabilidade, prompts-longos]
related_guides: ["01-design-templates-universais", "03-checklists-validacoes"]
prerequisites: ["../1-fundamentals/06-estruturacao-contexto", "01-design-templates-universais"]
next_steps: ["03-checklists-validacoes", "../3-thinking/01-metodologias-analise-profunda"]
concepts_defined: ["arquitetura-prompt", "secoes-obrigatorias", "hierarquia-informacao", "navegabilidade-prompt"]
concepts_referenced: ["estruturacao-contexto", "template-universal", "placeholders"]
---

# 🏛️ Arquitetura de Prompts Complexos: Estruturando Outputs de 80+ Páginas

## Introdução: Quando Prompts Simples Não Bastam

Você dominou prompts básicos. Mas e quando precisa de uma **auditoria técnica completa de 80 páginas**? Ou um **plano de refatoração com 15 fases** detalhadas? Ou uma **análise arquitetural profunda com diagramas, código e decisões**?

Prompts complexos exigem **arquitetura** - não apenas "escrever mais".

Imagine construir um arranha-céu. Você não empilha tijolos aleatoriamente - você precisa de:
- **Fundação sólida** (contexto e objetivo)
- **Estrutura hierárquica** (seções, subseções)
- **Navegabilidade** (índices, referências cruzadas)
- **Módulos independentes** (cada seção se sustenta)
- **Integração coesa** (tudo trabalha junto)

Este guia ensina como **arquitetar prompts que geram outputs complexos, organizados e navegáveis**.

## O Que Torna um Prompt "Complexo"?

### Métricas de Complexidade

| Aspecto | Prompt Simples | Prompt Complexo |
|---------|----------------|-----------------|
| **Tamanho do Output** | <5 páginas | 20-100+ páginas |
| **Seções** | 1-3 | 10-50+ |
| **Hierarquia** | 1-2 níveis | 4-6 níveis |
| **Interconexões** | Poucas | Muitas (seções referenciam outras) |
| **Formatos** | Texto | Texto + Tabelas + Diagramas + Código |
| **Tempo de Execução** | <2 min | 10-30+ min |

### Quando Você Precisa de Arquitetura?

✅ **Auditoria técnica completa** (código, infraestrutura, segurança)
✅ **Planos de implementação multi-fase** (6+ fases, dependências)
✅ **Documentação técnica profunda** (API, arquitetura, decisões)
✅ **Análise de problemas complexos** (múltiplas causas raiz, soluções)
✅ **Design de sistemas** (arquitetura, trade-offs, roadmap)

❌ **Code review simples** (use prompt estruturado, não arquitetura)
❌ **Implementação de feature única** (prompt direto resolve)
❌ **Bug fix pontual** (contexto + código + pedido)

---

## Princípios de Arquitetura de Prompts

### Princípio 1: **Hierarquia Clara** 🌳

Organize informação em **árvore** (não lista plana).

```
PROMPT COMPLEXO
│
├── 1. CONTEXTO GLOBAL
│   ├── 1.1 Situação Atual
│   ├── 1.2 Objetivo
│   └── 1.3 Constraints
│
├── 2. SEÇÃO PRINCIPAL A
│   ├── 2.1 Análise
│   ├── 2.2 Problemas Identificados
│   └── 2.3 Soluções Propostas
│
├── 3. SEÇÃO PRINCIPAL B
│   ├── 3.1 Design
│   ├── 3.2 Implementação
│   └── 3.3 Validação
│
└── 4. SÍNTESE & PRÓXIMOS PASSOS
    ├── 4.1 Resumo Executivo
    ├── 4.2 Roadmap
    └── 4.3 Riscos
```

**Benefício:** Fácil de navegar, entender estrutura, encontrar informação.

---

### Princípio 2: **Seções Obrigatórias vs Opcionais** ✅

Defina claramente o que é **must-have** e **nice-to-have**.

```markdown
## SEÇÕES OBRIGATÓRIAS (IA DEVE incluir):
✓ 1. Contexto e Objetivo
✓ 2. Análise do Problema
✓ 3. Solução Proposta
✓ 4. Critérios de Validação
✓ 5. Próximos Passos

## SEÇÕES OPCIONAIS (IA pode incluir SE relevante):
⚬ A. Análise de Alternativas (se múltiplas soluções viáveis)
⚬ B. Benchmarks (se performance crítica)
⚬ C. Plano de Migração (se mudança grande)
```

**Benefício:** Output completo (não falta nada crítico), mas não verboso (sem enchimento).

---

### Princípio 3: **Navegabilidade** 🧭

Outputs longos precisam de **índice**, **links internos**, **resumos**.

```markdown
# ÍNDICE
1. [Executive Summary](#executive-summary)
2. [Análise Profunda](#analise-profunda)
   2.1. [Problemas de Segurança](#seguranca)
   2.2. [Problemas de Performance](#performance)
3. [Soluções Propostas](#solucoes)
4. [Roadmap de Implementação](#roadmap)

═══════════════════════════════════════════════════════════

# Executive Summary
[Resumo de 2 parágrafos]
→ Veja detalhes em [Análise Profunda](#analise-profunda)

═══════════════════════════════════════════════════════════

# Análise Profunda

## Problemas de Segurança {#seguranca}
[Análise detalhada]
→ Soluções em [Seção 3.1](#solucoes-seguranca)
```

**Benefício:** Leitor (humano ou IA em retrieval) encontra informação rapidamente.

---

### Princípio 4: **Modularidade** 🧩

Cada seção deve ser **independente** (pode ser lida/entendida sozinha).

**❌ Seção Dependente:**
```markdown
## 3. Solução
Como mencionado antes, vamos usar Redis.
[Não explica POR QUÊ Redis, assume que leitor leu tudo antes]
```

**✅ Seção Modular:**
```markdown
## 3. Solução: Cache com Redis

**Contexto:** Queries de produtos demoram 2-3s (ver Seção 2.1).

**Proposta:** Implementar cache distribuído com Redis.

**Por quê Redis:**
- Já temos infraestrutura (ver Seção 1.2: Stack Atual)
- Suporta 10k+ ops/s (ver Seção 1.3: Requisitos)
- Time tem experiência (constraint)

**Implementação:** [detalhes]
```

**Benefício:** Leitor pode pular para qualquer seção e entender.

---

### Princípio 5: **Progressão Lógica** ➡️

Ordem das seções deve seguir **fluxo natural de pensamento**.

**Padrões comuns:**

1. **Análise → Design → Implementação**
   ```
   1. O que está errado? (Análise)
   2. Como resolver? (Design)
   3. Como implementar? (Código/Plano)
   ```

2. **Contexto → Problema → Solução → Validação**
   ```
   1. Onde estamos? (Contexto)
   2. Qual o problema? (Análise)
   3. Como resolver? (Solução)
   4. Como validar? (Testes)
   ```

3. **Executive Summary → Detalhes → Conclusão**
   ```
   1. TL;DR (Resumo)
   2. Análise profunda (Detalhes)
   3. Roadmap e próximos passos (Ação)
   ```

---

## Arquitetura de Prompt: Template Completo

### Template: Auditoria Técnica Profunda (80+ Páginas)

```markdown
═══════════════════════════════════════════════════════════
PROMPT: AUDITORIA_TECNICA_PROFUNDA_V3
═══════════════════════════════════════════════════════════

Você é um [ROLE_SENIOR:arquiteto_de_software_tech_lead_principal_engineer]
com [ANOS_EXP:10+] anos de experiência em [DOMINIO:sistemas_distribuidos_fintech_cloud].

OBJETIVO DESTA AUDITORIA:
Produzir análise técnica COMPLETA e PROFUNDA de [SISTEMA_ALVO] para
identificar gaps, riscos e oportunidades de melhoria.

AUDIÊNCIA:
- [AUDIENCIA_PRIMARY:ex_CTO_VP_Engineering]
- [AUDIENCIA_SECONDARY:ex_time_de_devs_stakeholders]

PROFUNDIDADE:
[NIVEL:superficial_moderada_profunda_exaustiva]

═══════════════════════════════════════════════════════════
CONTEXTO DO SISTEMA
═══════════════════════════════════════════════════════════

## 1.1. Stack Tecnológico
[STACK_DETALHADO]
- Backend: [linguagens, frameworks, versões]
- Database: [tipo, versão, topologia]
- Infraestrutura: [cloud, containers, orquestração]
- Observabilidade: [logs, métricas, alertas]

## 1.2. Escala e Criticidade
[METRICAS]
- Usuários: [ativos, pico]
- Transações: [volume/dia, tipos]
- Dados: [tamanho, crescimento]
- SLA: [uptime, latência]
- Criticidade: [BAIXA|MEDIA|ALTA|CRITICA]

## 1.3. Contexto de Negócio
[NEGOCIO]
- Domínio: [fintech, e-commerce, saas, etc]
- Fase: [mvp, crescimento, maduro, legado]
- Regulação: [compliance, certificações]

═══════════════════════════════════════════════════════════
ESTRUTURA DO OUTPUT (80-100 páginas)
═══════════════════════════════════════════════════════════

Gere documento markdown estruturado seguindo EXATAMENTE esta arquitetura:

┌─────────────────────────────────────────────────────────┐
│ PARTE 0: NAVEGAÇÃO (2 páginas)                         │
├─────────────────────────────────────────────────────────┤
│ • Índice completo (com anchors)                         │
│ • Como usar este documento                              │
│ • Glossário de termos técnicos                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PARTE 1: EXECUTIVE SUMMARY (3-5 páginas)               │
├─────────────────────────────────────────────────────────┤
│ 1.1. Overview do Sistema (1 página)                    │
│ 1.2. Principais Achados (1 página)                     │
│      • Top 5 Problemas Críticos                         │
│      • Top 3 Oportunidades                              │
│ 1.3. Recomendações Prioritárias (1 página)             │
│      • Curto prazo (1-3 meses)                          │
│      • Médio prazo (3-6 meses)                          │
│      • Longo prazo (6-12 meses)                         │
│ 1.4. Estimativa de Esforço (1 página)                  │
│      • Timeline                                          │
│      • Recursos necessários                             │
│      • Riscos se não agir                               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PARTE 2: ANÁLISE PROFUNDA (40-50 páginas)              │
├─────────────────────────────────────────────────────────┤
│ 2.1. ARQUITETURA (10 páginas)                          │
│      • Diagrama current state (Mermaid/ASCII)           │
│      • Componentes e responsabilidades                  │
│      • Fluxos principais (happy path + edge cases)      │
│      • Decisões arquiteturais (ADRs inferidos)          │
│      • Gaps identificados                               │
│                                                          │
│ 2.2. SEGURANÇA (10 páginas)                            │
│      • Modelo de ameaças                                │
│      • Vulnerabilidades identificadas (OWASP Top 10)    │
│      • Análise de autenticação/autorização              │
│      • Dados sensíveis (criptografia, masking)          │
│      • Compliance (GDPR, PCI-DSS, etc)                  │
│      • Matriz de risco: [vuln] → [impacto] → [mitigação]│
│                                                          │
│ 2.3. PERFORMANCE (10 páginas)                          │
│      • Bottlenecks identificados                        │
│      • Análise de queries (N+1, full table scan)        │
│      • Caching strategy (atual vs ideal)                │
│      • Escalabilidade horizontal/vertical               │
│      • Load testing scenarios                           │
│      • Projeções de crescimento                         │
│                                                          │
│ 2.4. OBSERVABILIDADE (5 páginas)                       │
│      • Logs (estrutura, cobertura, retenção)            │
│      • Métricas (RED, USE, custom)                      │
│      • Alertas (cobertura, ruído)                       │
│      • Distributed tracing                              │
│      • Gaps: pontos cegos                               │
│                                                          │
│ 2.5. QUALIDADE DE CÓDIGO (10 páginas)                  │
│      • Análise estática (complexidade, duplicação)      │
│      • Cobertura de testes (unitários, integração)      │
│      • Padrões e anti-patterns identificados            │
│      • Dívida técnica quantificada                      │
│      • Manutenibilidade score                           │
│                                                          │
│ 2.6. INFRAESTRUTURA & DEVOPS (5 páginas)               │
│      • Topologia atual (diagrama)                       │
│      • CI/CD pipeline (maturidade)                      │
│      • Deploy strategy (blue/green, canary?)            │
│      • Disaster recovery (RTO, RPO)                     │
│      • Custos (breakdown, otimizações possíveis)        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PARTE 3: SOLUÇÕES PROPOSTAS (20-25 páginas)            │
├─────────────────────────────────────────────────────────┤
│ Para CADA problema CRITICAL/HIGH da Parte 2:            │
│                                                          │
│ 3.X. [NOME_DO_PROBLEMA]                                │
│      • Contexto: Por que é problema? Impacto?           │
│      • Solução Proposta: Abordagem técnica              │
│      • Alternativas Consideradas: X vs Y vs Z           │
│      • Trade-offs: O que ganhamos/perdemos              │
│      • Implementação: Passos, código exemplo            │
│      • Validação: Como testar, métricas de sucesso      │
│      • Esforço: Tempo, recursos, dependências           │
│      • Prioridade: [P0-P3]                              │
│                                                          │
│ [Repetir para cada problema identificado]               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PARTE 4: ROADMAP DE IMPLEMENTAÇÃO (10 páginas)         │
├─────────────────────────────────────────────────────────┤
│ 4.1. Fases de Implementação                            │
│      • Fase 1 (Foundational): [1-3 meses]               │
│        - Quick wins (alto impacto, baixo esforço)       │
│        - Problemas críticos (blockers)                  │
│      • Fase 2 (Improvements): [3-6 meses]               │
│        - Refatorações arquiteturais                     │
│        - Performance optimizations                      │
│      • Fase 3 (Advanced): [6-12 meses]                  │
│        - Features avançadas                             │
│        - Modernização completa                          │
│                                                          │
│ 4.2. Matriz de Dependências                            │
│      [Tabela: Task A depende de B, C]                   │
│                                                          │
│ 4.3. Alocação de Recursos                              │
│      [Timeline com alocação de devs]                    │
│                                                          │
│ 4.4. Pontos de Decisão (Go/No-Go)                      │
│      [Checkpoints para avaliar progresso]               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PARTE 5: ANEXOS (5-10 páginas)                         │
├─────────────────────────────────────────────────────────┤
│ A. Código de Exemplo (refatorações propostas)          │
│ B. Queries SQL Otimizadas                              │
│ C. Configurações (nginx, k8s, etc)                     │
│ D. Scripts de Automação                                │
│ E. Checklist de Validação                              │
│ F. Referências (docs, papers, best practices)          │
└─────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════
INSTRUÇÕES DE FORMATTING
═══════════════════════════════════════════════════════════

## Markdown Guidelines:
✓ Use headers: # (parte), ## (seção), ### (subseção), #### (detalhe)
✓ Caixas de destaque com `═══` para separar partes principais
✓ Listas numeradas para sequências, bullet points para items
✓ Tabelas markdown para comparações/matrizes
✓ Code blocks com syntax highlighting (```language)
✓ Diagramas em Mermaid ou ASCII art
✓ Links internos com anchors: [texto](#secao)

## Navegabilidade:
✓ Índice completo no início com links clicáveis
✓ Ao fim de cada seção: "→ Próxima: [Seção X]"
✓ Cross-references: "Ver Seção Y para detalhes"
✓ Resumos no início de seções longas (>3 páginas)

## Profundidade:
✓ Seja ESPECÍFICO (cite linhas, funções, arquivos)
✓ Quantifique (não "lento", mas "p95: 3s, target: <500ms")
✓ Justifique decisões (não "use X", mas "use X porque Y vs Z")
✓ Dê exemplos concretos (código, configs, comandos)

═══════════════════════════════════════════════════════════
CRITÉRIOS DE QUALIDADE
═══════════════════════════════════════════════════════════

✓ **Completude:** Todas seções obrigatórias presentes?
✓ **Profundidade:** Análise vai além do superficial?
✓ **Acionabilidade:** Recomendações são implementáveis?
✓ **Priorização:** Claro o que fazer primeiro?
✓ **Navegabilidade:** Fácil encontrar informação?
✓ **Validação:** Métricas de sucesso definidas?
✓ **Realismo:** Esforços/timelines factíveis?

═══════════════════════════════════════════════════════════
CÓDIGO/DADOS DO SISTEMA
═══════════════════════════════════════════════════════════

[CODIGO_BASE]
[Arquivos principais, configs, schemas, etc]

[LOGS_METRICAS]
[Evidências de problemas, se disponíveis]

[DOCS_EXISTENTES]
[READMEs, ADRs, diagramas, se houver]

═══════════════════════════════════════════════════════════
COMECE A AUDITORIA AGORA
═══════════════════════════════════════════════════════════

Você tem contexto completo. Gere documento seguindo EXATAMENTE
a estrutura acima. Seja profundo, específico e acionável.

**IMPORTANTE:**
- NÃO pule seções obrigatórias
- NÃO seja genérico ou superficial
- CITE evidências (linhas de código, métricas)
- PRIORIZE problemas (não todos têm mesma importância)
- JUSTIFIQUE recomendações (por quê X em vez de Y?)
```

---

## Técnicas de Gestão de Complexidade

### Técnica 1: **Chunking (Quebra em Chunks)**

Para outputs muito longos (100+ páginas), quebre em múltiplos prompts encadeados.

```markdown
## Prompt 1: Análise (gera Parte 2)
[Contexto + instrução para analisar]

## Prompt 2: Soluções (usa output do Prompt 1, gera Parte 3)
"Baseado na análise anterior: [resumo]
Agora proponha soluções detalhadas para top 10 problemas..."

## Prompt 3: Roadmap (usa outputs 1+2, gera Parte 4)
"Baseado em [análise] e [soluções propostas],
crie roadmap de implementação..."
```

**Benefício:** Evita context window limits, mantém foco.

---

### Técnica 2: **Camadas de Abstração**

Ofereça múltiplos níveis de profundidade.

```markdown
## Nível 1: Executive Summary (para CTO)
[3 páginas, alto nível, decisões estratégicas]

## Nível 2: Análise Técnica (para Arquiteto)
[20 páginas, decisões arquiteturais, trade-offs]

## Nível 3: Detalhes de Implementação (para Devs)
[50 páginas, código, configs, step-by-step]

## Nível 4: Anexos (para referência)
[Code samples, benchmarks, links]
```

**Instrução no prompt:**
```
"Estruture em 4 níveis de profundidade crescente.
Leitor deve poder parar no nível que atende suas necessidades."
```

---

### Técnica 3: **Templates de Seção Reutilizáveis**

Crie **sub-templates** para seções recorrentes.

```markdown
## Template: ANÁLISE_DE_PROBLEMA

### [NOME_DO_PROBLEMA]

#### Descrição
[O que é? Por que é problema?]

#### Evidências
- [Evidência 1: logs, métricas, código]
- [Evidência 2]
- [Evidência 3]

#### Impacto
- **Usuários:** [Como afeta UX]
- **Negócio:** [Custo, perda de receita]
- **Time:** [Dívida técnica, produtividade]

#### Severidade
[CRITICAL | HIGH | MEDIUM | LOW]
Justificativa: [por quê essa classificação]

#### Causa Raiz
[Análise 5-porquês ou RCA]

#### Solução Proposta
[Abordagem técnica]

#### Esforço Estimado
[Tempo, recursos, dependências]

#### Próximos Passos
1. [Ação 1]
2. [Ação 2]
```

**Uso no prompt principal:**
```
"Para cada problema identificado, use template ANÁLISE_DE_PROBLEMA."
```

**Benefício:** Consistência, completude, fácil comparação entre problemas.

---

### Técnica 4: **Validação de Estrutura**

Adicione checklist para IA validar própria output.

```markdown
═══════════════════════════════════════════════════════════
VALIDAÇÃO FINAL (IA: EXECUTE ANTES DE ENTREGAR)
═══════════════════════════════════════════════════════════

Antes de retornar documento, valide:

✓ Índice completo com anchors funcionais?
✓ Todas seções obrigatórias presentes?
✓ Cada problema tem: descrição + evidência + solução + esforço?
✓ Roadmap tem dependências claras?
✓ Códigos têm syntax highlighting?
✓ Diagramas estão legíveis?
✓ Cross-references corretas (não quebradas)?
✓ Profundidade adequada (não superficial)?
✓ Acionável (devs conseguem implementar)?
✓ Priorizado (clear o que fazer primeiro)?

Se qualquer item falhar, CORRIJA antes de entregar.
```

---

## Antipadrões de Prompts Complexos

### 🚫 Antipadrão 1: Wall of Text

```markdown
❌ "Analise este sistema e me dê um relatório completo
   com tudo que encontrar de problemas e sugestões
   e roadmap e código..."
   [1 parágrafo gigante, sem estrutura]
```

**Problema:** IA gera output desorganizado, difícil de usar.

**Solução:** Arquitetura clara com seções definidas.

---

### 🚫 Antipadrão 2: Lista Plana de 50 Itens

```markdown
❌ "Analise considerando:
   1. Segurança
   2. Performance
   3. Escalabilidade
   [... 50 items sem hierarquia]"
```

**Problema:** Não fica claro prioridades, relações.

**Solução:** Hierarquia (grupos, seções, prioridades).

---

### 🚫 Antipadrão 3: Sem Navegação

```markdown
❌ [Documento de 80 páginas sem índice, sem anchors, sem resumos]
```

**Problema:** Impossível encontrar informação específica.

**Solução:** Índice + anchors + cross-references + resumos.

---

### 🚫 Antipadrão 4: Promessa Sem Estrutura

```markdown
❌ "Gere documento de auditoria completo"
   [Não define o que "completo" significa]
```

**Problema:** IA decide estrutura (pode não ser o que você quer).

**Solução:** Defina estrutura EXATAMENTE no prompt.

---

## Checklist de Prompt Complexo Bem Arquitetado

✓ **Estrutura:**
  - [ ] Hierarquia clara (3-5 níveis)?
  - [ ] Seções obrigatórias definidas?
  - [ ] Progressão lógica?

✓ **Navegabilidade:**
  - [ ] Índice com anchors?
  - [ ] Cross-references?
  - [ ] Resumos em seções longas?

✓ **Modularidade:**
  - [ ] Seções independentes (contexto próprio)?
  - [ ] Sub-templates reutilizáveis?

✓ **Acionabilidade:**
  - [ ] Output é implementável?
  - [ ] Prioridades claras?
  - [ ] Métricas de validação?

✓ **Qualidade:**
  - [ ] Profundidade adequada (não superficial)?
  - [ ] Específico (evidências, números)?
  - [ ] Justificado (trade-offs, raciocínio)?

✓ **Validação:**
  - [ ] Checklist de auto-validação para IA?
  - [ ] Testado em 2+ casos reais?

---

## Próximos Passos

Domine arquitetura de prompts complexos e explore:

- **[03-checklists-validacoes.md]** - Valide estrutura e qualidade sistematicamente
- **[../3-thinking/01-metodologias-analise-profunda.md]** - Metodologias para análise em múltiplas camadas
- **[../4-workflows/01-workflow-analise-problemas.md]** - Aplique arquitetura em workflows reais

## 🌱 Reflexão Final

Arquitetura de prompts complexos é como **projetar um livro técnico**:
- Estrutura clara (capítulos, seções)
- Navegável (índice, glossário, referências)
- Modular (cada capítulo se sustenta)
- Profundo mas acionável

**Invista tempo na arquitetura ANTES de executar o prompt.** Cada hora arquitetando economiza 10 horas reorganizando output desorganizado.

**Comece hoje:**
1. Pegue um problema complexo real (ex: auditoria de código)
2. Desenhe arquitetura do output desejado (seções, hierarquia)
3. Crie prompt estruturado seguindo princípios deste guia
4. Execute e valide qualidade da estrutura
5. Refine arquitetura baseado no resultado

Em 3 iterações, você terá template sólido para reuso.

---

**Tags:** #arquitetura #complexidade #estrutura #navegabilidade #outputs-longos

**Relacionados:**
- [[01-design-templates-universais]] - Templates que incorporam arquitetura
- [[03-checklists-validacoes]] - Validação de estrutura e qualidade
- [[../3-thinking/01-metodologias-analise-profunda]] - Frameworks de análise profunda
- [[../4-workflows/02-biblioteca-workflows]] - Workflows estruturados
