"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface ItemCarrinho {
  slug: string
  nome: string
}

interface CarrinhoContextType {
  itens: ItemCarrinho[]
  adicionar: (item: ItemCarrinho) => void
  remover: (slug: string) => void
}

const CHAVE_STORAGE = "dinya-carrinho"

const CarrinhoContext = createContext<CarrinhoContextType | null>(null)

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE)
      if (salvo) setItens(JSON.parse(salvo))
    } catch {
      // ponytail: localStorage indisponível (modo privado, SSR) — carrinho só em memória
    }
    setCarregado(true)
  }, [])

  useEffect(() => {
    if (!carregado) return
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens))
  }, [itens, carregado])

  const adicionar = (item: ItemCarrinho) => {
    setItens((atual) => (atual.some((i) => i.slug === item.slug) ? atual : [...atual, item]))
  }

  const remover = (slug: string) => {
    setItens((atual) => atual.filter((i) => i.slug !== slug))
  }

  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, remover }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext)
  if (!ctx) throw new Error("useCarrinho precisa estar dentro de <CarrinhoProvider>")
  return ctx
}
