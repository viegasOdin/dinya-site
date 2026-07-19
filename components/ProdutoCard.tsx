"use client"

import { useState } from "react"
import Link from "next/link"
import { slugify, type Produto } from "@/lib/produtos"
import LogoIcon from "./LogoIcon"

export default function ProdutoCard({ produto }: { produto: Produto }) {
  const [indice, setIndice] = useState(0)
  const imagens = produto.imagens ?? []
  const slug = slugify(produto.nome)

  const proximaImagem = () => setIndice((i) => (i + 1) % imagens.length)

  return (
    <div className="flex h-full flex-col rounded bg-blush p-6">
      {imagens.length > 0 ? (
        <button
          type="button"
          onClick={proximaImagem}
          className="relative aspect-square w-full overflow-hidden rounded"
          aria-label={imagens.length > 1 ? "Ver próxima foto" : produto.nome}
        >
          <img
            src={imagens[indice]}
            alt={produto.nome}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {imagens.length > 1 && (
            <span className="absolute bottom-2 right-2 rounded bg-carvao/70 px-2 py-1 text-xs text-linho">
              {indice + 1}/{imagens.length}
            </span>
          )}
        </button>
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded bg-linho">
          <LogoIcon className="h-16 w-auto text-cobre" />
        </div>
      )}

      <h3 className="font-display mt-6 text-xl text-carvao">{produto.nome}</h3>

      <p className="mt-2 line-clamp-3 font-light leading-relaxed text-quartzo">
        {produto.descricao[0]}
      </p>

      <Link
        href={`/catalogo/${slug}`}
        className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-cobre-text underline-offset-2 hover:underline"
      >
        Ver mais
      </Link>
    </div>
  )
}
