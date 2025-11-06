# 🎯 O que é Prompt Engineering?

## Introdução

Prompt engineering é a arte e ciência de **comunicar efetivamente com modelos de IA** através de instruções textuais (prompts). Não é apenas "falar com a IA" - é estruturar suas solicitações de forma que a IA compreenda precisamente o que você quer e entregue resultados consistentes e de alta qualidade.

## Por que Prompt Engineering Importa?

### O Problema da Comunicação Ambígua

Imagine que você pede a um colega: "Me ajuda com esse negócio aqui?"

O colega provavelmente vai perguntar:
- Que negócio?
- Qual tipo de ajuda?
- Qual é o contexto?
- O que você já tentou?

**Com IA é a mesma coisa** - mas a IA não pode fazer perguntas de esclarecimento facilmente. Ela precisa trabalhar com o que você forneceu. Um prompt mal estruturado resulta em:

❌ Respostas genéricas e inúteis
❌ Resultados inconsistentes (cada vez uma resposta diferente)
❌ Informações incorretas ou inventadas (alucinações)
❌ Perda de tempo em iterações desnecessárias

### O Poder de um Bom Prompt

Um prompt bem engenheirado funciona como um **briefing completo**:

✅ A IA entende exatamente o que fazer
✅ Os resultados são consistentes e previsíveis
✅ Você economiza tempo (acerta de primeira)
✅ A qualidade do output é profissional

## Os Três Pilares de um Bom Prompt

### 1. **CONTEXTO** - Onde estamos?

A IA precisa saber o cenário:
- Qual é o domínio? (programação, marketing, análise de dados...)
- Qual é a situação atual?
- Quais são as restrições? (tecnologias, tempo, recursos...)

**Exemplo ruim:**
```
"Crie uma função de autenticação"
```

**Exemplo bom:**
```
"Estou desenvolvendo uma API REST em Node.js/Express.
Preciso implementar autenticação JWT para proteger endpoints.
O projeto já usa PostgreSQL e bcrypt para hashing de senhas."
```

### 2. **OBJETIVO** - O que queremos alcançar?

Seja específico sobre o resultado desejado:
- Qual é o entregável final?
- Quais critérios de sucesso?
- O que define "pronto"?

**Exemplo ruim:**
```
"Melhore o código"
```

**Exemplo bom:**
```
"Refatore esta função para:
- Reduzir complexidade ciclomática de 15 para < 10
- Adicionar tratamento de erros com try/catch
- Incluir logging de operações críticas
- Manter a mesma interface pública (não quebrar API)"
```

### 3. **FORMATO** - Como deve ser a resposta?

Defina a estrutura da resposta:
- Texto, código, tabela, lista?
- Quanto detalhe?
- Qual tom/estilo?

**Exemplo ruim:**
```
"Explique microservices"
```

**Exemplo bom:**
```
"Explique o padrão de microservices em 3 parágrafos:
1. Definição simples (para não-técnicos)
2. Benefícios principais (3-4 bullet points)
3. Quando NÃO usar (trade-offs)

Use linguagem clara, sem jargões desnecessários."
```

## Anatomia de um Prompt Efetivo

Um prompt bem estruturado segue este template:

```
[PAPEL/ROLE]
Você é um [especialista em X] com experiência em [domínio Y].

[CONTEXTO]
Situação atual: [descrição do cenário]
Constraints: [limitações técnicas/organizacionais]
Objetivo: [o que queremos alcançar]

[TAREFA]
Preciso que você [ação específica]:
1. [Sub-tarefa 1]
2. [Sub-tarefa 2]
3. [Sub-tarefa 3]

[FORMATO DE SAÍDA]
Estruture a resposta como:
- [Seção 1]: [descrição]
- [Seção 2]: [descrição]

[CRITÉRIOS DE QUALIDADE]
A resposta deve:
✓ [Critério 1]
✓ [Critério 2]
✓ [Critério 3]
```

## Exemplo Prático: Antes vs Depois

### ❌ Prompt Ruim

```
"Crie um script para backup"
```

**Problemas:**
- Que tipo de backup? (arquivos, banco, sistema?)
- Qual linguagem/tecnologia?
- Quais requisitos? (agendamento, compressão, logs?)
- Onde armazenar os backups?

### ✅ Prompt Bom

```
Você é um engenheiro DevOps especializado em automação e backup strategies.

CONTEXTO:
- Sistema: Aplicação web em Node.js + PostgreSQL
- Infraestrutura: Linux Ubuntu 22.04
- Objetivo: Backup diário automatizado do banco de dados
- Retenção: Manter últimos 7 dias, depois semanal por 1 mês

TAREFA:
Crie um script Bash que:
1. Faça dump do PostgreSQL (formato custom, comprimido)
2. Salve em /backups/db/ com timestamp no nome
3. Implemente rotação automática (apague backups > 7 dias)
4. Envie log de sucesso/falha para /var/log/backup.log
5. Configure para rodar via cron às 2AM

FORMATO DE SAÍDA:
1. Script completo com comentários explicativos
2. Linha do crontab
3. Checklist de validação (como testar manualmente)

REQUISITOS:
✓ Error handling robusto (o que fazer se dump falhar?)
✓ Validação de espaço em disco antes de backup
✓ Exit codes corretos (0=sucesso, 1=erro)
✓ Logging detalhado com timestamps
```

**Resultado:**
A IA entregará um script completo, testável e production-ready, em vez de um exemplo genérico.

## Princípios Fundamentais

### 1. **Seja Específico, Não Vago**
- ❌ "Melhore isso"
- ✅ "Reduza complexidade de O(n²) para O(n log n) usando merge sort"

### 2. **Dê Exemplos Quando Possível**
- Mostre o formato de input/output esperado
- "Como isso, mas para este caso: [exemplo]"

### 3. **Itere Incrementalmente**
- Comece simples, adicione detalhes progressivamente
- Não tente fazer tudo em um único prompt mega-complexo

### 4. **Explicite Constraints**
- O que PODE mudar?
- O que NÃO PODE mudar?
- "Mantenha compatibilidade com API existente"

### 5. **Peça Justificativas**
- "Explique por que escolheu esta abordagem"
- "Compare com alternativas X e Y"
- Isso melhora a qualidade do raciocínio da IA

## Antipadrões Comuns (Evite)

### 🚫 Antipadrão 1: Prompt Minimalista
```
"Código para login"
```
**Por quê é ruim:** Ambíguo demais. Login de quê? Como? Onde?

### 🚫 Antipadrão 2: Prompt Enciclopédico
```
[10 parágrafos de contexto]
[20 requisitos]
[15 constraints]
"Agora faça tudo isso"
```
**Por quê é ruim:** Informação demais dificulta foco. Quebre em múltiplos prompts.

### 🚫 Antipadrão 3: Prompt Implícito
```
"Você sabe o que fazer"
```
**Por quê é ruim:** A IA não lê sua mente. Seja explícito.

### 🚫 Antipadrão 4: Prompt Contraditório
```
"Seja breve mas muito detalhado"
"Simples porém completo"
```
**Por quê é ruim:** Instruções conflitantes confundem a IA.

## Checklist de Qualidade de Prompt

Antes de enviar um prompt, valide:

✓ **Contexto:** A IA tem informação suficiente sobre o cenário?
✓ **Objetivo:** Está claro o que constitui sucesso?
✓ **Formato:** Especifiquei como quero a resposta?
✓ **Constraints:** Mencionei limitações importantes?
✓ **Ação:** Usei verbos claros? (crie, refatore, analise, compare...)
✓ **Testabilidade:** A IA pode validar se entregou corretamente?

## Próximos Passos

Agora que você entende o básico de prompt engineering, explore:

- **[02-tipos-de-prompts.md]** - Diferentes categorias de prompts e quando usar cada uma
- **[03-contexto-e-role-playing.md]** - Como usar roles e contexto avançado
- **[../2-engineering/]** - Técnicas avançadas de engenharia de prompts

## Exercício Prático

**Desafio:** Transforme este prompt ruim em um bom prompt:

```
"Explica API REST"
```

**Pense:**
- Quem é a audiência? (desenvolvedor júnior? arquiteto sênior?)
- Qual profundidade? (visão geral? implementação detalhada?)
- Qual formato? (texto? diagrama? código de exemplo?)
- Qual contexto? (para que estou aprendendo isso?)

---

**Tags:** #fundamentals #prompt-engineering #comunicacao-ia #contexto #objetivo #formato

**Relacionados:**
- [[02-tipos-de-prompts]]
- [[03-contexto-e-role-playing]]
- [[../2-engineering/01-templates-reutilizaveis]]
