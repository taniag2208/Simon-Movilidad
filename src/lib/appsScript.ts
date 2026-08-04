import "server-only";
import type { FileRecord } from "@/types";

/**
 * Cliente del backend en Google Apps Script (Web App ligado a la hoja).
 * Guarda archivos en Drive, registra/lee/elimina filas en el Sheet.
 * Se activa cuando existe APPS_SCRIPT_URL.
 */

export function isAppsScriptConfigured(): boolean {
  return Boolean(process.env.APPS_SCRIPT_URL);
}

async function call<T>(payload: Record<string, unknown>): Promise<T> {
  const url = process.env.APPS_SCRIPT_URL as string;
  const token = process.env.APPS_SCRIPT_TOKEN || "";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, ...payload }),
    // Apps Script responde con un 302 hacia googleusercontent; hay que seguirlo.
    redirect: "follow",
    cache: "no-store",
  });

  const text = await res.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Respuesta no válida del backend (Apps Script).");
  }
  if (data && typeof data === "object" && "error" in data && (data as { error?: string }).error) {
    throw new Error((data as { error: string }).error);
  }
  return data as T;
}

export interface AppsScriptUpload {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  fileType: string;
  name: string;
  description: string;
  category: FileRecord["category"];
  user: string;
  email: string;
}

export async function uploadViaAppsScript(input: AppsScriptUpload): Promise<FileRecord> {
  const { record } = await call<{ record: FileRecord }>({
    action: "upload",
    dataBase64: input.buffer.toString("base64"),
    fileName: input.fileName,
    mimeType: input.mimeType,
    fileType: input.fileType,
    name: input.name,
    description: input.description,
    category: input.category,
    user: input.user,
    email: input.email,
  });
  return record;
}

export async function listViaAppsScript(): Promise<FileRecord[]> {
  const { records } = await call<{ records: FileRecord[] }>({ action: "list" });
  return records ?? [];
}

export async function deleteViaAppsScript(id: string): Promise<void> {
  await call<{ ok: boolean }>({ action: "delete", id });
}
