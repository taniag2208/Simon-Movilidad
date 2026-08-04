"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, HelpCircle, Sparkle } from "lucide-react";
import { discoveryBlocks, discoveryStats } from "@data/discovery";
import { Reveal } from "@/components/ui/Reveal";
import { DiscoveryBlockSection } from "@/components/discovery/DiscoveryBlock";

export function DiscoveryView() {
  return (
    <div className="mx-auto w-full max-w-content">
      {/* HERO */}
      <Reveal>
        <header className="pt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-secondary">
            <Compass className="h-3.5 w-3.5 text-cyan" />
            Centro de consulta
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Preguntas Discovery
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-secondary">
            Los temas que siguen pendientes en la investigación. Consulta con calma qué
            necesitamos resolver y lo que ya sabemos de cada punto.
          </p>
        </header>
      </Reveal>

      {/* Resumen + índice */}
      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm">
            <span className="font-semibold text-white">{discoveryStats.total}</span>
            <span className="text-muted">preguntas por resolver</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-2xl border border-accent/20 bg-accent/[0.06] px-4 py-2.5 text-sm">
            <HelpCircle className="h-4 w-4 text-accent" />
            <span className="font-semibold text-white">{discoveryStats.open}</span>
            <span className="text-secondary">abiertas</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-2xl border border-cyan/20 bg-cyan/[0.06] px-4 py-2.5 text-sm">
            <Sparkle className="h-4 w-4 text-cyan" />
            <span className="font-semibold text-white">{discoveryStats.partial}</span>
            <span className="text-secondary">parciales</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm">
            <span className="font-semibold text-white">{discoveryStats.blocks}</span>
            <span className="text-muted">bloques</span>
          </span>
        </div>
      </Reveal>

      <div className="mt-14 flex gap-12">
        {/* Índice lateral (jump nav) */}
        <aside className="sticky top-24 hidden h-fit w-56 shrink-0 xl:block">
          <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-faint">
            Bloques
          </p>
          <nav className="flex flex-col gap-0.5">
            {discoveryBlocks.map((b) => (
              <Link
                key={b.id}
                href={`#${b.id}`}
                className="focus-accent group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-secondary transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {b.number && (
                  <span className="font-mono text-xs text-faint group-hover:text-accent">
                    {b.number.padStart(2, "0")}
                  </span>
                )}
                <span className="line-clamp-1">{b.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Bloques */}
        <div className="min-w-0 flex-1 space-y-20">
          {discoveryBlocks.map((block, i) => (
            <DiscoveryBlockSection key={block.id} block={block} index={i} />
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-white/[0.06] pt-10 text-center text-sm text-faint"
          >
            Fin de las preguntas pendientes · Evidence Engine
          </motion.p>
        </div>
      </div>
    </div>
  );
}
