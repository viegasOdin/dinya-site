# Sincronizar site com o Design System revisado (Dinya)

**Data:** 2026-07-20
**Origem:** Claude Design project `2eb9da4a-6857-491d-88e5-733b0daa6dff` ("Dinya Design System"), `ui_kits/website/index.html`, acessado via `DesignSync` MCP.

## Contexto

O projeto de design system foi revisado desde a última sincronização. A revisão introduz:
1. Um token de cor (`quartz`) com valor diferente do usado hoje no site.
2. Uma arquitetura de três "linhas de produto" (Play / Ambient / Devotion), cada uma com um accent de cor e uma assinatura de cantos (radius) próprios, hoje ausente do site e do modelo de dados do catálogo.
3. Uma escala tipográfica formalizada (tamanhos/pesos/tracking exatos por papel: display, subtítulo, corpo, label).
4. Um `ui_kit/website` de referência (Header, Hero, Footer, LineSwitcher) descrito no próprio readme do kit como "minha melhor recriação do que o kit descreve... não uma cópia de um site real" — ou seja, não é 1:1 com o site atual, é uma direção a reconciliar.

O site (`dinya_site`, Next.js 14 + Tailwind 3.4 + motion) já implementa boa parte da paleta core (cobre/linho/blush/carvão) e já tem uma seção dedicada a Brindes Corporativos, catálogo real sincronizado do ERP (`dinya-app`, 5 produtos hoje: Porta Chaves Fusca, Luminária Wave, Luminária Mesh, Porta Lápis Puffer, Serenidade Sagrada) e uma Navbar/Hero validados em sessões anteriores (ver `memory/wake-up.md`).

## Decisões de escopo (via brainstorming com o usuário)

| Pergunta | Decisão |
|---|---|
| Escopo geral | Tokens + estrutura de 3 linhas (não só tokens) |
| Relação catálogo↔linha | Campo `linha` viria do ERP no futuro — **não** mexer em `lib/produtos.ts` agora; a seção de 3 linhas é só camada de marketing/vitrine estática |
| Hero | Reescrever para o manifesto do kit ("O que ainda não tem forma, a gente cria.") |
| CTA pessoal do Hero | Sai do Hero (substituído pelo CTA "Ver as três linhas"); continua acessível via WhatsApp flutuante |
| Fotos na seção de linhas | Nenhuma por enquanto — só nome, escopo, tagline, cor |
| Navbar | Play / Ambient / Devotion / Brindes Corporativos no nível principal + dropdown "Dinya" (clique, não hover) com Catálogo / Quem somos / Contato; mobile vira hamburguer com lista plana |

## O que muda

### 1. Tokens (`tailwind.config.ts`)

Aditivo, nada é removido:
- `cobre`, `cobre-deep`, `cobre-text`, `linho`, `blush`, `carvao` — inalterados (já batem com o kit revisado).
- `quartzo` — **mantém** o valor atual `#6B6059`, não adota o novo `#8A7E79` do kit. Motivo: contraste contra `linho` (`#F4F1EB`) cai de 5.41:1 para 3.49:1, abaixo do piso AA (4.5:1) para texto normal — `quartzo` é usado como cor de texto de corpo em várias seções. Documentar com comentário `ponytail:` explicando a divergência intencional, no mesmo espírito do comentário já existente sobre `cobre-text`.
- Novos: `play-coral: "#F4502B"` e `devotion-blue: "#3E5C76"` — únicos dois tokens de linha efetivamente consumidos por este trabalho (a seção "As três linhas" usa Play=coral, Ambient=cobre-deep já existente, Devotion=devotion-blue). O resto da paleta de linha do kit (`play-teal`, `play-sun`, `ambient-pitch`, `devotion-blue-light`) fica de fora — nada no escopo atual usa, adicionar quando/se aparecer um uso real.
- Radius: nenhum token novo — o pill do tab ativo da linha Play usa a utility nativa `rounded-full` do Tailwind.

### 2. Hero (`components/Hero.tsx`)

Mantém a animação `PrintedLogo` (recurso já validado, não coberto pelo kit). Estrutura do conteúdo abaixo do logo passa a seguir `ui_kits/website/Hero.jsx`:
- Label uppercase tracked: "Impressão 3D · Projetos Personalizados · Brindes Corporativos"
- H1 serif itálico: "O que ainda não tem forma, a gente cria."
- Parágrafo de apoio, copy do próprio kit: "Cada produto que desenvolvemos parte de uma necessidade real — da decoração personalizada ao brinde corporativo que as pessoas realmente guardam." (mantém o gancho "que as pessoas guardam" do headline anterior)
- Dois CTAs: primário "Brindes Corporativos" (scroll `#corporativo`), secundário "Ver as três linhas" (scroll à nova seção)

O CTA "Quero algo especial" (WhatsApp pessoal) sai do Hero.

### 3. Nova seção "As três linhas" (novo componente, ex. `components/AsTresLinhas.tsx`)

Inserida entre `Hero` e `Corporativo` em `app/page.tsx`. Client component com tab switcher (`useState`), sem fotos, seguindo `ui_kits/website/LineSwitcher.jsx`:

| Linha | Escopo | Tagline | Cor | Forma do tab ativo |
|---|---|---|---|---|
| Play | Sensoriais · Jogos · Utilidades | "Gira, monta, se diverte." | `play-coral` | `rounded-full` |
| Ambient | Luminárias · Decoração | "Luz que desenha sombra." | `cobre-deep` (existente) | cantos retos |
| Devotion | Imagens · Chaveiros · Kits de Altar | "Guarda o que se ama." | `devotion-blue` | cantos retos |

`id="linhas"` na section, para servir de alvo de scroll do Hero e da Navbar.

### 4. Navbar (`components/Navbar.tsx`)

Estrutura nova de `links`, separando itens de nível principal de um dropdown:
- Nível principal: Play (`#linhas`), Ambient (`#linhas`), Devotion (`#linhas`), Brindes Corporativos (`#corporativo`)
- Dropdown "Dinya" (abre/fecha por clique, fecha em Escape e clique fora — reaproveita o padrão de `useEffect` de Escape já usado no drawer mobile): Catálogo (`/catalogo`), Quem somos (`#quem-somos`), Contato (`#contato`)
- Mobile (drawer hamburguer existente): lista plana com todos os itens acima, sem submenu aninhado — simplificação deliberada, marcada com `ponytail:` no código.

Play/Ambient/Devotion no nav não pré-selecionam a aba correspondente na seção "As três linhas" ao navegar — todos levam à mesma âncora `#linhas`. Simplificação deliberada (`ponytail:`); upgrade path: se pedirem deep-link por linha, passar a aba ativa via `location.hash` (`#linhas-play`, etc.) e ler no mount da seção.

## Fora de escopo (documentado, não implementado agora)

- `Corporativo.tsx`, `DestaquesProdutos.tsx`, `OQueFazemos.tsx`, `QuemSomos.tsx`, `Contato.tsx`, `Footer.tsx` — não tocados. Já usam os tokens de cor corretos; um retrofit completo para a escala tipográfica exata do kit (tamanhos/tracking por token CSS) é um passo separado, a fazer só se pedido.
- `lib/produtos.ts` / modelo de dados do catálogo — sem campo `linha`; aguardando o ERP (`dinya-app`) expor esse campo antes de tocar aqui.
- Fotografia de placeholder do kit (`assets/photography/*`) — não copiada para o site.

## Testing

- `npm run build` (export estático) sem erros.
- Verificação visual manual via preview local (`npm run dev`, porta 4000): Hero, nova seção, Navbar desktop (dropdown abre/fecha) e mobile (hamburguer) em pelo menos uma viewport mobile e uma desktop.
- Conferir contraste do `quartzo` mantido (sem regressão) — não é um teste automatizado novo, é a decisão de manter o valor atual.
