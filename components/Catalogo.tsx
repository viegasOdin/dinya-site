import { produtos } from "@/lib/produtos"
import Reveal from "./Reveal"
import ProdutoCard from "./ProdutoCard"

export default function Catalogo() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
            CATÁLOGO
          </span>
          <h1 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Nossos produtos
          </h1>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-quartzo">
            Cada peça é impressa sob demanda. Escolha um produto e fale direto com a gente pelo WhatsApp.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto, i) => (
            <Reveal key={produto.nome} delay={i * 0.1} className="h-full">
              <ProdutoCard produto={produto} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
