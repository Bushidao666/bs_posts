---
guide_id: "ciclo-trabalho-ia"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 1-fundamentals
tags: [workflow, ciclo, processo, iteracao]
related_guides: ["04-refinamento-iterativo", "06-estruturacao-contexto"]
prerequisites: ["01-o-que-e-prompt-engineering", "04-refinamento-iterativo"]
next_steps: ["06-estruturacao-contexto", "../2-engineering/01-templates-reutilizaveis"]
concepts_defined: ["ciclo-trabalho-ia", "feedback-loop", "validation-checkpoint", "context-building"]
concepts_referenced: ["refinamento-iterativo", "contexto", "tipos-prompts"]
---

# 🔄 Ciclo de Trabalho com IA: O Processo Completo

## Introdução: Trabalhando COM a IA, Não APENAS Usando

Muita gente trata IA como um **oráculo mágico**: faz uma pergunta, recebe uma resposta, acabou.

Mas trabalhar efetivamente com IA é mais parecido com **colaborar com um colega extremamente inteligente**:
- Você explica o contexto
- A IA propõe uma solução
- Você valida e dá feedback
- A IA refina
- Vocês iteram juntos até chegar no resultado ideal

Este guia apresenta o **ciclo completo de trabalho** - da formulação do problema até a solução final validada.

## O Ciclo Completo em 6 Fases

```
┌──────────────────────────────────────────────┐
│  1. DEFINIR PROBLEMA                         │
│     "O que eu realmente preciso?"            │
└──────────────┬───────────────────────────────┘
               ↓
┌──────────────────────────────────────────────┐
│  2. PREPARAR CONTEXTO                        │
│     "O que a IA precisa saber?"              │
└──────────────┬───────────────────────────────┘
               ↓
┌──────────────────────────────────────────────┐
│  3. FORMULAR PROMPT                          │
│     "Como estruturar o pedido?"              │
└──────────────┬───────────────────────────────┘
               ↓
┌──────────────────────────────────────────────┐
│  4. AVALIAR RESPOSTA                         │
│     "A IA entendeu? Resultado é útil?"       │
└──────────────┬───────────────────────────────┘
               ↓
         ┌─────┴─────┐
         │  SATISFEITO?  │
         └──┬─────┬──┘
       NÃO  │     │  SIM
            │     │
            ↓     ↓
┌──────────────────────┐  ┌──────────────────────┐
│ 5. REFINAR           │  │ 6. VALIDAR & APLICAR │
│    "Como melhorar?"  │  │    "Funciona na      │
│    (volta ao passo 3)│  │     prática?"        │
└──────────────────────┘  └──────────────────────┘
```

## Fase 1: Definir o Problema 🎯

**Objetivo:** Clarificar O QUE você realmente precisa.

### Perguntasчave:

1. **Qual é o problema real?**
   - Não: "Preciso de código"
   - Sim: "Meu endpoint de login demora 5s e deveria demorar < 500ms"

2. **Por que preciso resolver isso?**
   - Não: "Porque sim"
   - Sim: "Usuários estão reclamando, churn aumentou 15%"

3. **Como vou saber se resolvi?**
   - Não: "Vai ficar melhor"
   - Sim: "Latência p95 < 500ms, confirmado via monitoring"

4. **Qual o escopo?**
   - Não: "Tudo"
   - Sim: "Apenas o fluxo de autenticação JWT, não OAuth"

### Técnica: Os 5 Porquês

```
Problema inicial: "O sistema está lento"

Por quê? → Queries demoram muito
Por quê? → Tabela users tem 10M registros sem índice
Por quê? → Crescimento não foi planejado (esperávamos 100k)
Por quê? → Não fizemos capacity planning
Por quê? → Time focou em features, não em escala

Problema REAL: Falta de capacity planning levou a queries sem otimização
```

### Exemplo Prático

**❌ Problema Mal Definido:**
```
"Meu código não está bom, melhore"
```

**✅ Problema Bem Definido:**
```
**Problema:** Função de checkout em `api/checkout.js` tem 300 linhas,
complexidade ciclomática de 25, e é difícil de testar.

**Por quê importante:** Bugs em checkout = perda de receita.
Última semana: 3 bugs em produção nesta função.

**Critério de sucesso:**
- Complexidade < 10
- Função principal < 50 linhas
- Cobertura de testes > 80%
- Zero bugs em 2 semanas após refatoração

**Escopo:** Apenas checkout (não onboarding nem carrinho)
```

---

## Fase 2: Preparar Contexto 📋

**Objetivo:** Reunir TODAS as informações que a IA precisa.

### O Que Incluir:

#### 1. **Contexto Técnico**
```markdown
- Stack: [linguagens, frameworks, versões]
- Infraestrutura: [onde roda, cloud provider, etc]
- Dependências: [bibliotecas, APIs externas, serviços]
- Escala: [usuários, transações/dia, dados armazenados]
```

#### 2. **Contexto Histórico**
```markdown
- Situação atual: [como funciona hoje]
- Tentativas anteriores: [o que já foi tentado e não funcionou]
- Constraints: [o que NÃO pode mudar]
- Decisões passadas: [por que está assim hoje]
```

#### 3. **Contexto de Objetivo**
```markdown
- Meta: [estado desejado]
- Motivação: [por que isso importa]
- Stakeholders: [quem é afetado, quem decide]
- Timeline: [quando precisa estar pronto]
```

#### 4. **Artefatos Relevantes**
```markdown
- Código existente: [arquivos relevantes]
- Logs/Erros: [evidências do problema]
- Documentação: [specs, ADRs, diagramas]
- Métricas: [dados quantitativos]
```

### Técnica: Contexto Mínimo Viável (CMV)

Não precisa de TODO contexto de primeira. Comece com o **mínimo necessário**:

**Contexto Mínimo:**
1. O que está quebrado / o que você quer criar
2. Stack tecnológico básico
3. Um exemplo concreto

**Contexto Adicional** (adicione se a resposta for genérica):
4. Escala e performance requirements
5. Constraints específicas
6. Histórico de tentativas

### Exemplo Prático

**Contexto Mínimo (Primeira Tentativa):**
```markdown
**Stack:** Node.js 18, Express, PostgreSQL 14
**Problema:** Query de relatório demora 30s, timeout em 10s
**Código:**
```sql
SELECT * FROM orders
JOIN users ON orders.user_id = users.id
WHERE orders.created_at > '2024-01-01';
```
```

Se a resposta for genérica, adicione:

**Contexto Expandido (Segunda Tentativa):**
```markdown
[Contexto anterior +]
**Escala:** Tabela orders tem 50M registros, users tem 5M
**Índices atuais:** orders(id, user_id), users(id)
**Infraestrutura:** PostgreSQL em AWS RDS (db.r5.large)
**Constraints:** Não posso adicionar cache (compliance), query precisa ser em tempo real
```

---

## Fase 3: Formular Prompt 📝

**Objetivo:** Estruturar o pedido de forma clara e completa.

### Template Básico

```markdown
[1. ROLE]
Você é um [especialista em X] com experiência em [domínio Y].

[2. CONTEXTO]
[Informações da Fase 2]

[3. PROBLEMA]
[Definição clara da Fase 1]

[4. TAREFA]
Preciso que você [ação específica]:
- [Sub-tarefa 1]
- [Sub-tarefa 2]
- [Sub-tarefa 3]

[5. FORMATO]
Estruture a resposta como:
1. [Seção 1]
2. [Seção 2]
3. [Seção 3]

[6. CRITÉRIOS]
A solução deve:
✓ [Critério 1]
✓ [Critério 2]
✓ [Critério 3]
```

### Dicas de Formulação

1. **Use verbos de ação claros**
   - ✅ Otimize, Refatore, Implemente, Analise, Compare
   - ❌ Melhore, Ajude, Dê uma olhada

2. **Seja específico no formato**
   - ✅ "Liste em tabela markdown com colunas X, Y, Z"
   - ❌ "Organize de forma clara"

3. **Inclua exemplos quando possível**
   - "Como neste exemplo: [exemplo]"
   - "Similar a: [referência]"

4. **Mencione o que NÃO fazer**
   - "Não use bibliotecas externas (apenas stdlib)"
   - "Não mude a interface pública da função"

### Exemplo Completo

```markdown
Você é um DBA especializado em otimização de queries PostgreSQL.

CONTEXTO:
- Sistema: E-commerce com 50M pedidos, 5M usuários
- PostgreSQL 14 em AWS RDS (db.r5.large)
- Query atual demora 30s, timeout configurado em 10s
- Índices: orders(id, user_id), users(id)

PROBLEMA:
Query de relatório de pedidos está causando timeouts em produção.
Clientes não conseguem ver histórico completo de compras.

QUERY ATUAL:
```sql
SELECT *
FROM orders
JOIN users ON orders.user_id = users.id
WHERE orders.created_at > '2024-01-01';
```

TAREFA:
Otimize esta query para:
1. Executar em < 2 segundos
2. Retornar mesmos dados
3. Funcionar com volume crescente (projetamos 100M pedidos em 1 ano)

FORMATO:
1. **Análise do Problema:** Por que está lento? (explain plan)
2. **Query Otimizada:** SQL melhorado com comentários
3. **Índices Necessários:** CREATE INDEX statements
4. **Ganho Esperado:** Estimativa de melhoria
5. **Trade-offs:** O que estamos sacrificando? (espaço em disco?)

CONSTRAINTS:
✓ Manter PostgreSQL (não migrar para outro DB)
✓ Não usar materialized views (dados devem ser real-time)
✓ Otimização deve ser implementável em < 1 hora
```

---

## Fase 4: Avaliar Resposta ✅

**Objetivo:** Validar se a resposta atende suas necessidades.

### Checklist de Avaliação

#### 1. **A IA Entendeu o Problema?**
- [ ] Resposta aborda o problema certo?
- [ ] Considerou o contexto fornecido?
- [ ] Não inventou informações que você não deu?

**Se não:** Reformule o problema mais claramente (volta à Fase 1)

#### 2. **A Resposta é Completa?**
- [ ] Cobriu todos os aspectos pedidos?
- [ ] Formato está correto?
- [ ] Nível de detalhe é adequado?

**Se não:** Peça complementação específica (Fase 5)

#### 3. **A Resposta é Correta?**
- [ ] Tecnicamente sólida?
- [ ] Sem erros óbvios?
- [ ] Segue melhores práticas?

**Se não:** Corrija com feedback específico (Fase 5)

#### 4. **A Resposta é Acionável?**
- [ ] Você consegue implementar?
- [ ] Passos estão claros?
- [ ] Não falta informação crítica?

**Se não:** Peça mais detalhes (Fase 5)

### Técnica: Validação em Camadas

```
CAMADA 1: Validação Rápida (30 segundos)
└── Resposta faz sentido? É relevante?

CAMADA 2: Validação Estrutural (2 minutos)
└── Formato correto? Completa? Organizada?

CAMADA 3: Validação Técnica (5-10 minutos)
└── Correta? Sem erros? Segue padrões?

CAMADA 4: Validação Prática (teste real)
└── Funciona? Resolve o problema? Efeitos colaterais?
```

### Exemplo de Avaliação

**Resposta da IA:**
```sql
-- Otimização sugerida
CREATE INDEX idx_orders_created_at ON orders(created_at);

SELECT o.id, o.total, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.created_at > '2024-01-01';
```

**Avaliação:**

✅ **Positivo:**
- Criou índice relevante (created_at)
- Removeu SELECT * (projeta apenas colunas necessárias)
- Sintaxe está correta

⚠️ **Questões:**
- E se precisarmos de mais colunas no futuro?
- Índice simples vs composto (created_at, user_id)?
- Estimativa de ganho não foi fornecida

❌ **Faltou:**
- EXPLAIN plan (análise do problema)
- Índice composto para otimizar JOIN
- Trade-offs (quanto de espaço o índice vai usar?)

**Decisão:** Refinar (Fase 5)

---

## Fase 5: Refinar 🔧

**Objetivo:** Melhorar a resposta baseado na avaliação.

### Estratégias de Refinamento

#### 1. **Adicionar Contexto Faltante**
```markdown
"A resposta está boa, mas faltou considerar que:
- [Informação que faltou]
- [Constraint não mencionada]
Refaça levando isso em conta."
```

#### 2. **Corrigir Erros Específicos**
```markdown
"Há 2 problemas:
1. [Problema 1]: [descrição] → [como deveria ser]
2. [Problema 2]: [descrição] → [como deveria ser]
Corrija esses pontos mantendo o resto."
```

#### 3. **Expandir Seção Específica**
```markdown
"A parte sobre [X] ficou superficial.
Expanda esta seção incluindo:
- [Aspecto 1]
- [Aspecto 2]
- [Aspecto 3]"
```

#### 4. **Mudar Formato**
```markdown
"O conteúdo está correto mas o formato não é ideal.
Reorganize como:
[exemplo do formato desejado]"
```

#### 5. **Peça Alternativas**
```markdown
"Esta solução funciona, mas é complexa.
Há alternativa mais simples?
Compare: [Solução atual] vs [Alternativa mais simples]"
```

### Exemplo de Refinamento

**Refinamento da query anterior:**
```markdown
"A otimização está no caminho certo, mas faltou:

1. **EXPLAIN Plan:** Rode EXPLAIN ANALYZE na query original
   e mostre onde está o gargalo.

2. **Índice Composto:** Em vez de índice simples em created_at,
   considere índice composto:
   CREATE INDEX idx_orders_created_user ON orders(created_at, user_id);
   Explique se isso seria melhor e por quê.

3. **Estimativa de Ganho:** Com 50M registros, quanto você espera
   de melhoria? (de 30s para quantos segundos?)

4. **Tamanho do Índice:** Aproximadamente quanto de espaço em disco
   esse índice vai ocupar?

Mantenha a query otimizada que você já fez, apenas adicione esses pontos."
```

---

## Fase 6: Validar & Aplicar ✨

**Objetivo:** Confirmar que a solução funciona no mundo real.

### Checklist de Validação Final

#### Antes de Aplicar:
- [ ] **Code Review Mental:** Você entende a solução completamente?
- [ ] **Análise de Riscos:** O que pode dar errado?
- [ ] **Reversibilidade:** Consegue reverter se necessário?
- [ ] **Impacto:** Quem/o que é afetado?

#### Aplicação Segura:
1. **Ambiente de Teste Primeiro**
   - Nunca aplique direto em produção
   - Teste em staging/dev

2. **Validação Incremental**
   - Aplique uma parte, valide
   - Depois aplique o resto

3. **Monitoramento**
   - Observe métricas durante e após aplicação
   - Tenha rollback pronto

4. **Documentação**
   - O que mudou?
   - Por quê?
   - Como reverter?

### Exemplo de Validação

**Solução Final da IA:**
```sql
-- 1. Criar índice composto
CREATE INDEX CONCURRENTLY idx_orders_created_user
ON orders(created_at DESC, user_id);

-- 2. Query otimizada
SELECT o.id, o.total, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.created_at > '2024-01-01'
AND o.created_at < CURRENT_DATE;
```

**Plano de Validação:**

1. ✅ **Em Desenvolvimento:**
   ```sql
   -- Testar com subset de dados
   EXPLAIN ANALYZE [query];
   -- Validar: tempo < 2s? Plano correto?
   ```

2. ✅ **Em Staging:**
   ```sql
   -- Criar índice (CONCURRENTLY para não travar)
   -- Rodar query sob carga simulada
   -- Validar: métricas ok? Sem lock contention?
   ```

3. ✅ **Em Produção (gradual):**
   ```sql
   -- Criar índice fora do horário de pico
   -- Monitorar por 24h
   -- Deploy da query otimizada
   -- Observar: latência, CPU, I/O
   ```

4. ✅ **Pós-Deploy:**
   - [ ] Latência p95 < 2s? ✅
   - [ ] Zero erros em 1 semana? ✅
   - [ ] Clientes conseguem ver histórico? ✅
   - [ ] Documentado no runbook? ✅

---

## Feedback Loops: Melhorando o Ciclo

### Loop 1: **Captura de Padrões**

Após 5-10 ciclos, identifique padrões:
- Que tipos de problema você resolve frequentemente?
- Quais contextos você sempre precisa fornecer?
- Que formato de resposta você prefere?

→ Crie **templates** ([veja guia de templates](../2-engineering/01-templates-reutilizaveis.md))

### Loop 2: **Refinamento de Processo**

Meça sua eficiência:
- Quantas iterações até solução satisfatória?
- Quanto tempo em cada fase?
- Onde você se repete?

→ Otimize os gargalos

### Loop 3: **Evolução de Conhecimento**

Documente seus aprendizados:
- O que funcionou bem?
- Que erros evitar?
- Quais heurísticas aplicar?

→ Construa sua **biblioteca pessoal de conhecimento**

---

## Antipadrões do Ciclo

### 🚫 Antipadrão 1: Pular a Fase 1

```
❌ "IA, crie um sistema de autenticação"
```

**Problema:** Problema não está claro. IA vai fazer muitas suposições.

**Correção:** Defina o problema primeiro.

---

### 🚫 Antipadrão 2: Contexto Insuficiente

```
❌ "Por que este código está lento?"
[código sem informações de escala, infraestrutura, métricas]
```

**Problema:** IA não tem dados para diagnosticar.

**Correção:** Fase 2 (Preparar Contexto).

---

### 🚫 Antipadrão 3: Aceitar Primeira Resposta Sem Avaliar

```
❌ Recebe código da IA → Copia direto pra produção
```

**Problema:** Código pode ter bugs, não considerar edge cases, não seguir padrões do projeto.

**Correção:** SEMPRE faça Fase 4 (Avaliar).

---

### 🚫 Antipadrão 4: Refinamento Sem Rumo

```
❌ "Não gostei, tenta de novo"
❌ "Ainda não está bom"
❌ "Faz diferente"
```

**Problema:** Feedback vago não ajuda a IA a melhorar.

**Correção:** Feedback específico (Fase 5).

---

### 🚫 Antipadrão 5: Não Validar em Ambiente Real

```
❌ "A IA disse que funciona, então deve funcionar"
```

**Problema:** Código/solução pode não funcionar no seu contexto específico.

**Correção:** Sempre valide (Fase 6).

---

## Métricas de um Ciclo Eficiente

### Quantitativas
- **Iterações até solução:** < 5 iterações (idealmente 2-3)
- **Tempo total:** Proporcional à complexidade do problema
- **Taxa de sucesso:** > 80% dos ciclos chegam em solução satisfatória

### Qualitativas
- **Clareza:** Você entende a solução?
- **Confiança:** Você confiaria em colocar em produção?
- **Aprendizado:** Você aprendeu algo novo no processo?
- **Reutilização:** A solução é generalizável?

---

## Próximos Passos

Agora que você domina o ciclo de trabalho:

- **[06-estruturacao-contexto.md]** - Como estruturar contexto de forma eficiente
- **[07-especificacao-requisitos.md]** - Como transformar ideias vagas em specs precisas
- **[../2-engineering/]** - Técnicas avançadas para otimizar cada fase

## 🌱 Reflexão Final

O ciclo de trabalho com IA não é linear - é **espiral**:
- Cada volta você sobe um nível
- Cada iteração adiciona clareza
- Cada ciclo completo gera aprendizado

Pense assim: você não está "usando a IA", você está **colaborando** com ela.

**Comece hoje:**
1. Escolha um problema real
2. Siga o ciclo completo (6 fases)
3. Documente: o que funcionou? O que você faria diferente?
4. No próximo problema, aplique seus aprendizados

Em 1 mês, o ciclo será natural. Em 3 meses, será automático.

---

**Tags:** #ciclo #workflow #processo #colaboracao #iteracao

**Relacionados:**
- [[04-refinamento-iterativo]] - Como refinar prompts progressivamente
- [[06-estruturacao-contexto]] - Como preparar contexto eficientemente
- [[../2-engineering/01-templates-reutilizaveis]] - Capture padrões recorrentes
- [[../4-workflows/01-workflow-analise-problemas]] - Aplicação prática do ciclo
