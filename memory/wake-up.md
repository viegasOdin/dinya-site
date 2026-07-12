# Dinya Site — Wake-up Context

**Atualizado:** 2026-07-11 — Sessão 5 — Sincronização de catálogo com o dinya-app

> **Baseline atual:** site publicado no GitHub Pages (deploy automático via Actions a cada push em `main`); catálogo pode ser sincronizado a partir do ERP (`dinya-app`), mas ainda não está ligado a nenhum produto real — ver "Próxima sessão". Sincronização já mesclada em `main` (fast-forward de `claude/catalog-online-store-mylrx8`) e publicada em `origin/main` — deploy automático disparado, sem mudança visível esperada (sync ainda é no-op em produção).
> **Stack:** Next.js 14 (App Router, `output: "export"`) + Tailwind 3.4 + motion@12
> **Branch:** `main` → `origin` = https://github.com/viegasOdin/dinya-site
> **Repo irmão:** `dinya-app` (ERP — precificação, estoque, pedidos), agora fonte opcional de dados do catálogo — ver `memory/decisions/2026-07-11-sincronizacao-catalogo-dinya-app.md`

## Estado geral

| Área | Status |
|------|--------|
| Setup base (.claude, memory, hooks) | ✅ Concluído |
| Landing page (8 componentes, pt-BR) | ✅ Implementada |
| Revisão UI/UX + acessibilidade WCAG AA | ✅ Concluída |
| Logo oficial (SVG inline + favicon) | ✅ Integrado |
| Animações (motion/react, Reveal) | ✅ Concluídas |
| Tipografia — texto justificado + hifenização pt-BR | ✅ Concluída |
| Hero — animação logo impresso em 3D | ✅ Concluída |
| Deploy GitHub Pages (Actions, `BASE_PATH=/dinya-site`) | ✅ Automático a cada push em `main` |
| Número WhatsApp real | ✅ Concluído |
| Página de Catálogo (`/catalogo`) + página de produto (`/catalogo/[slug]`) | ✅ Implementadas |
| Catálogo — produtos reais | 🔶 3 de N cadastrados (Nossa Senhora, Ovo de Dragão, Prendedor de Canga) — nenhum ainda vinculado ao ERP |
| Sincronização de catálogo com o `dinya-app` (`scripts/sync-catalogo.mjs` + `mesclarComErp`) | ✅ Implementada e testada ponta a ponta; **inerte em produção** até o `dinya-app` ser deployado com o endpoint `/public/catalogo` |
| Dev server fixo na porta 4000 | ✅ Concluído (usuário roda apps em paralelo, evita conflito) |

---

## Descrição do projeto

Site institucional da DINYA Soluções Criativas (impressão 3D personalizada, Atibaia/SP). Páginas: landing (Hero, Brindes Corporativos, O Que Fazemos, Quem Somos, Contato, Footer, WhatsApp flutuante) + `/catalogo` (grid de produtos) + `/catalogo/[slug]` (página de produto com galeria de imagens, descrição, diferenciais opcionais, especificações e botão de compra via WhatsApp). Paleta do brand kit (cobre/linho/blush/carvao) com Cormorant Garamond + DM Sans.

---

## Como inicializar o ambiente

```bash
npm install
npm run dev     # dev server fixo em :4000 (não faz fallback de porta)
npm run build   # export estático em out/
```

---

## Próxima sessão

### Ações imediatas
1. Cadastrar produtos restantes do catálogo real do cliente em `lib/produtos.ts` (fotos + specs) — brindes corporativos (jogo da velha) e porta-vela já têm fotos em `public/catalogo/` mas ainda não têm entrada no catálogo
2. Substituir o placeholder de foto da equipe em `QuemSomos.tsx` por foto real
3. Confirmar domínio definitivo (metadataBase hoje aponta para `https://dinya.com.br`)
4. Decidir se/quando os 3 produtos reais ganham `codigoErp` (vínculo com o `dinya-app`) — hoje continuam 100% manuais
5. Acompanhar deploy do `dinya-app` em produção — o passo `sync:catalogo` do CI já está no workflow, mas não sincroniza nada de verdade até `api.dinya.com.br` ter o endpoint `/public/catalogo` no ar
6. Falta o gatilho `repository_dispatch` do `dinya-app` pro `dinya-site` (rebuild quando o catálogo muda só no ERP, sem push no site)
7. Decidir se o preço (já disponível em `produto.preco` depois da sincronização) deve aparecer na UI do site — hoje não aparece em lugar nenhum
8. **`dinya-app` ainda tem uma modificação pendente antes de fechar o ciclo** (usuário sinalizou, não especificado ainda) — branch `development` de lá deliberadamente não foi mesclada em `main`. Confirmado nesta sessão: a UI de admin (frontend) pra editar disponibilidade/estoque/fotos do site **não existe** — só a API. Provável candidata a ser essa modificação pendente, mas não assumir sem confirmar.
