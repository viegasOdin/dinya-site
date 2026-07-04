# Dinya Site — Wake-up Context

**Atualizado:** 2026-07-04 — Sessão 2 — Revisão UI/UX, logo, animações e publicação

> **Baseline atual:** site publicado no GitHub, pronto para Cloudflare Pages
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
| Publicação GitHub | ✅ Commit `516f86e` no `main` |
| Deploy Cloudflare Pages | 🔲 Conectar repo no painel (build `npm run build`, output `out`) |

---

## Descrição do projeto

Site institucional da DINYA Soluções Criativas (impressão 3D personalizada, Atibaia/SP). Landing page única em pt-BR: Hero, Brindes Corporativos, O Que Fazemos, Quem Somos, Contato, Footer, botão flutuante de WhatsApp. Paleta do brand kit (cobre/linho/blush/carvao) com Cormorant Garamond + DM Sans.

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
1. Conectar o repo no Cloudflare Pages (build `npm run build`, output dir `out`)
2. **Trocar o número placeholder do WhatsApp** em `lib/whatsapp.ts` (`5511999999999`)
3. Substituir o placeholder de foto da equipe em `QuemSomos.tsx` por foto real
4. Confirmar domínio definitivo (metadataBase hoje aponta para `https://dinya.com.br`)
