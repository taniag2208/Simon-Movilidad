"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RotateCcw, ChevronDown } from "lucide-react";
import type { FileRecord, Insumo } from "@/types";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Dropzone } from "@/components/upload/Dropzone";
import { useUpload } from "@/components/upload/useUpload";
import { cn } from "@/lib/cn";

const OTHER = "__otro__";

interface UploadCardProps {
  category: "solicitados" | "adicionales";
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  submitLabel: string;
  nameLabel: string;
  descLabel: string;
  accent?: "accent" | "cyan";
  /** Si se pasan, el nombre se elige de esta lista de insumos. */
  options?: Insumo[];
  onUploaded: (record: FileRecord) => void;
}

export function UploadCard({
  category,
  eyebrow,
  title,
  description,
  icon,
  submitLabel,
  nameLabel,
  descLabel,
  accent = "accent",
  options,
  onUploaded,
}: UploadCardProps) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(""); // valor del <select> de insumos
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { status, progress, error, upload, reset } = useUpload((record) => {
    onUploaded(record);
  });

  const uploading = status === "uploading";
  const success = status === "success";
  const selectedInsumo = options?.find((o) => o.title === selected) ?? null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!name.trim() || !desc.trim()) {
      setFormError("Completa el nombre y la descripción.");
      return;
    }
    if (!file) {
      setFormError("Selecciona un archivo.");
      return;
    }
    upload({ name: name.trim(), description: desc.trim(), category, file });
  }

  function startOver() {
    setName("");
    setSelected("");
    setDesc("");
    setFile(null);
    setFormError(null);
    reset();
  }

  const accentText = accent === "accent" ? "text-accent" : "text-cyan";
  const barColor = accent === "accent" ? "bg-accent" : "bg-cyan";

  return (
    <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 shadow-card sm:p-8">
      {/* Cabecera de la tarjeta */}
      <div className="flex items-start gap-4">
        <span className={cn("inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]", accentText)}>
          {icon}
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{eyebrow}</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">{title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary">{description}</p>
        </div>
      </div>

      <div className="mt-7 flex-1">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-12 text-center"
            >
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={cn("mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]", accentText)}
              >
                <CheckCircle2 className="h-8 w-8" />
              </motion.span>
              <p className="text-lg font-semibold text-white">¡Archivo compartido!</p>
              <p className="mt-1.5 max-w-xs text-sm text-secondary">
                Quedó registrado y ya aparece en el historial del proyecto.
              </p>
              <Button variant="ghost" className="mt-6" onClick={startOver}>
                <RotateCcw className="h-4 w-4" />
                Subir otro
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={submit}
              className="space-y-5"
            >
              {options ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-secondary">
                    {nameLabel}
                    <span className="ml-1 text-accent">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selected}
                      disabled={uploading}
                      onChange={(e) => {
                        const v = e.target.value;
                        setSelected(v);
                        setName(v === OTHER ? "" : v);
                      }}
                      className="focus-accent h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] pl-4 pr-11 text-[15px] text-white transition-colors hover:border-white/20"
                    >
                      <option value="" disabled className="bg-surface text-white">
                        Selecciona el insumo…
                      </option>
                      {options.map((o) => (
                        <option key={o.id} value={o.title} className="bg-surface text-white">
                          {o.number}. {o.title}
                        </option>
                      ))}
                      <option value={OTHER} className="bg-surface text-white">
                        Otro (especificar)
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  </div>

                  {selectedInsumo && (
                    <p className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-xs leading-relaxed text-muted">
                      {selectedInsumo.detail}
                    </p>
                  )}

                  {selected === OTHER && (
                    <div className="mt-3">
                      <Input
                        placeholder="Escribe el nombre del documento"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={uploading}
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              ) : (
                <Input
                  label={nameLabel}
                  required
                  placeholder="Ej. Diagrama de arquitectura de la app"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={uploading}
                />
              )}

              <Textarea
                label={descLabel}
                required
                rows={3}
                placeholder="Añade contexto útil sobre este archivo…"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                disabled={uploading}
              />
              <Dropzone file={file} onFile={setFile} accent={accent} disabled={uploading} />

              {(formError || error) && (
                <p className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-2.5 text-sm text-red-300">
                  {formError ?? error}
                </p>
              )}

              {uploading && (
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs text-secondary">
                    <span>Subiendo…</span>
                    <span className={accentText}>{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className={cn("h-full rounded-full", barColor)}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut", duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" loading={uploading} variant={accent === "accent" ? "primary" : "ghost"}>
                {!uploading && submitLabel}
                {uploading && "Subiendo…"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
