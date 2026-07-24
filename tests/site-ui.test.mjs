import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8")

test("todas as páginas oferecem um destino válido para pular ao conteúdo", () => {
  assert.match(read("app/layout.tsx"), /href="#conteudo"/)
  for (const page of ["app/page.tsx", "app/catalogo/page.tsx", "app/catalogo/[slug]/page.tsx"]) {
    assert.match(read(page), /<main id="conteudo"/)
  }
})

test("a navegação identifica a rota ativa e mantém alvos móveis de 44 px", () => {
  const navbar = read("components/Navbar.tsx")
  assert.match(navbar, /usePathname/)
  assert.match(navbar, /aria-current=/)
  assert.match(navbar, /min-h-11 min-w-11/)
})

test("a homepage apresenta produtos reais e a foto real da equipe", () => {
  const corporativo = read("components/Corporativo.tsx")
  assert.match(corporativo, /ProdutoCard/)
  assert.match(corporativo, /Ver catálogo completo/)
  assert.match(read("components/QuemSomos.tsx"), /equipe-dinya\.jpg/)
})

test("catálogo e produto expõem alvos adequados e carregamento de imagem otimizado", () => {
  assert.match(read("components/ProdutoCard.tsx"), /loading="lazy"/)
  assert.match(read("components/ProdutoCard.tsx"), /min-h-11/)
  assert.match(read("app/catalogo/[slug]/page.tsx"), /Preço e prazo sob consulta/)
})

test("movimento genérico e WhatsApp respeitam redução de movimento e evitam o contato", () => {
  assert.match(read("components/Reveal.tsx"), /duration: 0\.4/)
  const whatsapp = read("components/WhatsAppFloat.tsx")
  assert.match(whatsapp, /motion-reduce:transition-none/)
  assert.match(whatsapp, /IntersectionObserver/)
  assert.match(whatsapp, /contactInView/)
})

test("tokens do design system revisado somam play-coral, devotion-blue, pet-salvia e connect-grafite sem alterar quartzo", () => {
  const config = read("tailwind.config.ts")
  assert.match(config, /"play-coral":\s*"#F4502B"/)
  assert.match(config, /"devotion-blue":\s*"#3E5C76"/)
  assert.match(config, /"pet-salvia":\s*"#57776C"/)
  assert.match(config, /"connect-grafite":\s*"#303538"/)
  assert.match(config, /quartzo:\s*"#6B6059"/)
})

test("hero segue o manifesto do kit revisado, mantém a animação do logo e larga o CTA pessoal", () => {
  const hero = read("components/Hero.tsx")
  assert.match(hero, /PrintedLogo/)
  assert.match(hero, /O que ainda não tem forma, a gente cria\./)
  assert.match(hero, /href="#corporativo"/)
  assert.match(hero, /href="#linhas"/)
  assert.doesNotMatch(hero, /Quero algo especial/)
})

test("a seção 'Nossas linhas' cobre Play/Ambient/Devotion/Pet/Connect/Daily, sem texto colorido fora do padrão AA, com destaque lateral de peças", () => {
  const linhas = read("components/AsTresLinhas.tsx")
  assert.match(linhas, /id="linhas"/)
  assert.match(linhas, /Gira, monta, se diverte\./)
  assert.match(linhas, /Luz que desenha sombra\./)
  assert.match(linhas, /Guarda o que se ama\./)
  assert.match(linhas, /Cuidado que acompanha\./)
  assert.match(linhas, /Conectar pessoas e empresas\./)
  assert.match(linhas, /Menos improviso\. Mais rotina\./)
  assert.match(linhas, /text-quartzo/)
  assert.doesNotMatch(linhas, /text-play-coral/)
  assert.doesNotMatch(linhas, /text-devotion-blue/)
  assert.doesNotMatch(linhas, /text-cobre-deep/)
  assert.doesNotMatch(linhas, /text-pet-salvia/)
  assert.doesNotMatch(linhas, /text-connect-grafite/)
  assert.match(linhas, /produtos\.filter/)
  assert.match(linhas, /slice\(0, 3\)/)
  assert.match(linhas, /chegando em breve/)
})

test("homepage inclui 'As três linhas' entre o Hero e Brindes Corporativos", () => {
  assert.match(read("app/page.tsx"), /AsTresLinhas/)
})

test("navbar: Catálogo (dropdown com Ambient/Devotion/Play/Pet/Connect/Daily/Brindes Corporativos), Quem somos e Contato no nível principal", () => {
  const navbar = read("components/Navbar.tsx")
  assert.match(navbar, /label: "Ambient"/)
  assert.match(navbar, /label: "Devotion"/)
  assert.match(navbar, /label: "Play"/)
  assert.match(navbar, /label: "Pet"/)
  assert.match(navbar, /label: "Connect"/)
  assert.match(navbar, /label: "Daily"/)
  assert.match(navbar, /label: "Brindes Corporativos"/)
  assert.match(navbar, /label: "Quem somos"/)
  assert.match(navbar, /label: "Contato"/)
  assert.match(navbar, />\s*Catálogo\s*</)
  assert.match(navbar, /aria-haspopup="true"/)
  assert.match(navbar, /aria-expanded=\{catalogoOpen\}/)
  assert.match(navbar, /usePathname/)
  assert.match(navbar, /aria-current=/)
  assert.match(navbar, /min-h-11 min-w-11/)
})

test("navbar: carrinho com contador e checkout por WhatsApp", () => {
  const navbar = read("components/Navbar.tsx")
  assert.match(navbar, /useCarrinho/)
  assert.match(navbar, /waCarrinho/)
  assert.match(navbar, /Finalizar pelo WhatsApp/)
})

test("carrinho: contexto persiste em localStorage e produto oferece 'Adicionar ao carrinho'", () => {
  const carrinho = read("lib/carrinho.tsx")
  assert.match(carrinho, /localStorage/)
  assert.match(carrinho, /CarrinhoProvider/)
  const botao = read("components/AdicionarAoCarrinho.tsx")
  assert.match(botao, /Adicionar ao carrinho/)
  assert.match(read("app/catalogo/[slug]/page.tsx"), /AdicionarAoCarrinho/)
})

test("página de produto exibe preço real quando disponível, mantendo o fallback", () => {
  const pagina = read("app/catalogo/[slug]/page.tsx")
  assert.match(pagina, /produto\.preco/)
  assert.match(pagina, /Preço e prazo sob consulta/)
})

test("contato tem um único botão de WhatsApp e footer não menciona 'Soluções Criativas'", () => {
  const contato = read("components/Contato.tsx")
  assert.doesNotMatch(contato, /WhatsApp — Empresas/)
  assert.doesNotMatch(contato, /WhatsApp — Pessoas/)
  assert.match(contato, />\s*WhatsApp\s*</)

  const footer = read("components/Footer.tsx")
  assert.doesNotMatch(footer, /Soluções Criativas/)
})

test("conta do cliente: layout monta o provedor de sessão por cima do carrinho", () => {
  const layout = read("app/layout.tsx")
  assert.match(layout, /AuthClienteProvider/)
  assert.match(layout, /<AuthClienteProvider>\s*<CarrinhoProvider>/)
})

test("conta do cliente: páginas de login, cadastro e conta existem e usam o hook de sessão", () => {
  assert.match(read("app/conta/login/page.tsx"), /useAuthCliente/)
  assert.match(read("app/conta/cadastro/page.tsx"), /useAuthCliente/)
  assert.match(read("app/conta/page.tsx"), /useAuthCliente/)
  assert.match(read("app/conta/cadastro/page.tsx"), /endereco/)
})

test("conta do cliente: navbar ganha ícone de conta ao lado do carrinho", () => {
  const navbar = read("components/Navbar.tsx")
  assert.match(navbar, /useAuthCliente/)
  assert.match(navbar, /href="\/conta"/)
})

test("carrinho: sincroniza com a conta do cliente (mesclar ao logar, refletir add/remove)", () => {
  const carrinho = read("lib/carrinho.tsx")
  assert.match(carrinho, /useAuthCliente/)
  assert.match(carrinho, /mesclarCarrinho/)
  assert.match(carrinho, /adicionarAoCarrinho/)
  assert.match(carrinho, /removerDoCarrinho/)
  assert.match(carrinho, /codigoErp/)
})

test("api-cliente: usa NEXT_PUBLIC_DINYA_API_URL (client-side, precisa do prefixo pro build estático)", () => {
  assert.match(read("lib/api-cliente.ts"), /NEXT_PUBLIC_DINYA_API_URL/)
})
