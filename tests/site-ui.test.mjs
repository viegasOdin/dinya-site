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
  assert.match(read("app/page.tsx"), /DestaquesProdutos/)
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

test("tokens do design system revisado somam play-coral e devotion-blue sem alterar quartzo", () => {
  const config = read("tailwind.config.ts")
  assert.match(config, /"play-coral":\s*"#F4502B"/)
  assert.match(config, /"devotion-blue":\s*"#3E5C76"/)
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
