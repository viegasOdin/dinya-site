# Contrato — campo `linha` e confirmação de `preco` em `GET /public/catalogo`

**Para:** time de aplicação do `dinya-app` (ERP)
**Data:** 2026-07-21
**Contexto:** site institucional (`dinya-site`) passou a exibir preço real e um destaque de "3
peças por linha" na home. Ambos consomem o mesmo endpoint público já existente — nenhum endpoint
novo precisa ser criado.

## Endpoint existente

```
GET {DINYA_API_URL}/public/catalogo
```

Já documentado em `memory/decisions/2026-07-11-sincronizacao-catalogo-dinya-app.md` do
`dinya-site`. Resposta atual (`corpo.itens`), campo por item:

```ts
interface ItemCatalogoErp {
  codigo: string
  tipo: "produto" | "kit"
  nome: string
  preco: number
  disponibilidade: { tipo: "sob_encomenda" } | { tipo: "estoque"; pecas: number | null }
  descricao: string[]
  diferenciais: string[]
  imagens: string[]
}
```

## O que muda

### 1. Novo campo opcional `linha`

```ts
interface ItemCatalogoErp {
  // ...campos existentes, inalterados...
  linha?: "play" | "ambient" | "devotion"
}
```

- **Opcional.** Item sem `linha` continua funcionando normalmente no site (só não aparece no
  destaque lateral da seção "As três linhas" da home).
- Um item pertence a **no máximo uma** linha. Não há suporte hoje a múltiplas linhas por produto.
- Valores aceitos são exatamente as 3 strings acima (minúsculas, em inglês) — qualquer outro valor
  é ignorado pelo site (tratado como "sem linha").
- O site usa **até 3 itens por linha** (os 3 primeiros que vierem na resposta com aquela `linha`,
  sem critério de ordenação especial hoje — se precisar de um "destaque" específico entre vários
  itens da mesma linha, isso precisa de um critério adicional a combinar depois; por ora,
  simplesmente marcar `linha` nos até 3 produtos que devem aparecer já resolve).

### 2. `preco` — sem mudança de contrato, só de uso

`preco` já existe na resposta desde 2026-07-11 e sempre foi sincronizado — só nunca tinha sido
exibido no site. A partir de agora **o valor de `preco` aparece na página de produto do site**
(formatado em BRL), no lugar de "Preço e prazo sob consulta". Isso significa que **qualquer valor
de `preco` que hoje esteja incorreto, zerado ou de placeholder no ERP vai aparecer literalmente
para o visitante do site** — vale a pena o time confirmar que os valores atuais em produção estão
corretos antes do próximo deploy do site pegar isso em produção.

Quando `preco` for `0` ou o item não tiver preço definido ainda, o site mantém a mensagem "Preço e
prazo sob consulta" (fallback já existente, sem mudança de comportamento nesse caso).

## Exemplo de resposta

```json
{
  "itens": [
    {
      "codigo": "P0021",
      "tipo": "produto",
      "nome": "Luminária Wave",
      "preco": 189.9,
      "disponibilidade": { "tipo": "sob_encomenda" },
      "descricao": ["..."],
      "diferenciais": ["..."],
      "imagens": ["https://.../wave-1.jpg"],
      "linha": "ambient"
    }
  ]
}
```

## Não é necessário

- Nenhum endpoint novo.
- Nenhuma mudança de autenticação (endpoint continua público, sem auth).
- Nenhuma mudança nos campos existentes (`codigo`, `tipo`, `nome`, `disponibilidade`, `descricao`,
  `diferenciais`, `imagens`).
