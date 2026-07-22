"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { produtos, type Linha } from "@/lib/produtos"
import Reveal from "./Reveal"
import ProdutoCard from "./ProdutoCard"

const FILTROS: { id: Linha; nome: string }[] = [
  { id: "play", nome: "Play" },
  { id: "ambient", nome: "Ambient" },
  { id: "devotion", nome: "Devotion" },
]

export default function Catalogo() {
  const searchParams = useSearchParams()
  const linhaAtiva = searchParams.get("linha") as Linha | null

  const produtosFiltrados = linhaAtiva
    ? produtos.filter((p) => p.linha === linhaAtiva)
    : produtos

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

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/catalogo"
              className={`inline-flex min-h-11 items-center rounded-full border px-6 text-sm font-medium uppercase tracking-widest text-carvao transition-colors ${
                !linhaAtiva ? "border-carvao bg-blush" : "border-blush hover:border-carvao"
              }`}
            >
              Todos
            </Link>
            {FILTROS.map((filtro) => (
              <Link
                key={filtro.id}
                href={`/catalogo?linha=${filtro.id}`}
                className={`inline-flex min-h-11 items-center rounded-full border px-6 text-sm font-medium uppercase tracking-widest text-carvao transition-colors ${
                  linhaAtiva === filtro.id ? "border-carvao bg-blush" : "border-blush hover:border-carvao"
                }`}
              >
                {filtro.nome}
              </Link>
            ))}
          </div>
        </Reveal>

        {produtosFiltrados.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {produtosFiltrados.map((produto, i) => (
              <Reveal key={produto.nome} delay={i * 0.1} className="h-full">
                <ProdutoCard produto={produto} compact />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-12 font-light text-quartzo">
            Peças dessa linha chegando em breve.
          </p>
        )}
      </div>
    </section>
  )
}
