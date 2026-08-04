"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, UploadCloud, Compass, Sparkles } from "lucide-react";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/Reveal";

const CARDS = [
  {
    href: "/cargar",
    icon: UploadCloud,
    kicker: "Operación",
    title: "Cargar información",
    summary:
      "Entrega los documentos solicitados y comparte cualquier archivo adicional que aporte contexto al proyecto. Todo queda registrado y disponible para el equipo.",
    accent: "accent" as const,
  },
  {
    href: "/discovery",
    icon: Compass,
    kicker: "Consulta",
    title: "Preguntas Discovery",
    summary:
      "Consulta los temas que siguen abiertos en la investigación. Un centro de referencia claro con las preguntas pendientes y lo que ya sabemos de cada una.",
    accent: "cyan" as const,
  },
];

export function HomeHero({ firstName }: { firstName: string }) {
  return (
    <div className="mx-auto w-full max-w-content">
      {/* HERO */}
      <section className="pt-8 sm:pt-14">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-secondary">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Research Operating System
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Evidence Engine
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl">
            Centro colaborativo para la investigación de expansión del portafolio de
            servicios de Simón Movilidad.
          </p>
        </Reveal>

        {firstName && (
          <Reveal delay={0.24}>
            <p className="mt-4 text-[15px] text-muted">
              Hola, <span className="text-secondary">{firstName}</span>. ¿Por dónde quieres empezar?
            </p>
          </Reveal>
        )}
      </section>

      {/* DOS TARJETAS GRANDES */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-14 grid gap-6 sm:grid-cols-2"
      >
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.href} variants={staggerItem}>
              <Link href={card.href} className="group block h-full focus-accent rounded-3xl">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 shadow-card transition-colors duration-300 group-hover:border-white/[0.14] sm:p-8"
                >
                  {/* Glow interno según acento */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[70px] transition-opacity duration-500 group-hover:opacity-100 ${
                      card.accent === "accent"
                        ? "bg-accent/20 opacity-60"
                        : "bg-cyan/20 opacity-60"
                    }`}
                  />

                  <div className="relative flex items-center justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] ${
                        card.accent === "accent" ? "text-accent" : "text-cyan"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>

                  <p className="relative mt-7 text-xs font-medium uppercase tracking-wider text-muted">
                    {card.kicker}
                  </p>
                  <h2 className="relative mt-2 text-2xl font-semibold tracking-tight text-white">
                    {card.title}
                  </h2>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-secondary">
                    {card.summary}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
