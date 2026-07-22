# Dinya Site — SYNC

**Atualizado:** 2026-07-21 22:00 (GMT-3) — Cadastro/login de cliente + carrinho sincronizado — PUBLICADO

## Branch: main, publicada em `origin` (`8c2edf9`) — GitHub Pages `completed`/`success` confirmado via API

Cadastro/login de cliente do site + carrinho sincronizado entre dispositivos (trabalho espelhado
no `dinya-app`, repo irmão — ver decisão de mesmo nome nos dois repos). `main` publicada e
workflow `Deploy GitHub Pages` confirmado com sucesso. `dinya-app` correspondente também mesclado
e deployado em produção (confirmado pelo usuário, sem verificação direta — sem SSH neste
ambiente, rede bloqueia `curl` pra `api.dinya.com.br`/`dinya.com.br`/`github.io`). Detalhe
completo em `memory/journal/2026-07-21.md` e
`memory/decisions/2026-07-21-cadastro-login-cliente-e-carrinho-sincronizado.md`.

### Pendências

1. Confirmar visualmente (fora deste ambiente) que `/conta/login` funciona contra o backend real.
2. Confirmar Cloudflare Pages (2º pipeline) também buildou.
3. Checkout de verdade — próxima peça real da loja virtual.

---

### Status anterior (Sessão 7, ainda válido como histórico)

## Branch: main — 9 commits novos, todos pushed pra `origin/main` (`f30512b..c8db119`)

Sessão de implementação: a spec da Sessão 6 virou plano (`docs/superpowers/plans/2026-07-20-design-system-sync.md`)
e foi executada via `superpowers:subagent-driven-development`, direto em `main` (consentimento
explícito do usuário, segue o padrão do repo de nunca usar branch/PR). 5 tasks, cada uma com
implementador + revisor dedicados, todas aprovadas sem achados Critical/Important. Revisão final de
branch: "ready to merge = yes". Um achado Minor (guard de teste faltando) foi corrigido direto.
`npm test` (10/10) e `npm run build` limpos; smoke test manual confirmou tudo funcionando no
browser. Push feito, deploy automático (GitHub Pages Actions) disparado. Ver
`memory/journal/2026-07-21.md` para o detalhe completo.

**Próximo passo:** confirmar o deploy em produção; depois os itens Minor de débito da revisão final
(ver `wake-up.md`).

## Status dos módulos

| Módulo | Status |
|--------|--------|
| Setup (.claude, memory, hooks) | ✅ Concluído |
| Landing page (8 componentes) | ✅ Concluído |
| UI/UX + acessibilidade WCAG AA | ✅ Concluído |
| Logo oficial + favicon | ✅ Concluído |
| Animações (motion/react) | ✅ Concluído |
| Tipografia justificada + hifenização pt-BR | ✅ Concluído |
| Hero — animação logo 3D + manifesto do design system revisado | ✅ Concluído e publicado |
| Deploy GitHub Pages (Actions) | ✅ Concluído — automático a cada push em `main` |
| Número WhatsApp real | ✅ Concluído |
| Página de Catálogo (`/catalogo`) + página de produto (`/catalogo/[slug]`) | ✅ Concluído |
| Catálogo — produtos reais | ✅ 100% sincronizado do ERP (5 produtos), rebuild via `repository_dispatch` |
| Dev server fixo na porta 4000 | ✅ Concluído |
| Design System revisado — tokens, Hero, seção "As três linhas", Navbar | ✅ Implementado, revisado e publicado (`c8db119`) |

## Pendências
1. Confirmar visualmente o deploy em produção (não só dev server local)
2. Débito Minor da revisão final: ARIA incompleto em `AsTresLinhas.tsx` (tab/tabpanel), dropdown "Dinya" sem `aria-controls`/foco, `isActive()` da Navbar só reconhece `/catalogo`
3. Foto real da equipe em `QuemSomos.tsx`
4. Confirmar domínio (metadataBase = `https://dinya.com.br`)
5. Preço do produto (`produto.preco`, disponível desde a sincronização com o ERP) ainda não aparece na UI — decidir se/como exibir
6. Se o `dinya-app` ganhar campo `linha` por produto, conectar a seção "As três linhas" ao catálogo real (hoje é desconectada de propósito)

## Últimos commits

| Hash | Descrição |
|------|-----------|
| `c8db119` | test: fecha guard de acessibilidade pra text-cobre-deep em AsTresLinhas |
| `61dc1c8` | feat: reestrutura a navbar com Play/Ambient/Devotion e dropdown Dinya |
| `c2fe542` | feat: adiciona seção 'As três linhas' (Play/Ambient/Devotion) na home |
| `32095ee` | feat: reescreve o Hero pro manifesto do design system revisado |
| `e0af575` | feat: adiciona tokens play-coral e devotion-blue do design system revisado |
| `85aac5f` | docs: plano de implementação pra sincronizar site com design system revisado |
