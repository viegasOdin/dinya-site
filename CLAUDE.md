# Dinya Site — Claude Code Configuration

## IDENTITY

<!-- Descreva o propósito do projeto aqui -->
Stack: Node.js + Motion (motion@12.42.0)

## DECISION RULES — automáticas, sem exceção

1. **Decisão arquitetural tomada** → escrever em `memory/decisions/YYYY-MM-DD-titulo.md` ANTES de responder
2. **"Vou lembrar" / "Anotei"** → escrever em arquivo de memória AGORA
3. **Início de sessão** → ler `memory/wake-up.md` como PRIMEIRA ação
4. **Fim de sessão** → usar skill `/end-session` para atualizar wake-up.md + journal + SYNC.md

## SKILLS DISPONÍVEIS

| Skill | Trigger | Descrição |
|-------|---------|-----------|
| `end-session` | `/end-session` | Encerra sessão: atualiza wake-up, journal, SYNC |
| `verification-before-completion` | antes de claims de conclusão | Evidência antes de assertions |

## QUALITY GATES

```bash
# Verificar antes de claims de "funcionando"
npm run build   # build sem erros
npm run test    # testes passando (quando existirem)
```

## FORBIDDEN PATTERNS

- Commit de credenciais ou `.env` real
- Claims de "funcionando" sem verificação (`/verification-before-completion`)
- Arquivos de memória fora de `memory/`
