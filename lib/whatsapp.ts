const NUMERO = "5511913014799"

export const WA_EMPRESA = `https://wa.me/${NUMERO}?text=${encodeURIComponent(
  "Olá, gostaria de solicitar um orçamento para brindes corporativos."
)}`

export const WA_PESSOAL = `https://wa.me/${NUMERO}?text=${encodeURIComponent(
  "Olá, gostaria de encomendar algo especial da DINYA."
)}`

export const waProduto = (nome: string) =>
  `https://wa.me/${NUMERO}?text=${encodeURIComponent(
    `Olá, vim do site e gostei do produto ${nome}.`
  )}`
