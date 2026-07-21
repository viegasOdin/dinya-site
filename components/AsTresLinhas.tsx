"use client"

import { useState } from "react"
import Reveal from "./Reveal"

interface Linha {
  id: string
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
  const ativa = LINHAS.find((l) => l.id === ativaId) ?? LINHAS[0]

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
          <div className="mt-10" role="tabpanel">
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
        </Reveal>
      </div>
    </section>
  )
}
