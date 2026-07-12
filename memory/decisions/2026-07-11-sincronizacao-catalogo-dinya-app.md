# Decisão — Sincronização do catálogo com o dinya-app

**Data:** 2026-07-11

## Decisão
O site passa a poder sincronizar preço/disponibilidade/descrição/fotos do catálogo a partir do
`dinya-app` (ERP interno da DINYA, repositório irmão), sem abrir mão do catálogo manual atual nem
migrar pra hospedagem dinâmica — continua tudo estático (GitHub Pages, `next build`).

- `scripts/sync-catalogo.mjs`: roda **antes** do `next build` (não é automático em `npm run
  build`/`npm run dev` — precisa de `DINYA_API_URL` setado, senão não faz nada). Busca `GET
  {DINYA_API_URL}/public/catalogo` (endpoint público, sem autenticação, implementado no
  `dinya-app`) e grava `lib/catalogo-erp.gerado.json`.
- Em falha de rede/HTTP, o script **não apaga** o arquivo gerado — mantém o último catálogo
  sincronizado com sucesso em vez de esvaziar o site por causa de uma falha transitória do
  backend numa rebuild agendada.
- `lib/produtos.ts` ganha `mesclarComErp()`: cada produto manual pode ter um `codigoErp` opcional
  (ex. `"P0001"`) que o vincula a um item do ERP. Vinculado: campos do ERP sobrescrevem os
  manuais, **exceto quando o campo do ERP vem vazio** (staff ainda não preencheu
  descrição/diferenciais/fotos lá) — nesse caso cai pro conteúdo manual já existente, nunca apaga.
  Item do ERP sem produto manual vinculado vira uma entrada nova, gerada só com o que existe lá
  (sem `especificacoes`, que não existe no schema do ERP ainda).
- `.github/workflows/deploy.yml` ganhou um passo `npm run sync:catalogo` (com `DINYA_API_URL:
  https://api.dinya.com.br`) antes do `npm run build` — todo push em `main` já sincroniza.

## Por quê
- Manter os dois catálogos (site e ERP) preenchidos à mão duplicava trabalho e gerava risco de
  preço/estoque desatualizado no site. Ver discussão completa e alternativas avaliadas em
  `dinya-app/memory/decisions/2026-07-11-catalogo-publico-schema-imagens-r2.md`.
- Build-time (não runtime/client-side) porque o site é 100% estático — buscar no browser a cada
  visita bateria direto na VM pequena da ERP a cada pageview, sem necessidade.
- Fallback "não apaga o gerado em caso de falha" em vez de crash-on-error: um backend fora do ar
  numa rebuild agendada não pode derrubar o catálogo público inteiro do site.
- `codigoErp` opcional (não migração forçada): permite ligar produto por produto no seu tempo, sem
  quebrar os 3 produtos reais já cadastrados manualmente hoje.

## Verificação
Testado de ponta a ponta contra o backend real do `dinya-app` rodando localmente: produto novo
(só ERP, sem vínculo manual) gerou página nova completa; produto manual vinculado a um item do
ERP com campos vazios preservou a descrição/diferenciais/fotos manuais (só o nome — e por
consequência o slug — veio do ERP); `npm run build` sem `DINYA_API_URL` (cenário de dev local
comum) continua gerando exatamente as 3 páginas de sempre, sem diferença de comportamento.

## Pendências / riscos conhecidos
- **Renomear um produto no ERP muda o slug da página no site** (slug deriva do nome). Sem solução
  nesta leva — se um produto linkado for renomeado no ERP, o link antigo da página quebra
  (404). Considerar fixar slug pelo `codigoErp` numa iteração futura se isso incomodar na prática.
- Preço e disponibilidade já vêm no JSON sincronizado (`produto.preco`, `produto.disponibilidade`)
  mas **não são exibidos em nenhum lugar da UI ainda** — decisão de mostrar preço no site fica em
  aberto, não decidida nesta leva.
- Endpoint `/public/catalogo` só existe no código do `dinya-app` (branch `development`) — o host
  de produção real (`api.dinya.com.br`) ainda roda uma versão anterior sem essa rota. Até o deploy
  do `dinya-app` acontecer, o passo `sync:catalogo` do CI roda mas não sincroniza nada (HTTP
  falha, cai no fallback "mantém o gerado anterior" — hoje `[]`, então o catálogo do site
  continua só manual até lá).
- Falta o gatilho `repository_dispatch` do `dinya-app` pro `dinya-site` — hoje o site só
  resincroniza quando algo é empurrado pro próprio `dinya-site` (push em `main`), não quando o
  catálogo muda só no ERP.
