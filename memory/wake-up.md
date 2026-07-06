# Dinya Site — Wake-up Context

**Atualizado:** 2026-07-06 — Sessão 3 — Página de Catálogo

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
| Página de Catálogo (`/catalogo`) | ✅ Implementada — produtos placeholder |
| Publicação GitHub | ✅ Commit `5a6f107` é o HEAD atual do `main` |

---

## Descrição do projeto

Site institucional da DINYA Soluções Criativas (impressão 3D personalizada, Atibaia/SP). Páginas: landing (Hero, Brindes Corporativos, O Que Fazemos, Quem Somos, Contato, Footer, WhatsApp flutuante) + `/catalogo` (grid de produtos com botão de compra via WhatsApp). Paleta do brand kit (cobre/linho/blush/carvao) com Cormorant Garamond + DM Sans.

---

## Como inicializar o ambiente

```bash
npm install
npm run dev     # dev server em :3000
npm run build   # export estático em out/
```

---

## Próxima sessão

### Ações imediatas
1. **Trocar o número placeholder do WhatsApp** em `lib/whatsapp.ts` (`5511999999999`) — afeta também o botão de compra do catálogo
2. Substituir os 4 produtos placeholder de `components/Catalogo.tsx` (fotos reais + specs do cliente)
3. Substituir o placeholder de foto da equipe em `QuemSomos.tsx` por foto real
4. Confirmar domínio definitivo (metadataBase hoje aponta para `https://dinya.com.br`)
