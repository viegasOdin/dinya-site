# Cloudflare via static export (`output: "export"`)

**Data:** 2026-07-04

## Decisão

O site é servido como export estático do Next.js (`output: "export"` em `next.config.mjs`), publicado no Cloudflare Pages a partir do repositório `https://github.com/viegasOdin/dinya-site`.

## Contexto

- O site é 100% estático (landing page única, sem API routes, sem SSR).
- Cloudflare Pages serve `out/` diretamente, sem runtime Node — mais simples e barato que `@cloudflare/next-on-pages`.

## Consequências

- `images.unoptimized: true` obrigatório (sem otimizador de imagem em runtime). Logo é SVG inline, sem custo.
- Build de deploy: `npm run build` → output em `out/`.
- Se um dia precisar de SSR/API routes, migrar para Cloudflare Workers com o adapter oficial.

## Adendo (2026-07-04, mais tarde): GitHub Pages como deploy automático

- Workflow `.github/workflows/deploy.yml` builda e publica `out/` no GitHub Pages a cada push no `main`.
- `basePath` vem de `process.env.BASE_PATH` (CI usa `/dinya-site`; dev e Cloudflare ficam na raiz).
- Cloudflare pode: (a) Pages conectado direto ao repo — deploy próprio, independente do GitHub Pages; ou (b) só DNS/proxy na frente do GitHub Pages com domínio customizado.

## Decisões de UI relacionadas (mesma sessão)

- Paleta do brand kit mantida, com ajustes de acessibilidade: `quartzo` escurecido para `#6B6059` e novo token `cobre-text #855A48` (labels pequenos) — os tons originais falhavam WCAG AA (2.4–3.9:1).
- Logo oficial em SVG inline (`components/LogoIcon.tsx`, `currentColor`) + favicon em `app/icon.svg`.
- Animações com `motion/react`: componente único `Reveal` (fade-up on-scroll, `reducedMotion="user"`).
