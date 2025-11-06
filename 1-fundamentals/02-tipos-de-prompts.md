# 📚 Tipos de Prompts e Quando Usar Cada Um

## Introdução

Assim como diferentes problemas exigem diferentes ferramentas, **diferentes objetivos exigem diferentes tipos de prompts**. Este guia apresenta as principais categorias de prompts e ensina quando aplicar cada uma.

Pense em tipos de prompt como "modos de operação" da IA - cada um otimizado para um propósito específico.

## Taxonomia de Prompts

### 1. **Prompt de Instrução Direta** 📝

**O que é:** Comando claro e objetivo para uma ação específica.

**Quando usar:**
- Tarefas bem definidas
- Você sabe exatamente o que quer
- Não precisa de exploração ou alternativas

**Estrutura:**
```
[Ação] + [Objeto] + [Critérios]
```

**Exemplos:**

```markdown
✅ Bom exemplo:
"Converta esta função recursiva para iterativa:
[código]
Mantenha a mesma assinatura e comportamento."

✅ Bom exemplo:
"Liste os 5 principais frameworks JavaScript para
desenvolvimento frontend em 2024, ordenados por popularidade."
```

**Use quando:**
- ✓ A tarefa é clara e bem escopo
- ✓ Você precisa de uma resposta rápida e direta
- ✓ Não há ambiguidade sobre o que fazer

---

### 2. **Prompt de Análise e Comparação** 🔍

**O que é:** Solicita avaliação, comparação ou crítica de opções.

**Quando usar:**
- Precisa tomar uma decisão técnica
- Quer entender trade-offs
- Busca validar uma escolha

**Estrutura:**
```
"Compare [A] vs [B] considerando:
- [Critério 1]
- [Critério 2]
- [Critério 3]
Para o contexto de [cenário específico]"
```

**Exemplos:**

```markdown
✅ Bom exemplo:
"Compare REST vs GraphQL vs gRPC para uma API de microservices
considerando:
- Performance (latência, throughput)
- Complexidade de implementação
- Curva de aprendizado do time
- Custos de infraestrutura

Contexto: E-commerce com 100k usuários/dia, time de 5 devs,
stack atual: Node.js + PostgreSQL."

✅ Bom exemplo:
"Analise este código e identifique:
1. Problemas de segurança
2. Oportunidades de otimização
3. Violações de SOLID
[código]"
```

**Use quando:**
- ✓ Precisa tomar decisão arquitetural
- ✓ Quer validar abordagem antes de implementar
- ✓ Busca identificar riscos ou limitações

---

### 3. **Prompt de Geração Criativa** 🎨

**O que é:** Pede à IA para criar algo do zero com liberdade criativa.

**Quando usar:**
- Precisa de ideias/brainstorming
- Quer explorar possibilidades
- Busca soluções inovadoras

**Estrutura:**
```
"Crie/Gere/Proponha [artefato] que:
- [Requisito obrigatório 1]
- [Requisito obrigatório 2]
Pode ser criativo com [aspecto flexível]"
```

**Exemplos:**

```markdown
✅ Bom exemplo:
"Proponha 3 arquiteturas diferentes para um sistema de notificações
em tempo real que suporte:
- 1M+ conexões simultâneas
- Entrega garantida (at-least-once)
- Múltiplos canais (email, SMS, push, webhook)

Para cada proposta, inclua:
- Stack tecnológico
- Custo estimado (AWS/GCP)
- Pontos fortes e fracos"

✅ Bom exemplo:
"Gere 5 nomes para uma biblioteca JavaScript que:
- Facilita state management sem boilerplate
- Foca em TypeScript
- É minimalista e performática
Inclua um tagline de 1 linha para cada nome."
```

**Use quando:**
- ✓ Está na fase de discovery/ideação
- ✓ Quer explorar múltiplas alternativas
- ✓ Precisa de inspiração ou perspectivas diferentes

---

### 4. **Prompt de Refatoração/Melhoria** 🔧

**O que é:** Pede para melhorar algo existente mantendo funcionalidade.

**Quando usar:**
- Código legado que funciona mas precisa evoluir
- Quer aplicar melhores práticas
- Busca otimização sem reescrever do zero

**Estrutura:**
```
"Refatore/Melhore [código/design] para:
- [Melhoria 1]
- [Melhoria 2]
Mantenha: [o que NÃO pode mudar]"
```

**Exemplos:**

```markdown
✅ Bom exemplo:
"Refatore esta classe para:
- Aplicar padrão Strategy (eliminar switch case)
- Adicionar injeção de dependências
- Melhorar testabilidade
- Reduzir acoplamento

Mantenha:
- A interface pública (não quebrar clients)
- A mesma funcionalidade
[código]"

✅ Bom exemplo:
"Otimize esta query SQL que demora 8 segundos:
[query]
Considerando:
- Tabela users tem 10M registros
- Índices atuais: [lista]
- PostgreSQL 14
Explique o raciocínio das mudanças."
```

**Use quando:**
- ✓ Algo funciona mas não está ideal
- ✓ Precisa manter compatibilidade
- ✓ Quer melhorar qualidade incremental

---

### 5. **Prompt de Debugging/Diagnóstico** 🐛

**O que é:** Solicita identificação e solução de problemas.

**Quando usar:**
- Algo não funciona e você não sabe por quê
- Comportamento inesperado
- Precisa entender causa raiz

**Estrutura:**
```
"Identifique o problema em [código/sistema]:
Sintomas: [comportamento observado]
Esperado: [comportamento correto]
Contexto: [ambiente, dados, logs]"
```

**Exemplos:**

```markdown
✅ Bom exemplo:
"Este endpoint retorna 500 intermitentemente:
[código]

Sintomas:
- Funciona em 80% das requisições
- Falha aparece em picos de tráfego (>100 req/s)
- Log mostra: 'Connection pool exhausted'

Ambiente:
- Node.js 18, PostgreSQL, conexões max=20
- 4 instâncias atrás de load balancer

Diagnostique a causa raiz e sugira solução."

✅ Bom exemplo:
"Por que este React component re-renderiza infinitamente?
[código]
Comportamento: Loop infinito de renders em useEffect
Esperado: Renderizar uma vez no mount"
```

**Use quando:**
- ✓ Está travado em um bug
- ✓ Comportamento é inconsistente/intermitente
- ✓ Precisa de uma segunda opinião sobre causa

---

### 6. **Prompt de Documentação/Explicação** 📖

**O que é:** Pede para explicar ou documentar algo técnico.

**Quando usar:**
- Código complexo sem documentação
- Precisa de README/tutoriais
- Quer explicação didática de conceito

**Estrutura:**
```
"Explique/Documente [assunto] para [audiência]:
- [Aspecto 1 a cobrir]
- [Aspecto 2 a cobrir]
Formato: [estrutura desejada]"
```

**Exemplos:**

```markdown
✅ Bom exemplo:
"Documente esta API REST para desenvolvedores externos:
[código]

Inclua:
- Descrição de cada endpoint (propósito, params, response)
- Exemplos de uso com curl
- Códigos de erro possíveis
- Rate limits e autenticação
Formato: OpenAPI 3.0 (Swagger)"

✅ Bom exemplo:
"Explique como funciona o algoritmo de consenso Raft
para um desenvolvedor backend com experiência em DBs,
mas sem background em sistemas distribuídos.

Estrutura:
1. Problema que resolve (por que existe?)
2. Como funciona (fluxo step-by-step)
3. Garantias que oferece
4. Trade-offs vs alternativas (Paxos, etc)
Use analogias quando possível."
```

**Use quando:**
- ✓ Precisa compartilhar conhecimento com time
- ✓ Código sem docs precisa ser mantido
- ✓ Quer aprender/ensinar um conceito

---

### 7. **Prompt de Planejamento/Design** 🏗️

**O que é:** Solicita arquitetura, design ou plano de implementação.

**Quando usar:**
- Antes de começar a codar
- Projeto grande que precisa estruturação
- Quer validar abordagem antes de investir tempo

**Estrutura:**
```
"Desenhe [arquitetura/plano] para [sistema]:
Requisitos: [funcionais e não-funcionais]
Constraints: [limitações]
Entregue: [diagramas, fases, justificativas]"
```

**Exemplos:**

```markdown
✅ Bom exemplo:
"Desenhe arquitetura de microservices para sistema de streaming
de vídeo (tipo Netflix):

Requisitos:
- 10M usuários, 100k vídeos
- Transcodificação automática (múltiplas resoluções)
- Recomendação personalizada
- Analytics em tempo real

Constraints:
- Budget: $50k/mês AWS
- Time: 8 devs
- Lançamento: 6 meses

Entregue:
1. Diagrama C4 (system context + containers)
2. Stack tecnológico com justificativas
3. Plano de implementação em fases
4. Principais riscos técnicos"

✅ Bom exemplo:
"Crie plano de migração de monolito Rails para microservices:
Situação atual: [descrição]
Objetivo: [estado desejado]
Incluir: estratégia de strangler pattern, ordem de extração
de serviços, pontos de validação"
```

**Use quando:**
- ✓ Começando projeto do zero
- ✓ Grande refatoração arquitetural
- ✓ Precisa convencer stakeholders (documentação de design)

---

### 8. **Prompt de Transformação de Formato** 🔄

**O que é:** Converte dados/código de um formato para outro.

**Quando usar:**
- Migração de tecnologias
- Integração entre sistemas
- Adaptação de dados

**Estrutura:**
```
"Converta [formato origem] para [formato destino]:
[dados/código]
Requisitos: [preservar X, mapear Y para Z]"
```

**Exemplos:**

```markdown
✅ Bom exemplo:
"Converta este schema SQL para Prisma schema:
[SQL DDL]
Requisitos:
- Preservar todas constraints
- Mapear tipos corretamente
- Adicionar índices equivalentes"

✅ Bom exemplo:
"Transforme esta configuração YAML do Docker Compose
para Kubernetes manifests:
[docker-compose.yml]
Target: K8s 1.28
Incluir: Deployment, Service, ConfigMap, Secret"
```

**Use quando:**
- ✓ Migrando entre tecnologias
- ✓ Integrando sistemas diferentes
- ✓ Precisa de adapter/translator

---

## Combinando Tipos de Prompts

Muitas vezes você precisará **combinar tipos** em uma conversa:

### Exemplo de Fluxo Completo:

```markdown
1. **Prompt de Análise:**
   "Compare PostgreSQL vs MongoDB para meu caso de uso: [detalhes]"
   → IA recomenda PostgreSQL

2. **Prompt de Design:**
   "Desenhe schema PostgreSQL para: [requisitos]"
   → IA entrega schema

3. **Prompt de Implementação:**
   "Crie migrations Prisma para este schema: [schema]"
   → IA gera código

4. **Prompt de Documentação:**
   "Documente este schema para o time: [schema]"
   → IA cria docs

5. **Prompt de Testes:**
   "Gere testes unitários para estas queries: [código]"
   → IA cria suite de testes
```

## Matriz de Decisão: Qual Tipo Usar?

| Situação | Tipo de Prompt | Exemplo |
|----------|----------------|---------|
| Sei exatamente o que quero | Instrução Direta | "Crie função X que faça Y" |
| Preciso decidir entre opções | Análise/Comparação | "Compare A vs B para contexto C" |
| Estou explorando possibilidades | Geração Criativa | "Sugira 5 formas de resolver X" |
| Algo funciona mas não está bom | Refatoração | "Melhore este código para Y" |
| Algo não funciona | Debugging | "Por que isto falha quando Z?" |
| Preciso explicar para alguém | Documentação | "Explique X para audiência Y" |
| Começando projeto grande | Planejamento | "Desenhe arquitetura para X" |
| Migrando tecnologias | Transformação | "Converta A para formato B" |

## Antipadrões: Tipos Errados para o Objetivo

### 🚫 Usar Instrução Direta quando precisa Análise

```
❌ "Implemente autenticação com JWT"
```
**Problema:** Assume que JWT é a melhor escolha sem validar.

```
✅ "Compare JWT vs Sessions vs OAuth2 para:
   [contexto]
   Depois, implemente a melhor opção"
```

### 🚫 Usar Geração Criativa quando precisa Precisão

```
❌ "Crie uma solução criativa para autenticação"
```
**Problema:** Autenticação não é lugar para experimentação criativa.

```
✅ "Implemente autenticação seguindo padrão OAuth 2.0:
   [especificações exatas]"
```

### 🚫 Usar Debugging quando o problema é Design

```
❌ "Por que meu sistema é lento?"
```
**Problema:** Muito genérico, pode ser problema arquitetural.

```
✅ "Analise a arquitetura e identifique gargalos:
   [diagrama + métricas]
   Sugira melhorias estruturais"
```

## Checklist de Seleção de Tipo

Antes de escrever o prompt, pergunte:

1. **Qual é meu objetivo principal?**
   - Executar tarefa → Instrução Direta
   - Tomar decisão → Análise
   - Explorar opções → Criativa
   - Melhorar existente → Refatoração
   - Resolver problema → Debugging
   - Comunicar → Documentação
   - Planejar → Design
   - Converter → Transformação

2. **Quanta liberdade a IA deve ter?**
   - Zero → Instrução Direta
   - Moderada → Análise/Refatoração
   - Alta → Criativa/Design

3. **Já existe algo implementado?**
   - Não → Criativa/Design/Instrução
   - Sim, funciona → Refatoração/Documentação
   - Sim, não funciona → Debugging

## Próximos Passos

Agora que você conhece os tipos de prompts:

- **[03-contexto-e-role-playing.md]** - Como usar contexto e roles para amplificar qualquer tipo de prompt
- **[../2-engineering/01-templates-reutilizaveis.md]** - Templates prontos para cada tipo
- **[../3-thinking/01-decomposicao-de-problemas.md]** - Como quebrar problemas complexos em múltiplos prompts

## Exercício Prático

Para cada cenário, identifique o tipo de prompt mais adequado:

1. "Preciso implementar cache na minha API mas não sei se uso Redis ou Memcached"
2. "Este código funciona mas está com 500 linhas, preciso organizar"
3. "A aplicação trava quando tem mais de 100 usuários simultâneos"
4. "Preciso de ideias de features inovadoras para meu app"
5. "Como funciona a concorrência em Go?"

**Respostas:** (1) Análise, (2) Refatoração, (3) Debugging, (4) Criativa, (5) Documentação

---

**Tags:** #fundamentals #tipos-prompts #taxonomia #decisao #estrategia

**Relacionados:**
- [[01-o-que-e-prompt-engineering]]
- [[03-contexto-e-role-playing]]
- [[../2-engineering/01-templates-reutilizaveis]]
