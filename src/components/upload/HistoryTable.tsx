"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileType2,
  Presentation,
  FileArchive,
  Image as ImageIcon,
  File as FileIcon,
  Search,
  Inbox,
} from "lucide-react";
import type { FileRecord } from "@/types";
import { cn } from "@/lib/cn";

function iconFor(type: string) {
  const t = type.toLowerCase();
  if (t.includes("pdf")) return FileText;
  if (t.includes("excel")) return FileSpreadsheet;
  if (t.includes("word")) return FileType2;
  if (t.includes("power")) return Presentation;
  if (t.includes("zip")) return FileArchive;
  if (t.includes("imagen")) return ImageIcon;
  return FileIcon;
}

type Filter = "todos" | "solicitados" | "adicionales";

export function HistoryTable({
  records,
  loading,
}: {
  records: FileRecord[];
  loading: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (filter !== "todos" && r.category !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.user.toLowerCase().includes(q) ||
          r.fileName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [records, filter, query]);

  const filters: { key: Filter; label: string }[] = [
    { key: "todos", label: "Todos" },
    { key: "solicitados", label: "Solicitados" },
    { key: "adicionales", label: "Adicionales" },
  ];

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-card">
      {/* Barra de control */}
      <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "relative rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === f.key ? "text-white" : "text-muted hover:text-secondary",
              )}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="history-filter"
                  className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.05]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en el historial…"
            className="focus-accent h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm text-white placeholder:text-white/30"
          />
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="divide-y divide-white/[0.05]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-5">
              <div className="h-9 w-9 animate-pulse rounded-xl bg-white/[0.05]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 animate-pulse rounded bg-white/[0.05]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.04]" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-muted">
            <Inbox className="h-7 w-7" />
          </span>
          <p className="text-[15px] font-medium text-white">
            {records.length === 0 ? "Aún no hay archivos cargados" : "Sin resultados"}
          </p>
          <p className="mt-1 max-w-xs text-sm text-muted">
            {records.length === 0
              ? "Cuando subas el primer documento aparecerá aquí, disponible para todo el equipo."
              : "Ajusta el filtro o la búsqueda para ver otros archivos."}
          </p>
        </div>
      ) : (
        <>
          {/* Encabezados (desktop) */}
          <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 px-6 py-3 text-xs font-medium uppercase tracking-wider text-faint lg:grid">
            <span>Documento</span>
            <span>Cargado por</span>
            <span>Fecha</span>
            <span className="text-right">Acción</span>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {filtered.map((r, i) => {
              const Icon = iconFor(r.fileType);
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className="grid grid-cols-1 gap-4 px-6 py-5 transition-colors hover:bg-white/[0.02] lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-center"
                >
                  {/* Documento */}
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-secondary">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-[15px] font-medium text-white">{r.name}</p>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                            r.category === "solicitados"
                              ? "border-accent/25 bg-accent/[0.08] text-accent"
                              : "border-cyan/25 bg-cyan/[0.08] text-cyan",
                          )}
                        >
                          {r.category === "solicitados" ? "Solicitado" : "Adicional"}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-secondary">{r.description}</p>
                      <p className="mt-1 truncate text-xs text-faint">
                        {r.fileName} · {r.fileType}
                      </p>
                    </div>
                  </div>

                  {/* Cargado por */}
                  <div className="text-sm">
                    <p className="font-medium text-white">{r.user}</p>
                    <p className="truncate text-xs text-muted">{r.email}</p>
                  </div>

                  {/* Fecha */}
                  <div className="text-sm">
                    <p className="text-secondary">{r.date}</p>
                    <p className="text-xs text-muted">{r.time}</p>
                  </div>

                  {/* Descarga */}
                  <div className="lg:text-right">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-accent inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2 text-sm font-medium text-secondary transition-colors hover:border-white/20 hover:text-white"
                    >
                      <Download className="h-4 w-4" />
                      Descargar
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
