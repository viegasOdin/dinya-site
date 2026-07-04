import { WA_EMPRESA, WA_PESSOAL } from "@/lib/whatsapp"
import { FaWhatsapp } from "react-icons/fa"
import Reveal from "./Reveal"
import PrintedLogo from "./PrintedLogo"

export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-[calc(100svh-80px)] items-center justify-center bg-linho px-6"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <PrintedLogo className="h-28 w-auto text-carvao md:h-36" />
        </div>
        <Reveal>
          <h1 className="font-display text-4xl font-light leading-tight text-carvao md:text-5xl lg:text-6xl">
            Brindes corporativos que{" "}
            <span className="italic">as pessoas guardam.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-light leading-relaxed text-quartzo md:text-xl">
            Presentes únicos, decorações autorais, peças que o mercado não fabrica.
            Feito sob medida, em impressão 3D.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={WA_EMPRESA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-cobre-deep px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7A5240]"
            >
              <FaWhatsapp size={18} />
              WhatsApp &mdash; Sou empresa
            </a>
            <a
              href={WA_PESSOAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-cobre bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-all duration-200 hover:-translate-y-0.5 hover:bg-blush"
            >
              Quero algo especial
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
