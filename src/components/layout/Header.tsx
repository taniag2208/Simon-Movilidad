"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import type { SessionUser } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Header({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-4 border-b border-white/[0.06] bg-base/60 px-6 backdrop-blur-xl sm:px-10 lg:px-14">
      {/* En móvil/tablet mostramos la marca abreviada a la izquierda */}
      <div className="flex items-center gap-3 md:opacity-0">
        <span className="text-sm font-semibold tracking-tight text-white">Evidence Engine</span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-accent">
            {initials(user.name)}
          </div>
          <div className="hidden text-right leading-tight sm:block">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-muted">{user.email}</p>
          </div>
        </div>

        <div className="h-6 w-px bg-white/10" />

        <button
          onClick={logout}
          disabled={loading}
          className="focus-accent inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2 text-sm font-medium text-secondary transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}
