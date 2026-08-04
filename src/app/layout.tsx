import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GlowBackground } from "@/components/ui/GlowBackground";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evidence Engine · Simón Movilidad",
  description:
    "Centro colaborativo para la investigación de expansión del portafolio de servicios de Simón Movilidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans text-primary antialiased">
        <GlowBackground />
        {children}
      </body>
    </html>
  );
}
