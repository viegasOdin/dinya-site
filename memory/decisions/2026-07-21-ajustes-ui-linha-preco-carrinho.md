# Decisão — Ajustes de UI: navbar, seção Brindes Corporativos, campo `linha`, preço e carrinho

**Data:** 2026-07-21

## Decisão

Leva de ajustes de UI pedidos pelo usuário numa branch `development` (isolada de `main` até
validação local). Cobre:

1. **Navbar invertida**: antes, Play/Ambient/Devotion/Brindes Corporativos ficavam no nível
   principal e Catálogo/Quem somos/Contato num dropdown "Dinya". Agora inverte: nível principal =
   Catálogo (dropdown) / Quem somos / Contato; dropdown "Catálogo" contém Ambient, Devotion, Play,
   Brindes Corporativos (nessa ordem, pedida pelo usuário). Os 3 itens de linha continuam
   apontando pra `/#linhas` (mesma âncora da seção "As três linhas" na home); "Brindes
   Corporativos" aponta pra `/#corporativo`.
2. **Seção "Brindes Corporativos" única**: mesclou `components/Corporativo.tsx` (3 cards
   institucionais + CTA "Solicitar orçamento") com o que era `components/DestaquesProdutos.tsx`
   ("Peças em destaque", grid de produtos reais). `DestaquesProdutos.tsx` foi apagado;
   `Corporativo.tsx` agora tem cards → grid de produtos reais clicáveis (usa `ProdutoCard`) → link
   "Ver catálogo completo" → CTA de orçamento, tudo sob `id="corporativo"`. Decisão tomada via
   pergunta direta ao usuário (3 opções: remover a seção institucional, manter duas seções
   parecidas, ou mesclar — usuário escolheu mesclar).
3. **Cards de produto 100% clicáveis**: `ProdutoCard.tsx` e o novo painel lateral de
   `AsTresLinhas.tsx` usam o padrão "stretched link" (Link `absolute inset-0` atrás do conteúdo,
   conteúdo com `pointer-events-none`, só o botão de trocar imagem com `pointer-events-auto` pra
   não navegar ao clicar nele). Evita aninhar `<button>` dentro de `<a>` (HTML inválido) mantendo a
   área inteira (imagem+texto+frame) como alvo de clique.
4. **Campo `linha` no contrato do ERP**: `lib/produtos.ts` ganhou `Linha = "play" | "ambient" |
   "devotion"` e um campo opcional `linha?: Linha` em `Produto` e `ItemCatalogoErp`. Reaproveita o
   contrato já existente (`GET {DINYA_API_URL}/public/catalogo`, ver
   `memory/decisions/2026-07-11-sincronizacao-catalogo-dinya-app.md`) em vez de criar um endpoint
   novo — o `dinya-app` só precisa passar a incluir `linha` (opcional) em cada item da resposta
   dele. `components/AsTresLinhas.tsx` filtra `produtos` por `linha === ativaId` e mostra até 3
   peças no painel lateral, com seta pra ciclar entre elas; card clicável leva à página do produto.
   Enquanto o ERP não preenche `linha`, o painel mostra um placeholder ("Peças dessa linha chegando
   em breve") em vez de quebrar ou ficar vazio silenciosamente.
5. **Preço real na página de produto**: `produto.preco` (já vinha sincronizado do ERP desde
   2026-07-11, mas nunca era exibido) agora aparece formatado em BRL
   (`Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"})`) no lugar do card "Preço e
   prazo sob consulta" — que continua exatamente como estava quando `produto.preco` é `undefined`.
   Nenhum contrato novo necessário aqui, só passou a consumir um campo que já existia.
6. **Carrinho funcional simples**: `lib/carrinho.tsx` (Context + `localStorage`, chave
   `dinya-carrinho`) guarda `{ slug, nome }` por item. Botão "Adicionar ao carrinho" na página de
   produto (`components/AdicionarAoCarrinho.tsx`, client component separado pois a página em si é
   server component). Ícone de sacola na Navbar com contador, abre um painel com a lista de itens
   (removível) e botão "Finalizar pelo WhatsApp" que monta uma mensagem agregando os nomes
   (`waCarrinho()` em `lib/whatsapp.ts`). Sem checkout/pagamento — decisão explícita do usuário
   (escolheu "carrinho funcional simples" entre as opções apresentadas, vs. "só o botão, sem
   lógica").
7. **WhatsApp único no "Fale conosco"**: `components/Contato.tsx` tinha dois botões (WhatsApp —
   Empresas / WhatsApp — Pessoas), virou um botão só (usa `WA_EMPRESA`). O widget flutuante
   (`WhatsAppFloat.tsx`, "Sou empresa"/"Quero algo especial") **não foi alterado** — o pedido do
   usuário mencionava especificamente "fale conosco" (seção Contato), não o botão flutuante.

## Por quê

- **Reaproveitar `/public/catalogo` em vez de endpoint novo pra `linha`**: o site já é 100%
  estático e só sincroniza catálogo em build-time via esse endpoint único; criar um endpoint
  separado só pra `linha` duplicaria a sincronização sem necessidade — um campo a mais no mesmo
  contrato é a opção mais simples que já existia pronta pra estender.
- **Stretched link em vez de JS de navegação customizado**: nested `<button>` dentro de `<a>` é
  HTML inválido e o comportamento de clique fica inconsistente entre navegadores; o padrão de link
  absoluto + `pointer-events` é o approach padrão da indústria pra "cartão inteiro clicável com um
  botão interno que não deve navegar", sem precisar de `useRouter` + `onClick` customizado em toda
  parte.
- **Placeholder gracioso no painel de linhas**: como o ERP ainda não tem `linha` preenchido pra
  nenhum produto (pendência documentada em `wake-up.md`), a seção ficaria com card vazio/quebrado
  se não tratasse esse caso — mesma cautela que `mesclarComErp` já tinha com campos vazios do ERP.

## Verificação

`npm test` e `npm run build` rodados antes de considerar a leva concluída (ver task de quality
gates da sessão). Smoke test manual no dev server local confirmando navbar, painel de linhas,
cliques de card inteiro, carrinho e footer.

## Pendências / riscos conhecidos

- **`linha` ainda não populado por nenhum produto real** — o painel lateral de "As três linhas"
  mostra o placeholder pras 3 linhas até o `dinya-app` (ERP) passar a enviar esse campo. Sem
  solução nesta leva, é trabalho do time de aplicação.
- **Carrinho não sobrevive a limpar `localStorage`/troca de navegador** — aceitável pro escopo
  "carrinho simples" decidido; se crescer pra precisar de sincronização entre dispositivos, precisa
  de conta de usuário (fora de escopo hoje).
- Ver `docs/contratos/2026-07-21-linha-e-preco.md` pro contrato formal endereçado ao time do
  `dinya-app`.
