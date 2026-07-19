"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import Logo from "./Logo"

const links = [
  { label: "O que fazemos", href: "/#o-que-fazemos" },
  { label: "Brindes Corporativos", href: "/#corporativo" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Quem somos", href: "/#quem-somos" },
  { label: "Contato", href: "/#contato" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleClick = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [open])

  const isActive = (href: string) =>
    href === "/catalogo" && pathname.startsWith("/catalogo")

  return (
    <nav className="sticky top-0 z-50 border-b border-blush bg-linho/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="/#inicio"
          onClick={handleClick}
          aria-label="DINYA — voltar ao início"
          className="inline-flex min-h-11 items-center"
        >
          <Logo />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-flex min-h-11 items-center text-sm tracking-wider transition-colors hover:text-cobre-text ${
                  isActive(link.href)
                    ? "font-medium text-cobre-text"
                    : "text-carvao"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="flex min-h-11 min-w-11 items-center justify-center text-carvao md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-principal"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="border-t border-blush bg-linho md:hidden"
            >
              <ul className="flex flex-col gap-2 px-6 pb-6 pt-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleClick}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`flex min-h-11 items-center text-sm tracking-wider transition-colors hover:text-cobre-text ${
                        isActive(link.href)
                          ? "font-medium text-cobre-text"
                          : "text-carvao"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </nav>
  )
}
