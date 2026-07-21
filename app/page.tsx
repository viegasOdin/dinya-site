import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import AsTresLinhas from "@/components/AsTresLinhas"
import Corporativo from "@/components/Corporativo"
import OQueFazemos from "@/components/OQueFazemos"
import QuemSomos from "@/components/QuemSomos"
import Contato from "@/components/Contato"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <AsTresLinhas />
        <Corporativo />
        <OQueFazemos />
        <QuemSomos />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
