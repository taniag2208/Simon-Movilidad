import { cn } from "@/lib/cn";

/** Logo oficial de Tita Media (wordmark blanco, fondo transparente). */
export function TitaMediaLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const width = size === "lg" ? 196 : size === "sm" ? 132 : 168;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/tita-media.png"
      alt="Tita Media · Outstanding Performance"
      width={width}
      style={{ width }}
      className={cn("h-auto select-none", className)}
    />
  );
}
