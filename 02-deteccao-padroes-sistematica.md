---
guide_id: "deteccao-padroes-sistematica"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 3-thinking
tags: [padroes, anti-patterns, pattern-recognition, heuristics]
---

# 🔍 Detecção de Padrões Sistemática

## Introdução

Reconhecer padrões = Resolver problemas 10x mais rápido. Este guia ensina como detectar patterns e anti-patterns sistematicamente.

## Tipos de Padrões

```mermaid
graph TD
    P[Padrões] --> D[Design Patterns]
    P --> A[Anti-Patterns]
    P --> Arq[Arquiteturais]
    P --> C[Code Smells]
    
    D --> D1[Singleton]
    D --> D2[Factory]
    D --> D3[Observer]
    
    A --> A1[God Object]
    A --> A2[Spaghetti Code]
    A --> A3[Copy-Paste]
    
    Arq --> Arq1[Microservices]
    Arq --> Arq2[Event-Driven]
    Arq --> Arq3[Layered]
    
    C --> C1[Long Method]
    C --> C2[Large Class]
    C --> C3[Duplicação]
```

## Anti-Patterns Comuns

### 1. God Object (Objeto Deus)

**Sintomas:**
- Classe com 1000+ linhas
- 50+ métodos
- Múltiplas responsabilidades

**Detecção:**
```bash
# Encontrar classes gigantes
find . -name "*.js" -exec wc -l {} \; | sort -rn | head -10
```

**Solução:** Single Responsibility Principle

### 2. Query N+1

```mermaid
sequenceDiagram
    participant App
    participant DB
    
    Note over App,DB: ❌ Anti-Pattern (N+1)
    App->>DB: SELECT * FROM users
    loop Para cada user
        App->>DB: SELECT * FROM orders WHERE user_id = ?
    end
    
    Note over App,DB: ✅ Pattern Correto (JOIN)
    App->>DB: SELECT u.*, o.* FROM users u LEFT JOIN orders o
```

### 3. Callback Hell

```javascript
// ❌ Anti-Pattern
getData(function(a){
  getMoreData(a, function(b){
    getEvenMore(b, function(c){ 
      // ...hell
    });
  });
});

// ✅ Pattern Correto
const a = await getData();
const b = await getMoreData(a);
const c = await getEvenMore(b);
```

## Framework de Detecção

```mermaid
flowchart LR
    A[Código] --> B{Métricas}
    B -->|Complexidade| C[>10?]
    B -->|Duplicação| D[>5%?]
    B -->|Tamanho| E[>200 linhas?]
    
    C -->|Sim| F[Anti-Pattern Detectado]
    D -->|Sim| F
    E -->|Sim| F
    
    F --> G[Catalogar]
    G --> H[Priorizar]
    H --> I[Refatorar]
```

## Heurísticas de Detecção

| Heurística | Threshold | Ferramenta |
|------------|-----------|------------|
| Complexidade Ciclomática | >10 | ESLint, SonarQube |
| Duplicação de Código | >5% | PMD, CPD |
| Tamanho de Função | >50 linhas | Custom script |
| Profundidade de Herança | >4 níveis | Metrics tool |
| Acoplamento | >10 dependências | Dependency graph |

## Checklist de Padrões

```markdown
## Code Review Pattern Detection

- [ ] God Objects? (classes >500 linhas)
- [ ] Long Methods? (funções >50 linhas)
- [ ] Duplicação? (DRY violado)
- [ ] Query N+1? (loops com DB calls)
- [ ] Callback Hell? (pyramids of doom)
- [ ] Magic Numbers? (hardcoded values)
- [ ] Dead Code? (unused functions)
```

---

**Tags:** #patterns #anti-patterns #detection #heuristics

**Relacionados:**
- [[01-metodologias-analise-profunda]]
- [[03-decomposicao-problemas-complexos]]
- [[../5-meta/03-documentacao-aprendizados]]
