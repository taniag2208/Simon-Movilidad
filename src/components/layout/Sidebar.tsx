"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, UploadCloud, Compass } from "lucide-react";
import { TitaMediaLogo } from "@/components/ui/TitaMediaLogo";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/inicio", label: "Inicio", icon: Home },
  { href: "/cargar", label: "Cargar información", icon: UploadCloud },
  { href: "/discovery", label: "Preguntas Discovery", icon: Compass },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-white/[0.06] px-5 py-7 md:flex">
      <nav className="mt-2 flex flex-col gap-1.5">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-accent group relative flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[15px] transition-colors duration-200",
                active ? "text-white" : "text-secondary hover:text-white",
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.04]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className={cn(
                  "relative h-[18px] w-[18px] transition-colors",
                  active ? "text-accent" : "text-muted group-hover:text-secondary",
                )}
              />
              <span className="relative font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-3">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <TitaMediaLogo size="sm" className="mb-3" />
          <p className="text-xs font-medium text-secondary">Research Operating System</p>
          <p className="mt-1 text-[11px] leading-relaxed text-faint">
            Centro colaborativo de evidencia · Tita Media
          </p>
        </div>
      </div>
    </aside>
  );
}
