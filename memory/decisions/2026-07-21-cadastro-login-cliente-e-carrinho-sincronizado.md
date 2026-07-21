# Decisão — Cadastro/login de cliente + carrinho sincronizado entre dispositivos

**Data:** 2026-07-21

## Contexto

O carrinho (`lib/carrinho.tsx`, decisão da mesma data em
`2026-07-21-ajustes-ui-linha-preco-carrinho.md`) era `localStorage` puro, sem conta — risco já
documentado ali: "não sobrevive a limpar localStorage/troca de navegador". Pedido do usuário
nesta sessão: puxar a pendência da "loja virtual" (Fase 3 do `ROADMAP.md`) — cadastro, login,
carrinho sincronizado. Trabalho espelhado no `dinya-app` (ver decisão de mesmo nome lá) — o
`dinya-app` ganhou conta de cliente (reaproveitando `Cliente`, o CRM que já existia) + endpoints
`/public/clientes/...`.

## Decisão

1. **Sessão do cliente é 100% client-side** — o site é estático (`output: "export"`), sem
   servidor próprio, então `lib/auth-cliente.tsx` fala direto com o `dinya-app` em tempo de
   execução no navegador via `lib/api-cliente.ts` (`fetch`), guardando o token em
   `localStorage` (`dinya-cliente-token`). Diferente de `scripts/sync-catalogo.mjs` (que roda em
   build time com `DINYA_API_URL`), isso roda no navegador e por isso precisa de
   `NEXT_PUBLIC_DINYA_API_URL` (prefixo obrigatório do Next.js pra embutir a env var no bundle
   estático) — com fallback pra `https://api.dinya.com.br` no código, funciona sem configurar
   nada em produção.
2. **Carrinho continua funcionando pra visitante sem conta** (decisão confirmada com o usuário:
   "convidado + sync ao logar"). `lib/carrinho.tsx` ganhou `codigoErp` no tipo `ItemCarrinho`
   (código do produto/kit no ERP, ex. "P0021") — é o que permite sincronizar um item com a
   conta; ao logar, o carrinho local é mesclado com o da conta (`POST .../carrinho/mesclar`, só
   uma vez por login, união nunca-remove) e a partir daí add/remove espelham no backend mantendo
   o `localStorage` como cache local (funciona offline/com backend fora do ar, best-effort).
3. Páginas novas: `/conta` (resumo + sair), `/conta/login`, `/conta/cadastro` (com seção
   opcional de endereço — o `dinya-app` ganhou campos de endereço no `Cliente` pensando no
   checkout futuro). Navbar ganha ícone de conta (`FaRegUser`) ao lado do carrinho.
4. **Achado real ao testar em browser de verdade (Playwright, não só teoria)**: a primeira versão
   de `doApi()` (conversão da resposta do backend pra `ItemCarrinho`) usava `slug: i.codigo` —
   quebrava silenciosamente o "já adicionado"/remover, porque todo o resto do site usa
   `slugify(nome)` como slug (rota de produto em `app/catalogo/[slug]/page.tsx`,
   `AdicionarAoCarrinho`). Corrigido pra `slug: slugify(nome)`. Sem essa verificação real em
   browser (só `npm test`/`npm run build`, que não executam a lógica de estado no navegador),
   esse bug não teria aparecido.

## Por quê

- Sessão client-side pura é a única opção possível dado que o site é 100% estático — não existe
  servidor próprio pra guardar sessão/cookie httpOnly; token em `localStorage` é a mesma
  categoria de risco que já existe hoje (nenhuma mudança de postura de segurança, só um app novo
  fazendo o mesmo tipo de chamada que o admin do `dinya-app` já faz).
- Convidado+sync não regride o "carrinho funcional simples" já entregue — quem nunca loga
  continua com exatamente o mesmo comportamento de antes.

## Verificação

`npm run build` e `npm test` (19/19, 5 testes novos) limpos. Ponta a ponta real: backend do
`dinya-app` + este site rodando local (Postgres real, subido nesta sessão), fluxo completo via
Playwright/Chromium real — cadastro → adicionar item ao carrinho → fechar contexto do navegador
(simula outro dispositivo) → login em contexto novo → item aparece sincronizado (screenshot real
confirmando badge do carrinho, dropdown com o item, botão "Adicionado ao carrinho" corretamente
desabilitado). Um bug de CORS (preflight bloqueado no app externo do `dinya-app`, ver decisão lá)
e o bug de `slug` acima só apareceram nessa verificação real.

## Pendências / próximos passos

- Checkout de verdade (pagamento) não existe ainda — isso é só o pré-requisito (conta + carrinho).
- Sem "esqueci minha senha" — fora de escopo desta leva.
- Se o domínio da API mudar, `NEXT_PUBLIC_DINYA_API_URL` precisa ser configurada explicitamente
  no pipeline de build (GitHub Actions já ganhou o valor; Cloudflare Pages precisaria da mesma
  env var no dashboard, igual já foi feito lá pra `DINYA_API_URL`).
