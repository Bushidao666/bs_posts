# 🎭 Contexto e Role-Playing: O Poder de Definir Persona

## Introdução

Imagine contratar um consultor sem dizer qual é sua área de expertise. Ele não saberia se deve pensar como engenheiro, designer, marqueteiro ou CFO. **Com IA é a mesma coisa** - definir uma "persona" (role) direciona todo o raciocínio do modelo.

Contexto + Role são os **alicerces** de um prompt efetivo. Este guia ensina como usar essas ferramentas para multiplicar a qualidade das respostas.

## Por Que Role-Playing Funciona?

### O Conceito de "Ativação de Conhecimento"

Modelos de IA foram treinados em textos de especialistas em milhares de domínios:
- Código de engenheiros de software
- Papers de pesquisadores
- Documentação técnica
- Livros especializados

Quando você diz **"Você é um arquiteto de software sênior"**, a IA:

✅ Ativa padrões linguísticos desse domínio
✅ Prioriza conhecimento relevante para essa role
✅ Adota o "estilo de pensamento" dessa expertise
✅ Considera trade-offs que um profissional desse nível consideraria

### Experimento: Com vs Sem Role

**❌ Sem Role:**
```
"Como implementar autenticação?"
```

**Resposta típica:**
> "Existem várias formas: senhas, tokens, biometria..."
> (Genérico, superficial, não acionável)

**✅ Com Role:**
```
"Você é um engenheiro de segurança especializado em autenticação.
Como implementar autenticação para uma API REST crítica
(sistema bancário) que precisa:
- MFA obrigatório
- Conformidade PCI-DSS
- Auditoria completa de acessos"
```

**Resposta típica:**
> "Para contexto bancário com PCI-DSS, recomendo:
> 1. OAuth 2.0 + OpenID Connect (padrão do setor)
> 2. MFA com TOTP (RFC 6238) + backup codes
> 3. JWT de curta duração (15min) + refresh tokens
> 4. Logging de todos eventos de auth em sistema SIEM
> [código detalhado com bibliotecas específicas]"

**Diferença:** A role trouxe conhecimento especializado, melhores práticas do domínio e atenção a regulamentações.

## Anatomia de um Role Efetivo

### Estrutura de Role

```
Você é um [TÍTULO/EXPERTISE] com experiência em [DOMÍNIO].

[OPCIONAL: Características da persona]
- Anos de experiência: X
- Especialidades: [lista]
- Stack técnico favorito: [tecnologias]
- Abordagem: [pragmático/teórico/etc]
```

### Exemplo Completo:

```markdown
Você é um Tech Lead de um time de backend com 8 anos de experiência.

Características:
- Especialista em: Node.js, Go, PostgreSQL, Redis, RabbitMQ
- Trabalhou em: Fintech (3 anos), E-commerce (5 anos)
- Foco: Código production-ready (não POCs)
- Estilo: Pragmático, prioriza simplicidade e manutenibilidade
- Conhece trade-offs de: performance vs complexidade

Quando responder:
✓ Considere que o código irá para produção (error handling, logs, etc)
✓ Mencione onde podem surgir problemas em escala
✓ Sugira observabilidade desde o início
✓ Justifique escolhas técnicas
```

## Tipos de Roles e Quando Usar

### 1. **Role de Especialista Técnico** 👨‍💻

**Quando usar:** Tarefas técnicas profundas

**Exemplos:**
```
✅ "Você é um DBA especializado em otimização de queries PostgreSQL"
✅ "Você é um engenheiro de ML com foco em NLP"
✅ "Você é um arquiteto de sistemas distribuídos"
```

**Benefício:** Respostas com profundidade técnica, melhores práticas, casos edge

---

### 2. **Role de Professor/Mentor** 👨‍🏫

**Quando usar:** Aprendizado, explicações didáticas

**Exemplos:**
```
✅ "Você é um professor universitário de Ciência da Computação
    explicando conceitos para alunos de segundo semestre"

✅ "Você é um mentor que ensina programação para iniciantes
    usando analogias e exemplos do dia-a-dia"
```

**Benefício:** Linguagem clara, analogias, progressão pedagógica

---

### 3. **Role de Consultor Estratégico** 📊

**Quando usar:** Decisões arquiteturais, trade-offs de negócio

**Exemplos:**
```
✅ "Você é um CTO consultando uma startup sobre stack tecnológico"
✅ "Você é um arquiteto de soluções avaliando migração para cloud"
```

**Benefício:** Visão holística, considera custos/time/prazos, não só técnica

---

### 4. **Role de Revisor/Auditor** 🔍

**Quando usar:** Code review, análise de qualidade, security audit

**Exemplos:**
```
✅ "Você é um security engineer fazendo audit de código"
✅ "Você é um tech lead revisando PR antes de merge"
```

**Benefício:** Olhar crítico, identifica problemas que passariam despercebidos

---

### 5. **Role Híbrido** 🎭

**Quando usar:** Problemas que cruzam domínios

**Exemplos:**
```
✅ "Você é um Tech Lead com background em UX,
    balanceando performance técnica e experiência do usuário"

✅ "Você é um arquiteto de software com experiência em DevOps,
    considerando tanto design quanto operação/deployment"
```

**Benefício:** Perspectiva multidisciplinar, soluções equilibradas

## Contexto: O Segundo Pilar

Role diz **quem** está respondendo. Contexto diz **sobre o quê**.

### Camadas de Contexto

#### 1. **Contexto Técnico** ⚙️

```markdown
STACK:
- Backend: Node.js 18 + Express
- Database: PostgreSQL 14
- Cache: Redis 7
- Infra: AWS (ECS Fargate)

CONSTRAINTS:
- Não pode mudar DB (legacy data)
- Budget: $2k/mês AWS
- Time: 3 devs junior + 1 senior
```

#### 2. **Contexto de Negócio** 💼

```markdown
DOMÍNIO: Marketplace B2B

ESCALA:
- 50k usuários ativos/mês
- 10k transações/dia
- Pico: 500 req/min

CRITICIDADE:
- Downtime = perda direta de receita
- SLA: 99.9% uptime
```

#### 3. **Contexto Histórico** 📜

```markdown
SITUAÇÃO ATUAL:
- Sistema tem 3 anos
- Refatorado 1x (de PHP para Node)
- Problemas recorrentes: [lista]
- O que JÁ tentamos: [lista]

O QUE NÃO FUNCIONOU:
- Tentamos cache but invalidação era buggy
- Tentamos fila mas complicou debugging
```

#### 4. **Contexto de Objetivo** 🎯

```markdown
PROBLEMA:
Query de relatórios demora 30s (timeout em 10s)

OBJETIVO:
< 2s para 95% dos casos

POR QUÊ:
Clientes reclamando, churn aumentando
```

### Template de Contexto Completo

```markdown
Você é um [ROLE].

CONTEXTO TÉCNICO:
- Stack: [tecnologias]
- Infraestrutura: [onde roda]
- Constraints: [limitações]

CONTEXTO DO PROBLEMA:
- Situação atual: [estado]
- O que já tentamos: [histórico]
- Objetivo: [estado desejado]

CONTEXTO DE NEGÓCIO:
- Domínio: [área]
- Escala: [números]
- Criticidade: [impacto]

TAREFA:
[o que fazer]
```

## Exemplos Práticos: Antes vs Depois

### Exemplo 1: Debugging

**❌ Sem Role/Contexto:**
```
"Por que este código dá erro?
[código]"
```

**✅ Com Role/Contexto:**
```
Você é um engenheiro backend sênior especializado em Node.js.

CONTEXTO:
- Código: API REST em Express
- Ambiente: Produção, AWS Lambda
- Erro: Intermitente (20% das requests)
- Log: "Cannot read property 'user' of undefined"
- Quando: Apenas em picos de tráfego (>100 req/s)

HISTÓRICO:
- Em dev/staging funciona sempre
- Começou após deploy de feature de cache
- Cache: node-cache (in-memory)

CÓDIGO:
[código]

Diagnostique a causa raiz considerando ambiente serverless
(Lambda pode ter cold starts, instâncias diferentes, etc).
```

**Resultado:** A IA identifica que cache in-memory não funciona em Lambda (stateless), sugere Redis/ElastiCache.

---

### Exemplo 2: Design de Solução

**❌ Sem Role/Contexto:**
```
"Como fazer um sistema de notificações?"
```

**✅ Com Role/Contexto:**
```
Você é um arquiteto de software com 10 anos de experiência
em sistemas distribuídos de alta escala.

CONTEXTO DO PROJETO:
- Aplicação: E-commerce (tipo Mercado Livre)
- Escala: 1M usuários, 50k pedidos/dia
- Tipos de notificação:
  * Email (confirmação pedido, shipping updates)
  * SMS (código 2FA, alertas urgentes)
  * Push (promoções, status pedido)
  * Webhook (integrações com sellers)

REQUISITOS NÃO-FUNCIONAIS:
- Entrega garantida (at-least-once)
- Ordem não importa
- Latência: melhor esforço (não crítico se demorar alguns segundos)
- Custo: otimizar (emails custam, SMS custa mais)
- Observabilidade: rastrear falhas de entrega

CONSTRAINTS:
- Stack atual: Node.js + PostgreSQL + Redis
- Infra: AWS
- Budget: $5k/mês para notificações
- Time: 5 devs (familiarizados com microservices)

TAREFA:
Desenhe arquitetura de microserviço de notificações.
Inclua:
1. Diagrama de componentes (ASCII art ou Mermaid)
2. Stack tecnológico (com justificativas)
3. Como garantir entrega (retry logic, dead letter queue)
4. Como controlar custos (rate limiting, deduplicação)
5. Como observar saúde do sistema
```

**Resultado:** Solução production-ready com filas (SQS), workers, circuit breakers, métricas.

---

### Exemplo 3: Refatoração

**❌ Sem Role/Contexto:**
```
"Melhore este código:
[código]"
```

**✅ Com Role/Contexto:**
```
Você é um tech lead fazendo code review de um PR.

CONTEXTO:
- Autor: Dev júnior (3 meses de empresa)
- Código: Controller de checkout em e-commerce
- Problemas identificados:
  * 200 linhas (muito longo)
  * Lógica de negócio misturada com HTTP
  * Sem testes unitários
  * Não trata erros edge cases

OBJETIVO DA REFATORAÇÃO:
- Aplicar padrão service layer
- Separar concerns (HTTP vs lógica vs persistência)
- Tornar testável
- Manter COMPATIBILIDADE (API pública não pode mudar)

SEU TRABALHO:
1. Refatore o código seguindo princípios SOLID
2. Explique CADA mudança (é um momento de mentoria)
3. Mostre ONDE adicionar testes e O QUÊ testar
4. Seja gentil (dev júnior, foco em ensinar)

CÓDIGO ORIGINAL:
[código]
```

**Resultado:** Refatoração didática com explicações, mostrando boas práticas.

## Antipadrões de Role/Contexto

### 🚫 Antipadrão 1: Role Genérico Demais

```
❌ "Você é um programador"
```
**Problema:** Não ativa conhecimento especializado.

```
✅ "Você é um engenheiro backend especializado em Go,
   com foco em sistemas de alta performance (>10k req/s)"
```

---

### 🚫 Antipadrão 2: Contexto Excessivo e Irrelevante

```
❌ "Fundada em 2010, a empresa cresceu 50% ao ano,
   tem 200 funcionários, escritórios em 5 países...
   [3 parágrafos de história da empresa]
   ...agora, por favor, corrija este bug:
   [1 linha de código]"
```

**Problema:** Informação irrelevante dilui foco.

```
✅ "Este endpoint de login está retornando 500:
   [código + log de erro]
   Stack: Node.js + JWT
   Erro: 'secret is required' mas .env tem JWT_SECRET"
```

---

### 🚫 Antipadrão 3: Role Contraditório com Tarefa

```
❌ "Você é um designer de UX.
   Otimize esta query SQL de 30 segundos para < 2s"
```

**Problema:** Role não tem expertise para a tarefa.

```
✅ "Você é um DBA especializado em otimização de queries.
   [tarefa]"
```

---

### 🚫 Antipadrão 4: Contexto Implícito

```
❌ "Você conhece aquele sistema que discutimos antes?
   Adicione a feature de notificações."
```

**Problema:** IA não tem "memória" de conversas anteriores (a menos que esteja na mesma sessão).

```
✅ "Você é [role].
   Sistema atual: [descrição completa]
   Tarefa: Adicionar feature de notificações
   [requisitos]"
```

## Checklist de Role/Contexto

Antes de enviar, valide:

### Role:
- ✓ Especifiquei expertise relevante?
- ✓ O nível de senioridade está claro?
- ✓ A role tem conhecimento para resolver a tarefa?
- ✓ Mencionei características importantes? (pragmático, teórico, etc)

### Contexto:
- ✓ Dei informação técnica suficiente? (stack, versões, infra)
- ✓ Expliquei o problema claramente?
- ✓ Incluí constraints relevantes? (budget, time, skills)
- ✓ Mencionei histórico quando relevante? (o que já tentamos)
- ✓ Defini critérios de sucesso?
- ✓ Removi informação irrelevante?

## Técnicas Avançadas

### 1. **Multi-Role (Debate)**

```markdown
"Simule debate entre 3 personas:

1. Arquiteto de software (foca em design patterns, manutenibilidade)
2. SRE (foca em operação, observabilidade, custos)
3. Desenvolvedor do time (foca em velocidade, simplicidade)

Tópico: Devemos adotar microservices ou manter monolito?

Contexto: [dados do projeto]

Formato:
- Cada persona apresenta 3 argumentos
- Cada um responde argumentos dos outros
- Conclusão: consenso ou maioría?"
```

**Benefício:** Explora múltiplas perspectivas, identifica trade-offs.

---

### 2. **Role Progressivo (Mentoria)**

```markdown
"Explique arquitetura de microservices 3 vezes:

1. Para um estudante de computação (2º semestre)
2. Para um desenvolvedor júnior (1 ano de experiência)
3. Para um arquiteto sênior (foco em trade-offs)

Use a mesma estrutura, mas adapte linguagem e profundidade."
```

**Benefício:** Testa compreensão, identifica lacunas, cria material didático.

---

### 3. **Role com Constraints de Personalidade**

```markdown
"Você é um engenheiro minimalista obsessivo por simplicidade.

Filosofia:
- 'Simple > Clever'
- Odeio over-engineering
- Prefiro boring technology
- Delete code > Add code

Revise este design e sugira simplificações agressivas:
[design complexo]"
```

**Benefício:** Força perspectiva diferente, combate over-engineering.

## Próximos Passos

Agora que domina Role e Contexto:

- **[../2-engineering/02-composicao-de-prompts.md]** - Como construir prompts modulares com roles reutilizáveis
- **[../3-thinking/02-pensamento-de-primeira-principios.md]** - Use roles para pensar a partir de primeiros princípios
- **[../4-workflows/03-criacao-de-agentes-especializados.md]** - Crie "agentes virtuais" com roles persistentes

## Exercício Prático

**Desafio:** Transforme este prompt genérico adicionando role e contexto:

```
"Como implementar autenticação?"
```

**Pense:**
1. Que tipo de especialista seria ideal para responder?
2. Quais informações de contexto são essenciais?
   - Stack tecnológico?
   - Tipo de aplicação?
   - Requisitos de segurança?
   - Escala?
3. Há histórico relevante? (tentativas anteriores?)
4. Quais constraints? (tempo, budget, skills do time)

**Sua vez:** Reescreva o prompt seguindo o template deste guia.

---

**Tags:** #fundamentals #role-playing #contexto #personas #especialização

**Relacionados:**
- [[01-o-que-e-prompt-engineering]]
- [[02-tipos-de-prompts]]
- [[../2-engineering/02-composicao-de-prompts]]
- [[../4-workflows/03-criacao-de-agentes-especializados]]
