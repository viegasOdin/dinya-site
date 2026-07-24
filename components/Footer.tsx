import Logo from "./Logo"

const links = [
  { label: "O que fazemos", href: "/#o-que-fazemos" },
  { label: "Dinya Connect", href: "/#corporativo" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Quem somos", href: "/#quem-somos" },
  { label: "Contato", href: "/#contato" },
]

export default function Footer() {
  return (
    <footer className="bg-carvao px-6 py-16 text-linho">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <Logo dark />
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm font-light text-blush transition-colors hover:text-cobre"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-[#4A4340] pt-8 text-center">
          <p className="text-center text-xs font-light text-blush">
            &copy; 2026 DINYA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
