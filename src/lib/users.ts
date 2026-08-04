import bcrypt from "bcryptjs";

/**
 * Usuarios administrados MANUALMENTE (no hay registro ni recuperación).
 *
 * Se definen en la variable de entorno PORTAL_USERS con el formato:
 *   email:NombreVisible:contraseña   (separados por coma)
 * La contraseña puede ir en texto plano o como hash bcrypt con prefijo "bcrypt$".
 *
 * Si PORTAL_USERS no está definida, se usa un conjunto de ejemplo
 * (solo para desarrollo) con la usuaria Diana del brief.
 */
export interface PortalUser {
  email: string;
  name: string;
  /** texto plano o `bcrypt$<hash>` */
  secret: string;
}

const DEV_DEFAULT_USERS: PortalUser[] = [
  { email: "diana@simon.com", name: "Diana", secret: "simon2025" },
];

function parseUsers(): PortalUser[] {
  const raw = process.env.PORTAL_USERS?.trim();
  if (!raw) return DEV_DEFAULT_USERS;

  const users: PortalUser[] = [];
  for (const entry of raw.split(",")) {
    const parts = entry.split(":");
    if (parts.length < 3) continue;
    const email = parts[0].trim().toLowerCase();
    const name = parts[1].trim();
    // La contraseña puede contener ":" (p.ej. un hash bcrypt), reunimos el resto.
    const secret = parts.slice(2).join(":").trim();
    if (email && name && secret) users.push({ email, name, secret });
  }
  return users.length ? users : DEV_DEFAULT_USERS;
}

/** Valida credenciales. Devuelve el usuario (sin secreto) o null. */
export async function verifyCredentials(
  email: string,
  password: string,
): Promise<{ email: string; name: string } | null> {
  const users = parseUsers();
  const target = users.find((u) => u.email === email.trim().toLowerCase());
  if (!target) return null;

  let ok = false;
  if (target.secret.startsWith("bcrypt$")) {
    ok = await bcrypt.compare(password, target.secret.slice("bcrypt$".length));
  } else {
    // Comparación en tiempo constante para el modo texto plano.
    ok = safeEqual(password, target.secret);
  }
  if (!ok) return null;
  return { email: target.email, name: target.name };
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
