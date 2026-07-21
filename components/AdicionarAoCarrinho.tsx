"use client"

import { FaShoppingBag } from "react-icons/fa"
import { useCarrinho } from "@/lib/carrinho"

export default function AdicionarAoCarrinho({
  slug,
  nome,
  codigoErp,
}: {
  slug: string
  nome: string
  codigoErp?: string
}) {
  const { itens, adicionar } = useCarrinho()
  const jaAdicionado = itens.some((i) => i.slug === slug)

  return (
    <button
      type="button"
      onClick={() => adicionar({ slug, nome, codigoErp })}
      disabled={jaAdicionado}
      className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded border border-cobre-text bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-all duration-200 hover:-translate-y-0.5 hover:bg-blush motion-reduce:transform-none motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
    >
      <FaShoppingBag size={16} />
      {jaAdicionado ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
    </button>
  )
}
