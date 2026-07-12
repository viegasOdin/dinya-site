# Dinya Site — SYNC

**Atualizado:** 2026-07-11 — Sessão 5

## Branch: claude/catalog-online-store-mylrx8
Sessão de integração com o `dinya-app` (ERP, repo irmão) — sincronização de catálogo
implementada e testada ponta a ponta, ver `memory/decisions/2026-07-11-sincronizacao-catalogo-
dinya-app.md` e `memory/journal/2026-07-11.md`. Ainda **inerte** em produção: nenhum produto real
tem `codigoErp`, e o `dinya-app` de produção ainda não expõe `/public/catalogo`.

## Status anterior (Sessão 4, ainda válido) — branch main
- HEAD `6ed8e3f` — sincronizado com `origin/main`? **não** — commit local ainda não enviado (push pendente de confirmação)
- Working tree: limpo (tudo commitado nesta sessão)

## Status dos módulos

| Módulo | Status |
|--------|--------|
| Setup (.claude, memory, hooks) | ✅ Concluído |
| Landing page (8 componentes) | ✅ Concluído |
| UI/UX + acessibilidade WCAG AA | ✅ Concluído |
| Logo oficial + favicon | ✅ Concluído |
| Animações (motion/react) | ✅ Concluído |
| Tipografia justificada + hifenização pt-BR | ✅ Concluído |
| Hero — animação logo 3D | ✅ Concluído |
| Deploy GitHub Pages (Actions) | ✅ Concluído — automático a cada push em `main` |
| Número WhatsApp real | ✅ Concluído |
| Página de Catálogo (`/catalogo`) + página de produto (`/catalogo/[slug]`) | ✅ Concluído |
| Catálogo — produtos reais | 🔶 3 cadastrados (Nossa Senhora, Ovo de Dragão, Prendedor de Canga) |
| Dev server fixo na porta 4000 | ✅ Concluído |

## Pendências
1. Cadastrar produtos restantes em `lib/produtos.ts` — fotos de "Brindes Corporativos - Jogo da Velha" e "Porta Vela" já estão em `public/catalogo/` sem entrada no catálogo ainda
2. Foto real da equipe em `QuemSomos.tsx`
3. Confirmar domínio (metadataBase = `https://dinya.com.br`)
4. Confirmar com o usuário se pode dar `git push` do commit `6ed8e3f`

## Últimos commits

| Hash | Descrição |
|------|-----------|
| `6ed8e3f` | Adiciona produtos reais ao catálogo e fixa porta do dev server |
| `02843b8` | Adiciona página de produto e galeria de imagens ao catálogo |
| `6c90265` | Atualiza número real do WhatsApp |
| `1db247e` | Adiciona página de Catálogo com compra via WhatsApp |
| `5a6f107` | Tipografia: texto corrido justificado com hifenização pt-BR |
