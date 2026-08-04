import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { FileRecord } from "@/types";
import {
  isGoogleConfigured,
  uploadToDrive,
  appendToSheet,
  readSheet,
} from "@/lib/google";

/**
 * Capa de persistencia unificada.
 *  - Si Google está configurado → Drive (archivos) + Sheets (historial).
 *  - Si no → almacenamiento LOCAL en ./.data (para desarrollo/demo).
 * En ambos casos la API pública es idéntica, así la UI no cambia.
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
  // Zona horaria de Colombia para fecha/hora legibles.
  const fmt = new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(now).map((p) => [p.type, p.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
    isoTimestamp: now.toISOString(),
  };
}

export async function saveFile(input: SaveInput): Promise<FileRecord> {
  const { date, time, isoTimestamp } = nowParts();
  const id = randomUUID();

  let url: string;
  if (isGoogleConfigured()) {
    const drive = await uploadToDrive(input.buffer, input.originalName, input.mimeType);
    url = drive.url;
  } else {
    await ensureLocalDirs();
    const safe = input.originalName.replace(/[^\w.\-]+/g, "_");
    await fs.writeFile(path.join(FILES_DIR, `${id}__${safe}`), input.buffer);
    url = `/api/download/${id}`;
  }

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
    url,
    category: input.category,
  };

  if (isGoogleConfigured()) {
    await appendToSheet(record);
  } else {
    const history = await readLocalHistory();
    history.push(record);
    await writeLocalHistory(history);
  }

  return record;
}

export async function listFiles(): Promise<FileRecord[]> {
  if (isGoogleConfigured()) {
    return readSheet();
  }
  const history = await readLocalHistory();
  return history.sort((a, b) => (a.isoTimestamp < b.isoTimestamp ? 1 : -1));
}

/** Solo modo local: recupera la ruta física de un archivo por id. */
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

export const usingGoogle = isGoogleConfigured;
