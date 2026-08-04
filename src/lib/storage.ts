import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { FileRecord } from "@/types";
import {
  isAppsScriptConfigured,
  uploadViaAppsScript,
  listViaAppsScript,
  deleteViaAppsScript,
} from "@/lib/appsScript";

/**
 * Capa de persistencia unificada.
 *  - Si APPS_SCRIPT_URL está configurado → Google Drive + Sheets vía Apps Script.
 *  - Si no → almacenamiento LOCAL en ./.data (solo desarrollo/demo).
 * La API pública es idéntica en ambos casos, así la UI no cambia.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const FILES_DIR = path.join(DATA_DIR, "files");
const HISTORY_FILE = path.join(DATA_DIR, "history.json");

async function ensureLocalDirs() {
  await fs.mkdir(FILES_DIR, { recursive: true });
}

async function readLocalHistory(): Promise<FileRecord[]> {
  try {
    const raw = await fs.readFile(HISTORY_FILE, "utf-8");
    return JSON.parse(raw) as FileRecord[];
  } catch {
    return [];
  }
}

async function writeLocalHistory(records: FileRecord[]) {
  await ensureLocalDirs();
  await fs.writeFile(HISTORY_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export interface SaveInput {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  fileType: string;
  name: string;
  description: string;
  category: FileRecord["category"];
  user: string;
  email: string;
}

function nowParts() {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
    isoTimestamp: now.toISOString(),
  };
}

export async function saveFile(input: SaveInput): Promise<FileRecord> {
  if (isAppsScriptConfigured()) {
    return uploadViaAppsScript({
      buffer: input.buffer,
      fileName: input.originalName,
      mimeType: input.mimeType,
      fileType: input.fileType,
      name: input.name,
      description: input.description,
      category: input.category,
      user: input.user,
      email: input.email,
    });
  }

  // Modo local
  const { date, time, isoTimestamp } = nowParts();
  const id = randomUUID();
  await ensureLocalDirs();
  const safe = input.originalName.replace(/[^\w.\-]+/g, "_");
  await fs.writeFile(path.join(FILES_DIR, `${id}__${safe}`), input.buffer);

  const record: FileRecord = {
    id,
    date,
    time,
    isoTimestamp,
    user: input.user,
    email: input.email,
    name: input.name,
    description: input.description,
    fileName: input.originalName,
    fileType: input.fileType,
    url: `/api/download/${id}`,
    category: input.category,
  };
  const history = await readLocalHistory();
  history.push(record);
  await writeLocalHistory(history);
  return record;
}

export async function listFiles(): Promise<FileRecord[]> {
  if (isAppsScriptConfigured()) {
    return listViaAppsScript();
  }
  const history = await readLocalHistory();
  return history.sort((a, b) => (a.isoTimestamp < b.isoTimestamp ? 1 : -1));
}

export async function deleteFile(id: string): Promise<boolean> {
  if (isAppsScriptConfigured()) {
    await deleteViaAppsScript(id);
    return true;
  }
  // Modo local: quita del historial y borra el archivo físico.
  const history = await readLocalHistory();
  const record = history.find((r) => r.id === id);
  if (!record) return false;
  await writeLocalHistory(history.filter((r) => r.id !== id));
  try {
    const safe = record.fileName.replace(/[^\w.\-]+/g, "_");
    await fs.unlink(path.join(FILES_DIR, `${id}__${safe}`));
  } catch {
    /* el archivo pudo no existir; el registro ya se eliminó */
  }
  return true;
}

/** Solo modo local: recupera el archivo físico por id para descarga. */
export async function getLocalFile(
  id: string,
): Promise<{ buffer: Buffer; record: FileRecord } | null> {
  const history = await readLocalHistory();
  const record = history.find((r) => r.id === id);
  if (!record) return null;
  const safe = record.fileName.replace(/[^\w.\-]+/g, "_");
  try {
    const buffer = await fs.readFile(path.join(FILES_DIR, `${id}__${safe}`));
    return { buffer, record };
  } catch {
    return null;
  }
}
