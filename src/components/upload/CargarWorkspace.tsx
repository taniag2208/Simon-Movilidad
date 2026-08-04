"use client";

import { useCallback, useEffect, useState } from "react";
import { FileStack, Lightbulb, History, ListChecks } from "lucide-react";
import type { FileRecord } from "@/types";
import { insumos } from "@data/insumos";
import { Reveal } from "@/components/ui/Reveal";
import { UploadCard } from "@/components/upload/UploadCard";
import { HistoryTable } from "@/components/upload/HistoryTable";
import { InsumosChecklist } from "@/components/upload/InsumosChecklist";

export function CargarWorkspace() {
  const [records, setRecords] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/files", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setRecords(data.records ?? []);
    } catch {
      /* silencioso: la tabla mostrará el estado vacío */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onUploaded = useCallback((record: FileRecord) => {
    setRecords((prev) => [record, ...prev]);
  }, []);

  const onDelete = useCallback(async (id: string) => {
    const res = await fetch(`/api/files/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-content">
      <Reveal>
        <header className="pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Operación</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Cargar información
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-secondary">
            Entrega los insumos del proyecto y comparte cualquier información adicional
            que aporte contexto. Todo queda registrado automáticamente.
          </p>
        </header>
      </Reveal>

      {/* Dos bloques */}
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal delay={0.06}>
          <UploadCard
            category="solicitados"
            accent="accent"
            eyebrow="Bloque 1"
            title="Documentos solicitados"
            description="Elige el insumo que estás entregando y súbelo. Puedes ver el listado completo abajo."
            icon={<FileStack className="h-6 w-6" />}
            nameLabel="Insumo"
            descLabel="Descripción"
            submitLabel="Subir documento"
            options={insumos}
            onUploaded={onUploaded}
          />
        </Reveal>

        <Reveal delay={0.12}>
          <UploadCard
            category="adicionales"
            accent="cyan"
            eyebrow="Bloque 2"
            title="Archivos adicionales"
            description="¿Recordaste algo que no te pedimos? Compártelo aquí, también suma."
            icon={<Lightbulb className="h-6 w-6" />}
            nameLabel="Nombre"
            descLabel="Descripción"
            submitLabel="Compartir"
            onUploaded={onUploaded}
          />
        </Reveal>
      </div>

      {/* Listado de insumos (checklist) */}
      <Reveal delay={0.16}>
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-secondary">
              <ListChecks className="h-[18px] w-[18px]" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">Listado de insumos</h2>
              <p className="text-sm text-muted">Qué se solicitó y qué ya fue entregado.</p>
            </div>
          </div>
          <InsumosChecklist records={records} />
        </div>
      </Reveal>

      {/* Historial */}
      <Reveal delay={0.2}>
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-secondary">
              <History className="h-[18px] w-[18px]" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">Historial de archivos</h2>
              <p className="text-sm text-muted">
                Todo lo que el equipo ha cargado, del más reciente al más antiguo.
              </p>
            </div>
          </div>
          <HistoryTable records={records} loading={loading} onDelete={onDelete} />
        </div>
      </Reveal>
    </div>
  );
}
