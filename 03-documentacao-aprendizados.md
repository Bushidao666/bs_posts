---
guide_id: "documentacao-aprendizados"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 5-meta
tags: [documentacao, conhecimento, aprendizado]
---

# 📝 Documentação de Aprendizados

## Sistema de Captura

```mermaid
flowchart LR
    A[Experiência] --> B{Tipo}
    B -->|Insight| C[Notebook]
    B -->|Pattern| D[Pattern Library]
    B -->|Template| E[Template Repo]
    B -->|Metodologia| F[Methodology Docs]
    
    C --> G[Review Semanal]
    D --> G
    E --> G
    F --> G
    
    G --> H[Consolidar]
    H --> I[Knowledge Base]
```

## Template: Documentar Padrão

```markdown
# Pattern: [Nome]

**ID:** PATTERN-XXX
**Categoria:** [Code/Architecture/Process]
**Data:** [YYYY-MM-DD]

## Contexto
[Quando/onde aparece]

## Problema
[O que está errado]

## Solução
[Como resolver]

```[language]
// Código exemplo
```

## Consequências
✅ Benefícios: [lista]
❌ Trade-offs: [lista]

## Exemplos Reais
- Projeto A: [link]
- Projeto B: [link]

## Tags
#pattern #[categoria] #[tecnologia]
```

## Organização do Conhecimento

```
knowledge-base/
├── patterns/
│   ├── code/
│   ├── architecture/
│   └── process/
├── templates/
│   ├── analysis/
│   ├── design/
│   └── documentation/
├── methodologies/
│   ├── custom/
│   └── adapted/
└── learnings/
    ├── 2024/
    └── 2025/
```

---

**Tags:** #documentacao #conhecimento #organizacao
