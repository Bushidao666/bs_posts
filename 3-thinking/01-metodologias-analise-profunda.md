---
guide_id: "metodologias-analise-profunda"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 3-thinking
tags: [metodologias, first-principles, 5-whys, analise-profunda]
---

# 🔬 Metodologias de Análise Profunda

## Introdução

Análise superficial vê sintomas. Análise profunda encontra causas raiz. Este guia apresenta frameworks sistemáticos para análise em múltiplas camadas.

## Framework 1: First Principles (Primeiros Princípios)

**Quando usar:** Problemas complexos onde soluções convencionais falharam.

```mermaid
graph TD
    A[Problema Complexo] --> B[Quebrar em Fundamentos]
    B --> C[Questionar Suposições]
    C --> D[Reconstruir do Zero]
    D --> E[Solução Inovadora]
```

**Exemplo Prático:**

```markdown
Problema: "Sistema de cache está lento"

Análise Convencional:
→ "Adicione mais RAM"

First Principles:
1. Por quê precisamos de cache? → Reduzir latência de DB
2. Por quê DB é lento? → Queries sem índice
3. Por quê não indexar? → Suposição: "índices custam muito"
4. Validar suposição → Teste: índices custam 5% espaço, ganham 10x speed
5. Solução real: Índices estratégicos (não mais cache)
```

## Framework 2: 5 Whys (5 Porquês)

```mermaid
graph LR
    P[Problema] -->|Por quê?| C1[Causa 1]
    C1 -->|Por quê?| C2[Causa 2]
    C2 -->|Por quê?| C3[Causa 3]
    C3 -->|Por quê?| C4[Causa 4]
    C4 -->|Por quê?| R[Causa Raiz]
```

**Template:**
```
Problema: [sintoma observado]
Por quê 1? → [resposta]
Por quê 2? → [resposta]
Por quê 3? → [resposta]
Por quê 4? → [resposta]
Por quê 5? → [causa raiz]
Solução: [atacar causa raiz, não sintoma]
```

## Framework 3: Análise Multi-Perspectiva

```mermaid
mindmap
  root((Problema))
    Dev
      Implementação
      Testes
      Debug
    Arquiteto
      Design
      Escalabilidade
      Trade-offs
    Ops
      Deploy
      Monitoramento
      Custos
    Negócio
      Valor
      ROI
      Timeline
    Usuário
      UX
      Performance
      Confiabilidade
```

**Aplicação:** Analise o mesmo problema de 5 perspectivas diferentes.

## Framework 4: SWOT Técnico

```mermaid
quadrantChart
    title SWOT Técnico
    x-axis Interno --> Externo
    y-axis Negativo --> Positivo
    quadrant-1 Oportunidades
    quadrant-2 Forças
    quadrant-3 Fraquezas
    quadrant-4 Ameaças
    Stack Moderno: [0.7, 0.8]
    Time Experiente: [0.8, 0.7]
    Dívida Técnica: [0.3, 0.2]
    Dependências Antigas: [0.2, 0.3]
    Cloud Native: [0.6, 0.6]
    Competição: [0.4, 0.1]
```

## Combinando Metodologias

```mermaid
flowchart TD
    Start[Problema Complexo] --> A[First Principles]
    A --> B[Identificar Fundamentos]
    B --> C[5 Whys]
    C --> D[Encontrar Causa Raiz]
    D --> E[Multi-Perspectiva]
    E --> F[Validar Solução]
    F --> G[SWOT Técnico]
    G --> H[Avaliar Viabilidade]
    H --> End[Solução Validada]
```

---

**Tags:** #metodologias #first-principles #5-whys #analise-profunda

**Relacionados:**
- [[02-deteccao-padroes-sistematica]]
- [[../4-workflows/01-workflow-analise-problemas]]
