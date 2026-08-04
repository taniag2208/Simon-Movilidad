import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveFile } from "@/lib/storage";
import { isAccepted, labelForFile, MAX_FILE_BYTES } from "@/lib/fileTypes";
import type { FileCategory } from "@/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const categoryRaw = String(form.get("category") ?? "");
  const category: FileCategory = categoryRaw === "adicionales" ? "adicionales" : "solicitados";
  const file = form.get("file");

  if (!name || !description) {
    return NextResponse.json(
      { error: "El nombre y la descripción son obligatorios." },
      { status: 400 },
    );
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Selecciona un archivo válido." }, { status: 400 });
  }
  if (!isAccepted(file.name)) {
    return NextResponse.json(
      { error: "Formato no permitido. Usa PDF, Excel, Word, PowerPoint, ZIP o imágenes." },
      { status: 400 },
    );
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { error: "El archivo supera el tamaño máximo (25 MB)." },
      { status: 413 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const record = await saveFile({
      buffer,
      originalName: file.name,
      mimeType: file.type || "application/octet-stream",
      fileType: labelForFile(file.name),
      name,
      description,
      category,
      user: session.name,
      email: session.email,
    });
    return NextResponse.json({ record });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json(
      { error: "No fue posible guardar el archivo. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
