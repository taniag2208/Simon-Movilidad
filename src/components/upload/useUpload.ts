"use client";

import { useState, useCallback } from "react";
import type { FileRecord } from "@/types";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadArgs {
  name: string;
  description: string;
  category: "solicitados" | "adicionales";
  file: File;
}

/** Sube vía XHR para exponer progreso real de carga. */
export function useUpload(onDone?: (record: FileRecord) => void) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setProgress(0);
    setError(null);
  }, []);

  const upload = useCallback(
    ({ name, description, category, file }: UploadArgs) => {
      setStatus("uploading");
      setProgress(0);
      setError(null);

      const form = new FormData();
      form.append("name", name);
      form.append("description", description);
      form.append("category", category);
      form.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          // Reservamos el último 8% para el procesamiento en el servidor.
          setProgress(Math.min(92, Math.round((e.loaded / e.total) * 92)));
        }
      };

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 && data.record) {
            setProgress(100);
            setStatus("success");
            onDone?.(data.record as FileRecord);
          } else {
            setStatus("error");
            setError(data.error ?? "No fue posible subir el archivo.");
          }
        } catch {
          setStatus("error");
          setError("Respuesta inesperada del servidor.");
        }
      };

      xhr.onerror = () => {
        setStatus("error");
        setError("Error de conexión durante la carga.");
      };

      xhr.send(form);
    },
    [onDone],
  );

  return { status, progress, error, upload, reset, setError };
}
