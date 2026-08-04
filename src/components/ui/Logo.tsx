import { cn } from "@/lib/cn";

/** Marca del proyecto: monograma "Evidence Engine" con acento verde TITA. */
export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
        <span className="absolute inset-0 rounded-xl shadow-[0_0_24px_-6px_rgba(128,229,147,0.7)]" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {/* Núcleo de "evidencia" — diamante con pulso */}
          <path d="M12 2 L21 12 L12 22 L3 12 Z" stroke="#80E593" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" fill="#80E593" />
          <circle cx="12" cy="12" r="6" stroke="#52C7CF" strokeWidth="1" opacity="0.6" />
        </svg>
      </span>
      {showWordmark && (
        <div className="leading-tight">
          <span className="block text-sm font-semibold tracking-tight text-white">Evidence Engine</span>
          <span className="block text-[11px] font-medium tracking-wide text-muted">SIMÓN MOVILIDAD</span>
        </div>
      )}
    </div>
  );
}
