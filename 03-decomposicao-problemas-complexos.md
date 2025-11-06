---
guide_id: "decomposicao-problemas-complexos"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 3-thinking
tags: [decomposicao, divide-conquer, dependency-mapping, critical-path]
---

# 🧩 Decomposição de Problemas Complexos

## Introdução

Problemas complexos paralisam. Decomposição torna o impossível possível. Este guia ensina frameworks de quebra sistemática.

## Técnica 1: Divide & Conquer

```mermaid
graph TD
    A[Problema Grande] --> B[Subproblema 1]
    A --> C[Subproblema 2]
    A --> D[Subproblema 3]
    
    B --> B1[Tarefa 1.1]
    B --> B2[Tarefa 1.2]
    
    C --> C1[Tarefa 2.1]
    C --> C2[Tarefa 2.2]
    
    D --> D1[Tarefa 3.1]
    D --> D2[Tarefa 3.2]
    
    style A fill:#f9f,stroke:#333
    style B1 fill:#bfb,stroke:#333
    style B2 fill:#bfb,stroke:#333
    style C1 fill:#bfb,stroke:#333
    style C2 fill:#bfb,stroke:#333
    style D1 fill:#bfb,stroke:#333
    style D2 fill:#bfb,stroke:#333
```

**Exemplo:**

```markdown
Problema: Refatorar sistema legado de 100k linhas

Decomposição:
├── 1. Análise (2 semanas)
│   ├── 1.1 Mapear dependências
│   ├── 1.2 Identificar módulos
│   └── 1.3 Priorizar por risco
├── 2. Infraestrutura (3 semanas)
│   ├── 2.1 Setup CI/CD
│   ├── 2.2 Testes de integração
│   └── 2.3 Feature flags
└── 3. Refatoração Incremental (12 semanas)
    ├── 3.1 Módulo Auth (3 sem)
    ├── 3.2 Módulo Payment (4 sem)
    └── 3.3 Módulo Reports (5 sem)
```

## Técnica 2: Dependency Mapping

```mermaid
graph LR
    A[Task A] --> C[Task C]
    A --> D[Task D]
    B[Task B] --> D
    B --> E[Task E]
    C --> F[Task F]
    D --> F
    E --> F
    
    style A fill:#90EE90
    style B fill:#90EE90
    style F fill:#FFB6C1
```

**Legenda:**
- Verde: Pode começar imediatamente (sem dependências)
- Branco: Depende de outros
- Rosa: Task final (depende de tudo)

## Técnica 3: Critical Path Method

```mermaid
gantt
    title Critical Path Analysis
    dateFormat  YYYY-MM-DD
    section Critical Path
    Setup Infra           :crit, a1, 2024-01-01, 2w
    Refactor Auth        :crit, a2, after a1, 3w
    Deploy to Prod       :crit, a3, after a2, 1w
    
    section Parallel Tasks
    Write Tests          :b1, 2024-01-01, 4w
    Update Docs          :b2, 2024-01-15, 2w
```

**Caminho crítico:** Setup → Refactor → Deploy (6 semanas)
**Paralelizável:** Tests, Docs (economiza tempo)

## Técnica 4: Work Breakdown Structure (WBS)

```mermaid
mindmap
  root((Migração Cloud))
    Preparação
      Análise Custos
      Escolha Provider
      Training Time
    Infraestrutura
      Setup VPC
      Configurar K8s
      CI/CD Pipeline
    Migração Dados
      Backup
      Transfer
      Validação
    Aplicação
      Containerização
      Deploy Blue/Green
      Rollback Plan
    Pós-Deploy
      Monitoring
      Otimização
      Documentação
```

## Template de Decomposição

```markdown
# Problema: [Nome do Problema Grande]

## 1. Análise Inicial
- Tamanho estimado: [X semanas/meses]
- Complexidade: [Alta/Média/Baixa]
- Risco: [Alto/Médio/Baixo]

## 2. Decomposição (3-5 níveis)
```
[WBS aqui]
```

## 3. Dependency Map
```
[Diagrama de dependências]
```

## 4. Critical Path
```
[Gantt chart]
```

## 5. Fases de Execução
- Fase 1: [Quick Wins - 2 semanas]
- Fase 2: [Foundation - 4 semanas]
- Fase 3: [Core - 8 semanas]
- Fase 4: [Polish - 2 semanas]

## 6. Checkpoints
- Checkpoint 1 (Semana 2): [Critério de sucesso]
- Checkpoint 2 (Semana 6): [Critério de sucesso]
- Checkpoint 3 (Semana 14): [Critério de sucesso]
```

## Quando Problema é "Complexo Demais"?

```mermaid
flowchart TD
    A[Problema] --> B{Estimativa?}
    B -->|>3 meses| C[COMPLEXO]
    B -->|<3 meses| D{Dependências?}
    
    D -->|>5 times| C
    D -->|<5| E{Incerteza?}
    
    E -->|Alta| C
    E -->|Baixa| F[GERENCIÁVEL]
    
    C --> G[Decompor Mais]
    F --> H[Executar]
```

---

**Tags:** #decomposicao #divide-conquer #critical-path #wbs

**Relacionados:**
- [[01-metodologias-analise-profunda]]
- [[../4-workflows/01-workflow-analise-problemas]]
