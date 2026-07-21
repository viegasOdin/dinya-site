# Dinya Site — Wake-up Context

**Atualizado:** 2026-07-21 21:30 (GMT-3) — Cadastro/login de cliente + carrinho sincronizado
entre dispositivos (trabalho conduzido a partir de uma sessão do `dinya-app`, repo irmão).
Pendência antiga da "loja virtual" (Fase 3 do `ROADMAP.md`) retomada: o carrinho
(`lib/carrinho.tsx`) era só `localStorage`. Agora: `lib/auth-cliente.tsx` (sessão do cliente,
fala direto com `/public/clientes/...` do `dinya-app` via `lib/api-cliente.ts`,
`NEXT_PUBLIC_DINYA_API_URL` novo), páginas `/conta`, `/conta/login`, `/conta/cadastro`, carrinho
sincroniza ao logar (convidado continua igual sem conta). Verificado ponta a ponta com
Playwright/Chromium real (cadastro → add ao carrinho → "outro dispositivo" → login → item
sincronizado). `npm run build`/`npm test` (19/19) limpos. Checkout de pagamento ainda não existe
— isso foi só o pré-requisito. Detalhe completo em `memory/journal/2026-07-21.md` (bloco
"Sessão — 21:30") e `memory/decisions/2026-07-21-cadastro-login-cliente-e-carrinho-
sincronizado.md`.

---

**Atualizado (checkpoint anterior):** 2026-07-21 — Sessão 7 — Design System revisado implementado e publicado

> **Baseline atual:** o site já reflete o Design System revisado do Claude Design (`projectId 2eb9da4a-6857-491d-88e5-733b0daa6dff`) — Hero com o manifesto do kit, nova seção "As três linhas" (Play/Ambient/Devotion), Navbar reestruturada (dropdown "Dinya"), tokens `play-coral`/`devotion-blue` adicionados. Catálogo continua **100% sincronizado do `dinya-app` (ERP)** — `produtosManuais` em `lib/produtos.ts` vazio de propósito, 5 produtos reais hoje (Porta Chaves Fusca `P0020`, Luminária Wave `P0021`, Luminária Mesh `P0022`, Porta Lápis Puffer `P0029`, Serenidade Sagrada `K0001`) vêm de `lib/catalogo-erp.gerado.json`. A seção "As três linhas" ainda **não** está conectada a esses produtos reais (decisão deliberada, aguarda o ERP ganhar campo `linha` — ver spec).
> **Nesta sessão:** a spec da Sessão 6 (`docs/superpowers/specs/2026-07-20-design-system-sync-design.md`) virou plano de implementação (`docs/superpowers/plans/2026-07-20-design-system-sync.md`, 5 tasks) e foi executada via `superpowers:subagent-driven-development` — implementador + revisor dedicados por task, todas aprovadas sem issues Critical/Important. Revisão final de branch (`85aac5f..61dc1c8`): "ready to merge = yes". Um gap Minor (guard de acessibilidade faltando pra `text-cobre-deep` no teste da nova seção) foi corrigido direto. `npm test` (10/10) e `npm run build` limpos; smoke test manual no browser confirmou Hero, troca de abas Play/Ambient/Devotion, dropdown "Dinya" (abre/fecha com Escape) e menu mobile em hambúrguer. **9 commits pushed pra `origin/main`** (`f30512b..c8db119`) — deploy automático (GitHub Pages Actions) disparado.
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
| Catálogo — produtos reais | ✅ 100% sincronizado do ERP (5 produtos hoje: Porta Chaves Fusca, Luminária Wave, Luminária Mesh, Porta Lápis Puffer, Serenidade Sagrada) — `produtosManuais` foi zerado de propósito |
| Sincronização de catálogo com o `dinya-app` (`scripts/sync-catalogo.mjs` + `mesclarComErp`) + rebuild via `repository_dispatch` (`catalogo-atualizado`) | ✅ Implementada, testada e em produção |
| Dev server fixo na porta 4000 | ✅ Concluído (usuário roda apps em paralelo, evita conflito) |
| Design System revisado — tokens, Hero, seção "As três linhas", Navbar (spec + plano em `docs/superpowers/`) | ✅ Implementado, revisado e publicado em produção (`origin/main` @ `c8db119`) |
| Carrinho funcional simples (localStorage, sem conta) | ✅ Implementado, ver `memory/decisions/2026-07-21-ajustes-ui-linha-preco-carrinho.md` |
| **Cadastro/login de cliente + carrinho sincronizado entre dispositivos** | ✅ Implementado e verificado ponta a ponta local (Playwright real) — **ainda não publicado em produção** (depende do deploy do `dinya-app` correspondente) |

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
1. Conferir o deploy do GitHub Pages disparado por este push (`c8db119`) — confirmar visualmente em produção, não só no dev server local
2. Considerar os itens Minor apontados na revisão final de branch (não bloquearam o merge, ficaram como débito documentado): ARIA incompleto no tab/tabpanel de `AsTresLinhas.tsx` (falta `id`/`aria-controls`/roving `tabIndex`), dropdown "Dinya" sem `aria-controls` nem gestão de foco, `isActive()` da Navbar só reconhece `/catalogo` como rota ativa
3. Substituir o placeholder de foto da equipe em `QuemSomos.tsx` por foto real
4. Confirmar domínio definitivo (metadataBase hoje aponta para `https://dinya.com.br`)
5. Decidir se o preço (já disponível em `produto.preco` depois da sincronização) deve aparecer na UI do site — hoje não aparece em lugar nenhum
6. Se/quando o `dinya-app` (ERP) ganhar um campo `linha` (Play/Ambient/Devotion) por produto, conectar a seção "As três linhas" ao catálogo real (hoje é deliberadamente estática/desconectada — ver spec)
7. **`dinya-app` ainda pode ter uma modificação pendente antes de fechar o ciclo** (sinalizado em sessão anterior, nunca confirmado) — verificar se ainda é relevante ou se já foi resolvido
