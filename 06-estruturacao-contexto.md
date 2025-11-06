---
guide_id: "estruturacao-contexto"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 1-fundamentals
tags: [contexto, estrutura, informacao, signal-noise]
related_guides: ["03-contexto-e-role-playing", "05-ciclo-de-trabalho-com-ia"]
prerequisites: ["01-o-que-e-prompt-engineering", "03-contexto-e-role-playing"]
next_steps: ["07-especificacao-requisitos", "../2-engineering/01-templates-reutilizaveis"]
concepts_defined: ["contexto-minimo-viavel", "progressao-detalhes", "signal-to-noise", "contexto-estruturado"]
concepts_referenced: ["contexto", "placeholders", "role-playing"]
---

# 📋 Estruturação de Contexto: A Arte de Fornecer a Informação Certa

## Introdução: O Dilema do Contexto

Imagine que você ligou para o suporte técnico e disse:

> **Opção A:** "Não funciona."

> **Opção B:** [10 minutos de histórico detalhado sobre tudo que você já fez no computador nos últimos 6 meses]

> **Opção C:** "Não consigo fazer login no sistema X. Navegador Chrome versão 120, erro 'invalid credentials' mesmo com senha correta, começou hoje após atualização."

**Qual atendente conseguiria te ajudar melhor?**

Com IA é a mesma coisa:
- **Contexto insuficiente** → Resposta genérica, inútil
- **Contexto excessivo** → IA se perde, foca no errado
- **Contexto estruturado** → Resposta precisa, acion

ável

Este guia ensina como fornecer **contexto na medida certa, estruturado de forma eficiente**.

## O Conceito de "Contexto Mínimo Viável" (CMV)

Inspirado em MVP (Minimum Viable Product), o CMV é:

> **A menor quantidade de contexto que permite à IA gerar uma resposta útil**

### Por Que Começar com CMV?

1. **Economiza tempo** - Não escrever contexto desnecessário
2. **Facilita iteração** - Adicione detalhes apenas se necessário
3. **Clareza** - Menos ruído, mais sinal
4. **Diagnóstico** - Se falhar com CMV, você sabe o que falta

### Template de CMV

```markdown
**O QUÊ:** [O que você quer / o que está quebrado] (1-2 linhas)
**STACK:** [Tecnologias principais] (1 linha)
**EXEMPLO:** [Um caso concreto] (código/dados/screenshot)
```

### Exemplo Comparativo

**❌ Contexto Insuficiente:**
```
"Como fazer autenticação?"
```

**✅ CMV:**
```
**O QUÊ:** Implementar autenticação para API REST
**STACK:** Node.js + Express + PostgreSQL
**EXEMPLO:** Endpoint POST /api/login que recebe {email, password}
e retorna JWT
```

**🔧 Contexto Expandido** (se CMV não for suficiente):
```
[CMV acima +]

**ESCALA:** 10k usuários, 50 logins/minuto
**SEGURANÇA:** Precisa atender OWASP top 10, rate limiting obrigatório
**INFRAESTRUTURA:** Rodando em AWS Lambda (stateless)
**CONSTRAINTS:** Não pode usar bibliotecas GPL (licença), JWT expira em 15min
```

---

## Progressão de Detalhes: Do Geral ao Específico

Pense em contexto como **zoom de câmera**:

```
┌─────────────────────────────────────┐
│  NÍVEL 1: Visão Geral (CMV)        │  ← Começa aqui
│  "O que, Stack, Exemplo"            │
└─────────────┬───────────────────────┘
              ↓ (Se resposta genérica)
┌─────────────────────────────────────┐
│  NÍVEL 2: Contexto Técnico          │
│  "Escala, Performance, Infra"       │
└─────────────┬───────────────────────┘
              ↓ (Se ainda não específico)
┌─────────────────────────────────────┐
│  NÍVEL 3: Constraints & Histórico   │
│  "Limitações, Tentativas, Decisões" │
└─────────────┬───────────────────────┘
              ↓ (Se precisar ainda mais)
┌─────────────────────────────────────┐
│  NÍVEL 4: Contexto Completo         │
│  "Stakeholders, Política, Legado"   │
└─────────────────────────────────────┘
```

### Quando Adicionar Cada Nível?

**NÍVEL 1 (CMV):** Sempre. Todo prompt começa aqui.

**NÍVEL 2:** Quando a resposta é:
- Genérica demais
- Ignora aspectos de escala/performance
- Propõe soluções que não funcionam na sua infra

**NÍVEL 3:** Quando a resposta:
- Sugere algo que você já tentou
- Ignora limitações importantes
- Não considera restrições técnicas/legais

**NÍVEL 4:** Quando a resposta:
- Ignora aspectos políticos/organizacionais
- Propõe mudanças inviáveis (reescrever tudo)
- Não considera legado/dívida técnica

### Exemplo de Progressão

**Prompt Inicial (CMV):**
```markdown
**O QUÊ:** Query de relatório está lenta
**STACK:** PostgreSQL 14
**EXEMPLO:**
```sql
SELECT * FROM orders WHERE created_at > '2024-01-01';
```
Demora 30s, timeout em 10s.
```

**Resposta da IA:** "Crie um índice em `created_at`"

**Avaliação:** Solução genérica, não considerou escala.

---

**Prompt Refinado (Nível 2):**
```markdown
[Contexto CMV +]

**ESCALA:**
- Tabela orders: 50M registros
- Crescimento: +5M/mês
- Carga: 100 queries simultâneas deste tipo no horário de pico

**INFRAESTRUTURA:**
- PostgreSQL 14 em AWS RDS (db.r5.large)
- 100GB de dados, 16GB RAM, 4 vCPUs
- Índices atuais: orders(id), orders(user_id)
```

**Resposta da IA:** Solução mais específica considerando volume e recursos.

---

**Prompt Expandido (Nível 3)** (se ainda não resolver):
```markdown
[Contexto Nível 2 +]

**TENTATIVAS ANTERIORES:**
- Criamos índice em created_at → Melhorou para 15s (ainda insuficiente)
- Tentamos LIMIT 1000 → Não serve (precisam de todos dados)
- Consideramos cache → Compliance não permite (dados sensíveis)

**CONSTRAINTS:**
- Não podemos fazer downtime para manutenção (sistema 24/7)
- Budget: não pode escalar hardware agora
- Query precisa ser real-time (não pode ser batch/async)
```

**Resposta da IA:** Solução que considera histórico e limitações.

---

## Signal-to-Noise Ratio: Maximizando Relevância

**Signal** = Informação relevante que ajuda a IA
**Noise** = Informação irrelevante que distrai

### Como Maximizar Signal

#### 1. **Seja Específico, Não Verboso**

**❌ Noise:**
```
"Estou trabalhando em um projeto muito interessante de e-commerce
que começou há 2 anos quando a empresa decidiu entrar no mercado
digital. Tivemos várias reuniões com stakeholders..."
[3 parágrafos de história]
"...e agora preciso otimizar uma query."
```

**✅ Signal:**
```
**Projeto:** E-commerce (2 anos em produção)
**Problema:** Query de relatório demora 30s
**Impacto:** Clientes não conseguem ver histórico de pedidos
```

#### 2. **Use Dados Quantitativos**

**❌ Vago:**
```
"O sistema tem muitos usuários e está lento"
```

**✅ Específico:**
```
"Sistema tem 10k usuários ativos/dia, latência p95: 5s (target: <500ms)"
```

#### 3. **Priorize Informação Acionável**

**❌ Não acionável:**
```
"A arquitetura é complexa e tem vários microsserviços
que se comunicam de formas diferentes."
```

**✅ Acionável:**
```
"Arquitetura: 5 microsserviços comunicando via REST + RabbitMQ.
Problema: Fila de orders processamento está acumulando (1000 msgs/min,
consumindo 100 msgs/min)."
```

#### 4. **Elimine Redundância**

**❌ Redundante:**
```
"O banco de dados que estamos usando é PostgreSQL.
PostgreSQL é um banco relacional. Usamos PostgreSQL versão 14."
```

**✅ Conciso:**
```
"Stack: PostgreSQL 14"
```

---

## Estruturando Contexto com Placeholders

Placeholders ajudam a **organizar** contexto de forma consistente.

### Template de Estrutura

```markdown
## 🎯 OBJETIVO
[O_QUE_VOCE_QUER]

## 🛠️ STACK TÉCNICO
- Backend: [LINGUAGEM_FRAMEWORK]
- Database: [DB_VERSAO]
- Infra: [CLOUD_PROVIDER_SERVICO]
- [OUTRAS_TECNOLOGIAS_RELEVANTES]

## 📊 ESCALA & PERFORMANCE
- Usuários: [QUANTIDADE]
- Carga: [REQUESTS_TRANSACOES_POR_PERIODO]
- Dados: [VOLUME]
- Target: [METRICAS_DESEJADAS]

## 🚧 CONSTRAINTS
- [LIMITACAO_1]
- [LIMITACAO_2]
- [LIMITACAO_3]

## 📌 CONTEXTO ADICIONAL
[HISTORICO, TENTATIVAS, DECISOES_PASSADAS]

## 💻 CÓDIGO/DADOS
```[LINGUAGEM]
[CODIGO_EXEMPLO_OU_DADOS]
```

## ✅ CRITÉRIOS DE SUCESSO
- [CRITERIO_1]
- [CRITERIO_2]
- [CRITERIO_3]
```

### Exemplo Preenchido

```markdown
## 🎯 OBJETIVO
Otimizar endpoint de checkout que está causando timeouts

## 🛠️ STACK TÉCNICO
- Backend: Node.js 18 + Express
- Database: PostgreSQL 14 + Redis 7 (cache)
- Infra: AWS ECS Fargate (2 vCPUs, 4GB RAM por container)
- Payment: Integração com Stripe API

## 📊 ESCALA & PERFORMANCE
- Usuários: 50k/dia, pico de 200 usuários simultâneos
- Carga: 500 checkouts/hora no pico
- Dados: 1M pedidos, 100k usuários
- Target: p95 < 2s (atual: 8s, timeout em 10s)

## 🚧 CONSTRAINTS
- Não pode perder transação (dinheiro envolvido)
- Não pode fazer downtime (SLA 99.9%)
- Integração Stripe não pode mudar (contrato)

## 📌 CONTEXTO ADICIONAL
- Problema começou após Black Friday (volume 5x normal)
- Adicionamos cache em Redis mas não resolveu completamente
- Profiling mostra: 60% do tempo em queries, 30% em Stripe API

## 💻 CÓDIGO
```javascript
async function checkout(req, res) {
  // 1. Validar carrinho (3 queries)
  const cart = await db.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
  const items = await db.query('SELECT * FROM cart_items WHERE cart_id = $1', [cart.id]);
  const products = await db.query('SELECT * FROM products WHERE id IN ($1)', [itemIds]);

  // 2. Criar pedido (5 queries em sequência)
  const order = await db.query('INSERT INTO orders ...');
  for (const item of items) {
    await db.query('INSERT INTO order_items ...');
  }

  // 3. Processar pagamento (chamada externa - 2-3s)
  const payment = await stripe.charges.create({...});

  // 4. Atualizar inventário (N queries)
  for (const item of items) {
    await db.query('UPDATE products SET stock = stock - $1 WHERE id = $2', ...);
  }

  return res.json({ orderId: order.id });
}
```

## ✅ CRITÉRIOS DE SUCESSO
- Latência p95 < 2s
- Zero perda de transações (idempotência)
- Funciona com carga 2x maior (crescimento planejado)
```

---

## Antipadrões de Estruturação

### 🚫 Antipadrão 1: Enterrar Informação Crítica

**❌ Problema:**
```
[10 parágrafos de contexto]
...
"Ah, e por favor não use biblioteca X porque temos restrição de licença."
```

**✅ Solução:**
```
## 🚧 CONSTRAINTS (no início)
- Não pode usar GPL/AGPL (restrição de licença)
```

---

### 🚫 Antipadrão 2: Contexto Desorganizado

**❌ Problema:**
```
Usamos Node.js e o sistema tem 10k usuários e está lento
e a query demora 30s e usamos PostgreSQL e não podemos
fazer downtime e já tentamos cache...
[parede de texto sem estrutura]
```

**✅ Solução:**
Use seções claras (🎯 Objetivo, 🛠️ Stack, 📊 Escala, etc)

---

### 🚫 Antipadrão 3: Informação Implícita

**❌ Problema:**
```
"O endpoint está lento"
[Assume que IA sabe: qual endpoint? Quão lento? Por quê isso importa?]
```

**✅ Solução:**
Explicite tudo:
```
"Endpoint POST /api/checkout demora 8s (p95), causando timeouts (limite: 10s).
Impacto: 15% dos checkouts falham = perda de receita."
```

---

### 🚫 Antipadrão 4: Contexto "Tribal Knowledge"

**❌ Problema:**
```
"Você sabe, aquele sistema que a gente usa... a tabela grande lá...
o problema de sempre..."
```

**Problema:** IA não tem contexto compartilhado com você.

**✅ Solução:**
Trate cada prompt como se fosse para alguém externo ao projeto.

---

## Técnicas Avançadas de Estruturação

### Técnica 1: **Contexto em Camadas (Onion Model)**

```
┌─────────────────────────────────┐
│ NÚCLEO: Problema + Objetivo      │
└──────────────┬──────────────────┘
               │
    ┌──────────▼──────────┐
    │ CAMADA 2: Stack + Exemplo │
    └──────────┬──────────┘
               │
       ┌───────▼───────┐
       │ CAMADA 3: Escala │
       └───────┬───────┘
               │
          ┌────▼────┐
          │ CAMADA 4: │
          │ Constraints │
          └─────────┘
```

**Ordem de leitura:** De dentro pra fora.
**Benefício:** Núcleo sempre visível, detalhes opcionais por camada.

---

### Técnica 2: **Contexto Incremental (Delta)**

Em iterações, não repita tudo - adicione apenas o **delta**:

**Primeira iteração:**
```
[Contexto completo CMV]
```

**Segunda iteração:**
```
"Baseado na sua resposta anterior, adicione ao contexto:
- Índice em created_at não resolveu (ainda 15s)
- Profiling mostra: 80% do tempo em JOIN com users
- Tabela users tem 5M registros

Considerando isso, qual próxima otimização?"
```

**Benefício:** Não desperdiça tokens/espaço, mantém foco.

---

### Técnica 3: **Contexto por Referência**

Se o contexto é muito grande (logs, código extenso), forneça por **referência**:

```markdown
**CÓDIGO:** Ver arquivo `api/checkout.js` (linhas 150-200)
**LOGS:** Ver anexo `error.log` (últimas 50 linhas)
**DIAGRAMA:** Ver `architecture.png`

Resumo do problema:
[Descrição concisa]
```

**Benefício:** Contexto rico sem poluir o prompt principal.

---

### Técnica 4: **Contexto Hierárquico (Para Sistemas Complexos)**

```markdown
## CONTEXTO GLOBAL (Todo o Sistema)
- Arquitetura: Microservices (5 serviços)
- Stack comum: Node.js, PostgreSQL, Redis, RabbitMQ
- Infra: AWS, Kubernetes

## CONTEXTO DO SERVIÇO (Order Service)
- Responsabilidade: Gerenciar ciclo de vida de pedidos
- APIs: REST (externa) + gRPC (interna)
- Database: PostgreSQL (orders, order_items)

## CONTEXTO DO PROBLEMA (Endpoint específico)
- Endpoint: POST /api/checkout
- Função: `checkout()` em `src/controllers/order.controller.js`
- Issue: Timeout após 8s
```

**Benefício:** Clareza de escopo, entendimento de hierarquia.

---

## Checklist de Contexto Bem Estruturado

Antes de enviar o prompt, valide:

✓ **Clareza:**
  - [ ] Problema está claro em 1-2 linhas?
  - [ ] Não há ambiguidades?

✓ **Completude:**
  - [ ] Incluí stack tecnológico?
  - [ ] Dei exemplo concreto (código/dados)?
  - [ ] Mencionei critérios de sucesso?

✓ **Relevância:**
  - [ ] Toda informação é necessária?
  - [ ] Não há "história" desnecessária?
  - [ ] Dados quantitativos quando aplicável?

✓ **Organização:**
  - [ ] Seções claras?
  - [ ] Fácil de escanear visualmente?
  - [ ] Informação mais importante no topo?

✓ **Acionabilidade:**
  - [ ] IA tem dados suficientes para agir?
  - [ ] Não está implícito ou ambíguo?
  - [ ] Constraints estão explícitas?

---

## Próximos Passos

Domine estruturação de contexto e explore:

- **[07-especificacao-requisitos.md]** - Como transformar contexto em specs precisas
- **[../2-engineering/01-templates-reutilizaveis.md]** - Capture estruturas de contexto em templates
- **[../4-workflows/01-workflow-analise-problemas.md]** - Aplique estruturação em workflows reais

## 🌱 Reflexão Final

Estruturar contexto é como **organizar uma mochila para trilha**:
- Leve o essencial (CMV)
- Organize por prioridade (camadas)
- Deixe acessível o que usa mais (núcleo no topo)
- Só leve o extra se a jornada exigir (progressão)

**Comece hoje:**
1. Pegue um prompt que você escreveu recentemente
2. Identifique: qual é o CMV? Há ruído (noise)?
3. Reestruture usando as seções deste guia
4. Compare os resultados (antes vs depois)

A diferença será notável.

---

**Tags:** #contexto #estrutura #signal-noise #CMV #organizacao

**Relacionados:**
- [[03-contexto-e-role-playing]] - Tipos de contexto (técnico, negócio, etc)
- [[05-ciclo-de-trabalho-com-ia]] - Fase 2 do ciclo (Preparar Contexto)
- [[07-especificacao-requisitos]] - Próximo passo natural
- [[../2-engineering/01-templates-reutilizaveis]] - Templates com estruturas prontas
