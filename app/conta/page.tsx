"use client"

import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useAuthCliente } from "@/lib/auth-cliente"

export default function ContaPage() {
  const { cliente, carregando, logout } = useAuthCliente()

  return (
    <>
      <Navbar />
      <main id="conteudo" className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-md">
          {carregando ? (
            <p className="font-light text-quartzo">Carregando...</p>
          ) : cliente ? (
            <>
              <h1 className="font-display text-3xl font-light text-carvao">Minha conta</h1>
              <div className="mt-8 rounded bg-linho p-4">
                <p className="text-carvao">{cliente.nome}</p>
                <p className="text-sm font-light text-quartzo">{cliente.email}</p>
                {cliente.telefone && <p className="text-sm font-light text-quartzo">{cliente.telefone}</p>}
              </div>
              <button
                type="button"
                onClick={logout}
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded border border-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-colors hover:bg-blush"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl font-light text-carvao">Minha conta</h1>
              <p className="mt-2 font-light text-quartzo">Você ainda não entrou na sua conta.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/conta/login"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-colors hover:bg-[#684436]"
                >
                  Entrar
                </Link>
                <Link
                  href="/conta/cadastro"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-colors hover:bg-blush"
                >
                  Criar conta
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
