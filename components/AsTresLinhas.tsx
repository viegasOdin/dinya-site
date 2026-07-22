"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Reveal from "./Reveal"
import LogoIcon from "./LogoIcon"
import { produtos, slugify } from "@/lib/produtos"

interface Linha {
  id: "play" | "ambient" | "devotion"
  nome: string
  escopo: string
  tagline: string
  radiusAtivo: string
  corBorda: string
  corFundoAtivo: string
  corBolinha: string
}

const LINHAS: Linha[] = [
  {
    id: "play",
    nome: "Play",
    escopo: "Sensoriais · Jogos · Utilidades",
    tagline: "Gira, monta, se diverte.",
    radiusAtivo: "rounded-full",
    corBorda: "border-play-coral",
    corFundoAtivo: "bg-play-coral/10",
    corBolinha: "bg-play-coral",
  },
  {
    id: "ambient",
    nome: "Ambient",
    escopo: "Luminárias · Decoração",
    tagline: "Luz que desenha sombra.",
    radiusAtivo: "rounded-none",
    corBorda: "border-cobre-deep",
    corFundoAtivo: "bg-cobre-deep/10",
    corBolinha: "bg-cobre-deep",
  },
  {
    id: "devotion",
    nome: "Devotion",
    escopo: "Imagens · Chaveiros · Kits de Altar",
    tagline: "Guarda o que se ama.",
    radiusAtivo: "rounded-none",
    corBorda: "border-devotion-blue",
    corFundoAtivo: "bg-devotion-blue/10",
    corBolinha: "bg-devotion-blue",
  },
]

export default function AsTresLinhas() {
  const [ativaId, setAtivaId] = useState(LINHAS[0].id)
  const [indicePeca, setIndicePeca] = useState(0)
  const ativa = LINHAS.find((l) => l.id === ativaId) ?? LINHAS[0]

  // ponytail: até o ERP preencher `linha` por produto, essa lista fica vazia
  // e o painel mostra o placeholder — ver docs do contrato.
  const pecas = produtos.filter((p) => p.linha === ativaId).slice(0, 3)
  const peca = pecas.length > 0 ? pecas[indicePeca % pecas.length] : undefined

  useEffect(() => {
    setIndicePeca(0)
  }, [ativaId])

  const proximaPeca = () => setIndicePeca((i) => (i + 1) % pecas.length)

  return (
    <section id="linhas" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
            AS TRÊS LINHAS
          </span>
          <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Cada linha, um jeito de criar
          </h2>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-quartzo">
            Três formas de dar vida a peças que unem função e propósito — descubra qual conversa com você.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-10 flex flex-wrap gap-3"
            role="tablist"
            aria-label="Linhas de produto"
          >
            {LINHAS.map((linha) => {
              const ativoAgora = linha.id === ativaId
              return (
                <button
                  key={linha.id}
                  type="button"
                  role="tab"
                  aria-selected={ativoAgora}
                  onClick={() => setAtivaId(linha.id)}
                  className={`inline-flex min-h-11 items-center border px-6 text-sm font-medium uppercase tracking-widest text-carvao transition-colors ${linha.radiusAtivo} ${
                    ativoAgora
                      ? `${linha.corFundoAtivo} ${linha.corBorda}`
                      : "border-blush hover:border-carvao"
                  }`}
                >
                  {linha.nome}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center" role="tabpanel">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${ativa.corBolinha}`}
                  aria-hidden="true"
                />
                <span className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-quartzo">
                  {ativa.escopo}
                </span>
              </div>
              <p className="font-display mt-3 text-2xl font-light italic text-carvao md:text-3xl">
                {ativa.tagline}
              </p>
            </div>

            <div className="relative">
              {peca ? (
                <div className="relative rounded bg-blush p-4">
                  <Link
                    href={`/catalogo/${slugify(peca.nome)}`}
                    className="absolute inset-0 z-0 rounded"
                    aria-label={peca.nome}
                  />
                  {peca.imagens && peca.imagens.length > 0 ? (
                    <div className="relative z-10 aspect-square w-full overflow-hidden rounded pointer-events-none">
                      <img
                        src={peca.imagens[0]}
                        alt={peca.nome}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative z-10 flex aspect-square w-full items-center justify-center rounded bg-linho pointer-events-none">
                      <LogoIcon className="h-16 w-auto text-cobre" />
                    </div>
                  )}
                  <p className="font-display relative z-10 mt-4 text-lg text-carvao pointer-events-none">
                    {peca.nome}
                  </p>

                  {pecas.length > 1 && (
                    <button
                      type="button"
                      onClick={proximaPeca}
                      aria-label="Ver próxima peça dessa linha"
                      className="pointer-events-auto absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-carvao/70 text-linho transition-colors hover:bg-carvao"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M4 2l6 5-6 5" />
                      </svg>
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded bg-blush p-4">
                  <p className="max-w-[16rem] text-center text-sm font-light text-quartzo">
                    Peças dessa linha chegando em breve.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
