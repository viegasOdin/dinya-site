import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa"
import { WA_EMPRESA, WA_PESSOAL } from "@/lib/whatsapp"
import Reveal from "./Reveal"

export default function Contato() {
  return (
    <section id="contato" className="bg-linho px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-4xl text-center">
        <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
          CONTATO
        </span>
        <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
          Vamos criar juntos
        </h2>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={WA_EMPRESA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded bg-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#684436] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <FaWhatsapp size={18} />
            WhatsApp — Empresas
          </a>
          <a
            href={WA_PESSOAL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded border border-cobre-text bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-all duration-200 hover:-translate-y-0.5 hover:bg-blush motion-reduce:transform-none motion-reduce:transition-none"
          >
            <FaWhatsapp size={18} />
            WhatsApp — Pessoas
          </a>
        </div>

        <div className="mt-8">
          <a
            href="mailto:contato@dinya.com.br"
            className="inline-flex min-h-11 items-center font-light text-quartzo underline underline-offset-4 transition-colors hover:text-cobre-text"
          >
            contato@dinya.com.br
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-8">
          <a
            href="https://instagram.com/dinya.3d"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 text-quartzo transition-colors hover:text-cobre-text"
            aria-label="Instagram da DINYA"
          >
            <FaInstagram size={22} />
            <span className="text-sm">@dinya.3d</span>
          </a>
          <a
            href="https://tiktok.com/@dinya.3d"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 text-quartzo transition-colors hover:text-cobre-text"
            aria-label="TikTok da DINYA"
          >
            <FaTiktok size={20} />
            <span className="text-sm">@dinya.3d</span>
          </a>
        </div>
      </Reveal>
    </section>
  )
}
