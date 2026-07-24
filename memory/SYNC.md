# Dinya Site — SYNC

**Atualizado:** 2026-07-23 (GMT-3) — Sessão 9 — Seis linhas, fix de preço no ERP, rename Dinya Connect — PUBLICADO

## Branch: main, dois pushes nesta sessão — `a305813` (seis linhas) e `71f63b0` (rename Dinya Connect) — ambos GitHub Pages `completed`/`success` confirmado via API

Três brand kits novos (Pet/Connect/Daily) somados às 3 linhas existentes em "Nossas linhas",
navbar e filtro do catálogo (`a305813`). Bug real de preço achado e corrigido no `dinya-app` (repo
irmão): `/public/catalogo` mandava `preco_ecommerce` (sugerido), não `valor_praticado` — já
commitado/pushed lá por trabalho concorrente (`0e5d1f7`), não verificado com testes rodando 100%
verde por causa de uma feature não relacionada ("exige foto pra `disponivel_site`") ainda
instável nesse repo. "Brindes Corporativos" renomeado pra "Dinya Connect" e removido do dropdown
do Catálogo (`71f63b0`). Detalhe completo em `memory/journal/2026-07-23.md` e
`memory/decisions/2026-07-23-linhas-pet-connect-daily-e-preco-praticado.md`.

### Pendências

1. Confirmar visualmente em produção (fora deste ambiente) as 3 linhas novas, "Dinya Connect" e o preço praticado.
2. `dinya-app`: rodar `pytest tests/test_api_public.py` de novo quando a feature "exige foto" estabilizar (15/19 falhavam por causa dela nesta sessão, não do fix de preço).
3. Cadastrar produtos reais com `linha`=pet/connect/daily no admin do ERP (as 3 abas novas mostram "chegando em breve" até lá).

---

### Status anterior (Sessão 8, ainda válido como histórico)

**Atualizado:** 2026-07-21 22:00 (GMT-3) — Cadastro/login de cliente + carrinho sincronizado — PUBLICADO

## Branch: main, publicada em `origin` (`8c2edf9`) — GitHub Pages `completed`/`success` confirmado via API

Cadastro/login de cliente do site + carrinho sincronizado entre dispositivos (trabalho espelhado
no `dinya-app`, repo irmão — ver decisão de mesmo nome nos dois repos). `main` publicada e
workflow `Deploy GitHub Pages` confirmado com sucesso. `dinya-app` correspondente também mesclado
e deployado em produção (confirmado pelo usuário, sem verificação direta — sem SSH neste
ambiente, rede bloqueia `curl` pra `api.dinya.com.br`/`dinya.com.br`/`github.io`). Detalhe
completo em `memory/journal/2026-07-21.md` e
`memory/decisions/2026-07-21-cadastro-login-cliente-e-carrinho-sincronizado.md`.

**Pendências (histórico):**

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
| `71f63b0` | rename: "Brindes Corporativos" vira "Dinya Connect" e sai do dropdown do Catálogo |
| `a305813` | feat: adiciona linhas Pet, Connect e Daily à seção "Nossas linhas" e navbar |
| `0fdb9a5` | fix: galeria do jogo da velha, remove vitrine duplicada e completa seções vazias |
| `908bdfc` | feat: destaque de jogo da velha personalizado em Brindes Corporativos |
| `285e869` | feat: filtro de linha no catálogo, cards compactos e imagem em tamanho original |
| `8c2edf9` | feat: cadastro/login de cliente + carrinho sincronizado entre dispositivos |
| `c8db119` | test: fecha guard de acessibilidade pra text-cobre-deep em AsTresLinhas |
| `61dc1c8` | feat: reestrutura a navbar com Play/Ambient/Devotion e dropdown Dinya |
| `c2fe542` | feat: adiciona seção 'As três linhas' (Play/Ambient/Devotion) na home |
| `32095ee` | feat: reescreve o Hero pro manifesto do design system revisado |
| `e0af575` | feat: adiciona tokens play-coral e devotion-blue do design system revisado |
| `85aac5f` | docs: plano de implementação pra sincronizar site com design system revisado |
