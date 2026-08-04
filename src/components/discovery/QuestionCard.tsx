"use client";

import { motion } from "framer-motion";
import type { DiscoveryQuestion } from "@/types";

export function QuestionCard({ q, index }: { q: DiscoveryQuestion; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.25), ease: [0.16, 1, 0.3, 1] }}
      className="glass group relative flex items-start gap-4 overflow-hidden rounded-3xl p-6 shadow-card transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_30px_80px_-30px_rgba(128,229,147,0.22)] sm:p-7"
    >
      {/* Barra de acento lateral (uniforme, sin exponer estado) */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent/60 to-accent/0"
      />

      {/* Marcador editorial */}
      <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent/70" />

      {/* Pregunta */}
      <p className="text-pretty text-lg font-medium leading-snug tracking-tight text-white sm:text-xl">
        {q.question}
      </p>
    </motion.article>
  );
}
