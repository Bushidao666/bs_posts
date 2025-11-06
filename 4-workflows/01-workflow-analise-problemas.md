---
guide_id: "workflow-analise-problemas"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 4-workflows
tags: [workflow, analise, diagnostico, rca]
---

# 🔍 Workflow: Análise de Problemas

## Visão Geral do Workflow

```mermaid
stateDiagram-v2
    [*] --> Coleta
    Coleta --> Analise: Dados suficientes
    Analise --> Diagnostico: Padrões identificados
    Diagnostico --> Priorizacao: Causas raiz encontradas
    Priorizacao --> Plano: Prioridades definidas
    Plano --> [*]
    
    Analise --> Coleta: Dados insuficientes
```

## Passo 1: Coleta de Evidências

```markdown
### Template: Coleta de Dados

**Sintomas Observados:**
- [Comportamento anormal]
- [Frequência: sempre/intermitente]
- [Quando começou]

**Logs Relevantes:**
```
[logs aqui]
```

**Métricas:**
- Latência: [valor]
- Error rate: [valor]
- Throughput: [valor]

**Código Suspeito:**
```[language]
[código]
```
```

## Passo 2: Análise Multi-Camada

```mermaid
graph TD
    A[Problema] --> B[Layer 1: Sintomas]
    B --> C[Layer 2: Estrutura]
    C --> D[Layer 3: Causa]
    D --> E[Layer 4: Contexto]
    
    B --> B1[O que está quebrado?]
    C --> C1[Como está implementado?]
    D --> D1[Por que está assim?]
    E --> E1[Contexto histórico/sistêmico]
```

## Passo 3: Root Cause Analysis

Use 5 Whys + First Principles:

```markdown
**5 Whys:**
Problema: [sintoma]
Por quê 1? → [causa 1]
Por quê 2? → [causa 2]
Por quê 3? → [causa 3]
Por quê 4? → [causa 4]
Por quê 5? → [CAUSA RAIZ]

**First Principles:**
- Suposição identificada: [X]
- Validação: [como testar]
- Resultado: [válida ou inválida]
```

## Passo 4: Priorização

```mermaid
quadrantChart
    title Matriz de Priorização
    x-axis Baixo Esforço --> Alto Esforço
    y-axis Baixo Impacto --> Alto Impacto
    quadrant-1 Planejar
    quadrant-2 FAZER JÁ
    quadrant-3 Ignorar
    quadrant-4 Quick Wins
    Bug Crítico: [0.2, 0.9]
    Performance: [0.7, 0.8]
    Refatoração: [0.8, 0.3]
    Code Smell: [0.3, 0.2]
```

## Passo 5: Plano de Ação

```markdown
### Output Final: Plano de Ação

**Problema Identificado:** [nome]
**Causa Raiz:** [descrição]
**Prioridade:** [P0-P3]

**Soluções (Ordenadas):**
1. **[Solução 1]** - P0
   - Ação: [o que fazer]
   - Esforço: [tempo]
   - Impacto: [esperado]
   - Owner: [quem]

2. **[Solução 2]** - P1
   [...]

**Métricas de Sucesso:**
- [ ] [Métrica 1] atingida
- [ ] [Métrica 2] atingida

**Riscos:**
- Risco 1: [descrição + mitigação]
```

---

**Tags:** #workflow #analise #rca #diagnostico

**Relacionados:**
- [[../3-thinking/01-metodologias-analise-profunda]]
- [[02-workflow-design-solucoes]]
