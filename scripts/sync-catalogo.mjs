// Busca GET /public/catalogo no dinya-app e regrava lib/catalogo-erp.gerado.json,
// consumido por lib/produtos.ts (mesclarComErp) em tempo de build.
//
// Sem DINYA_API_URL: não faz nada, deixa o arquivo gerado como está — dev
// local não depende de ter o backend rodando pra fazer `npm run build`.
// Em falha de rede/HTTP: também não mexe no arquivo (mantém o último
// catálogo sincronizado com sucesso em vez de esvaziar o site por causa de
// uma falha transitória do backend numa rebuild agendada).
import { writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const DESTINO = new URL("../lib/catalogo-erp.gerado.json", import.meta.url)

async function main() {
  const apiUrl = process.env.DINYA_API_URL
  if (!apiUrl) {
    console.log("[sync-catalogo] DINYA_API_URL não definida — catálogo do ERP não sincronizado (ok em dev local).")
    return
  }

  const url = `${apiUrl.replace(/\/$/, "")}/public/catalogo`
  console.log(`[sync-catalogo] buscando ${url}...`)

  let resposta
  try {
    resposta = await fetch(url)
  } catch (erro) {
    console.warn(`[sync-catalogo] falha de rede (${erro.message}) — mantendo catálogo sincronizado anteriormente.`)
    return
  }

  if (!resposta.ok) {
    console.warn(`[sync-catalogo] HTTP ${resposta.status} — mantendo catálogo sincronizado anteriormente.`)
    return
  }

  const corpo = await resposta.json()
  const itens = corpo.itens ?? []
  await writeFile(DESTINO, JSON.stringify(itens, null, 2) + "\n")
  console.log(`[sync-catalogo] ${itens.length} item(ns) sincronizado(s) em ${fileURLToPath(DESTINO)}.`)
}

main().catch((erro) => {
  console.error("[sync-catalogo] erro inesperado:", erro)
  process.exit(1)
})
