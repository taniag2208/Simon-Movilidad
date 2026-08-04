import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { SessionUser } from "@/types";

const COOKIE_NAME = "ee_session";
const MAX_AGE = 60 * 60 * 12; // 12 horas

function getSecretKey() {
  const secret =
    process.env.AUTH_SECRET ||
    // Secreto por defecto del proyecto (server-only). Se puede sobreescribir
    // con la variable de entorno AUTH_SECRET.
    "ducSnOE6+thTdO1+AZBCYA3K4zwHm/qflEQCq9+3QYg=";
  return new TextEncoder().encode(secret);
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({ email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecretKey());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.email === "string" && typeof payload.name === "string") {
      return { email: payload.email, name: payload.name };
    }
    return null;
  } catch {
    return null;
  }
}

export function destroySession(): void {
  cookies().delete(COOKIE_NAME);
}

export { COOKIE_NAME };
