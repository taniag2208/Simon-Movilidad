// Fondo "vivo" — se renderiza una vez detrás de toda la app.
// Gradientes suaves + glow verde/cyan + grid sutil + partículas. CSS puro.
export function GlowBackground() {
  return (
    <div className="ee-bg" aria-hidden="true">
      <div className="ee-grid" />
      <div className="ee-glow ee-glow--accent" />
      <div className="ee-glow ee-glow--cyan" />
      <div className="ee-particles" />
    </div>
  );
}
