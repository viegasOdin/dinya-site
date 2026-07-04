import LogoIcon from "./LogoIcon"

interface LogoProps {
  className?: string
  dark?: boolean
}

export default function Logo({ className, dark }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <LogoIcon
        className={`h-10 w-auto flex-shrink-0 ${dark ? "text-linho" : "text-carvao"}`}
      />
      <span
        className={`font-display text-2xl tracking-wide ${dark ? "text-linho" : "text-carvao"}`}
      >
        DINYA
      </span>
    </div>
  )
}
