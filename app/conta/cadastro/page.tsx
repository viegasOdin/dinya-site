"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ContaCampo from "@/components/ContaCampo"
import { useAuthCliente } from "@/lib/auth-cliente"
import { ApiClienteError } from "@/lib/api-cliente"

export default function CadastroPage() {
  const { cadastrar } = useAuthCliente()
  const router = useRouter()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [telefone, setTelefone] = useState("")
  const [enderecoAberto, setEnderecoAberto] = useState(false)
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  })
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    setEnviando(true)
    try {
      await cadastrar({
        nome,
        email,
        senha,
        telefone: telefone || undefined,
        endereco_cep: endereco.cep || undefined,
        endereco_rua: endereco.rua || undefined,
        endereco_numero: endereco.numero || undefined,
        endereco_complemento: endereco.complemento || undefined,
        endereco_bairro: endereco.bairro || undefined,
        endereco_cidade: endereco.cidade || undefined,
        endereco_estado: endereco.estado || undefined,
      })
      router.push("/conta")
    } catch (e) {
      setErro(e instanceof ApiClienteError ? e.message : "não foi possível cadastrar, tente novamente")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <Navbar />
      <main id="conteudo" className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <h1 className="font-display text-3xl font-light text-carvao">Criar conta</h1>
          <p className="mt-2 font-light text-quartzo">
            Guarde seu carrinho e acesse de qualquer dispositivo.
          </p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            <ContaCampo label="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
            <ContaCampo
              label="E-mail"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ContaCampo
              label="Senha (mínimo 8 caracteres)"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <ContaCampo
              label="Telefone (opcional)"
              type="tel"
              autoComplete="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setEnderecoAberto((v) => !v)}
              className="text-left text-sm text-cobre-text hover:underline"
            >
              {enderecoAberto ? "Ocultar" : "Adicionar"} endereço de entrega (opcional)
            </button>

            {enderecoAberto && (
              <div className="grid grid-cols-2 gap-4">
                <ContaCampo
                  label="CEP"
                  value={endereco.cep}
                  onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                />
                <ContaCampo
                  label="Estado (UF)"
                  maxLength={2}
                  value={endereco.estado}
                  onChange={(e) => setEndereco({ ...endereco, estado: e.target.value.toUpperCase() })}
                />
                <div className="col-span-2">
                  <ContaCampo
                    label="Rua"
                    value={endereco.rua}
                    onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
                  />
                </div>
                <ContaCampo
                  label="Número"
                  value={endereco.numero}
                  onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                />
                <ContaCampo
                  label="Complemento"
                  value={endereco.complemento}
                  onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
                />
                <ContaCampo
                  label="Bairro"
                  value={endereco.bairro}
                  onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                />
                <ContaCampo
                  label="Cidade"
                  value={endereco.cidade}
                  onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                />
              </div>
            )}

            {erro && <p className="text-sm text-red-700">{erro}</p>}

            <button
              type="submit"
              disabled={enviando}
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-colors hover:bg-[#684436] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enviando ? "Criando..." : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-sm font-light text-quartzo">
            Já tem conta?{" "}
            <Link href="/conta/login" className="text-cobre-text hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
