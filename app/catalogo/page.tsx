import Navbar from "@/components/Navbar"
import Catalogo from "@/components/Catalogo"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"

export default function CatalogoPage() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Catalogo />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
