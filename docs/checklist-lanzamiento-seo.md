# Checklist SEO para el día de apertura – Technofood

Tienda: technofood.com.co. Marque cada paso al completarlo.

## Antes de abrir (día anterior)
- [ ] El tema «Technofood – ajustes 4 (borrador)» revisado y aprobado; publicarlo.
- [ ] Mapa de redirecciones del sitio viejo aprobado (docs/redirects-sitio-viejo.csv con las URL reales).
- [ ] Blog renombrado a «Noticias» (/blogs/noticias) si se aprobó, y menús revisados.
- [ ] Teléfono de la empresa cargado en Ajustes del tema › Datos de la empresa (SEO).
- [ ] Logo en PNG cargado en el mismo grupo de ajustes (Google no acepta SVG).

## Día de apertura
1. [ ] Quitar la contraseña de la tienda (Tienda online › Preferencias › Protección con contraseña).
2. [ ] Confirmar que technofood.com.co es el dominio principal (Configuración › Dominios).
3. [ ] Confirmar la redirección www ↔ sin www: abrir http://www.technofood.com.co y http://technofood.com.co y verificar que ambas terminan en la misma URL https.
4. [ ] Crear la propiedad de dominio en Google Search Console (verificación por DNS) si no existe.
5. [ ] Enviar https://technofood.com.co/sitemap.xml en Search Console › Sitemaps.
6. [ ] Cargar las redirecciones 301 aprobadas (Contenido › Menús › Redirecciones de URL › Importar CSV).
7. [ ] Probar una muestra de 10 redirecciones (5 de productos/categorías, 3 del blog, /nosotros y /contacto): cada una debe responder 301 y llegar a una página con contenido (no 404).
8. [ ] Revisar https://technofood.com.co/robots.txt: debe ser el de Shopify y no bloquear /collections, /products, /pages ni /blogs.
9. [ ] Validar los datos estructurados con la Prueba de resultados enriquecidos de Google (search.google.com/test/rich-results) en: inicio (Organization, WebSite), un producto (Product, BreadcrumbList) y una colección (BreadcrumbList). Sin errores.
10. [ ] Pedir indexación en Search Console (Inspección de URL) del inicio, línea cárnica, línea panadería y 3 productos principales.

## Revisión a los 7 días
- [ ] Search Console › Páginas: revisar «No indexadas» (404, redirecciones, duplicadas sin canónica).
- [ ] Search Console › Mejoras: errores en Productos y Rutas de navegación.
- [ ] Revisar 404 en Search Console y en Shopify; agregar redirecciones que falten.
- [ ] Confirmar que no se indexan /search, /cart ni colecciones con ?filter o ?sort_by.

## Revisión a los 30 días
- [ ] Comparar clics e impresiones con el sitio viejo (Search Console › Rendimiento).
- [ ] Revisar las consultas principales y ajustar títulos o metas de las páginas con muchas impresiones y pocos clics.
- [ ] Confirmar que las URL viejas desaparecieron del índice y que las nuevas las reemplazan.
- [ ] Revisar de nuevo los datos estructurados y la cobertura del sitemap.
