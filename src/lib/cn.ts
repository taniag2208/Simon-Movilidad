import clsx, { type ClassValue } from "clsx";

/** Pequeño helper para componer clases condicionalmente. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
