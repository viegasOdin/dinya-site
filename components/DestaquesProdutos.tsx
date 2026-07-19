import Link from "next/link"
import { produtos } from "@/lib/produtos"
import ProdutoCard from "./ProdutoCard"
import Reveal from "./Reveal"

export default function DestaquesProdutos() {
  return (
    <section className="bg-linho px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
            PEÇAS EM DESTAQUE
          </span>
          <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Ideias que já ganharam forma
          </h2>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-quartzo">
            Produtos reais, impressos sob demanda e adaptáveis ao seu projeto.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.slice(0, 3).map((produto, index) => (
            <Reveal key={produto.nome} delay={index * 0.05} className="h-full">
              <ProdutoCard produto={produto} />
            </Reveal>
          ))}
        </div>

        <Link
          href="/catalogo"
          className="mt-10 inline-flex min-h-11 items-center text-sm font-medium uppercase tracking-widest text-cobre-text underline-offset-4 hover:underline"
        >
          Ver catálogo completo
        </Link>
      </div>
    </section>
  )
}
