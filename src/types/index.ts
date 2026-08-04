export type FileCategory = "solicitados" | "adicionales";

/** Una fila del historial de archivos (persistida en Sheets o en modo local). */
export interface FileRecord {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  isoTimestamp: string;
  user: string; // nombre visible
  email: string;
  name: string; // nombre del documento
  description: string;
  fileName: string; // nombre real del archivo
  fileType: string; // extensión / tipo legible
  url: string; // enlace de descarga (Drive o local)
  category: FileCategory;
}

/** Una pregunta Discovery (solo ABIERTA / PARCIAL). */
export interface DiscoveryQuestion {
  id: string;
  question: string;
  status: "ABIERTA" | "PARCIAL";
  notes: string | null; // notas del kickoff, si existen
}

/** Un bloque temático con sus preguntas. */
export interface DiscoveryBlock {
  id: string;
  number: string | null; // "1", "2"… o null para complementarias
  title: string; // título limpio en mayúsculas
  questions: DiscoveryQuestion[];
}

export interface SessionUser {
  email: string;
  name: string;
}
