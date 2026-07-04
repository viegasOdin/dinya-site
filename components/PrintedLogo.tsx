"use client"

import { motion, useReducedMotion } from "motion/react"
import LogoIcon from "./LogoIcon"

const PRINT_DURATION = 3.2

export default function PrintedLogo({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <LogoIcon className={className} />
  }

  return (
    <div className="relative inline-block">
      {/* Fantasma do logo (guia de impressão) */}
      <LogoIcon className={`${className ?? ""} opacity-[0.08]`} />

      {/* Logo sendo "impresso" de baixo para cima, camada por camada */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: PRINT_DURATION, ease: "linear" }}
      >
        <LogoIcon className={className} />
      </motion.div>

      {/* Linha de impressão + bico, subindo com a revelação */}
      <motion.div
        className="pointer-events-none absolute inset-x-0"
        initial={{ top: "100%", opacity: 1 }}
        animate={{ top: "0%", opacity: [1, 1, 0] }}
        transition={{
          top: { duration: PRINT_DURATION, ease: "linear" },
          opacity: { duration: PRINT_DURATION + 0.4, times: [0, 0.94, 1] },
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-cobre/40" />
        <motion.div
          className="absolute -top-px"
          initial={{ left: "8%" }}
          animate={{ left: "78%" }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          {/* Bico extrusor apontando para baixo, ponta na linha de impressão */}
          <svg
            width="22"
            height="30"
            viewBox="0 0 22 30"
            className="-translate-x-1/2 -translate-y-full"
            aria-hidden="true"
          >
            <rect x="4" y="0" width="14" height="10" rx="1" className="fill-cobre-deep" />
            <rect x="2" y="10" width="18" height="4" rx="1" className="fill-cobre" />
            <path d="M7 14 L15 14 L12.5 22 L9.5 22 Z" className="fill-cobre-deep" />
            <rect x="10" y="22" width="2" height="5" className="fill-carvao" />
            {/* Ponto de fusão */}
            <circle cx="11" cy="28.5" r="1.5" className="fill-cobre" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
