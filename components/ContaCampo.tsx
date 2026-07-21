export default function ContaCampo({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1 text-sm text-carvao">
      {label}
      <input
        {...props}
        className="min-h-11 rounded border border-blush bg-white px-3 text-sm text-carvao outline-none transition-colors focus:border-cobre-text"
      />
    </label>
  )
}
