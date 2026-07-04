---
name: end-session
description: Encerra a sessão de trabalho do Dinya Site — verifica e atualiza wake-up.md, cria journal entry do dia, atualiza SYNC.md e commita os arquivos de memória. Usar com /end-session ao final de cada sessão de trabalho.
---

# End Session — Dinya Site

Execute este checklist na ordem exata. Não pule etapas.

---

## [1/4] Verificar wake-up.md

Leia `memory/wake-up.md` e verifique:
- A data no cabeçalho está atualizada para hoje?
- O estado geral reflete o que foi feito nesta sessão?
- A seção "Próxima sessão" aponta para o trabalho correto?

**Se desatualizado:** reescreva as seções afetadas com o contexto atual. Mantenha a estrutura existente.

---

## [2/4] Criar journal entry do dia

Verifique se existe `memory/journal/YYYY-MM-DD.md` com a data de hoje.

**Se não existe:** crie o arquivo com esta estrutura:

```markdown
# Journal — YYYY-MM-DD — Sessão [Número] ([Nome])

## Contexto
[O que estava pendente ao início desta sessão]

---

## Entregáveis

### [Task — Nome]
- [O que foi feito, decisões tomadas, problemas resolvidos]

---

## Decisões técnicas

1. **[Título]**: [Explicação]

---

## Commits desta sessão

| Hash | Descrição |
|------|-----------|
| `xxxxxxx` | [mensagem] |

---

## Próxima sessão
[O que começa na próxima sessão]
```

**Se já existe:** adicione um bloco de atualização no final se a sessão continuou.

---

## [3/4] Atualizar SYNC.md

Leia `memory/SYNC.md` e atualize:

- **Atualizado:** data de hoje + número da sessão
- **Branch:** estado atual (branch de trabalho, status)
- **Últimos commits:** adicione novos commits (via `git log --oneline -10`)
- **Pendências:** atualize com o que ficou para próxima sessão

---

## [4/4] Commit dos arquivos de memória

Execute:

```bash
git status
```

Se `memory/wake-up.md`, `memory/SYNC.md` ou `memory/journal/YYYY-MM-DD.md` tiverem alterações não commitadas, pergunte ao usuário se deseja commitá-las com:

```
chore(memory): encerra sessão [Nome] — [resumo de 5 palavras]
```

Não faça push sem confirmação explícita.

---

## Checklist final

- [ ] wake-up.md com data de hoje e contexto correto
- [ ] journal/YYYY-MM-DD.md criado e preenchido
- [ ] SYNC.md com commits e pendências atualizados
- [ ] Arquivos de memória commitados (ou confirmado que não é necessário)
