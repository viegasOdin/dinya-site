"use client"

import { useState, useEffect, useCallback } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { WA_EMPRESA, WA_PESSOAL } from "@/lib/whatsapp"

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-whatsapp-float]")) close()
    }
    const id = setTimeout(() => document.addEventListener("click", handler), 0)
    return () => {
      clearTimeout(id)
      document.removeEventListener("click", handler)
    }
  }, [open, close])

  return (
    <div
      data-whatsapp-float
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a
          href={WA_EMPRESA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded bg-cobre-deep px-4 py-2 text-xs font-medium uppercase tracking-widest text-linho shadow-lg transition-colors hover:bg-[#7A5240]"
        >
          <FaWhatsapp size={14} />
          Sou empresa
        </a>
        <a
          href={WA_PESSOAL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded bg-cobre px-4 py-2 text-xs font-medium uppercase tracking-widest text-linho shadow-lg transition-colors hover:bg-cobre-deep"
        >
          <FaWhatsapp size={14} />
          Quero algo especial
        </a>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
        aria-expanded={open}
        aria-label="Fale conosco pelo WhatsApp"
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  )
}
