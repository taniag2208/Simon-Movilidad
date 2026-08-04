"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileCheck2, X } from "lucide-react";
import { ACCEPT_ATTR, isAccepted, labelForFile } from "@/lib/fileTypes";
import { cn } from "@/lib/cn";

function humanSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Dropzone({
  file,
  onFile,
  accent = "accent",
  disabled,
}: {
  file: File | null;
  onFile: (file: File | null) => void;
  accent?: "accent" | "cyan";
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [rejected, setRejected] = useState<string | null>(null);

  function handleFiles(list: FileList | null) {
    setRejected(null);
    const f = list?.[0];
    if (!f) return;
    if (!isAccepted(f.name)) {
      setRejected("Formato no permitido para este archivo.");
      return;
    }
    onFile(f);
  }

  const ring = accent === "accent" ? "border-accent/50 bg-accent/[0.05]" : "border-cyan/50 bg-cyan/[0.05]";
  const iconColor = accent === "accent" ? "text-accent" : "text-cyan";

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="hidden"
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.button
            key="drop"
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "focus-accent group flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-9 text-center transition-all duration-300 hover:border-white/25",
              dragging && ring,
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <motion.span
              animate={dragging ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }}
              className={cn(
                "mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]",
                iconColor,
              )}
            >
              <UploadCloud className="h-6 w-6" />
            </motion.span>
            <p className="text-[15px] font-medium text-white">
              Arrastra tu archivo aquí
            </p>
            <p className="mt-1 text-sm text-muted">
              o <span className="text-secondary underline underline-offset-4">selecciónalo</span> · PDF, Excel, Word, PPT, ZIP o imágenes
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
          >
            <span className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]", iconColor)}>
              <FileCheck2 className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{file.name}</p>
              <p className="mt-0.5 text-xs text-muted">
                {labelForFile(file.name)} · {humanSize(file.size)}
              </p>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={() => onFile(null)}
                className="focus-accent inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Quitar archivo"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {rejected && <p className="mt-2 text-xs text-red-300">{rejected}</p>}
    </div>
  );
}
