"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { FaRegUser, FaShoppingBag, FaWhatsapp } from "react-icons/fa"
import { useCarrinho } from "@/lib/carrinho"
import { useAuthCliente } from "@/lib/auth-cliente"
import { waCarrinho } from "@/lib/whatsapp"
import Logo from "./Logo"

const linksPrincipais = [
  { label: "Quem somos", href: "/#quem-somos" },
  { label: "Contato", href: "/#contato" },
]

const linksCatalogo = [
  { label: "Ver todos", href: "/catalogo" },
  { label: "Play", href: "/catalogo?linha=play" },
  { label: "Ambient", href: "/catalogo?linha=ambient" },
  { label: "Devotion", href: "/catalogo?linha=devotion" },
  { label: "Pet", href: "/catalogo?linha=pet" },
  { label: "Connect", href: "/catalogo?linha=connect" },
  { label: "Daily", href: "/catalogo?linha=daily" },
]

const todosLinksMobile = [
  ...linksCatalogo,
  ...linksPrincipais,
  { label: "Minha conta", href: "/conta" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [catalogoOpen, setCatalogoOpen] = useState(false)
  const [carrinhoOpen, setCarrinhoOpen] = useState(false)
  const catalogoRef = useRef<HTMLLIElement>(null)
  const carrinhoRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { itens, remover } = useCarrinho()
  const { cliente } = useAuthCliente()

  const handleClick = () => {
    setOpen(false)
    setCatalogoOpen(false)
    setCarrinhoOpen(false)
  }

  useEffect(() => {
    if (!open && !catalogoOpen && !carrinhoOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        setCatalogoOpen(false)
        setCarrinhoOpen(false)
      }
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [open, catalogoOpen, carrinhoOpen])

  useEffect(() => {
    if (!catalogoOpen) return
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (catalogoRef.current && !catalogoRef.current.contains(event.target as Node)) {
        setCatalogoOpen(false)
      }
    }
    document.addEventListener("mousedown", closeOnOutsideClick)
    return () => document.removeEventListener("mousedown", closeOnOutsideClick)
  }, [catalogoOpen])

  useEffect(() => {
    if (!carrinhoOpen) return
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (carrinhoRef.current && !carrinhoRef.current.contains(event.target as Node)) {
        setCarrinhoOpen(false)
      }
    }
    document.addEventListener("mousedown", closeOnOutsideClick)
    return () => document.removeEventListener("mousedown", closeOnOutsideClick)
  }, [carrinhoOpen])

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

        <div className="flex items-center gap-4 md:gap-8">
        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          <li ref={catalogoRef} className="relative">
            <button
              type="button"
              onClick={() => setCatalogoOpen((v) => !v)}
              aria-expanded={catalogoOpen}
              aria-haspopup="true"
              aria-current={isActive("/catalogo") ? "page" : undefined}
              className={`inline-flex min-h-11 items-center gap-1 text-sm tracking-wider transition-colors hover:text-cobre-text ${
                isActive("/catalogo") ? "font-medium text-cobre-text" : "text-carvao"
              }`}
            >
              Catálogo
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M2 3.5L5 6.5L8 3.5" />
              </svg>
            </button>
            <AnimatePresence>
              {catalogoOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-2 min-w-48 border border-blush bg-linho py-2 shadow-sm"
                >
                  {linksCatalogo.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={handleClick}
                        className="flex min-h-11 items-center px-4 text-sm tracking-wider text-carvao transition-colors hover:text-cobre-text"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          {linksPrincipais.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm tracking-wider text-carvao transition-colors hover:text-cobre-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Conta */}
        <a
          href="/conta"
          aria-label={cliente ? `Minha conta — ${cliente.nome}` : "Entrar ou criar conta"}
          className="flex min-h-11 min-w-11 items-center justify-center text-carvao transition-colors hover:text-cobre-text"
        >
          <FaRegUser size={18} />
        </a>

        {/* Carrinho */}
        <div ref={carrinhoRef} className="relative">
          <button
            type="button"
            onClick={() => setCarrinhoOpen((v) => !v)}
            aria-expanded={carrinhoOpen}
            aria-haspopup="true"
            aria-label="Carrinho"
            className="relative flex min-h-11 min-w-11 items-center justify-center text-carvao transition-colors hover:text-cobre-text"
          >
            <FaShoppingBag size={18} />
            {itens.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-cobre-text px-1 text-[10px] font-medium text-linho">
                {itens.length}
              </span>
            )}
          </button>
          <AnimatePresence>
            {carrinhoOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-64 border border-blush bg-linho p-4 shadow-sm"
              >
                {itens.length === 0 ? (
                  <p className="text-sm font-light text-quartzo">Seu carrinho está vazio.</p>
                ) : (
                  <>
                    <ul className="flex flex-col gap-2">
                      {itens.map((item) => (
                        <li key={item.slug} className="flex items-center justify-between gap-2">
                          <span className="text-sm text-carvao">{item.nome}</span>
                          <button
                            type="button"
                            onClick={() => remover(item.slug)}
                            aria-label={`Remover ${item.nome} do carrinho`}
                            className="text-xs text-quartzo hover:text-cobre-text"
                          >
                            remover
                          </button>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={waCarrinho(itens.map((i) => i.nome))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClick}
                      className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded bg-cobre-text px-4 text-sm font-medium uppercase tracking-widest text-linho transition-colors hover:bg-[#684436]"
                    >
                      <FaWhatsapp size={16} />
                      Finalizar pelo WhatsApp
                    </a>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
      </div>

      {/* Mobile drawer — lista plana, sem submenu aninhado */}
      {/* ponytail: "Catálogo" não vira accordion no mobile, é só mais itens na lista */}
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
                {todosLinksMobile.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={handleClick}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`flex min-h-11 items-center text-sm tracking-wider transition-colors hover:text-cobre-text ${
                        isActive(link.href) ? "font-medium text-cobre-text" : "text-carvao"
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
