"use client";

import { motion } from "framer-motion";
import { Sparkle, BookOpen, HelpCircle } from "lucide-react";
import type { DiscoveryQuestion } from "@/types";
import { cn } from "@/lib/cn";

export function QuestionCard({ q, index }: { q: DiscoveryQuestion; index: number }) {
  const open = q.status === "ABIERTA";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.25), ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass group relative overflow-hidden rounded-3xl p-6 shadow-card transition-all duration-300 hover:border-white/[0.14] sm:p-7",
        open && "hover:shadow-[0_30px_80px_-30px_rgba(128,229,147,0.25)]",
      )}
    >
      {/* Barra de acento lateral para preguntas abiertas */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-[3px]",
          open ? "bg-gradient-to-b from-accent/70 to-accent/0" : "bg-gradient-to-b from-cyan/50 to-cyan/0",
        )}
      />

      {/* Etiqueta de estado */}
      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide",
            open
              ? "border-accent/25 bg-accent/[0.08] text-accent"
              : "border-cyan/25 bg-cyan/[0.08] text-cyan",
          )}
        >
          {open ? <HelpCircle className="h-3 w-3" /> : <Sparkle className="h-3 w-3" />}
          {open ? "Pregunta abierta" : "Parcial · profundizar"}
        </span>
      </div>

      {/* Pregunta */}
      <p className="text-pretty text-lg font-medium leading-snug tracking-tight text-white sm:text-xl">
        {q.question}
      </p>

      {/* Lo que ya sabemos */}
      <div
        className={cn(
          "mt-5 rounded-2xl border px-4 py-3.5",
          q.notes
            ? "border-white/[0.07] bg-white/[0.025]"
            : "border-white/[0.05] bg-white/[0.012]",
        )}
      >
        <div className="mb-1.5 flex items-center gap-2">
          <BookOpen className="h-3.5 w-3.5 text-muted" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Lo que ya sabemos
          </span>
        </div>
        {q.notes ? (
          <p className="text-sm leading-relaxed text-secondary">{q.notes}</p>
        ) : (
          <p className="text-sm italic leading-relaxed text-faint">
            Aún no existe información registrada.
          </p>
        )}
      </div>
    </motion.article>
  );
}
