# Dinya Site — Wake-up Context

**Atualizado:** 2026-07-20 — Sessão 6 — Spec de sincronização com o design system revisado

> **Baseline atual:** catálogo agora é **100% sincronizado do `dinya-app` (ERP)** — `produtosManuais` em `lib/produtos.ts` está vazio de propósito, os 5 produtos reais de hoje (Porta Chaves Fusca `P0020`, Luminária Wave `P0021`, Luminária Mesh `P0022`, Porta Lápis Puffer `P0029`, Serenidade Sagrada `K0001`) vêm inteiramente do `lib/catalogo-erp.gerado.json`. Commits entre a Sessão 5 e agora (não detalhados em journal — ver `git log` se precisar do contexto completo): `e080a3f`, `8e9910c`, `dcb1849`/`1ddcac2` (correção imagem Nsa. Senhora), `239a490` (aprimora experiência e conversão do site), `a44a5f6`/`23c8044`/`47ad589` (catálogo 100% ERP + rebuild via repository_dispatch), `f30512b` (commit de edição via codex).
> **Nesta sessão:** usuário pediu para compatibilizar o site com o Design System revisado no Claude Design (`projectId 2eb9da4a-6857-491d-88e5-733b0daa6dff`, acessado via MCP `DesignSync`). Passamos pelo processo de brainstorming e fechamos um design: sincronizar tokens de cor (mantendo `quartzo` no valor atual por contraste WCAG AA, não adotando o novo valor do kit), reescrever o Hero pro manifesto do kit, adicionar uma seção nova "As três linhas" (Play/Ambient/Devotion, sem fotos, sem tocar no catálogo) e reestruturar a Navbar (Play/Ambient/Devotion/Brindes Corporativos + dropdown "Dinya" com Catálogo/Quem somos/Contato). Spec escrita e commitada em `docs/superpowers/specs/2026-07-20-design-system-sync-design.md` — **nenhum código de produto foi alterado ainda**, só o documento de spec. Próximo passo: plano de implementação (`writing-plans`).
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
| Spec de sincronização com o Design System revisado (`docs/superpowers/specs/2026-07-20-design-system-sync-design.md`) | 🔶 Spec escrita e aprovada pelo usuário; implementação (Hero, seção "As três linhas", Navbar, tokens) ainda não começou |

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
1. **Prioridade:** transformar `docs/superpowers/specs/2026-07-20-design-system-sync-design.md` em plano de implementação (`writing-plans`) e executar — tokens no `tailwind.config.ts`, reescrever `Hero.tsx`, nova seção "As três linhas", reestruturar `Navbar.tsx` (ver spec para detalhes e simplificações deliberadas)
2. Substituir o placeholder de foto da equipe em `QuemSomos.tsx` por foto real
3. Confirmar domínio definitivo (metadataBase hoje aponta para `https://dinya.com.br`)
4. Decidir se o preço (já disponível em `produto.preco` depois da sincronização) deve aparecer na UI do site — hoje não aparece em lugar nenhum
5. Se/quando o `dinya-app` (ERP) ganhar um campo `linha` (Play/Ambient/Devotion) por produto, revisitar a spec do design system — hoje a seção "As três linhas" fica deliberadamente desconectada do catálogo real (ver decisão na spec)
6. **`dinya-app` ainda pode ter uma modificação pendente antes de fechar o ciclo** (sinalizado em sessão anterior, nunca confirmado) — verificar se ainda é relevante ou se já foi resolvido
