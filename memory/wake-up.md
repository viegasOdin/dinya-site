# Dinya Site — Wake-up Context

**Atualizado:** 2026-07-23 (GMT-3) — Seis linhas (Pet/Connect/Daily somam-se a Play/Ambient/
Devotion), "Brindes Corporativos" renomeado pra "Dinya Connect", e correção de um bug real de
preço no `dinya-app`.

Usuário trouxe 3 brand kits novos (`BB_Pet.html`, `BB_Connect.html`, `BB_Daily.html`, na pasta do
Drive de branding) e pediu pra somar essas linhas às 3 já existentes. Implementado:
`lib/produtos.ts` (`Linha` ganha `pet`/`connect`/`daily`), `tailwind.config.ts` (tokens
`pet-salvia` `#57776C` e `connect-grafite` `#303538`; Daily não ganha token novo, reaproveita
`cobre-deep` por decisão do próprio brand kit — "nenhuma cor nova"), `AsTresLinhas.tsx` (6 abas,
eyebrow virou "NOSSAS LINHAS"), `Navbar.tsx` e `Catalogo.tsx` (dropdown/filtro com as 3 linhas
novas). Publicado (`a305813`).

Na mesma conversa, o usuário pediu pra investigar por que o preço que chega do `dinya-app` (ERP)
pro site parecia ser o preço **sugerido** pelo motor de precificação, não o **praticado**.
Confirmado: bug real em `app/api_public.py` do `dinya-app` — `Produto.valor_praticado` /
`Kit.valor_praticado` já existiam no banco (editável no admin), mas só eram usados internamente
pra calcular margem, nunca chegavam ao `/public/catalogo` (que sempre mandava `preco_ecommerce`,
o preço sugerido). Corrigido lá. Detalhe completo, incluindo o que rodou e o que não rodou (testes
do `dinya-app` sem Postgres disponível na hora), em
`memory/decisions/2026-07-23-linhas-pet-connect-daily-e-preco-praticado.md`.

> **Nota:** durante essa investigação, outra sessão/processo estava editando o **mesmo** repo
> `dinya-app` em paralelo (feature "exige foto na galeria pra `disponivel_site`" — commits
> `d1f7306`/`0e5d1f7`, já pushed pro `origin/main` de lá, fora do escopo desta sessão). Rodei os
> testes de `test_api_public.py` depois de subir o Postgres via `docker compose up -d db`: 15/19
> falharam, mas todas pela mesma causa (422 "produto/kit precisa de pelo menos 1 foto"), não pelo
> fix de preço — não mexi nesses testes pra não colidir com o trabalho concorrente.

Depois, o usuário pediu pra renomear "Brindes Corporativos" pra "Dinya Connect" (faz sentido: a
linha "Connect" que acabou de entrar **é** literalmente a linha de brindes corporativos do brand
kit) e tirar essa entrada do dropdown do Catálogo (redundante agora que "Connect" já está lá como
filtro de linha). Renomeado em `Hero.tsx` (CTA), `Corporativo.tsx` (eyebrow) e `Footer.tsx`
(link); removida a entrada do dropdown em `Navbar.tsx` (e, por consequência, do menu mobile, que
reaproveita o mesmo array). Publicado (`71f63b0`).

`npm test` (18/19 — a falha é pré-existente e sem relação, `Corporativo.tsx` não referencia mais
`ProdutoCard` desde o commit `0fdb9a5`, anterior a esta sessão) e `npm run build` limpos nas duas
entregas. Ambos os deploys (`a305813`, `71f63b0`) confirmados `completed`/`success` via API do
GitHub.

---

**Atualizado (checkpoint anterior):** 2026-07-21 21:30 (GMT-3) — Cadastro/login de cliente + carrinho sincronizado
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

> **Continuação (mesma sessão): PUBLICADO.** Usuário pediu "mescle e deploy do Dinya app e em
> seguida publique o Dinya site". `main` publicado em `origin` (`8c2edf9`) — workflow `Deploy
> GitHub Pages` confirmado `completed`/`success` via API do GitHub. `dinya-app` correspondente
> mesclado (`main`/`development` em `10dc0b4`) e deployado em produção, confirmado pelo usuário
> (sem verificação direta desta sessão — sem acesso SSH, e a rede deste ambiente bloqueia
> inclusive `curl` pra `api.dinya.com.br`/`dinya.com.br`/`viegasodin.github.io`, só a API do
> GitHub em si é alcançável). Cloudflare Pages (2º pipeline) não verificado. **Pendência real:**
> confirmar visualmente em produção (fora deste ambiente) que `/conta/login` funciona de ponta a
> ponta contra o backend real.

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
| **Cadastro/login de cliente + carrinho sincronizado entre dispositivos** | ✅ Implementado, verificado ponta a ponta local (Playwright real) e **publicado** (`main` @ `8c2edf9`, GitHub Pages `completed`/`success`) — `dinya-app` correspondente também deployado (confirmado pelo usuário, sem verificação direta desta sessão) |
| **Seis linhas** (Play/Ambient/Devotion + Pet/Connect/Daily) em "Nossas linhas", navbar e filtro do catálogo | ✅ Implementado e **publicado** (`main` @ `a305813`, GitHub Pages `completed`/`success`) — Pet/Connect/Daily ainda sem produtos reais tagueados no ERP, abas mostram "chegando em breve" |
| Preço público do site = preço **praticado**, não o sugerido pelo motor | ✅ Corrigido no `dinya-app` (`app/api_public.py`), commitado e pushed lá (`0e5d1f7`) — ver `memory/decisions/2026-07-23-linhas-pet-connect-daily-e-preco-praticado.md` |
| "Brindes Corporativos" → "Dinya Connect" (CTA, seção, footer) + saiu do dropdown do Catálogo | ✅ Implementado e **publicado** (`main` @ `71f63b0`, GitHub Pages `completed`/`success`) |

---

## Descrição do projeto

Site institucional da DINYA Soluções Criativas (impressão 3D personalizada, Atibaia/SP). Páginas: landing (Hero, Dinya Connect, O Que Fazemos, Quem Somos, Contato, Footer, WhatsApp flutuante) + `/catalogo` (grid de produtos, filtro por linha: Play/Ambient/Devotion/Pet/Connect/Daily) + `/catalogo/[slug]` (página de produto com galeria de imagens, descrição, diferenciais opcionais, especificações, preço e botão de compra via WhatsApp). Paleta do brand kit (cobre/linho/blush/carvao) com Cormorant Garamond + DM Sans.

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
1. Confirmar em produção (fora deste ambiente) que as 3 linhas novas, o CTA "Dinya Connect" e o preço praticado aparecem certos no site publicado (`a305813`, `71f63b0`)
2. `dinya-app`: rodar `pytest tests/test_api_public.py` de novo depois que a feature concorrente "exige foto pra `disponivel_site`" (commits `d1f7306`/`0e5d1f7`, já em `origin/main` de lá) estabilizar — nesta sessão, 15/19 testes desse arquivo falhavam por causa dela (422 "precisa de pelo menos 1 foto"), não por causa do fix de preço; não mexi nesses testes pra não colidir com trabalho concorrente
3. Cadastrar produtos reais com `linha`=pet/connect/daily + `destaque_site=true` no admin do `dinya-app`, pras 3 abas novas pararem de mostrar "Peças dessa linha chegando em breve" (mesma situação que Play/Ambient/Devotion já superaram)
4. Débito antigo ainda válido: ARIA incompleto no tab/tabpanel de `AsTresLinhas.tsx` (falta `id`/`aria-controls`/roving `tabIndex`) — cresceu de 3 pra 6 abas nesta sessão, mesmo gap
5. `isActive()` da Navbar continua só reconhecendo `/catalogo` como rota ativa
6. Confirmar domínio definitivo (metadataBase hoje aponta para `https://dinya.com.br`)
