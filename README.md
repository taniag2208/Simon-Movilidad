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
- **Google Drive + Sheets** vía **Apps Script** (sin cuenta de servicio)
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
      files/               historial (GET) · files/[id] (DELETE)
      download/[id]/       descarga en modo local
  components/  ui · layout · auth · home · upload · discovery
  lib/         auth · users · appsScript · storage · fileTypes · cn
  types/
data/discovery.ts          preguntas generadas del Excel (solo ABIERTA/PARCIAL)
data/insumos.ts            listado de insumos (pestaña "Insumos previos")
scripts/parse-discovery.mjs convierte el Excel → data/discovery.ts
google-apps-script/Code.gs backend Apps Script (Drive + Sheet: upload/list/delete)
```

## Puesta en marcha

```bash
npm install
cp .env.local.example .env.local   # completa las variables
npm run dev                        # http://localhost:3000
```

### Persistencia: Apps Script (Drive + Sheets)

No se usa cuenta de servicio. El backend es un **Google Apps Script** ligado a
la hoja de cálculo, publicado como *Aplicación web*.

**Despliegue del backend:**

1. Abre la Google Sheet → **Extensiones → Apps Script**.
2. Pega el contenido de [`google-apps-script/Code.gs`](google-apps-script/Code.gs)
   y cambia la constante `TOKEN` por un secreto propio.
3. **Implementar → Nueva implementación → Aplicación web**
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**
4. Copia la **URL `/exec`** y configúrala en las variables de entorno:
   - `APPS_SCRIPT_URL` = la URL `/exec`
   - `APPS_SCRIPT_TOKEN` = el mismo `TOKEN` del script

Con eso, cada archivo se guarda en una carpeta de **Drive** y se registra una
fila en la hoja **Historial** con: Fecha, Hora, Usuario, Correo, Nombre,
Descripción, Nombre del archivo, Tipo, URL y Categoría. El historial también se
puede **eliminar** desde el portal (borra la fila y envía el archivo a la
papelera).

- **Sin `APPS_SCRIPT_URL`** el portal funciona en *modo local* (`./.data`),
  útil para desarrollo. En Vercel este modo **no persiste**, así que en
  producción define siempre las variables de Apps Script.

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
- Se muestra únicamente **Bloque** y **Pregunta**, sin exponer el estado de
  cada pregunta.

El listado de la página **Cargar información** proviene de la pestaña
`Insumos previos` del mismo archivo (`data/insumos.ts`).

> El Excel de origen es confidencial y **no** se versiona (`/private` está en
> `.gitignore`). Lo que se versiona es `data/discovery.ts`, el contenido ya
> filtrado que muestra el portal.
