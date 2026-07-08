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
      <main>
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/catalogo"
              className="text-sm font-light text-quartzo transition-colors hover:text-cobre-text"
            >
              &larr; Voltar ao catálogo
            </Link>

            <Reveal className="mt-6 grid gap-12 md:grid-cols-2">
              <div>
                <ProdutoGaleria imagens={produto.imagens ?? []} nome={produto.nome} />
              </div>

              <div>
                <h1 className="font-display text-3xl font-light text-carvao md:text-4xl">
                  {produto.nome}
                </h1>

                <a
                  href={waProduto(produto.nome)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded bg-cobre-deep px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7A5240]"
                >
                  <FaWhatsapp size={18} />
                  Comprar
                </a>

                <div className="mt-8 space-y-4">
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
