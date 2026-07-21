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
          <span className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-cobre-text">
            Impressão 3D · Projetos Personalizados · Brindes Corporativos
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 text-4xl font-light italic leading-tight text-carvao md:text-5xl lg:text-6xl">
            O que ainda não tem forma, a gente cria.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-light leading-relaxed text-quartzo md:text-xl">
            Cada produto que desenvolvemos parte de uma necessidade real — da decoração
            personalizada ao brinde corporativo que as pessoas realmente guardam.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#corporativo"
              className="inline-flex min-h-11 items-center rounded bg-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#684436] motion-reduce:transform-none motion-reduce:transition-none"
            >
              Brindes Corporativos
            </a>
            <a
              href="#linhas"
              className="inline-flex min-h-11 items-center rounded border border-cobre-text bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-all duration-200 hover:-translate-y-0.5 hover:bg-blush motion-reduce:transform-none motion-reduce:transition-none"
            >
              Conheça nossas linhas
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
