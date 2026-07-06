import { FaWhatsapp } from "react-icons/fa"
import { waProduto } from "@/lib/whatsapp"
import Reveal from "./Reveal"
import LogoIcon from "./LogoIcon"

interface Produto {
  nome: string
  descricao: string
  especificacoes: string[]
}

// ponytail: fotos e specs reais pendentes — placeholder com LogoIcon até o catálogo definitivo chegar
const produtos: Produto[] = [
  {
    nome: "Vaso Geométrico Facetado",
    descricao: "Peça decorativa com padrão facetado, acabamento fosco.",
    especificacoes: ["PLA reciclável", "18 x 18 x 22 cm", "Diversas cores"],
  },
  {
    nome: "Suporte de Celular Articulado",
    descricao: "Suporte de mesa com ajuste de ângulo para vídeo chamadas.",
    especificacoes: ["PETG resistente", "12 x 8 x 10 cm", "Preto ou branco"],
  },
  {
    nome: "Porta-Chaves de Parede",
    descricao: "Organizador de entrada com 4 ganchos e nicho para chaves.",
    especificacoes: ["PLA reciclável", "20 x 6 x 10 cm", "Personalizável com logo"],
  },
  {
    nome: "Kit Brinde Corporativo",
    descricao: "Chaveiro personalizado com a identidade visual da sua marca.",
    especificacoes: ["PLA reciclável", "5 x 5 x 0.5 cm", "Volume mínimo sob consulta"],
  },
]

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
              <div className="flex h-full flex-col rounded bg-blush p-6">
                <div className="flex aspect-square w-full items-center justify-center rounded bg-linho">
                  <LogoIcon className="h-16 w-auto text-cobre" />
                </div>

                <h3 className="font-display mt-6 text-xl text-carvao">
                  {produto.nome}
                </h3>
                <p className="mt-2 font-light leading-relaxed text-quartzo">
                  {produto.descricao}
                </p>

                <ul className="mt-4 space-y-1">
                  {produto.especificacoes.map((spec) => (
                    <li key={spec} className="text-sm font-light text-quartzo">
                      &middot; {spec}
                    </li>
                  ))}
                </ul>

                <a
                  href={waProduto(produto.nome)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded bg-cobre-deep px-6 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7A5240]"
                >
                  <FaWhatsapp size={18} />
                  Comprar
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
