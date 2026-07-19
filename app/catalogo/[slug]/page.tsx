import { notFound } from "next/navigation"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"
import { waProduto } from "@/lib/whatsapp"
import { produtos, slugify } from "@/lib/produtos"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import Reveal from "@/components/Reveal"
import ProdutoGaleria from "@/components/ProdutoGaleria"

export function generateStaticParams() {
  return produtos.map((produto) => ({ slug: slugify(produto.nome) }))
}

export default function ProdutoPage({ params }: { params: { slug: string } }) {
  const produto = produtos.find((p) => slugify(p.nome) === params.slug)

  if (!produto) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main id="conteudo">
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/catalogo"
              className="inline-flex min-h-11 items-center text-sm font-light text-quartzo transition-colors hover:text-cobre-text"
            >
              &larr; Voltar ao catálogo
            </Link>

            <Reveal className="mt-6 grid gap-x-12 md:grid-cols-2">
              <h1 className="font-display text-3xl font-light text-carvao md:col-start-2 md:row-start-1 md:text-4xl">
                {produto.nome}
              </h1>

              <div className="mt-6 md:col-start-2 md:row-start-2">
                <div className="rounded bg-linho p-4">
                  <p className="font-medium text-carvao">Preço e prazo sob consulta</p>
                  <p className="mt-1 text-sm font-light leading-relaxed text-quartzo">
                    Produção sob demanda. Consulte personalização e entrega no atendimento.
                  </p>
                </div>

                <a
                  href={waProduto(produto.nome)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#684436] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <FaWhatsapp size={18} />
                  Comprar pelo WhatsApp
                </a>
              </div>

              <div className="mt-8 md:col-start-1 md:row-span-3 md:row-start-1 md:mt-0">
                <ProdutoGaleria imagens={produto.imagens ?? []} nome={produto.nome} />
              </div>

              <div className="mt-8 md:col-start-2 md:row-start-3">
                <div className="space-y-4">
                  {produto.descricao.map((paragrafo, i) => (
                    <p key={i} className="font-light leading-relaxed text-quartzo">
                      {paragrafo}
                    </p>
                  ))}
                </div>

                {produto.diferenciais && (
                  <>
                    <h2 className="mt-8 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
                      Por que escolher
                    </h2>
                    <ul className="mt-4 space-y-1">
                      {produto.diferenciais.map((item) => (
                        <li key={item} className="font-light text-quartzo">
                          &#10003; {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h2 className="mt-8 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
                  Especificações
                </h2>
                <ul className="mt-4 space-y-1">
                  {produto.especificacoes.map((spec) => (
                    <li key={spec} className="font-light text-quartzo">
                      &middot; {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
