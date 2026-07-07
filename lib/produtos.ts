export interface Produto {
  nome: string
  imagens?: string[]
  descricao: string[]
  especificacoes: string[]
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

// ponytail: specs de peso/prazo ainda pendentes — placeholder com LogoIcon nos itens sem `imagens`
export const produtos: Produto[] = [
  {
    nome: "Vaso Geométrico Facetado",
    descricao: ["Peça decorativa com padrão facetado, acabamento fosco."],
    especificacoes: ["PLA reciclável", "18 x 18 x 22 cm", "Diversas cores"],
  },
  {
    nome: "Suporte de Celular Articulado",
    descricao: ["Suporte de mesa com ajuste de ângulo para vídeo chamadas."],
    especificacoes: ["PETG resistente", "12 x 8 x 10 cm", "Preto ou branco"],
  },
  {
    nome: "Porta-Chaves de Parede",
    descricao: ["Organizador de entrada com 4 ganchos e nicho para chaves."],
    especificacoes: ["PLA reciclável", "20 x 6 x 10 cm", "Personalizável com logo"],
  },
  {
    nome: "Kit Brinde Corporativo",
    descricao: ["Chaveiro personalizado com a identidade visual da sua marca."],
    especificacoes: ["PLA reciclável", "5 x 5 x 0.5 cm", "Volume mínimo sob consulta"],
  },
  {
    nome: "Serenidade Sagrada: Kit Altar Nossa Senhora com Difusor de Aromas",
    imagens: ["/catalogo/kit_nossa_senhora_porta_vela.JPG", "/catalogo/kit_nossa_senhora_difusor.JPG"],
    descricao: [
      "Encontre paz e elegância em um único espaço com este kit exclusivo que une devoção espiritual e design contemporâneo. A imagem de Nossa Senhora, com seus 17 cm de altura, apresenta um acabamento premium com manto em tons profundos de azul-marinho e um delicado toque aveludado que captura a luz com leve brilho, criando uma presença serena e contemplativa. Complementando a composição, a bandeja marmorizada em tons neutros oferece uma base sofisticada com textura granulosa que evoca a elegância da pedra natural, enquanto o difusor de aromas com design minimalista e acabamento premium completa a harmonia visual do conjunto. Cada elemento foi cuidadosamente pensado para criar um espaço de repouso espiritual em sua casa, quarto ou escritório—um refúgio de tranquilidade que combina funcionalidade com reverência.",
      "Este kit é ideal para quem busca decoração com propósito, um presente significativo para pessoas queridas ou um apoio visual para momentos de oração e meditação. A composição equilibrada transforma qualquer ambiente em um pequeno santuário pessoal, irradiando calma e beleza.",
    ],
    especificacoes: ["PLA reciclável", "Imagem de Nossa Senhora: 17 cm de altura", "Bandeja: 18 x 10 cm"],
  },
]
