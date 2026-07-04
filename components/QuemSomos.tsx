import Reveal from "./Reveal"
import LogoIcon from "./LogoIcon"

export default function QuemSomos() {
  const listItems = [
    {
      label: "Identidade",
      text: "A decoração autoral que transforma uma casa em lar.",
    },
    {
      label: "Presença",
      text: "O objeto sensorial que convida ao foco e à desconexão intencional do digital.",
    },
    {
      label: "Utilidade",
      text: "A peça de reposição sob medida que salva um objeto estimado do descarte.",
    },
    {
      label: "Conexão",
      text: "O brinde corporativo que conta uma história e que as pessoas realmente guardam.",
    },
  ]

  return (
    <section id="quem-somos" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
            QUEM SOMOS
          </span>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {/* Text column */}
          <Reveal>
            <h2 className="font-display text-3xl font-light italic leading-tight text-carvao md:text-4xl">
              O que ainda n&atilde;o tem forma, a gente cria.
            </h2>

            <div className="mt-8 space-y-5 font-light leading-relaxed text-carvao">
              <p>
                A DINYA nasceu de uma pergunta que voc&ecirc; provavelmente j&aacute; se fez: &ldquo;Por que isso ainda n&atilde;o existe?&rdquo;
              </p>
              <p>
                Somos dois casais que decidiram unir vis&otilde;es de mundo totalmente diferentes para responder a essa pergunta. De um lado, a precis&atilde;o e a l&oacute;gica da engenharia somadas ao olhar atento e humano da sa&uacute;de. Do outro, a vis&atilde;o estrat&eacute;gica da administra&ccedil;&atilde;o combinada com a bagagem pr&aacute;tica e real da vida em fam&iacute;lia.
              </p>
              <p>
                No cruzamento entre a t&eacute;cnica, o cuidado e o caos do dia a dia, descobrimos que a tecnologia n&atilde;o precisa ser fria. Para n&oacute;s, a impress&atilde;o 3D &eacute; uma ferramenta para materializar solu&ccedil;&otilde;es que o mercado tradicional simplesmente ignora.
              </p>
            </div>

            <h3 className="mt-10 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
              O QUE NOS MOVE
            </h3>

            <p className="mt-4 font-light leading-relaxed text-carvao">
              Cada projeto que desenvolvemos parte de uma necessidade real — que pode ser a nossa ou a sua:
            </p>

            <ul className="mt-6 space-y-5">
              {listItems.map((item) => (
                <li key={item.label} className="border-l-2 border-cobre pl-4">
                  <span className="font-medium text-carvao">{item.label}:</span>{" "}
                  <span className="font-light text-quartzo">{item.text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-light leading-relaxed text-carvao">
              Na DINYA, o problema vem primeiro. A criatividade e a precis&atilde;o t&eacute;cnica s&atilde;o apenas as ferramentas que usamos para desenhar a resposta exata para o seu cotidiano.
            </p>
          </Reveal>

          {/* Photo placeholder */}
          <Reveal delay={0.15} className="flex items-start md:pt-12">
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded bg-blush">
              <LogoIcon className="h-28 w-auto text-cobre" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
