# Decisão — Página de Catálogo

**Data:** 2026-07-06

## Decisão
Catálogo como rota própria `/catalogo` (App Router), não seção da landing. Grid de produtos com placeholder visual (`LogoIcon` sobre `linho`, mesmo padrão do placeholder em `QuemSomos.tsx`) até existirem fotos reais. Botão "Comprar" usa `waProduto(nome)` em `lib/whatsapp.ts`, que gera link `wa.me` com mensagem "Olá, vim do site e gostei do produto {nome}."

## Por quê
- Fotos/specs reais dos produtos ainda não existem — placeholder evita bloquear a entrega da página.
- Nova rota (em vez de seção `#catalogo`) porque a lista tende a crescer e merece URL própria e paginação futura sem inchar a home.
- `waProduto` como função (não constante) porque a mensagem depende do produto clicado — mesmo padrão de `WA_EMPRESA`/`WA_PESSOAL`, só parametrizado.
- Links do Navbar/Footer trocados de `#ancora` para `/#ancora` porque agora existem múltiplas páginas; sem o prefixo, os links de âncora quebravam ao navegar a partir de `/catalogo`.

## Pendências
- Substituir os 4 produtos placeholder e as fotos por catálogo real do cliente.
- Reaproveita placeholder do número do WhatsApp (`5511999999999`) — já registrado como pendência anterior.
