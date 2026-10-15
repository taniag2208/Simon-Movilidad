# SEO v2 aplicado — 15-10-2026 (TM-PR-423)

Fuente: docs/Auditoria_SEO_Technofood_v2.xlsx · Tienda technofood-s2kzceth · Respaldo previo: backups/seo-antes-2026-10-15.json

## Productos (231 de 231 filas, todas activas; 0 handles no encontrados)
- 222: título + SEO title + meta. 9: solo SEO title + meta (título original).
- 22 productos con SEO title idéntico al título: Shopify guarda el campo vacío y usa el título (resultado igual).
- 11 de Inoxforni: siguen en borrador, sin cambios. Ningún otro producto cambió.
- Estado posterior: backups/productos-seo-despues-2026-10-15.jsonl

Solo SEO (decisión pendiente del título): arandela-compacta-para-suela-y-empeines-550402m, clasificadora-de-pollo-656,
cyclone-skynner, desplumadora, bomba-de-transporte, digestor-continuo, molino-de-martillo, prensa-continua, sierra-para-desposte-efa-86.

## Colecciones
- Sin Inoxforni: amasadoras (meta + descripción), hornos (meta + descripción), camaras-de-fermentacion (meta + descripción), batidoras-y-mezcladoras-planetarias (meta).
- Menú «Catálogo Technofood - Marcas»: quitado Línea Panadería › Inoxforni (respaldo en backups/menu-catalogo-marcas-antes-2026-10-15.json).
- panaderia / linea-panaderia: sin tocar (falta elegir la principal).

## Blog
- SEO title y meta de los 3 artículos (metafields global.title_tag / description_tag).
- Renombre news → noticias: pendiente hasta publicar el borrador (el tema publicado usa blogs['news'] en su portada).

## Redirecciones
- /pages/contact → /pages/contacto (ya existía).
- /pages/data-sharing-opt-out → /pages/aviso-de-privacidad (nueva).

## Tema borrador (Technofood – ajustes 3, ID 207020884254)
- snippets/meta-tags.liquid: <title> sin «– Techno Food S.A.S»; «etiqueta»/«Página»; sin charset/viewport duplicados.
- sections/header.liquid, footer.liquid, tf-news.liquid: funcionan con blog «news» o «noticias».
- Ya correcto, sin cambios: noindex en colecciones vacías y en las 5 páginas legales; meta description, canonical, Open Graph.
