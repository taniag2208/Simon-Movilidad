# Evidence Engine · Simón Movilidad

Portal privado de investigación construido para el equipo de **Simón Movilidad**.
Centraliza la entrega de información del proyecto y mantiene disponibles las
preguntas Discovery pendientes. Diseñado como un *Research Operating System*:
oscuro, premium, con lenguaje visual inspirado en Linear, Vercel, Stripe y Notion.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — sistema de diseño con la paleta Evidence Engine
- **Framer Motion** — microanimaciones (fade, blur, scale, slide, hover)
- **Lucide Icons** — iconografía minimalista
- **Google Drive + Sheets** (cuenta de servicio) para persistencia real
- **jose** (sesión JWT httpOnly) + **bcryptjs** para autenticación

## Estructura

```
src/
  app/
    login/                 Login SaaS (glow, logo, botón grande)
    (portal)/              Layout protegido (sidebar + header)
      inicio/              Hero "Evidence Engine" + 2 tarjetas
      cargar/              2 bloques de carga + historial
      discovery/           Centro de consulta (solo ABIERTA / PARCIAL)
    api/
      auth/                login · logout · session
      upload/              guarda en Drive+Sheets (o local) y registra fila
      files/               historial (más reciente primero)
      download/[id]/       descarga en modo local
  components/  ui · layout · auth · home · upload · discovery
  lib/         auth · users · google · storage · fileTypes · cn
  types/
data/discovery.ts          datos generados del Excel (solo ABIERTA/PARCIAL)
scripts/parse-discovery.mjs convierte el Excel → data/discovery.ts
```

## Puesta en marcha

```bash
npm install
cp .env.local.example .env.local   # completa las variables
npm run dev                        # http://localhost:3000
```

### Modo local vs. Google

- **Sin credenciales de Google** el portal funciona en *modo local*: los
  archivos se guardan en `./.data` y el historial en un JSON. Ideal para
  desarrollo y demo. La app corre completa desde el primer minuto.
- **Con credenciales** (ver `.env.local.example`) cada archivo se sube a
  **Google Drive** y se registra automáticamente una fila en **Google Sheets**
  con: Fecha, Hora, Usuario, Correo, Nombre, Descripción, Nombre del archivo,
  Tipo, URL y Categoría. El cambio es transparente para la interfaz.

### Usuarios

No hay registro ni recuperación de contraseña: los usuarios se administran
manualmente en la variable `PORTAL_USERS`
(`email:Nombre:contraseña`, separados por coma; la contraseña admite hash
bcrypt con prefijo `bcrypt$`).

## Preguntas Discovery

La página Discovery es **solo informativa**. Su contenido se genera desde la
hoja `Preguntas Discovery` del Excel de la matriz:

```bash
npm run parse:discovery -- ruta/al/Matriz_Discovery.xlsx
```

Reglas aplicadas automáticamente:

- Solo se muestran preguntas **ABIERTA** (○) y **PARCIAL** (◑).
- Se ocultan las **RESPONDIDA** (✔) y los campos internos (estado, respondido
  por, follow-up, variables).
- Se muestra únicamente **Bloque**, **Pregunta** y, cuando existen, las notas
  del kickoff dentro de la caja *"Lo que ya sabemos"*.

> El Excel de origen es confidencial y **no** se versiona (`/private` está en
> `.gitignore`). Lo que se versiona es `data/discovery.ts`, el contenido ya
> filtrado que muestra el portal.
