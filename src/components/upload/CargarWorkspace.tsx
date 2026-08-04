"use client";

import { useCallback, useEffect, useState } from "react";
import { FileStack, Lightbulb, History } from "lucide-react";
import type { FileRecord } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { UploadCard } from "@/components/upload/UploadCard";
import { HistoryTable } from "@/components/upload/HistoryTable";

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

  return (
    <div className="mx-auto w-full max-w-content">
      <Reveal>
        <header className="pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">Operación</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Cargar información
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-secondary">
            Entrega los documentos del proyecto y comparte cualquier información adicional
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
            description="Carga aquí cualquier documento que hayamos pedido durante el proyecto."
            icon={<FileStack className="h-6 w-6" />}
            nameLabel="Nombre del documento"
            descLabel="Descripción"
            submitLabel="Subir documento"
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

      {/* Historial */}
      <Reveal delay={0.16}>
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
          <HistoryTable records={records} loading={loading} />
        </div>
      </Reveal>
    </div>
  );
}
