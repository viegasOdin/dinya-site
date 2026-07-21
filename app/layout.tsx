import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import { CarrinhoProvider } from "@/lib/carrinho"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dinya.com.br"),
  title: "DINYA Soluções Criativas — Impressão 3D Personalizada",
  description:
    "Brindes corporativos, presentes únicos e peças sob medida em impressão 3D. Feito com precisão técnica e criatividade genuína. Atibaia, SP.",
  openGraph: {
    title: "DINYA Soluções Criativas",
    description: "O que ainda não tem forma, a gente cria.",
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-linho font-sans text-carvao antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-carvao focus:px-4 focus:py-2 focus:text-linho"
        >
          Pular para o conteúdo
        </a>
        <CarrinhoProvider>{children}</CarrinhoProvider>
      </body>
    </html>
  )
}
