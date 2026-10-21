# Reseñas de clientes — propuesta para aprobar (2026-10-21)

## Definición de metaobjeto «Reseña de cliente» (handle `resena_cliente`)

- Acceso de la tienda (storefront): lectura pública. Acceso de administración: lectura y escritura.
- Descripción (aviso para el equipo): «Reemplazar o eliminar los ejemplos antes de publicar el sitio.
  Para publicar una reseña, créela o edítela aquí y marque “publicada”.»
- Campo que se muestra como nombre de la entrada: `nombre`.

| Campo (clave) | Tipo | Reglas |
|---|---|---|
| Nombre (`nombre`) | Texto de una línea | Obligatorio, máx. 80 |
| Empresa o cargo (`empresa`) | Texto de una línea | Opcional, máx. 80 |
| Calificación (`calificacion`) | Número entero | Obligatorio, mín. 1, máx. 5 |
| Comentario (`comentario`) | Texto de varias líneas | Obligatorio, máx. 400 |
| Fecha (`fecha`) | Fecha | Obligatorio |
| Publicada (`publicada`) | Verdadero/falso | — |
| Es ejemplo (`es_ejemplo`) | Verdadero/falso | — |

No hay campo de correo: el correo de quien reseña solo llega en el mensaje del formulario y nunca se guarda ni se muestra.

## 5 reseñas de ejemplo (es_ejemplo = verdadero, publicada = verdadero)

| # | Nombre (ficticio) | Empresa o cargo | ★ | Comentario | Fecha |
|---|---|---|---|---|---|
| 1 | María Fernanda Ríos | Planta de proceso cárnico | 5 | El equipo comercial nos asesoró en la selección del equipo y respondió con rapidez a todas nuestras preguntas. | 2026-10-18 |
| 2 | Julián Ortiz | Panadería industrial | 5 | Recibimos una atención cordial desde la primera llamada. Nos explicaron las opciones con claridad y sin presiones. | 2026-10-15 |
| 3 | Paula Cárdenas | Jefe de compras, planta avícola | 4 | Valoramos el seguimiento después de la compra: siempre encontramos a alguien disponible para resolver nuestras dudas. | 2026-10-12 |
| 4 | Andrés Molina | Distribuidora de alimentos | 5 | La asesoría fue clara y cercana. Nos ayudaron a entender qué opción se ajustaba mejor a nuestra operación. | 2026-10-08 |
| 5 | Diana Herrera | Coordinadora de mantenimiento | 4 | Buena comunicación con el área de posventa: atendieron nuestras solicitudes de forma oportuna. | 2026-10-04 |
