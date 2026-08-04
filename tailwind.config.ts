import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Evidence Engine palette
        base: "#06080A", // fondo principal — negro muy profundo
        surface: "#0E1116", // tarjetas
        accent: {
          DEFAULT: "#80E593", // Verde TITA
          soft: "rgba(128,229,147,0.14)",
        },
        cyan: {
          DEFAULT: "#52C7CF", // secundario
          soft: "rgba(82,199,207,0.12)",
        },
      },
      textColor: {
        primary: "#FFFFFF",
        secondary: "rgba(255,255,255,0.65)",
        muted: "rgba(255,255,255,0.45)",
        faint: "rgba(255,255,255,0.30)",
      },
      borderColor: {
        subtle: "rgba(255,255,255,0.08)",
        hairline: "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.7)",
        glow: "0 0 80px -20px rgba(128,229,147,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 12s ease-in-out infinite",
        "pulse-soft": "pulse-soft 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
