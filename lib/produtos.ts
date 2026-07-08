export interface Produto {
  nome: string
  imagens?: string[]
  descricao: string[]
  diferenciais?: string[]
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
    nome: "Serenidade Sagrada: Kit Altar Nossa Senhora com Difusor de Aromas",
    imagens: ["/catalogo/Kit Nsa. Senhora Completo.jpg", "/catalogo/kit_nossa_senhora_difusor.jpg", "/catalogo/kit_nossa_senhora_porta_vela.jpg"],
    descricao: [
      "Encontre paz e elegância em um único espaço com este kit exclusivo que une devoção espiritual e design contemporâneo. A imagem de Nossa Senhora, com seus 17 cm de altura, apresenta um acabamento premium com manto em tons profundos de azul-marinho e um delicado toque aveludado que captura a luz com leve brilho, criando uma presença serena e contemplativa. Complementando a composição, a bandeja marmorizada em tons neutros oferece uma base sofisticada com textura granulosa que evoca a elegância da pedra natural, enquanto o difusor de aromas com design minimalista e acabamento premium completa a harmonia visual do conjunto. Cada elemento foi cuidadosamente pensado para criar um espaço de repouso espiritual em sua casa, quarto ou escritório—um refúgio de tranquilidade que combina funcionalidade com reverência.",
      "Este kit é ideal para quem busca decoração com propósito, um presente significativo para pessoas queridas ou um apoio visual para momentos de oração e meditação. A composição equilibrada transforma qualquer ambiente em um pequeno santuário pessoal, irradiando calma e beleza.",
    ],
    especificacoes: ["PLA reciclável", "Imagem de Nossa Senhora: 17 cm de altura", "Bandeja: 18 x 10 cm"],
  },
  {
    nome: "Ovo de Dragão: O Fidget que Transforma Ansiedade em Movimento",
    imagens: ["/catalogo/Ovo Fidget - 1 un.png", "/catalogo/Ovo Fidget - 3 un.png", "/catalogo/Ovo Fidget - Aberto.jpg"],
    descricao: [
      "Há algo profundamente satisfatório em segurar algo que responde ao toque. Este fidget anti-stress não é apenas um objeto para as mãos—é uma experiência sensorial completa. Seu formato de ovo de dragão, com escamas em relevo meticulosamente texturizadas, convida a exploração contínua. Cada movimento revela uma nova sensação: o toque aveludado do acabamento premium, a mudança sutil de cor conforme a luz incide sobre a metalização iridescente que transita entre cobre queimado e tons rosados. Perfeito para caber em uma mão, permite que você mantenha o foco enquanto trabalha, estuda ou simplesmente respira.",
      "O movimento em espiral suave e agradável oferece uma manipulação contínua e hipnotizante — aquele tipo de movimento que acalma a mente sem exigir atenção consciente. Ideal para quem busca um companheiro tátil que combina design sofisticado com funcionalidade genuína.",
    ],
    diferenciais: [
      "Experiência sensorial completa (tátil, visual, cinestésica)",
      "Design sofisticado que funciona em qualquer ambiente",
      "Auxilia concentração e reduz ansiedade",
      "Manipulação contínua sem fadiga",
      "Acabamento premium que justifica o investimento",
    ],
    especificacoes: [
      "Formato: ovo de dragão com escamas em relevo",
      "Acabamento: aveludado com metalização iridescente",
      "Tamanho: ideal para manipulação com uma mão",
      "Movimento: espiral suave e contínua",
      "Material: plástico de alta qualidade com acabamento premium",
    ],
  },
  {
    nome: "Prendedor de Canga: Seu Aliado Contra os Ventos",
    imagens: ["/catalogo/Pregador de Canga na areia.jpg", "/catalogo/Pregador de Canga.jpg", "/catalogo/Pregador de Canga 2.jpg"],
    descricao: [
      "Esqueça a frustração de ver sua canga voar na areia. Este prendedor foi desenvolvido e testado nos ventos fortes de Fortaleza, garantindo que sua toalha permaneça exatamente onde você a deixou. Com design simples mas robusto, o clip se enterra facilmente na areia com um movimento único—sem complicações, sem ferramentas. O material resistente foi escolhido especificamente para suportar as condições mais desafiadoras da praia, mantendo a durabilidade mesmo após uso intenso e exposição ao sal e à areia.",
      "Leve o suficiente para caber na bolsa, forte o suficiente para vencer qualquer rajada. Ideal para quem quer aproveitar o dia de praia sem se preocupar com pequenos detalhes—ou grandes ventanias.",
    ],
    diferenciais: [
      "Testado em condições reais: Aprovado nos ventos fortes de Fortaleza",
      "Material resistente: Durável contra sal, areia e uso contínuo",
      "Fácil de usar: Basta inserir na areia—sem montagem ou técnica especial",
      "Portátil: Leve e compacto para levar na bolsa de praia",
      "Prático: Prende cangas, toalhas e qualquer tecido de praia"
    ],
    especificacoes: [
      "Especificações:",
      "Material: Plástico de alta resistência",
      "Design: Ergonômico e intuitivo",
      "Aplicação: Ideal para praias com vento forte",
      "Durabilidade: Testado e aprovado em condições extremas"
    ],
  }
]
