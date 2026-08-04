import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  try {
    const ok = await deleteFile(params.id);
    if (!ok) {
      return NextResponse.json({ error: "Archivo no encontrado." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete failed:", err);
    return NextResponse.json({ error: "No fue posible eliminar el archivo." }, { status: 500 });
  }
}
