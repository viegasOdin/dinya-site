# Dinya Site — SYNC

**Atualizado:** 2026-07-20 — Sessão 6

## Branch: main — working tree limpo antes desta sessão, 1 commit novo (`b2ab6de`, spec apenas — sem código de produto alterado)

Sessão de brainstorming + spec para compatibilizar o site com o Design System revisado (Claude
Design, `projectId 2eb9da4a-6857-491d-88e5-733b0daa6dff`). Nenhum código de produto tocado ainda —
só `docs/superpowers/specs/2026-07-20-design-system-sync-design.md`, aprovada pelo usuário. Ver
`memory/journal/2026-07-20.md` para o detalhe completo.

**Gap identificado nesta sessão:** entre a Sessão 5 (2026-07-11) e hoje, o catálogo virou 100%
sincronizado do ERP (`produtosManuais = []` em `lib/produtos.ts`) e o gatilho `repository_dispatch`
(`catalogo-atualizado`) já está no `.github/workflows/deploy.yml` — ambos os itens que a Sessão 5
listava como pendência estão resolvidos, mas os commits que fizeram isso (`a44a5f6`, `23c8044`,
`47ad589`, `239a490`, `f30512b`, etc.) não têm journal entry própria. Não reconstruído em detalhe;
só confirmado via leitura do código atual.

**Próximo passo:** transformar a spec em plano de implementação e executar (ver `wake-up.md`).

## Status dos módulos

| Módulo | Status |
|--------|--------|
| Setup (.claude, memory, hooks) | ✅ Concluído |
| Landing page (8 componentes) | ✅ Concluído |
| UI/UX + acessibilidade WCAG AA | ✅ Concluído |
| Logo oficial + favicon | ✅ Concluído |
| Animações (motion/react) | ✅ Concluído |
| Tipografia justificada + hifenização pt-BR | ✅ Concluído |
| Hero — animação logo 3D | ✅ Concluído (será reescrito na próxima sessão, mantendo a animação — ver spec) |
| Deploy GitHub Pages (Actions) | ✅ Concluído — automático a cada push em `main` |
| Número WhatsApp real | ✅ Concluído |
| Página de Catálogo (`/catalogo`) + página de produto (`/catalogo/[slug]`) | ✅ Concluído |
| Catálogo — produtos reais | ✅ 100% sincronizado do ERP (5 produtos), rebuild via `repository_dispatch` |
| Dev server fixo na porta 4000 | ✅ Concluído |
| Spec de sincronização com o Design System revisado | 🔶 Aprovada, implementação pendente |

## Pendências
1. **Implementar** `docs/superpowers/specs/2026-07-20-design-system-sync-design.md` — tokens, Hero, seção "As três linhas", Navbar
2. Foto real da equipe em `QuemSomos.tsx`
3. Confirmar domínio (metadataBase = `https://dinya.com.br`)
4. Preço do produto (`produto.preco`, disponível desde a sincronização com o ERP) ainda não aparece na UI — decidir se/como exibir
5. Se o `dinya-app` ganhar campo `linha` por produto, revisitar a spec do design system (hoje a seção "As três linhas" é desconectada do catálogo real, de propósito)

## Últimos commits

| Hash | Descrição |
|------|-----------|
| `b2ab6de` | docs: spec para sincronizar site com design system revisado |
| `f30512b` | Internal codex editing commit |
| `47ad589` | chore: ressincroniza catálogo com o dinya-app (5 produtos) |
| `23c8044` | chore: dispara rebuild do Cloudflare Pages (produtos novos no ERP) |
| `a44a5f6` | feat: catálogo 100% sincronizado do dinya-app, rebuild via repository_dispatch |
| `239a490` | feat: aprimora experiência e conversão do site |
