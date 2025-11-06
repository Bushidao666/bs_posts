---
guide_id: "checklists-validacoes"
version: 1.0.0
status: complete
updated: 2025-11-06
layer: 2-engineering
tags: [checklists, validacao, qualidade, criterios-objetivos, self-review]
related_guides: ["../1-fundamentals/07-especificacao-requisitos", "02-arquitetura-prompts-complexos"]
prerequisites: ["../1-fundamentals/07-especificacao-requisitos", "01-design-templates-universais"]
next_steps: ["../3-thinking/01-metodologias-analise-profunda", "../4-workflows/01-workflow-analise-problemas"]
concepts_defined: ["checklist-validacao", "criterios-objetivos", "self-review", "validacao-preventiva"]
concepts_referenced: ["requisitos-mensuraveis", "definicao-pronto", "template-universal"]
---

# ✅ Checklists e Validações: Garantindo Qualidade Sistematicamente

## Introdução: O Problema da Validação Inconsistente

Você criou um template perfeito. Executou. A IA gerou 50 páginas de output. E agora?

**Como saber se está bom?**

Opções ruins:
- ❌ "Parece bom" (subjetivo, inconsistente)
- ❌ Revisar tudo manualmente (demorado, propenso a erro)
- ❌ Implementar sem validar (risco alto)

**Solução: Checklists de validação sistemática.**

Assim como pilotos usam checklists pré-voo (nunca confiam apenas em "memória"), você precisa de **checklists objetivos** para validar qualidade de prompts, templates e outputs.

Este guia ensina como criar **sistemas de validação preventiva e self-review** que garantem qualidade consistente.

## O Que São Checklists de Validação?

### Definição

> **Checklist de Validação** é uma lista estruturada de critérios objetivos que determinam se um artefato (prompt, template, output, código) atende padrões de qualidade.

### Características de um Bom Checklist

1. **Objetivos** - Critérios mensuráveis (não "bom", mas "cobertura >80%")
2. **Completo** - Cobre todos aspectos críticos
3. **Acionável** - Items claros, binários (sim/não)
4. **Ordenado** - Prioridade (crítico → importante → desejável)
5. **Rápido** - Executável em <10 minutos

### Exemplo Comparativo

**❌ Checklist Ruim:**
```
- [ ] Código está bom?
- [ ] Documentação ok?
- [ ] Testes suficientes?
```
**Problema:** Subjetivo, vago, não acionável.

**✅ Checklist Bom:**
```
- [ ] Cobertura de testes ≥80% (rodar: npm test -- --coverage)
- [ ] Zero warnings do linter (rodar: npm run lint)
- [ ] Complexidade ciclomática <10 em 95% das funções (rodar: npm run complexity)
- [ ] Documentação: Todos endpoints têm JSDoc (validar: grep -r "* @" src/)
- [ ] Security scan: Zero HIGH/CRITICAL (rodar: npm audit)
```
**Benefício:** Objetivo, mensurável, automatizável.

---

## Tipos de Checklists

### 1. Checklist Pré-Prompt ⏰

**Quando usar:** ANTES de enviar prompt para IA

**Objetivo:** Garantir que prompt está completo e bem estruturado

```markdown
═══════════════════════════════════════════════════════════
CHECKLIST: PRÉ-ENVIO DE PROMPT
═══════════════════════════════════════════════════════════

## CONTEXTO
- [ ] Role/expertise definido claramente?
- [ ] Stack tecnológico especificado (versões)?
- [ ] Escala/métricas quantificadas?
- [ ] Constraints explícitas?

## PROBLEMA/OBJETIVO
- [ ] Problema descrito em 1-2 linhas?
- [ ] Critérios de sucesso mensuráveis?
- [ ] Escopo claro (O QUE fazer e o que NÃO fazer)?

## FORMATO DE SAÍDA
- [ ] Estrutura definida (seções, hierarquia)?
- [ ] Formato especificado (markdown, JSON, código)?
- [ ] Nível de detalhe claro (superficial/profundo)?

## EXEMPLOS
- [ ] Código/dados de exemplo fornecidos?
- [ ] Input/output esperado mostrado?

## VALIDAÇÃO
- [ ] Como validar resposta da IA?
- [ ] Critérios pass/fail definidos?

SCORE: [X]/[Total] ✅ >80% = Pronto | ⚠️ <80% = Refinar
```

---

### 2. Checklist de Template 📋

**Quando usar:** Ao criar/atualizar template reutilizável

**Objetivo:** Garantir que template é universal, documentado, testado

```markdown
═══════════════════════════════════════════════════════════
CHECKLIST: QUALIDADE DE TEMPLATE
═══════════════════════════════════════════════════════════

## ABSTRAÇÃO
- [ ] Serve para 3+ casos similares?
- [ ] Não é específico demais a um projeto?
- [ ] Não é genérico demais (inútil)?

## PLACEHOLDERS
- [ ] Todos placeholders autodescritivos?
- [ ] Exemplos fornecidos para cada placeholder?
- [ ] Obrigatórios vs opcionais claros?
- [ ] Sintaxe consistente ([CATEGORIA_DESCRICAO])?

## DOCUMENTAÇÃO
- [ ] "Quando usar" definido?
- [ ] "Quando NÃO usar" definido?
- [ ] Exemplo de uso completo fornecido?
- [ ] Tempo estimado de preenchimento documentado?

## ESTRUTURA
- [ ] Seções organizadas logicamente?
- [ ] Hierarquia clara (role → contexto → task → formato)?
- [ ] Separadores visuais (═══) para navegação?

## VALIDAÇÃO
- [ ] Testado em 5+ casos reais?
- [ ] Feedback coletado?
- [ ] Variações documentadas (se houver)?

## VERSIONAMENTO
- [ ] Versionado semanticamente (X.Y.Z)?
- [ ] Changelog atualizado?
- [ ] Metadados completos (criado, autor, tags)?

## QUALIDADE
- [ ] Zero typos/erros gramaticais?
- [ ] Instruções claras e precisas?
- [ ] Não contradiz outras seções?

SCORE: [X]/[Total] ✅ >90% = Production-ready | ⚠️ <90% = Revisar
```

---

### 3. Checklist de Output da IA 📊

**Quando usar:** Após receber resposta da IA, antes de usar

**Objetivo:** Validar que resposta atende requisitos

```markdown
═══════════════════════════════════════════════════════════
CHECKLIST: VALIDAÇÃO DE OUTPUT
═══════════════════════════════════════════════════════════

## COMPLETUDE
- [ ] Todas seções solicitadas presentes?
- [ ] Não pulou partes importantes?
- [ ] Profundidade adequada (não superficial)?

## CORREÇÃO
- [ ] Tecnicamente correto?
- [ ] Sem erros óbvios (sintaxe, lógica)?
- [ ] Segue melhores práticas da tecnologia?
- [ ] Não inventou informações (alucinação)?

## FORMATO
- [ ] Estrutura solicitada foi seguida?
- [ ] Markdown formatado corretamente?
- [ ] Código tem syntax highlighting?
- [ ] Tabelas/listas legíveis?

## ESPECIFICIDADE
- [ ] Resposta é específica ao contexto?
- [ ] Cita arquivos/linhas/funções (quando aplicável)?
- [ ] Métricas quantificadas (não "rápido", mas "200ms")?
- [ ] Não é genérico demais?

## ACIONABILIDADE
- [ ] Posso implementar baseado nisso?
- [ ] Passos claros?
- [ ] Não falta informação crítica?
- [ ] Dependências explícitas?

## VALIDAÇÃO
- [ ] Critérios de sucesso atendidos?
- [ ] Como testar/validar fornecido?
- [ ] Trade-offs mencionados?

SCORE: [X]/[Total] ✅ >85% = Usar | ⚠️ 70-85% = Refinar | ❌ <70% = Refazer prompt
```

---

### 4. Checklist de Código Gerado 💻

**Quando usar:** Código gerado por IA, antes de implementar

**Objetivo:** Garantir production-readiness

```markdown
═══════════════════════════════════════════════════════════
CHECKLIST: CÓDIGO GERADO POR IA
═══════════════════════════════════════════════════════════

## FUNCIONALIDADE
- [ ] Código compila/executa sem erros?
- [ ] Resolve o problema solicitado?
- [ ] Trata casos edge identificados?
- [ ] Comportamento correto em cenários normais?

## SEGURANÇA
- [ ] Validação de input?
- [ ] Não vulnerável a injeção (SQL, XSS, etc)?
- [ ] Dados sensíveis não em logs/erros?
- [ ] Autenticação/autorização adequadas?

## PERFORMANCE
- [ ] Sem queries N+1?
- [ ] Sem loops desnecessários?
- [ ] Algoritmos eficientes (complexidade adequada)?
- [ ] Recursos liberados (conexões, files)?

## QUALIDADE
- [ ] Nomes descritivos (variáveis, funções)?
- [ ] Complexidade <10 por função?
- [ ] DRY (sem duplicação)?
- [ ] SOLID aplicado?

## ERROR HANDLING
- [ ] Try/catch em operações críticas?
- [ ] Erros retornam códigos corretos (HTTP, exit codes)?
- [ ] Mensagens de erro informativas?
- [ ] Logging adequado (info, warning, error)?

## TESTES
- [ ] Código é testável?
- [ ] Dependências injetáveis (não hardcoded)?
- [ ] Testes unitários fornecidos?
- [ ] Cobertura >80%?

## DOCUMENTAÇÃO
- [ ] Funções principais têm docstrings/JSDoc?
- [ ] Parâmetros documentados?
- [ ] Return types claros?
- [ ] Exemplos de uso?

## INTEGRAÇÃO
- [ ] Compatível com codebase existente?
- [ ] Não quebra interface pública?
- [ ] Segue style guide do projeto?
- [ ] Dependências documentadas (package.json, requirements.txt)?

SCORE: [X]/[Total] ✅ >90% = Merge-ready | ⚠️ 80-90% = Ajustes | ❌ <80% = Refatorar
```

---

### 5. Checklist de Auditoria/Análise 🔍

**Quando usar:** Output de análise profunda/auditoria

**Objetivo:** Garantir que análise é completa, profunda, acionável

```markdown
═══════════════════════════════════════════════════════════
CHECKLIST: AUDITORIA TÉCNICA
═══════════════════════════════════════════════════════════

## ESTRUTURA
- [ ] Índice completo com anchors?
- [ ] Seções obrigatórias presentes (contexto, análise, soluções, roadmap)?
- [ ] Hierarquia clara (3-5 níveis)?
- [ ] Navegabilidade (cross-references)?

## PROFUNDIDADE
- [ ] Análise vai além do superficial?
- [ ] Cita evidências concretas (linhas de código, logs, métricas)?
- [ ] Identifica causa raiz (não apenas sintomas)?
- [ ] Múltiplas perspectivas (segurança, performance, manut.)?

## PROBLEMAS IDENTIFICADOS
- [ ] Classificados por severidade (CRITICAL/HIGH/MED/LOW)?
- [ ] Quantificados (não "lento", mas "3s, target <500ms")?
- [ ] Priorizados claramente?
- [ ] Impacto explicado (usuários, negócio, time)?

## SOLUÇÕES PROPOSTAS
- [ ] Específicas (não "melhore", mas "faça X")?
- [ ] Acionáveis (posso implementar)?
- [ ] Alternativas consideradas (X vs Y vs Z)?
- [ ] Trade-offs explícitos?
- [ ] Esforço estimado (tempo, recursos)?

## ROADMAP
- [ ] Dividido em fases lógicas?
- [ ] Dependências identificadas?
- [ ] Timeline realista?
- [ ] Quick wins identificados?

## VALIDAÇÃO
- [ ] Como validar sucesso de cada solução?
- [ ] Métricas de antes/depois?
- [ ] Testes sugeridos?

## QUALIDADE GERAL
- [ ] Pronto para apresentar a stakeholders?
- [ ] Linguagem clara (não jargão excessivo)?
- [ ] Acionável (time consegue executar)?
- [ ] Completo (não falta informação crítica)?

SCORE: [X]/[Total] ✅ >85% = Entregar | ⚠️ <85% = Revisar seções faltantes
```

---

## Técnicas de Validação Preventiva

### Técnica 1: **Validação Incremental** (Durante Geração)

Em vez de validar APÓS output completo, valide **durante**.

```markdown
## Instrução no Prompt:

"Ao completar CADA seção, execute self-check:
✓ Seção está completa (não superficial)?
✓ Evidências citadas?
✓ Métricas quantificadas?
✓ Acionável?

Se qualquer critério falhar, REFAÇA a seção antes de continuar."
```

**Benefício:** Detecta problemas cedo, evita refazer tudo.

---

### Técnica 2: **Checklist Embutido no Template**

Incluir checklist DENTRO do template para IA auto-validar.

```markdown
═══════════════════════════════════════════════════════════
TEMPLATE: CODE_REVIEW_COM_VALIDACAO
═══════════════════════════════════════════════════════════

[...template de code review...]

═══════════════════════════════════════════════════════════
AUTO-VALIDAÇÃO (IA: EXECUTE ANTES DE RETORNAR)
═══════════════════════════════════════════════════════════

Antes de entregar review, confirme:
- [ ] Citei linhas de código específicas? (não "o código", mas "linha 42")
- [ ] Classifiquei severidade de cada problema?
- [ ] Sugeri código corrigido para CRITICAL/HIGH?
- [ ] Estimei esforço de correção?
- [ ] Justifiquei recomendações (não apenas "faça X")?

Se qualquer item está incompleto, CORRIJA agora.
```

**Benefício:** IA valida a si mesma, economiza seu tempo.

---

### Técnica 3: **Validação em Camadas** (Multi-Pass)

Valide em múltiplas passadas, cada uma focada em aspecto diferente.

```markdown
## Pass 1: Estrutura (5 segundos)
- [ ] Todas seções presentes?
- [ ] Formatação correta?

## Pass 2: Completude (2 minutos)
- [ ] Seções têm profundidade adequada?
- [ ] Não pulou partes importantes?

## Pass 3: Correção (5 minutos)
- [ ] Tecnicamente correto?
- [ ] Sem erros óbvios?

## Pass 4: Acionabilidade (3 minutos)
- [ ] Posso implementar baseado nisso?
- [ ] Não falta informação crítica?
```

**Benefício:** Detecta diferentes tipos de problemas, mais rápido que validação monolítica.

---

### Técnica 4: **Validação Automatizada** (Scripts)

Para critérios objetivos, automatize.

```bash
#!/bin/bash
# validate_output.sh

echo "Validando output da IA..."

# Checklist automático
checks_passed=0
checks_total=0

# 1. Verificar se todas seções obrigatórias existem
required_sections=("Executive Summary" "Análise Profunda" "Soluções" "Roadmap")
for section in "${required_sections[@]}"; do
  checks_total=$((checks_total + 1))
  if grep -q "# $section" output.md; then
    echo "✓ Seção '$section' presente"
    checks_passed=$((checks_passed + 1))
  else
    echo "✗ FALTANDO: Seção '$section'"
  fi
done

# 2. Verificar profundidade (cada seção >500 chars)
# 3. Verificar formatação (code blocks fechados)
# 4. Verificar links (anchors não quebrados)
# [...mais checks]

# Score final
score=$((checks_passed * 100 / checks_total))
echo "========================="
echo "SCORE: $score% ($checks_passed/$checks_total)"

if [ $score -ge 85 ]; then
  echo "✅ Output aprovado!"
  exit 0
else
  echo "❌ Output precisa revisão"
  exit 1
fi
```

**Benefício:** Instantâneo, consistente, integrável em CI/CD.

---

## Criando Seus Próprios Checklists

### Processo de Criação

```
1. IDENTIFICAR FALHAS RECORRENTES
   ↓ (O que dá errado frequentemente?)
2. TRANSFORMAR EM CRITÉRIOS
   ↓ (Como detectar essas falhas?)
3. TORNAR OBJETIVOS
   ↓ (Mensurável, binário)
4. PRIORIZAR
   ↓ (Crítico → Importante → Nice-to-have)
5. TESTAR
   ↓ (Usar em 5+ casos)
6. REFINAR
   ↓ (Baseado em feedback)
7. DOCUMENTAR
   (Template, exemplos)
```

### Exemplo Completo: Criando Checklist de Code Review

**Passo 1: Identificar falhas recorrentes**
- PRs com bugs que passaram no review
- Código sem testes
- Documentação faltante
- Performance issues não detectados

**Passo 2: Transformar em critérios**
- "Sem bugs" → "Todos edge cases testados"
- "Com testes" → "Cobertura >80%"
- "Documentado" → "Funções públicas têm JSDoc"
- "Performance ok" → "Queries não fazem N+1"

**Passo 3: Tornar objetivos**
```
- [ ] Cobertura ≥80% (cmd: npm test -- --coverage)
- [ ] Zero queries N+1 (verificar: loops com DB calls)
- [ ] Funções públicas têm JSDoc (grep: "export function" sem "*/")
```

**Passo 4: Priorizar**
```
CRÍTICO (não pode falhar):
- [ ] Zero vulnerabilidades HIGH/CRITICAL
- [ ] Cobertura ≥80%

IMPORTANTE:
- [ ] Complexidade <10
- [ ] Sem code smells óbvios

DESEJÁVEL:
- [ ] 100% JSDoc coverage
- [ ] Performance benchmarked
```

**Passo 5-7: Testar, Refinar, Documentar**
[Usar em 5 PRs, ajustar baseado em feedback, criar template final]

---

## Antipadrões de Checklists

### 🚫 Antipadrão 1: Critérios Subjetivos

```
❌ - [ ] Código está limpo?
❌ - [ ] Performance é boa?
❌ - [ ] Documentação suficiente?
```

**Problema:** Não mensurável, interpretação varia.

**Solução:** Objetivos, mensuráveis, binários.

```
✅ - [ ] Complexidade ciclomática <10?
✅ - [ ] Latência p95 <200ms?
✅ - [ ] 100% funções públicas têm docstring?
```

---

### 🚫 Antipadrão 2: Checklist Gigante (100+ items)

```
❌ [Lista de 100 items para validar]
```

**Problema:** Ninguém vai validar tudo, demora horas.

**Solução:** Priorize, agrupe, automatize.

```
✅ CRÍTICO (5-10 items) - SEMPRE validar
✅ IMPORTANTE (10-15 items) - Validar se tempo permitir
✅ DESEJÁVEL (opcional) - Nice-to-have
```

---

### 🚫 Antipadrão 3: Checklist Desatualizado

```
❌ Checklist criado em 2020, nunca revisado
   (Ainda valida práticas antigas que mudaram)
```

**Problema:** Valida coisas erradas, ignora boas práticas novas.

**Solução:** Review trimestral, versionamento.

---

### 🚫 Antipadrão 4: Checklist Sem Ações

```
❌ - [ ] Performance ruim
   [Não diz O QUE fazer se falhar]
```

**Problema:** Detecta problema mas não ajuda a corrigir.

**Solução:** Ações corretivas.

```
✅ - [ ] Latência p95 <200ms?
   ❌ SE NÃO: Rodar profiler (npm run profile), identificar bottleneck
```

---

## Integrando Checklists em Workflow

### Workflow Completo com Checklists

```
┌────────────────────────────────────┐
│ 1. PRÉ-PROMPT                      │
│    Checklist: Prompt está completo?│
└──────────────┬─────────────────────┘
               ↓ ✅
┌────────────────────────────────────┐
│ 2. EXECUTAR PROMPT                 │
│    IA gera output                  │
└──────────────┬─────────────────────┘
               ↓
┌────────────────────────────────────┐
│ 3. VALIDAÇÃO RÁPIDA (1 min)       │
│    Checklist: Estrutura ok?        │
└──────────────┬─────────────────────┘
               ↓ ✅
┌────────────────────────────────────┐
│ 4. VALIDAÇÃO PROFUNDA (5 min)     │
│    Checklist: Conteúdo correto?    │
└──────────────┬─────────────────────┘
               ↓ ✅
┌────────────────────────────────────┐
│ 5. VALIDAÇÃO PRÁTICA (test/impl)  │
│    Checklist: Funciona na prática? │
└──────────────┬─────────────────────┘
               ↓ ✅
┌────────────────────────────────────┐
│ 6. APROVADO                        │
└────────────────────────────────────┘
```

---

## Próximos Passos

Domine checklists e validações e explore:

- **[../3-thinking/01-metodologias-analise-profunda.md]** - Frameworks de análise em camadas
- **[../4-workflows/01-workflow-analise-problemas.md]** - Aplique checklists em workflows completos
- **[../5-meta/03-documentacao-aprendizados.md]** - Documente seus checklists customizados

## 🌱 Reflexão Final

Checklists são como **redes de segurança**:
- Evitam que coisas importantes sejam esquecidas
- Garantem consistência mesmo quando cansado
- Permitem delegação (outras pessoas podem validar)

**Invista tempo criando bons checklists.** Cada hora investida economiza 10 horas debugando problemas que passaram despercebidos.

**Comece hoje:**
1. Identifique 1 tipo de output que você valida frequentemente
2. Liste 3-5 problemas que JÁ encontrou nele
3. Transforme em critérios objetivos
4. Crie checklist (5-10 items)
5. Use em próximos 3 casos, refine

Em 1 mês, você terá biblioteca de checklists que garantem qualidade sistematicamente.

---

**Tags:** #checklists #validacao #qualidade #self-review #criterios

**Relacionados:**
- [[../1-fundamentals/07-especificacao-requisitos]] - Requisitos mensuráveis
- [[01-design-templates-universais]] - Templates com validação embutida
- [[02-arquitetura-prompts-complexos]] - Validação de outputs complexos
- [[../5-meta/03-documentacao-aprendizados]] - Documente seus checklists
