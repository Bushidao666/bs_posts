---
guide_id: "design-templates-universais"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 2-engineering
tags: [templates, abstração, placeholders, reutilização, universalização]
related_guides: ["../1-fundamentals/06-estruturacao-contexto", "02-arquitetura-prompts-complexos"]
prerequisites: ["../1-fundamentals/01-o-que-e-prompt-engineering", "../1-fundamentals/06-estruturacao-contexto"]
next_steps: ["02-arquitetura-prompts-complexos", "03-checklists-validacoes"]
concepts_defined: ["template-universal", "abstracao-inteligente", "placeholders-parametricos", "portabilidade-template"]
concepts_referenced: ["contexto-estruturado", "refinamento-iterativo", "tipos-prompts"]
---

# 🎨 Design de Templates Universais: Da Especificidade à Reutilização

## Introdução: O Paradoxo da Reutilização

Você criou um prompt perfeito que resolve seu problema específico. Mas na semana seguinte, tem um problema similar - **porém não idêntico**.

Opções:
1. **Copy-paste e adaptar** → Cria duplicação, inconsistência
2. **Reescrever do zero** → Desperdiça trabalho anterior
3. **Criar template universal** → Reutiliza a estrutura, adapta os detalhes ✅

Este guia ensina como transformar prompts específicos em **templates universalizáveis** que servem para múltiplos contextos sem perder efetividade.

## O Que Torna um Template "Universal"?

Um template universal é:

1. **Abstrato o suficiente** para servir vários casos
2. **Específico o suficiente** para gerar respostas úteis
3. **Parametrizável** via placeholders inteligentes
4. **Portável** entre projetos/domínios
5. **Evoluível** (fácil de melhorar com o tempo)

### Espectro de Abstração

```
ESPECÍFICO                          UNIVERSAL
├──────────┼──────────┼──────────┼──────────┤
│          │          │          │          │
Único Uso  Projeto    Domínio    Multi-     Genérico
          Específico  Específico  Domínio    Demais
│          │          │          │          │
❌         ⚠️         ✅          ✅         ❌
Desperdiça  Limitado   Ideal      Ideal     Inútil
```

**Sweet Spot:** Entre "Domínio Específico" e "Multi-Domínio"

---

## Processo de Universalização em 5 Passos

### Passo 1: Identificar Padrões Recorrentes 🔍

Você precisa de **3+ exemplos similares** para justificar template.

**Técnica: Análise de Similaridade**

| Aspecto | Prompt 1 | Prompt 2 | Prompt 3 | Padrão? |
|---------|----------|----------|----------|---------|
| Role | DBA PostgreSQL | DBA MySQL | DBA MongoDB | ✅ "DBA [DB]" |
| Problema | Query lenta | Query lenta | Query lenta | ✅ "Otimizar query" |
| Contexto | E-commerce | SaaS | Fintech | ❌ Varia |
| Formato | Análise + Código | Análise + Código | Análise + Código | ✅ Fixo |

**Conclusão:** Template "Otimização de Query para DBA"

---

### Passo 2: Extrair a Estrutura Fixa 🏗️

Identifique **o que NUNCA muda** entre as instâncias.

**Exemplo: Prompts de Code Review**

**Prompt Específico 1 (Node.js):**
```
Você é um tech lead especializado em Node.js.

Revise este código de API REST:
[código]

Analise:
- Segurança
- Performance
- Manutenibilidade

Formato:
1. Score geral
2. Problemas críticos
3. Sugestões
```

**Prompt Específico 2 (Python):**
```
Você é um tech lead especializado em Python.

Revise este código de API REST:
[código]

Analise:
- Segurança
- Performance
- Manutenibilidade

Formato:
1. Score geral
2. Problemas críticos
3. Sugestões
```

**Estrutura Fixa Extraída:**
```markdown
Você é um tech lead especializado em [LINGUAGEM].

Revise este código de [TIPO_CODIGO]:
[CODIGO]

Analise:
[ASPECTOS_REVIEW]

Formato:
[FORMATO_SAIDA]
```

---

### Passo 3: Criar Placeholders Inteligentes 🎯

Não use placeholders genéricos como `[X]`, `[Y]`, `[Z]`.

Use placeholders **autodescritivos** que guiam o usuário.

#### Anatomia de um Bom Placeholder

```
[CATEGORIA_DESCRICAO_TIPO?EXEMPLO]

Partes:
- CATEGORIA: Agrupa relacionados (STACK_, ROLE_, CONTEXTO_)
- DESCRICAO: O que preencher
- TIPO: Formato esperado (quando aplicável)
- ? = opcional
- EXEMPLO: Valor de exemplo

Exemplos:
[LINGUAGEM:ex_node-js_python]
[STACK_BACKEND:ex_node+express+postgresql]
[METRICA_PERFORMANCE:latencia_p95<200ms]
```

#### Tipos de Placeholders

**1. Placeholder Simples**
```
[LINGUAGEM]  → "Python", "JavaScript", "Go"
```

**2. Placeholder com Exemplo**
```
[STACK_BACKEND:node+express+postgresql]
```

**3. Placeholder Estruturado**
```
[CONTEXTO_ESCALA:
  - Usuários: X
  - Transações/dia: Y
  - Dados: Z GB
]
```

**4. Placeholder Condicional**
```
[OPCIONAL:se_aplicavel_adicione_metricas_atuais]
```

**5. Placeholder com Validação**
```
[METRICA_PERFORMANCE:formato_"p95<Xms"]
```

---

### Passo 4: Definir Variações e Defaults 🔀

Templates universais precisam lidar com variações.

#### Estratégia 1: Defaults Inteligentes

```markdown
[LINGUAGEM:default_javascript]
[FRAMEWORK:default_express]
[TIPO_TESTE:default_unitarios]
```

Se usuário não preencher, usa default.

#### Estratégia 2: Variações Predefinidas

```markdown
## Template Base: CODE_REVIEW_V2

### Variação A: Backend
[STACK_BACKEND]
Aspectos: Segurança, Performance, Escalabilidade

### Variação B: Frontend
[STACK_FRONTEND]
Aspectos: Acessibilidade, Performance, UX

### Variação C: Infra/DevOps
[STACK_INFRA]
Aspectos: Segurança, Custos, Resiliência
```

#### Estratégia 3: Composição Modular

```markdown
## Template Composto

[BASE:role+contexto]
+
[MODULO_OPCIONALESTÁ:seguranca]
+
[MODULO_OPCIONAL:performance]
+
[FORMATO_SAIDA]
```

---

### Passo 5: Documentar Uso e Evoluir 📚

Template sem documentação é template que ninguém usa.

#### Template de Documentação

```markdown
═══════════════════════════════════════════════════════════
# TEMPLATE: [NOME] v[VERSAO]
═══════════════════════════════════════════════════════════

## Quando Usar
- [Situação 1]
- [Situação 2]
- [Situação 3]

## Quando NÃO Usar
- [Anti-situação 1]
- [Anti-situação 2]

## Pré-requisitos
- [Requisito 1: ex: ter código para revisar]
- [Requisito 2: ex: conhecer stack tecnológico]

## Placeholders

### Obrigatórios
| Placeholder | Descrição | Exemplo | Validação |
|-------------|-----------|---------|-----------|
| [PH1] | ... | ... | ... |
| [PH2] | ... | ... | ... |

### Opcionais
| Placeholder | Descrição | Default | Quando Usar |
|-------------|-----------|---------|-------------|
| [PH3] | ... | ... | ... |

## Exemplo de Uso

### Entrada (Template Preenchido):
```
[template preenchido]
```

### Saída Esperada:
```
[exemplo de resposta da IA]
```

## Variações

### Variação 1: [Nome]
[Descrição]
[Modificações no template base]

### Variação 2: [Nome]
[Descrição]
[Modificações no template base]

## Changelog
- v1.2 (2024-11-06): [mudanças]
- v1.1 (2024-10-15): [mudanças]
- v1.0 (2024-09-01): Versão inicial

## Métricas de Uso
- Usos: 47 vezes
- Rating: 4.5/5.0
- Tempo médio de preenchimento: ~3 minutos

## Feedback & Melhorias
[Link para issues/discussões]
```

---

## Case Study: Universalizando Template de Auditoria

### Contexto

Você criou um prompt específico para auditar código JavaScript/Node.js:

**Prompt Específico:**
```markdown
Você é um arquiteto de software especializado em Node.js.

Audite este código de API REST em Express:
[código]

Foco:
- Vulnerabilidades de segurança
- Problemas de performance
- Violações de SOLID
- Code smells

Retorne:
1. Score geral (1-10)
2. Lista de problemas (severidade: CRITICAL/HIGH/MEDIUM/LOW)
3. Sugestões de refatoração priorizadas
4. Código refatorado (se crítico)
```

### Passo 1: Identificar Padrões

Você precisa auditar:
- Código Python (Flask API)
- Código Go (gRPC service)
- Código Frontend (React)

**Padrão identificado:** Auditoria de código em diferentes stacks

---

### Passo 2: Extrair Estrutura Fixa

```markdown
[ROLE]

Audite este [TIPO_CODIGO]:
[CODIGO]

Foco:
[ASPECTOS_AUDITORIA]

Retorne:
1. Score geral (1-10)
2. Lista de problemas (severidade)
3. Sugestões priorizadas
4. Código refatorado (se crítico)
```

---

### Passo 3: Placeholders Inteligentes

```markdown
═══════════════════════════════════════════════════════════
TEMPLATE: CODE_AUDIT_UNIVERSAL_V2
═══════════════════════════════════════════════════════════

Você é um [ROLE_EXPERTISE:arquiteto_de_software_tech_lead_especialista_seguranca]
especializado em [STACK_PRINCIPAL:node_python_go_react].

CONTEXTO DO PROJETO:
- Tipo: [TIPO_PROJETO:api-rest_microservice_spa_biblioteca]
- Stack: [STACK_COMPLETO:linguagem+framework+dependencias]
- Criticidade: [NIVEL_CRITICIDADE:baixa_media_alta_critica]
- [OPCIONAL:contexto_negocio_compliance_regulacoes]

CÓDIGO A AUDITAR:
```[LINGUAGEM]
[CODIGO]
```

FOCO DA AUDITORIA:
[ASPECTOS_OBRIGATORIOS]
✓ Segurança ([DETALHE_SEGURANCA:ex_sql-injection_xss_auth])
✓ Performance ([DETALHE_PERFORMANCE:ex_queries-n+1_memory-leaks])
✓ Manutenibilidade ([DETALHE_MANUT:ex_solid_dry_complexidade])

[OPCIONAL:aspectos_adicionais]
✓ [ASPECTO_EXTRA_1:ex_acessibilidade_i18n]
✓ [ASPECTO_EXTRA_2:ex_testes_observabilidade]

RETORNE:

1. **Score Geral:** X/10 com justificativa por categoria
2. **Problemas Identificados:**
   Formato: [SEVERIDADE] [Linha X-Y] [Descrição] [Impacto]
   Ordenar por: CRITICAL → HIGH → MEDIUM → LOW

3. **Sugestões Priorizadas:**
   Para cada problema CRITICAL/HIGH:
   - O que fazer (ação específica)
   - Por quê (justificativa técnica)
   - Como implementar (código/pseudocódigo)

4. **Código Refatorado:**
   [SE_PROBLEMA_CRITICAL:mostrar_codigo_corrigido_completo]
   [SE_NAO:mostrar_apenas_trechos_principais]

5. **Análise de Riscos:**
   - Risco se não corrigir: [impacto]
   - Esforço para corrigir: [estimativa:horas_dias]
   - Prioridade recomendada: [ordem]

INSTRUÇÕES:
- Seja específico (cite linhas, funções, variáveis)
- Considere contexto [TIPO_PROJETO] (ex: startup vs enterprise)
- Se criticidade = CRÍTICA: foque em segurança e data integrity
- Se código >500 linhas: priorize top 10 problemas
```

---

### Passo 4: Variações

**Variação A: Auditoria de Segurança (Pentest)**
```markdown
[Usa template base]

ROLE_EXPERTISE: "security engineer especializado em pentesting"
ASPECTOS_OBRIGATORIOS: Apenas segurança, profundidade máxima
ADICIONAR_SECAO:
6. **Exploit Scenarios:**
   - Como atacante exploraria cada vulnerabilidade
   - Proof of concept (PoC) se aplicável
```

**Variação B: Auditoria de Performance**
```markdown
[Usa template base]

ROLE_EXPERTISE: "engenheiro de performance"
ASPECTOS_OBRIGATORIOS: Apenas performance
ADICIONAR_SECAO:
6. **Benchmarks:**
   - Tempo de execução atual (estimado)
   - Tempo após otimização (esperado)
   - Ganho percentual
```

**Variação C: Auditoria de Legado (Refatoração)**
```markdown
[Usa template base]

CONTEXTO_ADICIONAL:
- Código legado: [ANOS] anos
- [SEM_TESTES | COM_TESTES_PARCIAIS]
- Objetivo: Modernizar para [STACK_ALVO]

FOCO: Identificar refatorações seguras (sem quebrar funcionalidade)
```

---

### Passo 5: Documentação Completa

```markdown
═══════════════════════════════════════════════════════════
TEMPLATE: CODE_AUDIT_UNIVERSAL v2.0
═══════════════════════════════════════════════════════════

## QUANDO USAR
✓ Code review profundo (pré-merge crítico)
✓ Auditoria de código legado
✓ Security audit
✓ Performance review
✓ Preparação para refatoração

## QUANDO NÃO USAR
❌ Review rápido de PR simples (use CODE_REVIEW_QUICK)
❌ Código em desenvolvimento (muitas mudanças)
❌ Apenas checar style guide (use linter)

## PRÉ-REQUISITOS
- Código funcionando (não rascunhos)
- Stack tecnológico conhecido
- Contexto de projeto (tipo, criticidade)

## PLACEHOLDERS

### Obrigatórios

| Placeholder | Descrição | Exemplo | Notas |
|-------------|-----------|---------|-------|
| `[ROLE_EXPERTISE]` | Especialização do auditor | "arquiteto de software", "security engineer" | Adapte ao foco |
| `[STACK_PRINCIPAL]` | Tecnologia principal | "Node.js", "Python", "React" | |
| `[TIPO_PROJETO]` | Categoria | "API REST", "Microservice", "SPA" | |
| `[STACK_COMPLETO]` | Stack detalhado | "Node 18 + Express + PostgreSQL + Redis" | |
| `[NIVEL_CRITICIDADE]` | Impacto | "baixa", "média", "alta", "crítica" | Afeta profundidade |
| `[LINGUAGEM]` | Para syntax highlight | "javascript", "python", "go" | |
| `[CODIGO]` | Código a auditar | (colar código) | Max 500 linhas |
| `[DETALHE_*]` | Especificidade por aspecto | "SQL injection, XSS, auth" | |

### Opcionais

| Placeholder | Descrição | Default | Quando Usar |
|-------------|-----------|---------|-------------|
| `[OPCIONAL:contexto_negocio]` | Domínio, compliance | (vazio) | Se fintech, healthcare (regulado) |
| `[OPCIONAL:aspectos_adicionais]` | Além dos 3 padrão | (vazio) | Se precisa checar i18n, a11y, etc |
| `[SE_PROBLEMA_CRITICAL]` | Condicional | Mostra código | Se houver bugs críticos |

## EXEMPLO DE USO

### Cenário: Auditoria de API de Pagamentos (Node.js)

**Template Preenchido:**
```markdown
Você é um security engineer especializado em Node.js.

CONTEXTO DO PROJETO:
- Tipo: API REST (pagamentos - fintech)
- Stack: Node 18 + Express + PostgreSQL + Stripe API
- Criticidade: CRÍTICA (dinheiro envolvido)
- Compliance: PCI-DSS level 1

CÓDIGO A AUDITAR:
```javascript
app.post('/api/checkout', async (req, res) => {
  const { cartId, paymentMethod } = req.body;

  // Buscar carrinho
  const cart = await db.query(`SELECT * FROM carts WHERE id = '${cartId}'`);

  // Processar pagamento
  const charge = await stripe.charges.create({
    amount: cart.total * 100,
    currency: 'usd',
    source: paymentMethod,
  });

  // Salvar pedido
  await db.query(`INSERT INTO orders (cart_id, charge_id) VALUES ('${cartId}', '${charge.id}')`);

  res.json({ success: true });
});
```

FOCO DA AUDITORIA:
✓ Segurança (SQL injection, validação de input, autenticação)
✓ Performance (queries, error handling)
✓ Manutenibilidade (separação de concerns, logging)

[... resto do template]
```

**Saída Esperada da IA:**
```markdown
1. **Score Geral:** 3/10
   - Segurança: 2/10 (vulnerabilidades críticas)
   - Performance: 4/10 (queries seriais, sem transação)
   - Manutenibilidade: 4/10 (lógica no controller)

2. **Problemas Identificados:**

[CRITICAL] [Linha 5] SQL Injection
- String interpolation permite SQL injection
- Impacto: Atacante pode ler/modificar/deletar qualquer dado do DB
- Exploitável: req.body.cartId = "1' OR '1'='1"

[CRITICAL] [Linha 7-12] Race Condition + No Transaction
- Pagamento e ordem não são atômicos
- Impacto: Se falhar após stripe.charges mas antes de INSERT, cobramos mas não criamos pedido
- Perda de dinheiro/disputa

[HIGH] [Linha 2-3] Falta de Autenticação
- Endpoint não valida usuário
- Impacto: Qualquer um pode fazer checkout de qualquer carrinho

[HIGH] [Linha 9] Exposição de Dados Sensíveis
- paymentMethod vem diretamente do cliente
- Impacto: Cliente pode manipular (enviar token de outro usuário)

[MEDIUM] [Linha 15] Sem Error Handling
- Se qualquer step falhar, retorna 500 genérico
- Impacto: Difícil debugar, má UX

3. **Sugestões Priorizadas:**

**[1] Corrigir SQL Injection (CRÍTICO)**
- Usar prepared statements / parameterized queries
- Validar cartId (UUID format)

**[2] Adicionar Transação (CRÍTICO)**
- Wrappear em db.transaction
- Rollback se falhar
- Idempotency key no Stripe

**[3] Adicionar Autenticação (HIGH)**
- Middleware auth antes do handler
- Validar userId == cart.userId

4. **Código Refatorado:**
```javascript
// Middleware
const auth = require('./middleware/auth');
const { body, validationResult } = require('express-validator');

app.post('/api/checkout',
  auth, // Valida JWT, adiciona req.user
  [
    body('cartId').isUUID(),
    body('paymentMethod').notEmpty(),
  ],
  async (req, res, next) => {
    try {
      // Validação
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { cartId, paymentMethod } = req.body;

      // Transaction
      await db.transaction(async (trx) => {
        // 1. Buscar e validar carrinho
        const cart = await trx('carts')
          .where({ id: cartId, user_id: req.user.id })
          .first();

        if (!cart) {
          throw new Error('Cart not found or unauthorized');
        }

        // 2. Processar pagamento (idempotente)
        const charge = await stripe.charges.create({
          amount: cart.total * 100,
          currency: 'usd',
          source: paymentMethod,
          idempotency_key: `checkout-${cartId}-${Date.now()}`,
        });

        // 3. Criar ordem
        const order = await trx('orders').insert({
          cart_id: cartId,
          user_id: req.user.id,
          charge_id: charge.id,
          status: 'paid',
          created_at: new Date(),
        }).returning('*');

        // 4. Limpar carrinho
        await trx('carts').where({ id: cartId }).delete();

        // Log
        logger.info('Checkout successful', { orderId: order.id, userId: req.user.id });

        res.json({ success: true, orderId: order.id });
      });
    } catch (error) {
      logger.error('Checkout failed', { error, cartId: req.body.cartId });

      if (error.message === 'Cart not found or unauthorized') {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ error: 'Checkout failed' });
    }
  }
);
```

5. **Análise de Riscos:**

| Problema | Risco se não corrigir | Esforço | Prioridade |
|----------|----------------------|---------|------------|
| SQL Injection | CRÍTICO - Breach total do DB | 2h | 1 |
| Race condition | CRÍTICO - Perda de $$ | 4h | 2 |
| Falta de auth | HIGH - Fraude | 2h | 3 |
| Dados sensíveis | HIGH - Roubo de cartões | 1h | 4 |

**TOTAL: ~9 horas para tornar production-safe.**
```

## VARIAÇÕES

### Variação: AUDIT_SECURITY_DEEP
[Documentação da variação]

### Variação: AUDIT_PERFORMANCE
[Documentação da variação]

### Variação: AUDIT_LEGACY_REFACTOR
[Documentação da variação]

## CHANGELOG
- v2.0 (2024-11-06): Adicionado análise de riscos, variações
- v1.1 (2024-10-01): Placeholders mais descritivos
- v1.0 (2024-09-01): Versão inicial

## MÉTRICAS
- Usos: 89 vezes
- Rating: 4.7/5.0
- Tempo médio preenchimento: ~5 minutos
- Taxa de problema crítico detectado: 92%

## FEEDBACK
[Link para issues]
```

---

## Técnicas Avançadas de Universalização

### Técnica 1: **Herança de Templates**

```markdown
## Template Base: CODE_REVIEW_BASE
[Estrutura comum a todos code reviews]

## Template Derivado: CODE_REVIEW_SECURITY
[Herda CODE_REVIEW_BASE]
+ Seção extra: Vulnerabilidades
+ Role específico: Security Engineer

## Template Derivado: CODE_REVIEW_PERFORMANCE
[Herda CODE_REVIEW_BASE]
+ Seção extra: Benchmarks
+ Role específico: Performance Engineer
```

---

### Técnica 2: **Composição Modular**

```markdown
Template Final = BASE + MODULO_A + MODULO_B

Exemplo:
AUDIT =
  [ROLE_UNIVERSAL] +
  [CONTEXTO_PROJETO] +
  [FOCO_SEGURANCA | FOCO_PERFORMANCE | FOCO_REFATORACAO] +
  [FORMATO_SAIDA_PADRAO]
```

---

### Técnica 3: **Parametrização por Domínio**

```markdown
## Configuração por Domínio

### Fintech:
- ASPECTS: Security (peso 50%), Compliance (30%), Performance (20%)
- ROLE: Security + Compliance engineer
- EXTRA: Sempre mencionar PCI-DSS, SOC2

### E-commerce:
- ASPECTS: Performance (50%), UX (30%), Security (20%)
- ROLE: Full-stack + UX specialist
- EXTRA: Considerar carga (Black Friday)

### Healthcare:
- ASPECTS: Security (40%), Compliance (40%), Reliability (20%)
- ROLE: Security + HIPAA specialist
- EXTRA: HIPAA, data privacy, audit trails
```

---

## Antipadrões de Universalização

### 🚫 Antipadrão 1: Template "Swiss Army Knife"

```markdown
❌ TEMPLATE_FAZ_TUDO_V1:
[100 placeholders]
[20 seções opcionais]
[10 variações]
```

**Problema:** Complexo demais, ninguém usa.

**Solução:** Crie múltiplos templates específicos, não um mega-template.

---

### 🚫 Antipadrão 2: Abstração Excessiva

```markdown
❌ [X] [Y] [Z]
```

**Problema:** Placeholders vagos, usuário não sabe o que preencher.

**Solução:** Placeholders autodescritivos com exemplos.

---

### 🚫 Antipadrão 3: Template Estático (Sem Evolução)

```markdown
❌ Template criado uma vez, nunca atualizado
```

**Problema:** Fica desatualizado, práticas antigas.

**Solução:** Versioning + Changelog + Review trimestral.

---

## Checklist de Template Universal

✓ **Abstração:**
  - [ ] Serve para 3+ casos similares?
  - [ ] Não é específico demais?
  - [ ] Não é genérico demais?

✓ **Placeholders:**
  - [ ] Autodescritivos?
  - [ ] Com exemplos?
  - [ ] Obrigatórios vs opcionais claros?

✓ **Documentação:**
  - [ ] "Quando usar" definido?
  - [ ] Exemplo de uso completo?
  - [ ] Variações documentadas?

✓ **Testabilidade:**
  - [ ] Testado em 5+ casos reais?
  - [ ] Feedback coletado?
  - [ ] Métricas de efetividade?

✓ **Manutenibilidade:**
  - [ ] Versionado?
  - [ ] Changelog?
  - [ ] Fácil de evoluir?

---

## Próximos Passos

Domine design de templates universais e explore:

- **[02-arquitetura-prompts-complexos.md]** - Como estruturar prompts de 1000+ linhas
- **[03-checklists-validacoes.md]** - Valide templates sistematicamente
- **[../4-workflows/02-biblioteca-workflows.md]** - Organize sua biblioteca de templates

## 🌱 Reflexão Final

Criar templates universais é como **criar ferramentas de qualidade**:
- Investimento inicial maior
- Mas economiza tempo exponencialmente
- Melhora a cada uso (feedback loop)

**Regra de ouro:** Se você usou 3+ vezes, universalize.

**Comece hoje:**
1. Identifique 3 prompts similares que você já usou
2. Extraia a estrutura comum
3. Crie template com placeholders inteligentes
4. Documente e teste em casos reais
5. Evolua baseado em feedback

Em 3 meses, você terá uma biblioteca pessoal que economiza horas por semana.

---

**Tags:** #templates #universalizacao #abstracao #placeholders #reutilizacao

**Relacionados:**
- [[../1-fundamentals/06-estruturacao-contexto]] - Como estruturar informações
- [[02-arquitetura-prompts-complexos]] - Próximo passo natural
- [[03-checklists-validacoes]] - Valide seus templates
- [[../4-workflows/02-biblioteca-workflows]] - Organize templates em biblioteca
