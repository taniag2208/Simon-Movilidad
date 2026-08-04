import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listFiles } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  try {
    const records = await listFiles();
    return NextResponse.json({ records });
  } catch (err) {
    console.error("List files failed:", err);
    return NextResponse.json({ error: "No fue posible cargar el historial." }, { status: 500 });
  }
}
