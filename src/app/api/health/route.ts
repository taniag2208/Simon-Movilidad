import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnóstico rápido: indica si el portal está conectado a Apps Script
 * (Drive + Sheets) o corriendo en modo local. No expone secretos.
 */
export async function GET() {
  const hasUrl = Boolean(process.env.APPS_SCRIPT_URL);
  const hasToken = Boolean(process.env.APPS_SCRIPT_TOKEN);
  const hasAuthSecret = Boolean(process.env.AUTH_SECRET);

  return NextResponse.json({
    mode: hasUrl ? "apps-script" : "local",
    storage: hasUrl
      ? "Guardando en Google Drive + Sheets vía Apps Script."
      : "MODO LOCAL: no persiste en Vercel ni escribe en el Sheet. Falta APPS_SCRIPT_URL.",
    checks: {
      APPS_SCRIPT_URL: hasUrl,
      APPS_SCRIPT_TOKEN: hasToken,
      AUTH_SECRET: hasAuthSecret,
    },
    // Solo el final de la URL, para verificar que termina en /exec (no revela el ID completo).
    urlEndsWithExec: hasUrl
      ? (process.env.APPS_SCRIPT_URL as string).trim().endsWith("/exec")
      : null,
  });
}
