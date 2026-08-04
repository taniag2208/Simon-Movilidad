import { NextResponse } from "next/server";
import { appsScriptStatus } from "@/lib/appsScript";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnóstico rápido: indica si el portal está conectado a Apps Script
 * (Drive + Sheets) o corriendo en modo local. No expone secretos.
 */
export async function GET() {
  const s = appsScriptStatus();
  return NextResponse.json({
    mode: s.mode,
    storage:
      s.mode === "apps-script"
        ? "Conectado: guarda en Google Drive + Sheets vía Apps Script."
        : "MODO LOCAL: no persiste ni escribe en el Sheet.",
    urlEndsWithExec: s.urlEndsWithExec,
    hasToken: s.hasToken,
    usingEnvOverride: s.usingEnvUrl,
    hasAuthSecret: Boolean(process.env.AUTH_SECRET),
  });
}
