# Dinya Site — SYNC

**Atualizado:** 2026-07-11 — Sessão 5

## Branch: main — `claude/catalog-online-store-mylrx8` mesclada (fast-forward, `dcb1849..e080a3f`), push feito em `origin/main`

Sessão de integração com o `dinya-app` (ERP, repo irmão) — sincronização de catálogo
implementada, testada ponta a ponta e mesclada em `main`. Push em `main` já disparou o deploy
automático (Actions → GitHub Pages) — como `sync:catalogo` ainda não sincroniza nada de verdade
(produção do `dinya-app` não expõe `/public/catalogo` ainda), o build deve sair idêntico ao
publicado antes desta sessão: 3 produtos manuais, sem mudança visível pro visitante. Ver
`memory/decisions/2026-07-11-sincronizacao-catalogo-dinya-app.md` e
`memory/journal/2026-07-11.md`.

**Ainda inerte** até: (1) nenhum produto real tem `codigoErp` ainda, (2) `dinya-app` de produção
não expõe `/public/catalogo` ainda (branch `development` lá, não deployado), (3) falta o gatilho
`repository_dispatch` do `dinya-app` pro `dinya-site`. **Aberto no `dinya-app`:** UI de admin
(frontend) pra editar disponibilidade/estoque/fotos do site ainda não existe — confirmado nesta
sessão que nenhuma tela em `frontend/app/admin/produtos|kits` referencia os campos novos; hoje só
dá pra editar via API/Postman. Usuário sinalizou que uma modificação adicional no `dinya-app`
ainda vai acontecer antes de fechar o ciclo — branch `development` do `dinya-app` deliberadamente
**não foi mesclada** em `main` ainda (ao contrário do `dinya-site`, que já foi).

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
