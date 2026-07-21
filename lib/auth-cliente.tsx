"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import * as api from "./api-cliente"
import type { ClienteApi } from "./api-cliente"

const CHAVE_TOKEN = "dinya-cliente-token"

interface AuthClienteContextType {
  cliente: ClienteApi | null
  token: string | null
  carregando: boolean
  cadastrar: (dados: Parameters<typeof api.cadastrar>[0]) => Promise<void>
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthClienteContext = createContext<AuthClienteContextType | null>(null)

export function AuthClienteProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [cliente, setCliente] = useState<ClienteApi | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    let salvo: string | null = null
    try {
      salvo = localStorage.getItem(CHAVE_TOKEN)
    } catch {
      // localStorage indisponível (modo privado, SSR) — segue sem sessão
    }
    if (!salvo) {
      setCarregando(false)
      return
    }
    api
      .buscarMe(salvo)
      .then((c) => {
        setToken(salvo)
        setCliente(c)
      })
      .catch(() => {
        // token expirado/inválido — descarta silenciosamente
        try {
          localStorage.removeItem(CHAVE_TOKEN)
        } catch {
          // ver comentário acima
        }
      })
      .finally(() => setCarregando(false))
  }, [])

  const entrar = (novoToken: string, novoCliente: ClienteApi) => {
    setToken(novoToken)
    setCliente(novoCliente)
    try {
      localStorage.setItem(CHAVE_TOKEN, novoToken)
    } catch {
      // ver comentário acima
    }
  }

  const cadastrar = async (dados: Parameters<typeof api.cadastrar>[0]) => {
    const { token: novoToken, cliente: novoCliente } = await api.cadastrar(dados)
    entrar(novoToken, novoCliente)
  }

  const login = async (email: string, senha: string) => {
    const { token: novoToken, cliente: novoCliente } = await api.login(email, senha)
    entrar(novoToken, novoCliente)
  }

  const logout = () => {
    setToken(null)
    setCliente(null)
    try {
      localStorage.removeItem(CHAVE_TOKEN)
    } catch {
      // ver comentário acima
    }
  }

  return (
    <AuthClienteContext.Provider value={{ cliente, token, carregando, cadastrar, login, logout }}>
      {children}
    </AuthClienteContext.Provider>
  )
}

export function useAuthCliente() {
  const ctx = useContext(AuthClienteContext)
  if (!ctx) throw new Error("useAuthCliente precisa estar dentro de <AuthClienteProvider>")
  return ctx
}
