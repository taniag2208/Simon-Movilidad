"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UploadCloud, Compass } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/inicio", label: "Inicio", icon: Home },
  { href: "/cargar", label: "Cargar", icon: UploadCloud },
  { href: "/discovery", label: "Discovery", icon: Compass },
];

/** Navegación horizontal para pantallas por debajo de `md` (tablet estrecha). */
export function MobileNav() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-white/[0.06] px-6 py-3 md:hidden">
      {NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
              active
                ? "border-white/10 bg-white/[0.05] text-white"
                : "border-transparent text-secondary hover:text-white",
            )}
          >
            <Icon className={cn("h-4 w-4", active ? "text-accent" : "text-muted")} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
