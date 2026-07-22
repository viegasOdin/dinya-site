import Reveal from "./Reveal"

interface CardData {
  label: string
  text: string
  icon: React.ReactNode
  href?: string
}

const cards: CardData[] = [
  {
    label: "Identidade",
    text: "A decoração autoral que transforma uma casa em lar.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cobre-deep">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Presença",
    text: "O objeto sensorial que convida ao foco e à desconexão intencional do digital.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cobre-deep">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: "Utilidade",
    text: "A peça de reposição sob medida que salva um objeto estimado do descarte.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cobre-deep">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Conexão",
    text: "O brinde corporativo que conta uma história e que as pessoas realmente guardam.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cobre-deep">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function OQueFazemos() {
  return (
    <section id="o-que-fazemos" className="bg-linho px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
            O QUE FAZEMOS
          </span>
          <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Do problema à solução — com forma e precisão
          </h2>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-quartzo">
            Cada peça nasce de uma necessidade real, não de um catálogo pronto.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => {
            const content = (
              <div className="h-full rounded bg-blush p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5D5CC]">
                <div className="mb-6">{card.icon}</div>
                <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
                  {card.label}
                </span>
                <p className="mt-3 font-light leading-relaxed text-quartzo">
                  {card.text}
                </p>
              </div>
            )

            return (
              <Reveal key={card.label} delay={i * 0.1}>
                {card.href ? <a href={card.href}>{content}</a> : content}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
