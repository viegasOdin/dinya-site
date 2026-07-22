"use client"

import { useState } from "react"
import LogoIcon from "./LogoIcon"

export default function ProdutoGaleria({ imagens, nome }: { imagens: string[]; nome: string }) {
  const [selecionada, setSelecionada] = useState(0)

  if (imagens.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded bg-linho">
        <LogoIcon className="h-24 w-auto text-cobre" />
      </div>
    )
  }

  return (
    <div>
      <div className="w-full overflow-hidden rounded bg-linho">
        <img
          src={imagens[selecionada]}
          alt={nome}
          decoding="async"
          className="h-auto w-full"
        />
      </div>

      {imagens.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {imagens.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelecionada(i)}
              aria-label={`Ver foto ${i + 1} de ${nome}`}
              aria-current={i === selecionada}
              className={`aspect-square overflow-hidden rounded ring-2 transition-colors ${
                i === selecionada ? "ring-cobre-deep" : "ring-transparent hover:ring-blush"
              }`}
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
