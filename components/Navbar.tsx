"use client"

import { useState } from "react"
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

  const handleClick = () => {
    setOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-blush bg-linho/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/#inicio" onClick={handleClick} aria-label="DINYA — voltar ao início">
          <Logo />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm tracking-wider transition-colors hover:text-cobre-text ${
                  link.label === "Brindes Corporativos"
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
          className="-m-2 p-2 text-carvao md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
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
                      className={`block py-2 text-sm tracking-wider transition-colors hover:text-cobre-text ${
                        link.label === "Brindes Corporativos"
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
