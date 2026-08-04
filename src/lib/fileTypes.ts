/** Tipos de archivo aceptados y utilidades de etiquetado. */

export const ACCEPTED = {
  pdf: { ext: ["pdf"], label: "PDF", mimes: ["application/pdf"] },
  excel: {
    ext: ["xls", "xlsx", "csv"],
    label: "Excel",
    mimes: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ],
  },
  word: {
    ext: ["doc", "docx"],
    label: "Word",
    mimes: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  powerpoint: {
    ext: ["ppt", "pptx"],
    label: "PowerPoint",
    mimes: [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  },
  zip: {
    ext: ["zip"],
    label: "ZIP",
    mimes: ["application/zip", "application/x-zip-compressed"],
  },
  image: {
    ext: ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"],
    label: "Imagen",
    mimes: ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"],
  },
} as const;

export const ACCEPT_ATTR =
  ".pdf,.xls,.xlsx,.csv,.doc,.docx,.ppt,.pptx,.zip,.png,.jpg,.jpeg,.gif,.webp,.svg";

const ALL_EXT = Object.values(ACCEPTED).flatMap((g) => g.ext);

export function extOf(fileName: string): string {
  const m = fileName.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

export function isAccepted(fileName: string): boolean {
  return ALL_EXT.includes(extOf(fileName) as (typeof ALL_EXT)[number]);
}

/** Etiqueta legible del tipo (PDF, Excel, Word, Imagen…). */
export function labelForFile(fileName: string): string {
  const ext = extOf(fileName);
  for (const group of Object.values(ACCEPTED)) {
    if ((group.ext as readonly string[]).includes(ext)) return group.label;
  }
  return ext ? ext.toUpperCase() : "Archivo";
}

export const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB
