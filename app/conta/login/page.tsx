"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ContaCampo from "@/components/ContaCampo"
import { useAuthCliente } from "@/lib/auth-cliente"
import { ApiClienteError } from "@/lib/api-cliente"

export default function LoginPage() {
  const { login } = useAuthCliente()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    setEnviando(true)
    try {
      await login(email, senha)
      router.push("/conta")
    } catch (e) {
      setErro(e instanceof ApiClienteError ? e.message : "não foi possível entrar, tente novamente")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <Navbar />
      <main id="conteudo" className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <h1 className="font-display text-3xl font-light text-carvao">Entrar</h1>
          <p className="mt-2 font-light text-quartzo">
            Acesse sua conta pra ver seu carrinho salvo em qualquer dispositivo.
          </p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            <ContaCampo
              label="E-mail"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ContaCampo
              label="Senha"
              type="password"
              autoComplete="current-password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            {erro && <p className="text-sm text-red-700">{erro}</p>}

            <button
              type="submit"
              disabled={enviando}
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-colors hover:bg-[#684436] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enviando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-sm font-light text-quartzo">
            Ainda não tem conta?{" "}
            <Link href="/conta/cadastro" className="text-cobre-text hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
