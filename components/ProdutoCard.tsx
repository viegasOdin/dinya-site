"use client"

import { useState, type MouseEvent } from "react"
import Link from "next/link"
import { slugify, type Produto } from "@/lib/produtos"
import LogoIcon from "./LogoIcon"

export default function ProdutoCard({ produto }: { produto: Produto }) {
  const [indice, setIndice] = useState(0)
  const imagens = produto.imagens ?? []
  const slug = slugify(produto.nome)

  const proximaImagem = (e: MouseEvent) => {
    e.preventDefault()
    setIndice((i) => (i + 1) % imagens.length)
  }

  return (
    <div className="relative flex h-full flex-col rounded bg-blush p-6">
      <Link
        href={`/catalogo/${slug}`}
        className="absolute inset-0 z-0 rounded"
        aria-label={produto.nome}
      />

      {imagens.length > 0 ? (
        <div className="relative z-10 aspect-square w-full overflow-hidden rounded pointer-events-none">
          <img
            src={imagens[indice]}
            alt={produto.nome}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {imagens.length > 1 && (
            <button
              type="button"
              onClick={proximaImagem}
              className="pointer-events-auto absolute bottom-2 right-2 rounded bg-carvao/70 px-2 py-1 text-xs text-linho"
              aria-label="Ver próxima foto"
            >
              {indice + 1}/{imagens.length}
            </button>
          )}
        </div>
      ) : (
        <div className="relative z-10 flex aspect-square w-full items-center justify-center rounded bg-linho pointer-events-none">
          <LogoIcon className="h-16 w-auto text-cobre" />
        </div>
      )}

      <h3 className="font-display relative z-10 mt-6 text-xl text-carvao pointer-events-none">
        {produto.nome}
      </h3>

      <p className="relative z-10 mt-2 line-clamp-3 font-light leading-relaxed text-quartzo pointer-events-none">
        {produto.descricao[0]}
      </p>

      <span className="relative z-10 mt-2 inline-flex min-h-11 items-center text-sm font-medium text-cobre-text pointer-events-none">
        Ver mais
      </span>
    </div>
  )
}
