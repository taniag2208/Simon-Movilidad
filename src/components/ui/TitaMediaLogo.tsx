import { cn } from "@/lib/cn";

/**
 * Marca de Tita Media.
 * Por ahora es un wordmark en texto; cuando exista el archivo del logo real
 * se reemplaza el contenido por <img src="/tita-media.svg" ... />.
 */
export function TitaMediaLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const text =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-[13px]" : "text-base";
  const dot = size === "lg" ? "h-2 w-2" : "h-1.5 w-1.5";
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span className={cn("rounded-full bg-accent", dot)} />
      <span className={cn("font-semibold tracking-tight text-white", text)}>
        Tita <span className="text-accent">Media</span>
      </span>
    </div>
  );
}
