// ---------------------------------------------------------------------------
// Convierte la hoja "Preguntas Discovery" del Excel en un archivo de datos
// tipado (data/discovery.ts) que consume la página Discovery.
//
// Reglas (según el brief):
//   - Solo se incluyen preguntas con estado ABIERTA (○) o PARCIAL (◑).
//   - Se descartan las RESPONDIDA (✔).
//   - Solo se exponen: Bloque, Pregunta y las notas del kickoff (si existen).
//   - No se exponen: Estado, Respondido por, Follow up, Variables.
//
// Uso:
//   node scripts/parse-discovery.mjs [ruta/al/Excel.xlsx]
// Por defecto lee ./private/Matriz_Discovery.xlsx
// ---------------------------------------------------------------------------
import pkg from "xlsx";
const XLSX = pkg;
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const SRC = process.argv[2] || resolve("private", "Matriz_Discovery.xlsx");
const SHEET = "Preguntas Discovery";
const OUT = resolve("data", "discovery.ts");

// Índices de columna (0-based) en la hoja.
const COL = { bloque: 0, pregunta: 2, estado: 4, notas: 6, _bloque: 9 };

function cleanNotes(raw) {
  if (!raw) return null;
  let t = String(raw).trim();
  t = t.replace(/^\[Del kickoff\]\s*/i, "");
  t = t.replace(/^kickoff:\s*/i, "");
  t = t.trim();
  if (!t) return null;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function statusOf(raw) {
  const t = String(raw || "").toUpperCase();
  if (t.includes("ABIERTA")) return "ABIERTA";
  if (t.includes("PARCIAL")) return "PARCIAL";
  return null; // RESPONDIDA u otros → se omite
}

function parseBlock(raw) {
  const full = String(raw || "").trim();
  const idx = full.indexOf("·");
  if (idx !== -1) {
    const left = full.slice(0, idx).trim();
    const right = full.slice(idx + 1).trim();
    if (/^\d+$/.test(left)) return { number: left, title: right };
    return { number: null, title: full };
  }
  return { number: null, title: full };
}

function slug(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

const wb = XLSX.read(readFileSync(SRC));
const ws = wb.Sheets[SHEET];
if (!ws) {
  console.error(`No se encontró la hoja "${SHEET}". Hojas: ${wb.SheetNames.join(", ")}`);
  process.exit(1);
}
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: true, defval: "" });

// El encabezado real está en la fila 7 (1-based) → índice 6. Datos desde el 7.
const DATA_START = 7;

const blocksMap = new Map(); // title -> block object
const order = [];

let kept = 0;
let skipped = 0;

for (let i = DATA_START; i < rows.length; i++) {
  const row = rows[i];
  const pregunta = String(row[COL.pregunta] || "").trim();
  if (!pregunta) continue; // filas separadoras / vacías

  const status = statusOf(row[COL.estado]);
  if (!status) {
    skipped++;
    continue;
  }

  const blockRaw = String(row[COL._bloque] || row[COL.bloque] || "").trim();
  if (!blockRaw) continue;

  if (!blocksMap.has(blockRaw)) {
    const { number, title } = parseBlock(blockRaw);
    const block = { id: slug(blockRaw), number, title, questions: [] };
    blocksMap.set(blockRaw, block);
    order.push(blockRaw);
  }
  const block = blocksMap.get(blockRaw);
  block.questions.push({
    id: `${block.id}-${block.questions.length + 1}`,
    question: pregunta,
    status,
    notes: cleanNotes(row[COL.notas]),
  });
  kept++;
}

const blocks = order.map((k) => blocksMap.get(k)).filter((b) => b.questions.length > 0);

const totalOpen = blocks.reduce(
  (n, b) => n + b.questions.filter((q) => q.status === "ABIERTA").length,
  0,
);
const totalPartial = blocks.reduce(
  (n, b) => n + b.questions.filter((q) => q.status === "PARCIAL").length,
  0,
);

const banner = `// AUTO-GENERADO por scripts/parse-discovery.mjs — NO editar a mano.
// Fuente: hoja "${SHEET}". Solo preguntas ABIERTA / PARCIAL.
// Regenerar con: npm run parse:discovery -- <ruta-al-excel>
`;

const body = `import type { DiscoveryBlock } from "@/types";

export const discoveryStats = {
  blocks: ${blocks.length},
  open: ${totalOpen},
  partial: ${totalPartial},
  total: ${kept},
};

export const discoveryBlocks: DiscoveryBlock[] = ${JSON.stringify(blocks, null, 2)};
`;

writeFileSync(OUT, banner + "\n" + body, "utf-8");

console.log(`✔ Discovery generado: ${OUT}`);
console.log(`  Bloques: ${blocks.length} · Preguntas: ${kept} (ABIERTA ${totalOpen} · PARCIAL ${totalPartial}) · Omitidas: ${skipped}`);
