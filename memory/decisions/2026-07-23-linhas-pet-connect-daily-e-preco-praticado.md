# Decisão — Três novas linhas (Pet/Connect/Daily) no site + correção do preço público (praticado, não sugerido)

**Data:** 2026-07-23

## Contexto

Usuário trouxe os brand kits (`BB_Pet.html`, `BB_Connect.html`, `BB_Daily.html`, na pasta do
Drive de branding) de três linhas novas — somam-se a Play/Ambient/Devotion já existentes no site.
Pediu duas coisas: (1) incluir as linhas novas na seção "Conheça nossas linhas" e na navlink; (2)
investigar por que o preço que chega do `dinya-app` (ERP) pro site parece ser o preço *sugerido*
pelo motor de precificação, não o preço que a loja de fato pratica.

## Decisão

### 1. Site (`dinya_site`) — seis linhas em vez de três

- `lib/produtos.ts`: `Linha` passa de `"play" | "ambient" | "devotion"` para incluir também
  `"pet" | "connect" | "daily"`.
- `tailwind.config.ts`: novos tokens `pet-salvia` (`#57776C`) e `connect-grafite` (`#303538`),
  extraídos dos brand kits novos. **Daily não ganha token novo** — o próprio kit da linha declara
  "nenhuma cor nova" e reaproveita Cobre Profundo (`cobre-deep`, já usado por Ambient); as duas
  linhas dividem o mesmo acento de cor por decisão de marca, não por descuido.
- `components/AsTresLinhas.tsx`: adiciona as 3 abas novas ao array `LINHAS` (escopo/tagline
  copiados literalmente dos kits: Pet = "Cuidado que acompanha.", Connect = "Conectar pessoas e
  empresas." — lema fixo, não parafrasear — Daily = "Menos improviso. Mais rotina."). Eyebrow do
  título trocou de "AS TRÊS LINHAS" pra "NOSSAS LINHAS" (mesma frase do CTA do Hero, "Conheça
  nossas linhas") já que agora são seis, não três — nome do arquivo/componente ficou como está
  (renomear teria blast radius maior por pouco ganho).
- `components/Navbar.tsx`: dropdown "Catálogo" ganha Pet/Connect/Daily entre Devotion e Brindes
  Corporativos, apontando pra `/catalogo?linha=<id>` (mesmo padrão das 3 linhas antigas).
- `components/Catalogo.tsx`: `FILTROS` ganha os mesmos 3 chips, pro filtro de URL ter botão
  correspondente (sem isso o link do navbar levaria a um filtro "órfão", sem chip ativo destacável).
- `tests/site-ui.test.mjs` atualizado para cobrir os 6 tokens/textos novos. `npm test` (18/19,
  1 falha pré-existente e sem relação — `Corporativo.tsx` não referencia mais `ProdutoCard`, ver
  commit `0fdb9a5` anterior a esta sessão) e `npm run build` limpos.

### 2. Backend (`dinya_app`) — bug real: `/public/catalogo` usava `preco_ecommerce`, não `valor_praticado`

`app/models.py` já tinha o campo `Produto.valor_praticado` / `Kit.valor_praticado` ("preço que a
loja realmente pratica na venda, pode divergir do preco_direto/ecommerce sugerido pelo motor"),
editável pelo admin (`ProdutoIn.valor_praticado`), mas usado **só** para calcular
`margem_real_pct` internamente — nunca chegava ao catálogo público. `app/api_public.py`
(`_produto_out`/`_kit_out`) mandava sempre `preco.preco_ecommerce` (o preço sugerido pelo motor de
precificação) pro site, então **todo item publicado mostrava preço sugerido, nunca o praticado**,
mesmo quando alguém preenchia `valor_praticado` no admin.

**Correção:** `preco_site = p.valor_praticado if p.valor_praticado is not None else
preco.preco_ecommerce` (mesmo padrão em `_kit_out` com `k.valor_praticado`) — preço praticado tem
prioridade; cai pro sugerido só quando ninguém preencheu `valor_praticado` ainda (evita que um
produto recém-marcado `disponivel_site` suma do catálogo por falta de preço).

Adicionado teste `test_preco_usa_valor_praticado_quando_preenchido` em
`tests/test_api_public.py`. **Não executado localmente** — a suíte de testes do backend depende de
Postgres (`localhost:5432`) e o Docker daemon não estava rodando neste ambiente; `docker compose
up db` resolveria isso numa próxima sessão, mas não foi acionado aqui (ação de infraestrutura fora
do escopo pedido).

> Nota: durante esta sessão, mudanças adicionais em `api_public.py` (`_disponibilidade` agora força
> `sob_encomenda` quando `valor_praticado` é `None`, já que sem preço real não há como vender do
> estoque) e no teste correspondente foram feitas fora deste fluxo — ver estado atual do arquivo,
> não repetido aqui.

## Como aplicar / próxima sessão

- Rodar `pytest tests/test_api_public.py` no `dinya_app` (subir `docker compose up db` primeiro)
  pra confirmar o fix + o teste novo passam de verdade.
- Nenhum produto real está com `linha` = pet/connect/daily no ERP ainda — as 3 abas novas mostram
  "Peças dessa linha chegando em breve." até o staff cadastrar produtos com essas linhas no admin
  do `dinya-app` (mesma situação que Play/Ambient/Devotion já tinham antes de ganhar produtos reais).
