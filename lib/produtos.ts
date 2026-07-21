import catalogoErpGerado from "./catalogo-erp.gerado.json"

export type Linha = "play" | "ambient" | "devotion"

export interface Produto {
  nome: string
  imagens?: string[]
  descricao: string[]
  diferenciais?: string[]
  especificacoes: string[]
  // vincula este produto ao código do dinya-app (ex. "P0001") — sem isso o
  // produto nunca é atualizado pela sincronização, fica só manual
  codigoErp?: string
  // preenchidos só quando o produto vem (ou está vinculado) ao dinya-app;
  preco?: number
  disponibilidade?: Disponibilidade
  // linha de produto (Play/Ambient/Devotion) — usada pra popular o destaque
  // lateral da seção "As três linhas" na home. Ainda não preenchido pelo ERP
  // hoje (ver memory/decisions/), então fica undefined até lá.
  linha?: Linha
}

export type Disponibilidade = { tipo: "sob_encomenda" } | { tipo: "estoque"; pecas: number | null }

export interface ItemCatalogoErp {
  codigo: string
  tipo: "produto" | "kit"
  nome: string
  preco: number
  disponibilidade: Disponibilidade
  descricao: string[]
  diferenciais: string[]
  imagens: string[]
  linha?: Linha
}

const DIACRITICOS = /[̀-ͯ]/g

export function slugify(texto: string) {
  return texto
    .normalize("NFD")
    .replace(DIACRITICOS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/**
 * Mescla o catálogo manual com o que veio do dinya-app (gerado por
 * scripts/sync-catalogo.mjs em lib/catalogo-erp.gerado.json).
 *
 * - Produto manual com `codigoErp` correspondente: campos do ERP sobrescrevem
 *   os manuais, MAS um campo vazio no ERP (staff ainda não preencheu) nunca
 *   apaga conteúdo manual já existente — cai pro valor manual.
 * - Produto manual sem `codigoErp`, ou sem correspondência no ERP: fica como
 *   está, intocado.
 * - Item do ERP sem nenhum produto manual vinculado: vira uma entrada nova,
 *   gerada só com o que o ERP tem (sem `especificacoes`, que não existe lá).
 */
export function mesclarComErp(manuais: Produto[], itensErp: ItemCatalogoErp[]): Produto[] {
  const vinculados = new Set<string>()

  const mesclados = manuais.map((produto): Produto => {
    if (!produto.codigoErp) return produto
    const item = itensErp.find((i) => i.codigo === produto.codigoErp)
    if (!item) return produto
    vinculados.add(item.codigo)
    return {
      ...produto,
      nome: item.nome,
      descricao: item.descricao.length > 0 ? item.descricao : produto.descricao,
      diferenciais: item.diferenciais.length > 0 ? item.diferenciais : produto.diferenciais,
      imagens: item.imagens.length > 0 ? item.imagens : produto.imagens,
      preco: item.preco,
      disponibilidade: item.disponibilidade,
      linha: item.linha,
    }
  })

  const novos = itensErp
    .filter((item) => !vinculados.has(item.codigo))
    .map((item): Produto => ({
      codigoErp: item.codigo,
      nome: item.nome,
      imagens: item.imagens,
      descricao: item.descricao.length > 0 ? item.descricao : ["Descrição em breve."],
      diferenciais: item.diferenciais.length > 0 ? item.diferenciais : undefined,
      especificacoes: [],
      preco: item.preco,
      disponibilidade: item.disponibilidade,
      linha: item.linha,
    }))

  return [...mesclados, ...novos]
}

// Catálogo agora é 100% sincronizado do dinya-app (ERP) — decisão do usuário
// de substituir os produtos manuais antigos, sem manter conteúdo hardcoded
// paralelo. Ver memory/decisions/ (dinya-app) sobre o fechamento do vínculo
// catálogo↔ERP. mesclarComErp() com lista vazia aqui já cobre o caso: todo
// item do ERP vira uma entrada "nova", usando nome/descrição/diferenciais/
// imagens/preço direto do backend.
const produtosManuais: Produto[] = []

export const produtos: Produto[] = mesclarComErp(
  produtosManuais,
  catalogoErpGerado as ItemCatalogoErp[]
)
