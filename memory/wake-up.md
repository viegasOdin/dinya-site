# Dinya Site — Wake-up Context

**Atualizado:** 2026-07-08 — Sessão 4 — Catálogo real + página de produto

> **Baseline atual:** site publicado no GitHub Pages (deploy automático via Actions a cada push em `main`)
> **Stack:** Next.js 14 (App Router, `output: "export"`) + Tailwind 3.4 + motion@12
> **Branch:** `main` → `origin` = https://github.com/viegasOdin/dinya-site

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
| Catálogo — produtos reais | 🔶 3 de N cadastrados (Nossa Senhora, Ovo de Dragão, Prendedor de Canga) |
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
