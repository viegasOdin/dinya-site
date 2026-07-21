"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useAuthCliente } from "./auth-cliente"
import * as api from "./api-cliente"
import type { ItemCarrinhoApi } from "./api-cliente"
import { slugify } from "./produtos"

export interface ItemCarrinho {
  slug: string
  nome: string
  // código do dinya-app (ex. "P0021") — só ausente pra item legado sem
  // vínculo de ERP; sem ele não dá pra sincronizar esse item com a conta
  codigoErp?: string
}

interface CarrinhoContextType {
  itens: ItemCarrinho[]
  adicionar: (item: ItemCarrinho) => void
  remover: (slug: string) => void
}

const CHAVE_STORAGE = "dinya-carrinho"

const CarrinhoContext = createContext<CarrinhoContextType | null>(null)

function doApi(itensApi: ItemCarrinhoApi[]): ItemCarrinho[] {
  // `slug` precisa ser slugify(nome), igual ao resto do site (rotas de
  // produto, AdicionarAoCarrinho) — usar o código do ERP aqui quebraria o
  // "já adicionado"/remover pra item que veio de uma resposta do backend
  // (mesclar/add/remove), já que a página do produto sempre chama
  // adicionar()/compara com slugify(produto.nome)
  return itensApi.map((i) => ({ slug: slugify(i.nome), nome: i.nome, codigoErp: i.codigo }))
}

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])
  const [carregado, setCarregado] = useState(false)
  const { token, carregando: authCarregando } = useAuthCliente()
  // evita mesclar de novo a cada render — só uma vez por login (troca de token)
  const tokenMesclado = useRef<string | null>(null)

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE)
      if (salvo) setItens(JSON.parse(salvo))
    } catch {
      // localStorage indisponível (modo privado, SSR) — carrinho só em memória
    }
    setCarregado(true)
  }, [])

  useEffect(() => {
    if (!carregado) return
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens))
  }, [itens, carregado])

  // ao logar: funde o carrinho local (visitante) com o que já está salvo na
  // conta, e passa a espelhar o carrinho da conta a partir daqui
  useEffect(() => {
    if (authCarregando || !token || !carregado) return
    if (tokenMesclado.current === token) return
    tokenMesclado.current = token
    const codigos = itens.map((i) => i.codigoErp).filter((c): c is string => !!c)
    api
      .mesclarCarrinho(token, codigos)
      .then((r) => setItens(doApi(r.itens)))
      .catch(() => {
        // backend fora do ar/token expirado no meio do caminho — mantém o
        // carrinho local como está, tenta de novo no próximo add/remove
      })
  }, [token, authCarregando, carregado, itens])

  const adicionar = (item: ItemCarrinho) => {
    setItens((atual) => (atual.some((i) => i.slug === item.slug) ? atual : [...atual, item]))
    if (token && item.codigoErp) {
      api.adicionarAoCarrinho(token, item.codigoErp).then((r) => setItens(doApi(r.itens))).catch(() => {})
    }
  }

  const remover = (slug: string) => {
    const item = itens.find((i) => i.slug === slug)
    setItens((atual) => atual.filter((i) => i.slug !== slug))
    if (token && item?.codigoErp) {
      api.removerDoCarrinho(token, item.codigoErp).then((r) => setItens(doApi(r.itens))).catch(() => {})
    }
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
