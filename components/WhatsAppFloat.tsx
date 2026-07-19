"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { FaWhatsapp } from "react-icons/fa"
import { WA_EMPRESA, WA_PESSOAL } from "@/lib/whatsapp"

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)
  const [contactInView, setContactInView] = useState(false)
  const pathname = usePathname()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const closeOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-whatsapp-float]")) close()
    }
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    const id = setTimeout(() => document.addEventListener("click", closeOutside), 0)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      clearTimeout(id)
      document.removeEventListener("click", closeOutside)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open, close])

  useEffect(() => {
    const contact = document.getElementById("contato")
    if (!contact) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactInView(entry.isIntersecting)
        if (entry.isIntersecting) close()
      },
      { threshold: 0.05 },
    )
    observer.observe(contact)
    return () => observer.disconnect()
  }, [close])

  if (pathname.startsWith("/catalogo/") || contactInView) return null

  return (
    <div
      data-whatsapp-float
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6"
    >
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 motion-reduce:transition-none ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a
          href={WA_EMPRESA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded bg-cobre-text px-4 py-2 text-xs font-medium uppercase tracking-widest text-linho shadow-lg transition-colors hover:bg-[#684436]"
        >
          <FaWhatsapp size={14} />
          Sou empresa
        </a>
        <a
          href={WA_PESSOAL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded bg-cobre-text px-4 py-2 text-xs font-medium uppercase tracking-widest text-linho shadow-lg transition-colors hover:bg-[#684436]"
        >
          <FaWhatsapp size={14} />
          Quero algo especial
        </a>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#075E54] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 motion-reduce:transform-none motion-reduce:transition-none"
        aria-expanded={open}
        aria-label="Fale conosco pelo WhatsApp"
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  )
}
