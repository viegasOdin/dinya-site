// Cliente HTTP pra conta do site (cadastro/login/carrinho) — fala direto com
// o dinya-app em tempo de execução no navegador (o site é 100% estático,
// output: "export", sem servidor próprio). Diferente de
// scripts/sync-catalogo.mjs (que roda em build time com DINYA_API_URL sem
// NEXT_PUBLIC_), isto roda no cliente e por isso PRECISA do prefixo
// NEXT_PUBLIC_ pro Next.js embutir o valor no bundle estático.
const API_URL = (process.env.NEXT_PUBLIC_DINYA_API_URL || "https://api.dinya.com.br").replace(/\/$/, "")

export interface ClienteApi {
  id: number
  nome: string
  email: string
  telefone: string | null
  endereco_cep: string | null
  endereco_rua: string | null
  endereco_numero: string | null
  endereco_complemento: string | null
  endereco_bairro: string | null
  endereco_cidade: string | null
  endereco_estado: string | null
}

export interface ItemCarrinhoApi {
  codigo: string
  tipo: "produto" | "kit"
  nome: string
  preco: number
}

export class ApiClienteError extends Error {}

async function pedir<T>(caminho: string, opcoes: RequestInit = {}, token?: string): Promise<T> {
  const resposta = await fetch(`${API_URL}/public/clientes${caminho}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opcoes.headers,
    },
  })
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null)
    throw new ApiClienteError(corpo?.detail || `erro ${resposta.status}`)
  }
  return resposta.json()
}

export function cadastrar(dados: {
  nome: string
  email: string
  senha: string
  telefone?: string
  endereco_cep?: string
  endereco_rua?: string
  endereco_numero?: string
  endereco_complemento?: string
  endereco_bairro?: string
  endereco_cidade?: string
  endereco_estado?: string
}) {
  return pedir<{ token: string; cliente: ClienteApi }>("/cadastro", {
    method: "POST",
    body: JSON.stringify(dados),
  })
}

export function login(email: string, senha: string) {
  return pedir<{ token: string; cliente: ClienteApi }>("/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  })
}

export function buscarMe(token: string) {
  return pedir<ClienteApi>("/me", {}, token)
}

export function editarMe(token: string, dados: Partial<Omit<ClienteApi, "id" | "email">>) {
  return pedir<ClienteApi>("/me", { method: "PATCH", body: JSON.stringify(dados) }, token)
}

export function buscarCarrinho(token: string) {
  return pedir<{ itens: ItemCarrinhoApi[] }>("/carrinho", {}, token)
}

export function adicionarAoCarrinho(token: string, codigo: string) {
  return pedir<{ itens: ItemCarrinhoApi[] }>(
    "/carrinho",
    { method: "POST", body: JSON.stringify({ codigo }) },
    token
  )
}

export function removerDoCarrinho(token: string, codigo: string) {
  return pedir<{ itens: ItemCarrinhoApi[] }>(
    `/carrinho/${encodeURIComponent(codigo)}`,
    { method: "DELETE" },
    token
  )
}

export function mesclarCarrinho(token: string, codigos: string[]) {
  return pedir<{ itens: ItemCarrinhoApi[] }>(
    "/carrinho/mesclar",
    { method: "POST", body: JSON.stringify({ codigos }) },
    token
  )
}
