import Logo from "./Logo"

const links = [
  { label: "O que fazemos", href: "#o-que-fazemos" },
  { label: "Brindes Corporativos", href: "#corporativo" },
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Contato", href: "#contato" },
]

export default function Footer() {
  return (
    <footer className="bg-carvao px-6 py-16 text-linho">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <Logo dark />
            <p className="mt-2 font-light text-blush">
              Solu&ccedil;&otilde;es Criativas &middot; Atibaia
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <a
              href={links[0].href}
              className="text-sm font-light text-blush transition-colors hover:text-cobre"
            >
              {links[0].label}
            </a>
            <a
              href={links[1].href}
              className="text-sm font-light text-blush transition-colors hover:text-cobre"
            >
              {links[1].label}
            </a>
            <a
              href={links[2].href}
              className="text-sm font-light text-blush transition-colors hover:text-cobre"
            >
              {links[2].label}
            </a>
            <a
              href={links[3].href}
              className="text-sm font-light text-blush transition-colors hover:text-cobre"
            >
              {links[3].label}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-[#4A4340] pt-8 text-center">
          <p className="text-center text-xs font-light text-blush">
            &copy; 2026 DINYA Solu&ccedil;&otilde;es Criativas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
