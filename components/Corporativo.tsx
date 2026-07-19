import { FaWhatsapp } from "react-icons/fa"
import { WA_EMPRESA } from "@/lib/whatsapp"
import Reveal from "./Reveal"

const cards = [
  {
    title: "Personalização total",
    text: "Cada peça desenvolvida a partir do DNA da sua marca.",
  },
  {
    title: "Prazo definido",
    text: "Produção planejada, entrega sem surpresas.",
  },
  {
    title: "Volume sem compromisso",
    text: "Do brinde executivo ao kit de equipe.",
  },
]

export default function Corporativo() {
  return (
    <section id="corporativo" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
            BRINDES CORPORATIVOS
          </span>
          <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Brindes sob medida para a sua empresa
          </h2>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-quartzo">
            Do briefing ao produto final — com precisão técnica e acabamento premium.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="h-full rounded bg-blush p-8 transition-transform duration-300 hover:-translate-y-1">
                <h3 className="font-display text-xl text-carvao">
                  {card.title}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-quartzo">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12">
            <a
              href={WA_EMPRESA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded bg-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#684436] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <FaWhatsapp size={18} />
              Solicitar or&ccedil;amento
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
