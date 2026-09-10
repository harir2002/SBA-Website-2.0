export default function FilterChip({ active, children, onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-sm border px-3 py-1.5 font-heading text-xs font-bold tracking-wide uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red ${
        active
          ? 'border-primary-red bg-primary-red text-white'
          : 'border-white/25 bg-black text-white hover:border-primary-red/50'
      }`}
      {...props}
    >
      {children}
      {active ? <span className="sr-only"> (selected)</span> : null}
    </button>
  )
}
