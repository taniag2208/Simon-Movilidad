import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getLocalFile } from "@/lib/storage";

export const runtime = "nodejs";

/** Descarga en MODO LOCAL. En modo Google, la URL apunta directo a Drive. */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const found = await getLocalFile(params.id);
  if (!found) {
    return NextResponse.json({ error: "Archivo no encontrado." }, { status: 404 });
  }

  const { buffer, record } = found;
  const bytes = new Uint8Array(buffer);
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(record.fileName)}"`,
      "Content-Length": String(bytes.byteLength),
    },
  });
}
