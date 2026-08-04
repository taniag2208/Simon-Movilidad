import "server-only";
import { google } from "googleapis";
import { Readable } from "node:stream";
import type { FileCategory, FileRecord } from "@/types";

/**
 * Cliente de Google (Drive + Sheets) usando una cuenta de servicio.
 * Se activa solo si están definidas las variables de entorno.
 */

const SHEET_TAB = process.env.GOOGLE_SHEET_TAB || "Historial";

// Hoja de destino del historial (Simón Movilidad · Discovery · Insumos previos).
// Puede sobreescribirse con GOOGLE_SHEET_ID en el entorno.
const DEFAULT_SHEET_ID = "1OT9-RYit5ouEiPDGbzQDulvqguZwKguHi93eqqrtqXs";

function sheetId(): string {
  return process.env.GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;
}

const SHEET_HEADERS = [
  "Fecha",
  "Hora",
  "Usuario",
  "Correo",
  "Nombre",
  "Descripción",
  "Nombre del archivo",
  "Tipo",
  "URL del archivo",
  "Categoría",
  "id",
  "isoTimestamp",
];

export function isGoogleConfigured(): boolean {
  // El Sheet tiene un ID por defecto; solo hacen falta la cuenta de servicio
  // (para autenticar) y la carpeta de Drive (para guardar los archivos).
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.GOOGLE_DRIVE_FOLDER_ID,
  );
}

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON as string;
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
}

const categoryLabel: Record<FileCategory, string> = {
  solicitados: "Documentos solicitados",
  adicionales: "Archivos adicionales",
};

function labelToCategory(label: string): FileCategory {
  return label.trim().toLowerCase().startsWith("archivos adicionales")
    ? "adicionales"
    : "solicitados";
}

/** Sube un archivo a Drive y devuelve su enlace de visualización. */
export async function uploadToDrive(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
): Promise<{ url: string; fileId: string }> {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID as string],
    },
    media: { mimeType, body: Readable.from(buffer) },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  const fileId = res.data.id as string;

  // Hacer el archivo accesible por enlace (lectura) para permitir la descarga.
  try {
    await drive.permissions.create({
      fileId,
      requestBody: { role: "reader", type: "anyone" },
      supportsAllDrives: true,
    });
  } catch {
    // Si la organización bloquea el acceso "anyone", conservamos el webViewLink
    // (los usuarios con acceso a la carpeta podrán abrirlo igualmente).
  }

  const url =
    res.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`;
  return { url, fileId };
}

async function ensureSheetReady() {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = sheetId();

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = meta.data.sheets?.some(
    (s) => s.properties?.title === SHEET_TAB,
  );

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: SHEET_TAB } } }],
      },
    });
  }

  // Asegurar encabezados en la primera fila.
  const headerRange = `${SHEET_TAB}!A1:L1`;
  const current = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });
  if (!current.data.values || current.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: { values: [SHEET_HEADERS] },
    });
  }
  return { sheets, spreadsheetId };
}

/** Registra una fila en la Google Sheet. */
export async function appendToSheet(record: FileRecord): Promise<void> {
  const { sheets, spreadsheetId } = await ensureSheetReady();
  const row = [
    record.date,
    record.time,
    record.user,
    record.email,
    record.name,
    record.description,
    record.fileName,
    record.fileType,
    record.url,
    categoryLabel[record.category],
    record.id,
    record.isoTimestamp,
  ];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TAB}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

/** Lee el historial completo desde la Google Sheet (más reciente primero). */
export async function readSheet(): Promise<FileRecord[]> {
  const { sheets, spreadsheetId } = await ensureSheetReady();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TAB}!A2:L`,
  });
  const rows = res.data.values ?? [];
  const records: FileRecord[] = rows
    .filter((r) => r.length >= 9)
    .map((r, i) => ({
      date: r[0] ?? "",
      time: r[1] ?? "",
      user: r[2] ?? "",
      email: r[3] ?? "",
      name: r[4] ?? "",
      description: r[5] ?? "",
      fileName: r[6] ?? "",
      fileType: r[7] ?? "",
      url: r[8] ?? "",
      category: labelToCategory(r[9] ?? ""),
      id: r[10] ?? `row-${i}`,
      isoTimestamp: r[11] ?? "",
    }));

  records.sort((a, b) => (a.isoTimestamp < b.isoTimestamp ? 1 : -1));
  return records;
}
