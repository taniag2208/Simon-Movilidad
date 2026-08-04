"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No fue posible iniciar sesión.");
        setLoading(false);
        return;
      }
      const from = params.get("from");
      router.replace(from && from.startsWith("/") ? from : "/inicio");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      {/* Glow adicional detrás del formulario */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-secondary">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Acceso exclusivo del equipo
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Bienvenido de nuevo
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-secondary">
            Ingresa al centro de investigación del Evidence Engine para Simón Movilidad.
          </p>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl p-7 shadow-card sm:p-8">
          <div className="space-y-5">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-[42px] h-[18px] w-[18px] text-muted" />
              <Input
                label="Correo electrónico"
                type="email"
                autoComplete="email"
                placeholder="tu@simon.com"
                className="pl-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-[42px] h-[18px] w-[18px] text-muted" />
              <Input
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="pl-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" size="lg" loading={loading} className="mt-7 w-full">
            {!loading && (
              <>
                Ingresar al portal
                <ArrowRight className="h-[18px] w-[18px]" />
              </>
            )}
            {loading && "Verificando…"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-faint">
          El acceso es administrado por el equipo. No existe registro ni recuperación de contraseña.
        </p>
      </motion.div>
    </main>
  );
}
