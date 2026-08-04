"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import type { FileRecord } from "@/types";
import { insumos } from "@data/insumos";
import { cn } from "@/lib/cn";

export function InsumosChecklist({ records }: { records: FileRecord[] }) {
  const deliveredTitles = useMemo(() => {
    const set = new Set<string>();
    for (const r of records) {
      if (r.category === "solicitados") set.add(r.name.trim().toLowerCase());
    }
    return set;
  }, [records]);

  const delivered = insumos.filter((i) => deliveredTitles.has(i.title.toLowerCase())).length;

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-card">
      <div className="flex items-center justify-between border-b border-white/[0.06] p-5 sm:p-6">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Insumos solicitados
          </h3>
          <p className="text-sm text-muted">Listado de documentos que esperamos recibir</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-sm">
          <span className="font-semibold text-accent">{delivered}</span>
          <span className="text-muted">de {insumos.length}</span>
        </span>
      </div>

      <ul className="divide-y divide-white/[0.05]">
        {insumos.map((insumo, i) => {
          const done = deliveredTitles.has(insumo.title.toLowerCase());
          return (
            <motion.li
              key={insumo.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.25) }}
              className="flex items-start gap-3.5 px-5 py-4 sm:px-6"
            >
              {done ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-faint" />
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-faint">
                    {String(insumo.number).padStart(2, "0")}
                  </span>
                  <p className={cn("text-[15px] font-medium", done ? "text-white" : "text-secondary")}>
                    {insumo.title}
                  </p>
                  <span
                    className={cn(
                      "ml-auto shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                      done
                        ? "border-accent/25 bg-accent/[0.08] text-accent"
                        : "border-white/10 bg-white/[0.03] text-muted",
                    )}
                  >
                    {done ? "Entregado" : "Pendiente"}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{insumo.detail}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
