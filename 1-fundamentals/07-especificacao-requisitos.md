---
guide_id: "especificacao-requisitos"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 1-fundamentals
tags: [requisitos, specs, criterios, validacao]
related_guides: ["06-estruturacao-contexto", "../2-engineering/03-checklists-validacoes"]
prerequisites: ["01-o-que-e-prompt-engineering", "06-estruturacao-contexto"]
next_steps: ["../2-engineering/01-design-templates-universais", "../2-engineering/03-checklists-validacoes"]
concepts_defined: ["requisitos-mensuraveis", "definicao-pronto", "criterios-sucesso", "validacao-objetiva"]
concepts_referenced: ["contexto", "objetivo", "refinamento-iterativo"]
---

# 📐 Especificação de Requisitos: Transformando Ideias Vagas em Specs Precisas

## Introdução: O Problema da Vagueza

Imagine pedir a um desenvolvedor:

> "Crie um sistema de autenticação legal e seguro"

O desenvolvedor provavelmente vai perguntar:
- O que é "legal"? (Simples? Moderno? Completo?)
- Quão "seguro"? (2FA? Biometria? Conformidade com qual padrão?)
- Quais features exatamente? (Login? Recuperação de senha? SSO?)

**IA tem o mesmo problema.** Requests vagos geram respostas genéricas.

A solução? **Especificações precisas e mensuráveis.**

Este guia ensina como transformar:
- "Melhore o código" → "Reduza complexidade ciclomática de 20 para <10"
- "Deixe mais rápido" → "Latência p95 deve ser <200ms (atual: 2s)"
- "Implemente autenticação" → [spec completa com 15 requisitos objetivos]

## O Que Torna um Requisito "Bom"?

### Requisito RUIM vs BOM

| Aspecto | ❌ Requisito Ruim | ✅ Requisito Bom |
|---------|-------------------|------------------|
| **Clareza** | "Sistema rápido" | "Latência p95 <200ms para 95% das requests" |
| **Mensurabilidade** | "Código limpo" | "Complexidade ciclomática <10, cobertura >80%" |
| **Acionabilidade** | "Melhore segurança" | "Implemente rate limiting (100 req/min por IP) e SQL injection protection" |
| **Testabilidade** | "Funcione bem" | "Deve passar nos testes: [lista de cenários]" |
| **Completude** | "Autenticação" | "Login com email+senha, JWT (15min), refresh tokens (7 dias), 2FA opcional" |

### Os 5 Critérios de um Bom Requisito

Um requisito bem especificado deve ser:

1. **SMART**
   - **S**pecific (Específico)
   - **M**easurable (Mensurável)
   - **A**chievable (Atingível)
   - **R**elevant (Relevante)
   - **T**ime-bound (Com deadline, quando aplicável)

2. **Unambíguo**
   - Uma única interpretação possível
   - Sem termos vagos ("bom", "rápido", "legal")

3. **Testável**
   - Você consegue validar se foi atendido?
   - Como provar que está completo?

4. **Independente de Implementação**
   - Diz "O QUÊ", não "COMO"
   - "Sistema deve autenticar usuários" ✅
   - "Use JWT com library X" ❌ (muito específico)

5. **Priorizável**
   - Distingue obrigatório vs opcional
   - Must-have vs nice-to-have

---

## Transformando Vagas Ideias em Specs

### Processo de Refinamento

```
IDEIA VAGA
    ↓
PERGUNTA: "O que exatamente?"
    ↓
RESPOSTA INICIAL
    ↓
PERGUNTA: "Como medir?"
    ↓
REQUISITO MENSURÁVEL
    ↓
PERGUNTA: "Como validar?"
    ↓
SPEC COMPLETA
```

### Exemplo Passo a Passo

**IDEIA VAGA:**
> "Preciso de um sistema de cache"

**Refinamento 1: O QUÊ exatamente?**
```
P: Cache para quê? Onde? Por quê?
R: Cache para queries de banco que demoram muito

→ "Implementar cache para otimizar queries lentas"
```

**Refinamento 2: QUANTO?**
```
P: Quais queries? Quão lentas? Quanto deve melhorar?
R: Queries de produtos (search/filter), hoje demoram 2-3s,
   queremos <200ms

→ "Cache de queries de produtos:
   - Queries atuais: 2-3s
   - Target: <200ms (p95)"
```

**Refinamento 3: COMO validar?**
```
P: Como saber se funcionou? Que métricas observar?
R: Medir latência antes/depois, observar hit rate

→ "Critérios de sucesso:
   ✓ Latência p95 <200ms
   ✓ Hit rate >70%
   ✓ Invalidação correta (dados atualizados visíveis em <30s)"
```

**Refinamento 4: CONSTRAINTS?**
```
P: Que tipo de cache? Onde? Limitações?
R: Redis (já temos), não pode usar memória local (Lambda),
   budget para cache = $200/mês

→ "Constraints:
   - Usar Redis existente
   - Funcionar em AWS Lambda (stateless)
   - Cache size: ~10GB (estima 100k produtos × 100KB)
   - Budget: $200/mês"
```

**SPEC FINAL:**
```markdown
## Requisito: Sistema de Cache para Queries de Produtos

### Objetivo
Reduzir latência de queries de busca/filtro de produtos de 2-3s para <200ms.

### Requisitos Funcionais
1. **Cache de Queries:**
   - Cachear resultados de GET /api/products (search, filters)
   - TTL: 5 minutos (dados podem ter leve delay)
   - Invalidação: Ao criar/atualizar/deletar produto

2. **Hit Rate Target:**
   - Mínimo 70% de cache hits
   - Miss: Buscar no DB e popular cache

3. **Invalidação:**
   - Granular (apenas produtos afetados)
   - Propagação: <30s

### Requisitos Não-Funcionais
1. **Performance:**
   - Latência p95: <200ms (cache hit)
   - Latência p95: <3s (cache miss - não pode piorar)
   - Timeout: 5s

2. **Escalabilidade:**
   - Suportar 10k requests/min
   - Cache size: ~10GB

3. **Disponibilidade:**
   - Se Redis cair, sistema funciona (fallback para DB)
   - Degradação graceful, não erro 500

### Constraints
- **Tecnologia:** Redis (cluster existente)
- **Infraestrutura:** AWS Lambda (stateless, não pode cache local)
- **Budget:** $200/mês (custo Redis)
- **Prazo:** Implementar em 2 sprints (4 semanas)

### Critérios de Sucesso
✓ Latência p95 <200ms (validar via APM)
✓ Hit rate >70% (via Redis INFO stats)
✓ Zero downtime durante rollout
✓ Invalidação funciona (teste: atualizar produto, ver em <30s)

### Testes de Validação
1. **Performance Test:**
   - 10k requests simultâneos
   - Validar: p95 <200ms, zero timeouts

2. **Invalidation Test:**
   - UPDATE produto X
   - GET /api/products?id=X em <30s
   - Validar: dados atualizados

3. **Failure Test:**
   - Derrubar Redis
   - Validar: Sistema funciona (mais lento, sem erros)

### Fora do Escopo
❌ Cache de outras entidades (users, orders) - fase futura
❌ Pré-aquecimento de cache - não é prioridade
❌ Cache distribuído cross-region - single region por ora
```

---

## Tipos de Requisitos

### 1. Requisitos Funcionais ⚙️

**O que o sistema DEVE FAZER**

Estrutura:
```
O sistema deve [ACAO] [OBJETO] quando [CONDICAO]
```

**Exemplos:**
```
✅ "Sistema deve autenticar usuário quando credenciais válidas são fornecidas"
✅ "API deve retornar erro 401 quando token JWT expirado"
✅ "Checkout deve validar estoque antes de confirmar pedido"
```

**Antiexemplo:**
```
❌ "Sistema deve ter login"  (vago)
❌ "Deve funcionar bem"  (não mensurável)
```

---

### 2. Requisitos Não-Funcionais 📊

**Como o sistema deve PERFORMAR**

Categorias:
- **Performance:** Latência, throughput, tempo de resposta
- **Escalabilidade:** Quantos usuários/carga suporta
- **Disponibilidade:** Uptime, tolerância a falhas
- **Segurança:** Autenticação, autorização, criptografia
- **Manutenibilidade:** Facilidade de debugar/evoluir
- **Usabilidade:** Facilidade de uso (quando aplicável)

**Exemplos:**
```
✅ Performance: "p95 latency <200ms sob 1000 req/s"
✅ Escalabilidade: "Suportar 10k usuários simultâneos sem degradação"
✅ Disponibilidade: "99.9% uptime (max 43min downtime/mês)"
✅ Segurança: "Senhas hasheadas com bcrypt (cost 12), rate limiting 100 req/min"
```

**Antiexemplo:**
```
❌ "Deve ser rápido"  (não mensurável)
❌ "Precisa escalar"  (não quantificado)
❌ "Tem que ser seguro"  (vago)
```

---

### 3. Constraints (Restrições) 🚧

**O que NÃO PODE ser mudado**

Categorias:
- **Tecnológicas:** Stack, linguagens, frameworks
- **Infraestrutura:** Cloud provider, servidores
- **Organizacionais:** Time, skills, processos
- **Legais:** Compliance, regulamentações, licenças
- **Orçamentárias:** Budget, tempo, recursos

**Exemplos:**
```
✅ "Deve usar PostgreSQL (não pode migrar para NoSQL)"
✅ "Não pode ter downtime (sistema 24/7)"
✅ "Conformidade GDPR obrigatória"
✅ "Budget: max $500/mês"
✅ "Time: 2 devs junior + 1 senior, 3 semanas"
```

---

### 4. Critérios de Sucesso ✅

**Como VALIDAR que requisito foi atendido**

Estrutura:
```
✓ [MÉTRICA] [OPERADOR] [VALOR] validado via [MÉTODO]
```

**Exemplos:**
```
✅ "Latência p95 <200ms validado via load test com 10k requests"
✅ "Cobertura de testes >80% validado via coverage report"
✅ "Zero vulnerabilidades HIGH/CRITICAL validado via security scan"
✅ "100% dos casos de teste passando validado via CI/CD"
```

**Antiexemplo:**
```
❌ "Sistema funciona"  (como provar?)
❌ "Está melhor"  (melhor que o quê? Quanto?)
```

---

## Definição de "Pronto" (Definition of Done)

Para cada requisito, defina **quando ele está completo**.

### Template de DoD

```markdown
## Definição de Pronto: [Nome do Requisito]

### Implementação
- [ ] Código implementado e revisado
- [ ] Tratamento de erros completo
- [ ] Logging adequado (info, error)
- [ ] Documentação inline (comentários)

### Testes
- [ ] Testes unitários (cobertura >80%)
- [ ] Testes de integração (cenários principais)
- [ ] Testes de edge cases ([listar casos])
- [ ] Testes de performance (se aplicável)

### Qualidade
- [ ] Code review aprovado (2+ aprovações)
- [ ] Linter passou (zero warnings)
- [ ] Security scan passou (zero HIGH/CRITICAL)
- [ ] Complexidade <10 (ou justificada)

### Validação
- [ ] Testado em ambiente de staging
- [ ] Métricas validadas: [listar]
- [ ] Casos de teste executados manualmente: [listar]

### Documentação
- [ ] README atualizado (se necessário)
- [ ] API docs atualizado (Swagger/OpenAPI)
- [ ] Runbook atualizado (operação)

### Deploy
- [ ] Feature flag implementada (se aplicável)
- [ ] Rollback plan documentado
- [ ] Stakeholders comunicados
```

### Exemplo Específico

```markdown
## DoD: Implementar Cache de Produtos

### Implementação
- [ ] `CacheService` implementado com Redis client
- [ ] Middleware de cache em `GET /api/products`
- [ ] Invalidação em `POST/PUT/DELETE /api/products`
- [ ] Tratamento de erro quando Redis indisponível (fallback para DB)
- [ ] Logging: cache hit/miss, invalidações

### Testes
- [ ] Unit tests: CacheService (get, set, invalidate, fallback)
- [ ] Integration tests: endpoint com cache enabled
- [ ] Edge cases: Redis down, TTL expiration, concurrent requests
- [ ] Performance test: 10k requests, validar p95 <200ms

### Qualidade
- [ ] Code review por @senior-dev
- [ ] ESLint passou
- [ ] Security: validar input (prevent cache poisoning)

### Validação
- [ ] Staging: Hit rate >70% em 24h de uso real
- [ ] Latência p95 <200ms (via Datadog)
- [ ] Teste manual: atualizar produto, verificar cache em <30s

### Documentação
- [ ] Adicionar seção "Caching Strategy" no README
- [ ] Runbook: "Como invalidar cache manualmente"

### Deploy
- [ ] Feature flag `CACHE_ENABLED` (default false)
- [ ] Rollback: desabilitar flag
- [ ] Comunicado para time de ops (monitorar Redis)
```

---

## Priorizando Requisitos: MoSCoW

Nem tudo é igualmente importante. Use **MoSCoW**:

- **Must Have** - Obrigatório (sem isso, não funciona)
- **Should Have** - Importante (mas pode lançar sem)
- **Could Have** - Desejável (nice-to-have)
- **Won't Have** - Não faremos (agora ou nunca)

### Exemplo

```markdown
## Feature: Sistema de Autenticação

### Must Have
- [ ] Login com email + senha
- [ ] JWT com expiração (15min)
- [ ] Refresh tokens (7 dias)
- [ ] Logout
- [ ] Rate limiting (prevent brute force)

### Should Have
- [ ] Recuperação de senha via email
- [ ] 2FA (TOTP)
- [ ] Remember me (30 dias)

### Could Have
- [ ] Login com Google/GitHub (OAuth)
- [ ] Autenticação biométrica
- [ ] Login passwordless (magic link)

### Won't Have (Esta Fase)
- [ ] Login com face recognition
- [ ] Multi-tenancy SSO
- [ ] Hardware token (Yubikey)
```

**Benefício:** Clareza de prioridade, facilita negociação de escopo.

---

## Técnicas de Especificação

### Técnica 1: User Stories (Formato Ágil)

```
Como [PERSONA],
Eu quero [ACAO],
Para [BENEFICIO]

Critérios de aceitação:
- [Cenário 1]
- [Cenário 2]
- [Cenário 3]
```

**Exemplo:**
```
Como usuário final,
Eu quero fazer login com email e senha,
Para acessar minha conta de forma segura

Critérios de aceitação:
- Dado que forneço credenciais válidas, devo ser autenticado e receber JWT
- Dado que forneço senha incorreta, devo receber erro 401 "Invalid credentials"
- Dado que forneço email não cadastrado, devo receber erro 404 "User not found"
- Dado que tento login 5+ vezes com senha errada, devo ser bloqueado por 15min
```

---

### Técnica 2: BDD (Behavior-Driven Development)

```
Feature: [Nome da Feature]

Scenario: [Cenário específico]
  Given [contexto/pré-condição]
  When [ação]
  Then [resultado esperado]
```

**Exemplo:**
```
Feature: Autenticação de Usuário

Scenario: Login bem-sucedido
  Given um usuário cadastrado com email "user@example.com" e senha "securePass123"
  When envio POST /api/login com {"email": "user@example.com", "password": "securePass123"}
  Then recebo status 200
  And recebo um JWT válido no body
  And o JWT contém userId e expira em 15 minutos

Scenario: Login com senha incorreta
  Given um usuário cadastrado com email "user@example.com"
  When envio POST /api/login com senha incorreta
  Then recebo status 401
  And recebo mensagem "Invalid credentials"
  And não recebo JWT
```

---

### Técnica 3: Specification by Example

Forneça **exemplos concretos** de input/output esperado.

**Exemplo:**
```markdown
## Requisito: Validação de Email

### Deve Aceitar
```
test@example.com          ✅
user+tag@domain.co.uk     ✅
name.surname@company.com  ✅
```

### Deve Rejeitar
```
@example.com              ❌ (sem local part)
test@                     ❌ (sem domain)
test @example.com         ❌ (espaço)
test@domain               ❌ (sem TLD)
```

### Edge Cases
```
test+filter@domain.com    ✅ (+ é válido em emails)
test..double@domain.com   ❌ (.. consecutivos inválidos)
"test"@domain.com         ✅ (quoted string é válido RFC 5322)
```
```

---

## Checklist de Requisitos Bem Especificados

Antes de considerar um requisito "pronto", valide:

### Clareza
- [ ] Requisito pode ser entendido por alguém fora do projeto?
- [ ] Não há ambiguidade (uma única interpretação)?
- [ ] Termos técnicos estão definidos/documentados?

### Mensurabilidade
- [ ] Há métricas objetivas?
- [ ] Posso medir se foi atendido?
- [ ] Valores numéricos quando aplicável? (latência, throughput, etc)

### Completude
- [ ] Requisitos funcionais cobrem todos casos de uso?
- [ ] Requisitos não-funcionais definidos?
- [ ] Constraints explícitas?
- [ ] Critérios de sucesso claros?

### Testabilidade
- [ ] Posso escrever testes automatizados?
- [ ] Posso validar manualmente?
- [ ] Casos de sucesso E falha definidos?
- [ ] Edge cases identificados?

### Viabilidade
- [ ] É tecnicamente possível implementar?
- [ ] Está dentro das constraints (tempo, budget, skills)?
- [ ] Não contradiz outros requisitos?

### Prioridade
- [ ] Classificado (Must/Should/Could/Won't)?
- [ ] Dependências identificadas?
- [ ] Ordem de implementação clara?

---

## Antipadrões de Requisitos

### 🚫 Antipadrão 1: Requisito de Implementação

```
❌ "Usar biblioteca X para JWT"
❌ "Implementar padrão Observer com events"
```

**Problema:** Muito específico, amarra implementação.

**Solução:** Especifique o "O QUÊ", não o "COMO":
```
✅ "Sistema deve gerar tokens de autenticação com expiração"
✅ "Componentes devem reagir a mudanças de estado sem acoplamento direto"
```

---

### 🚫 Antipadrão 2: Requisito Vago

```
❌ "Sistema deve ser performático"
❌ "Código deve ser de qualidade"
```

**Solução:** Quantifique:
```
✅ "Latência p95 <200ms para 95% das requests"
✅ "Complexidade ciclomática <10, cobertura de testes >80%"
```

---

### 🚫 Antipadrão 3: Requisito Impossível de Validar

```
❌ "Sistema deve ser fácil de usar"
❌ "Código deve ser elegante"
```

**Solução:** Defina métricas proxy:
```
✅ "90% dos usuários completam onboarding em <5 minutos (medido via analytics)"
✅ "Código segue style guide do projeto (validado via linter)"
```

---

### 🚫 Antipadrão 4: Requisito "Oculto" em Constraints

```
❌ "Usar PostgreSQL" (parece constraint mas é requisito funcional escondido)
```

**Problema:** Mistura constraint com requisito.

**Solução:** Separe:
```
Requisito: "Sistema deve persistir dados de forma relacional"
Constraint: "Usar PostgreSQL (já temos infraestrutura)"
```

---

## Próximos Passos

Domine especificação de requisitos e explore:

- **[../2-engineering/01-design-templates-universais.md]** - Capture specs em templates reutilizáveis
- **[../2-engineering/03-checklists-validacoes.md]** - Crie checklists de validação automática
- **[../4-workflows/01-workflow-analise-problemas.md]** - Processo completo de análise → specs → implementação

## 🌱 Reflexão Final

Especificação de requisitos é como **desenhar o mapa antes da viagem**:
- Sem mapa, você se perde
- Com mapa vago, pode acabar no lugar errado
- Com mapa detalhado, chega onde quer eficientemente

**Invista tempo em specs claras**. Cada hora especificando economiza 10 horas debugando código que resolve o problema errado.

**Comece hoje:**
1. Pegue um feature request vago do seu backlog
2. Aplique o processo de refinamento deste guia
3. Crie spec completa (requisitos + critérios + DoD)
4. Compare: implementar com vs sem spec detalhada

A diferença em qualidade e velocidade será drástica.

---

**Tags:** #requisitos #specs #validacao #criterios #DoD

**Relacionados:**
- [[06-estruturacao-contexto]] - Como organizar informações de contexto
- [[../2-engineering/03-checklists-validacoes]] - Validação sistemática
- [[../4-workflows/01-workflow-analise-problemas]] - De problema a requisitos
- [[../5-meta/03-documentacao-aprendizados]] - Documente padrões de requisitos
