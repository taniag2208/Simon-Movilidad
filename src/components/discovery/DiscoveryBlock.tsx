"use client";

import { motion } from "framer-motion";
import type { DiscoveryBlock as Block } from "@/types";
import { QuestionCard } from "@/components/discovery/QuestionCard";

export function DiscoveryBlockSection({ block, index }: { block: Block; index: number }) {
  const openCount = block.questions.filter((q) => q.status === "ABIERTA").length;
  const partialCount = block.questions.length - openCount;

  return (
    <section id={block.id} className="scroll-mt-24">
      {/* Cabecera editorial del bloque */}
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-7 border-b border-white/[0.06] pb-6"
      >
        <div className="flex items-center gap-3">
          {block.number && (
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-2 font-mono text-sm text-accent">
              {block.number.padStart(2, "0")}
            </span>
          )}
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Bloque temático
          </span>
        </div>
        <h2 className="mt-3 text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
          {block.title}
        </h2>
        <p className="mt-3 text-sm text-muted">
          {block.questions.length} {block.questions.length === 1 ? "pregunta" : "preguntas"}
          {" · "}
          {openCount > 0 && (
            <span className="text-accent">{openCount} abierta{openCount === 1 ? "" : "s"}</span>
          )}
          {openCount > 0 && partialCount > 0 && " · "}
          {partialCount > 0 && (
            <span className="text-cyan">{partialCount} parcial{partialCount === 1 ? "" : "es"}</span>
          )}
        </p>
      </motion.header>

      {/* Preguntas */}
      <div className="grid gap-5 md:grid-cols-2">
        {block.questions.map((q, i) => (
          <QuestionCard key={q.id} q={q} index={i} />
        ))}
      </div>
    </section>
  );
}
