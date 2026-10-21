# Líneas completas, procesos, menús, orden e Inoxforni — diagnóstico y propuestas (2026-10-21)

Tienda technofood-9wna2s1h. Todo lo de este documento es solo lectura o propuesta: no se cambió nada en la tienda.

## 7. Línea completa cárnica y de panadería

| Dato que venía como verificado | Lo que muestra Shopify hoy |
|---|---|
| linea-panaderia (121) no está publicada | **Sí está publicada** en la Tienda online. Tiene 132 productos, 121 activos (11 son Inoxforni en borrador). |
| panaderia (130) sí está publicada | **No está publicada.** Es la única de las 118 colecciones sin publicar. Por eso sus enlaces dan 404. |
| panaderia mezcla productos cárnicos | Ningún producto activo de línea cárnica tiene la etiqueta "panaderia". El único cárnico es "Clipadora International Clip", que está archivado. |
| Boyens: 6 activos con linea:insumos-panaderia | Correcto. Ya están en linea-panaderia (6). En la colección panaderia solo hay 1 (Trennspray). |
| Mayma: Cibeles y Lepanto con ambas líneas, Ostippo solo panadería | Correcto. Hay etiquetas "panadería" (con tilde, solo Cibeles) y "panaderia" (sin tilde, 129). |
| Lazos GS 25 sin etiqueta de línea cárnica | Tiene linea:insumos-carnicos y **ya está** en linea-carnica (su regla es linea-carnica OR insumos-carnicos), igual que los Clips de Aluminio. |
| Clips en forma de S y Carrete con linea:linea-carnica | Correcto: son insumos etiquetados como equipos. |
| Archivados "duplicado-archivado" | 10 productos archivados; la tienda no los muestra. |
| Inoxforni: 11 en borrador | Correcto. |

**Reglas actuales:** linea-carnica = linea:linea-carnica OR linea:insumos-carnicos (112 en total, todos activos). linea-panaderia = linea:linea-panaderia OR linea:insumos-panaderia (132 en total, 121 activos). Ya son "equipos + insumos" y no incluyen productos de la otra línea, salvo Mayma Cibeles y Lepanto (intencional).

**A dónde apuntan los enlaces:**

| Enlace | Antes | Ahora en el borrador |
|---|---|---|
| Menú principal › LÍNEA PANADERÍA y "Ver toda la línea" | /collections/linea-panaderia | sin cambio (menú de la tienda) |
| Inicio › botón Panadería ("¿Qué desea procesar?") | /collections/panaderia (404) | /collections/linea-panaderia |
| Inicio › "Ver toda la línea panadería" (recorrido) | /collections/panaderia (404) | /collections/linea-panaderia |
| Footer › Industrias › Panadería | /collections/panaderia (404) | /collections/linea-panaderia |
| Inicio › "Ver toda la línea cárnica" y menú LÍNEA CÁRNICA | /collections/linea-carnica | sin cambio |

Ya existe la redirección 301 /collections/panaderia → /collections/linea-panaderia, pero no se activa porque la colección "panaderia" todavía existe. Propuesta: cambiar el handle de esa colección a "panaderia-retirada" (no se borra nada) para que la 301 empiece a funcionar.

## 8. Procesos de la línea cárnica (producto por producto)

Propuesta: una colección **manual** por proceso, con la lista exacta de productos de abajo. Así no se toca ninguna etiqueta. ⚠ = caso dudoso.

### Beneficio (colección nueva propuesta: /collections/beneficio)

| Marca | Producto | Tipo en la tienda | ¿Entra? | Nota |
|---|---|---|---|---|
| BAADER | CLASIFICADORA DE POLLO 656 | Procesamiento de aves | Sí |  |
| BAADER | DESPLUMADORA | Procesamiento de aves | Sí |  |
| BAADER | Dedos de Goma Desplumadores Baader | Repuestos para desplume y depilado | Sí |  |
| BAADER | Despieladora Baader 240 | Corte y fileteado | Sí | ⚠ despieladora: también podría ir en Corte |
| BAADER | Eviscerador 142 Baader | Corte y fileteado | Sí |  |
| BETTCHER | CYCLONE SKYNNER | Corte y fileteado | Sí |  |
| BETTCHER | Empuñadura Quantum Flex Grande Bettcher | Corte y fileteado | Sí |  |
| BETTCHER | Empuñadura Quantum Flex Mediana Bettcher | Corte y fileteado | Sí |  |
| BETTCHER | Empuñadura Quantum Flex Pequeña Bettcher | Corte y fileteado | Sí |  |
| BETTCHER | Motor Impulsor Universal UN 84 Bettcher | Herramientas y accesorios | Sí | ⚠ motor/accesorio de los cuchillos |
| BETTCHER | Motor Quantum Bettcher | Herramientas y accesorios | Sí | ⚠ motor/accesorio de los cuchillos |
| BETTCHER | Recortadora Whizard Versa Bettcher | Corte y fileteado | Sí |  |
| BETTCHER | Trimvac Flex Quantum Bettcher | Corte y fileteado | Sí |  |
| EFA | Pig Plug EFA | Consumibles de sacrificio y faenado | Sí |  |
| EFA | Recortador Rectal EFA 202 | Corte y fileteado | Sí |  |
| EFA | Recortadora EFA 90D | Corte y fileteado | Sí |  |
| EFA | SIERRA PARA DESPOSTE EFA 86 | Corte y fileteado | Sí | ⚠ sierra de desposte: también en Corte |
| EFA | Sierra Bisectriz EFA SB 327 e | Corte y fileteado | Sí |  |
| EFA | Sierra para Hueso EFA SK 16-8 D | Corte y fileteado | Sí | ⚠ sierra para hueso: también en Corte |
| Taesa | Rascador Taesa UEB-1 | Repuestos para desplume y depilado | Sí |  |

Total que entraría: 20 productos activos.

### Corte y acondicionamiento (colección nueva propuesta: /collections/corte-y-acondicionamiento)

| Marca | Producto | Tipo en la tienda | ¿Entra? | Nota |
|---|---|---|---|---|
| OESTERGAARD | BOMBA DE TRANSPORTE | Transporte y manipulación | Sí | ⚠ rendering/subproductos, no es corte |
| OESTERGAARD | DIGESTOR CONTINUO | Rendering y subproductos | Sí | ⚠ rendering/subproductos, no es corte |
| OESTERGAARD | MOLINO DE MARTILLO | Molienda y mezclado | Sí | ⚠ rendering/subproductos, no es corte |
| OESTERGAARD | PRENSA CONTINUA | Rendering y subproductos | Sí | ⚠ rendering/subproductos, no es corte |
| EFA | Pig Plug EFA | Consumibles de sacrificio y faenado | No | no: es de Beneficio |
| EFA | Recortador Rectal EFA 202 | Corte y fileteado | No | no: es de Beneficio |
| EFA | Recortadora EFA 90D | Corte y fileteado | No | no: es de Beneficio |
| EFA | SIERRA PARA DESPOSTE EFA 86 | Corte y fileteado | Sí | ⚠ también en Beneficio |
| EFA | Sierra Bisectriz EFA SB 327 e | Corte y fileteado | No | no: es de Beneficio |
| EFA | Sierra para Hueso EFA SK 16-8 D | Corte y fileteado | Sí | ⚠ también en Beneficio |
| MAKU | Inyectora de Salmuera Hpi 450 Maku | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado) |
| MAKU | Mezcladora de Salmuera HVM Maku | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado) |
| MAKU | Tumbler Serie B Maku | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado) |
| MAKU | Tumbler Serie R Maku | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado) |
| MAKU | Tumbler Tipo CVM Maku | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado) |
| GRASSELLI | Cortadora CWS 300 Grasselli | Corte y fileteado | Sí |  |
| GRASSELLI | Descortezadora MS520 Grasselli | Corte y fileteado | Sí |  |
| GRASSELLI | Descortezadora NAB520 Grasselli | Corte y fileteado | Sí |  |
| GRASSELLI | Fileteadora Horizontal KSL Grasselli | Corte y fileteado | Sí |  |
| LIMA | Separador de Carne y Hueso Gama S Lima | Rendering y subproductos | Sí | ⚠ separador carne-hueso (deshuese mecánico) |
| LIMA | Separador de Carne y Hueso Rm 390S Lima | Rendering y subproductos | Sí | ⚠ separador carne-hueso (deshuese mecánico) |
| LIMA | Separador de Carne y Hueso Rm 90S Lima | Rendering y subproductos | Sí | ⚠ separador carne-hueso (deshuese mecánico) |
| HOLAC | Cortadora de Queso Cheesixx Holac | Corte y fileteado | Sí |  |
| HOLAC | Cubicadora Cubixx 100 Holac | Corte y fileteado | Sí |  |
| HOLAC | Rebanadora Sect 230 Holac | Corte y fileteado | Sí |  |
| GASER | Empanizadora Automática Mod. Compact Gaser | Formado y rebozado | Sí | ⚠ formado y rebozado (suena a Valor agregado) |
| GASER | Formadora Automática de Hamburguesas Mod. V-3000 CP Gaser | Formado y rebozado | Sí | ⚠ formado y rebozado (suena a Valor agregado) |
| GASER | Rollos de Papel para Hamburguesa Gaser | Papel para hamburguesa y empaque | Sí | ⚠ insumo (papel) |
| Technofood | Cortadora de Bloques de Carne Congelada QP 5230 Technofood | Corte y fileteado | Sí |  |
| Technofood | Cutter Industrial ZBG 125 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Cutter Industrial ZBG 20 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Cutter Industrial de Alta Velocidad ZBG 200 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Cutter Industrial de Alta Velocidad ZBG 80 II Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Elevador de Carros TS 200 Technofood | Transporte y manipulación | Sí | ⚠ transporte y manipulación (suena a Valor agregado o transporte) |
| Technofood | Masajeador al Vacío GRZK 100 Technofood | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado o transporte) |
| Technofood | Masajeador al Vacío GRZK 1000 Technofood | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado o transporte) |
| Technofood | Masajeador al Vacío GRZK 2500 Technofood | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado o transporte) |
| Technofood | Masajeador al Vacío TH 1800 Technofood | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado o transporte) |
| Technofood | Masajeador al Vacío con Refrigeración GRKL 3500 Technofood | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado o transporte) |
| Technofood | Masajeadora al Vacío con Refrigeración GRKL 1600 Technofood | Inyección y marinado | Sí | ⚠ inyección y marinado (suena a Valor agregado o transporte) |
| Technofood | Mezclador al Vacío JBZK 650 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Mezclador de Carne JB 150 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Mezclador de Carne JB 2000 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Mezclador de Carne JB 650 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Molino de Carne Industrial JR 130 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |
| Technofood | Molino de Carne Industrial JRD 160 Technofood | Molienda y mezclado | Sí | ⚠ molienda y mezclado (suena a Valor agregado o transporte) |

Total que entraría: 42 productos activos.

### Valor agregado (colección nueva propuesta: /collections/valor-agregado)

| Marca | Producto | Tipo en la tienda | ¿Entra? | Nota |
|---|---|---|---|---|
| SEYDELMANN | Cortadora K 60 Seydelmann | Corte y fileteado | Sí | ⚠ cutter, en la tienda está como Corte y fileteado |
| SEYDELMANN | Emulsificadora KK 140 Seydelmann | Molienda y mezclado | Sí |  |
| SEYDELMANN | Mezcladora MR 1800 Seydelmann | Molienda y mezclado | Sí |  |
| SEYDELMANN | Molino Automático AE 130-3 Seydelmann | Molienda y mezclado | Sí |  |
| SEYDELMANN | Molino Automático AV 250 U Seydelmann | Molienda y mezclado | Sí |  |
| FREY | Cortadora de Salchichas WS 420 Frey | Embutido y porcionado | Sí |  |
| FREY | Dosificador KK500 Frey | Embutido y porcionado | Sí |  |
| FREY | Embutidora al Vacío F-Line F222 Frey | Embutido y porcionado | Sí |  |
| FREY | Embutidora al Vacío F-Line F266 Frey | Embutido y porcionado | Sí |  |
| FREY | Embutidora al Vacío F-Line F60 Frey | Embutido y porcionado | Sí |  |
| INTERNATIONAL CLIP | Carrete de Clips para Embutidos International Clip | Insumos y consumibles | No | ⚠ insumo: propongo dejarlo en la ficha Insumos |
| INTERNATIONAL CLIP | Clipadora IC 18-15 International Clip | Embutido y porcionado | Sí |  |
| INTERNATIONAL CLIP | Clipadora Individual de Bancada IC 700S International Clip | Embutido y porcionado | Sí |  |
| INTERNATIONAL CLIP | Clips de Aluminio International Clip | Clips | No | ⚠ insumo: propongo dejarlo en la ficha Insumos |
| INTERNATIONAL CLIP | Clips en Forma de S International Clip | Insumos y consumibles | No | ⚠ insumo: propongo dejarlo en la ficha Insumos |
| INTERNATIONAL CLIP | Lazos para Salchichón International Clip GS 25 | Clips | No | ⚠ insumo: propongo dejarlo en la ficha Insumos |
| REICH | Generador de Humo Steamsmoker S 850 H Reich | Ahumado | Sí |  |
| REICH | Horno Airmaster KK Reich | Cocción y tratamiento térmico | Sí |  |
| REICH | Intercambiador Airmaster IC Reich | Cocción y tratamiento térmico | Sí |  |
| AMTEK | Horno Tipo Batch MWB2260R-440-75 Amtek | Cocción y tratamiento térmico | Sí |  |
| AMTEK | Sistema de Temperado AMT4412R-440-2X74 Amtek | Cocción y tratamiento térmico | Sí | ⚠ temperado (descongelación) |
| AMTEK | Sistema de Temperado AMT4412R-440-75 Amtek | Cocción y tratamiento térmico | Sí | ⚠ temperado (descongelación) |
| PAGANINI | Módulo de Cocción Dual MC1000 Paganini | Cocción y tratamiento térmico | Sí |  |
| VELEC | Cargador Mecánico de Salchichas Velec | Empaque y envasado | Sí | ⚠ cargador de salchichas (suena a Empaque) |
| VELEC | Sistema de Dosificación Cedev 4150 Velec | Embutido y porcionado | Sí |  |

Total que entraría: 21 productos activos.

### Empaque (colección nueva propuesta: /collections/empaque)

| Marca | Producto | Tipo en la tienda | ¿Entra? | Nota |
|---|---|---|---|---|
| VARIOVAC | Termoformadora Maximus RE Variovac | Empaque y envasado | Sí |  |
| VARIOVAC | Termoformadora Optimus Variovac | Empaque y envasado | Sí |  |
| VARIOVAC | Termoformadora Primus MP Variovac | Empaque y envasado | Sí |  |
| SUPERVAC | Línea Completa de Envase al Vacío, Retractilado, Frío y Secado Supervac | Empaque y envasado | Sí |  |
| SUPERVAC | Túnel de Refrigeración AC 660 Supervac | Refrigeración | Sí | ⚠ túnel de refrigeración, no es empaque |
| Mayma | Empacadora Flow Pack Cibeles Mayma | Empaque y envasado | Sí |  |
| Mayma | Empacadora Flow Pack Lepanto Mayma | Empaque y envasado | Sí |  |
| ESPERA | Etiquetadora Automática Peso Precio Nova ES-B Espera | Etiquetado y pesaje | Sí |  |
| ESPERA | Etiquetadora Automática Peso Precio Nova ES-R Espera | Etiquetado y pesaje | Sí |  |
| ESPERA | Etiquetadora Peso Precio Es 5901 Espera | Etiquetado y pesaje | Sí |  |
| ESPERA | Sistema de Etiquetado Automático Peso Precio Nova ES-E Espera | Etiquetado y pesaje | Sí |  |
| JAW FENG | Máquina de Envasado al Vacío de Cámara Sencilla J-V006W Jaw Feng | Empaque y envasado | Sí |  |
| JAW FENG | Máquina de Envasado al Vacío de Doble Cámara Automática J-V013A Jaw Feng | Empaque y envasado | Sí |  |
| JAW FENG | Máquina de Envasado al Vacío de Sobremesa J-V002 Jaw Feng | Empaque y envasado | Sí |  |
| JAW FENG | Termoselladora de Bandejas Semiautomática con Vacío y Envasado a Gas J-V053A Jaw Feng | Empaque y envasado | Sí |  |

Total que entraría: 15 productos activos.

### Higiene (colección nueva propuesta: /collections/higiene)

| Marca | Producto | Tipo en la tienda | ¿Entra? | Nota |
|---|---|---|---|---|
| AWE | ARANDELA COMPACTA PARA SUELA Y EMPEINES 550402M | Higiene y sanitización industrial | Sí |  |
| AWE | Carro Cutter AWE | Carros cutters y contenedores | No | ⚠ carro cutter (insumo/transporte): propongo dejarlo fuera |
| AWE | Dispositivo Móvil de Desinfección de Manos Spraybox 551801 NM AWE | Higiene y sanitización industrial | Sí |  |
| AWE | Dispositivo para Lavado y Desinfección de Manos 551301 AWE | Higiene y sanitización industrial | Sí |  |
| AWE | Estación de Acceso para Higiene de Manos Cleangate 551404 AWE | Higiene y sanitización industrial | Sí |  |
| AWE | Lavabo Higiénico Mural Kleanox 531001B AWE | Higiene y sanitización industrial | Sí |  |
| AWE | Lavabo Higiénico con Secador de Manos TIP 531201 AWE | Higiene y sanitización industrial | Sí |  |
| AWE | Lavadora Industrial Big Max AWE | Higiene y sanitización industrial | Sí |  |
| AWE | Lavadora de Calzado Manual Scrubo Pro 550102 AWE | Higiene y sanitización industrial | Sí |  |
| AWE | Limpiador de Suelas Milkyway 55030 LT-F2 AWE | Higiene y sanitización industrial | Sí |  |
| AWE | Limpiador de Suelas de Zapatos Solematic 550201M AWE | Higiene y sanitización industrial | Sí |  |

Total que entraría: 10 productos activos.


## 9. Fermentación y horneado

Hoy la ficha lleva a /collections/hornos (cat:Hornos y línea panadería): 15 hornos activos y ninguna cámara de fermentación.
Cámaras de fermentación: 8 en total, 6 activas: Ferneto ACC246, Logiudice Rise, Logiudice para Carros, Memak Cámara de Reposo IPP, Memak T-Rest y Technofood 1 Carro. Las otras 2 son Inoxforni en borrador.
Propuesta: crear la colección inteligente "fermentacion-y-horneado" (etiqueta cat:Hornos O cat:Cámaras de fermentación) con 21 productos activos, y que la ficha lleve allí.

## 11. Orden natural por número de modelo (vista previa de 3 colecciones)

### technofood-linea-carnica

| # | Hoy (más vendidos) | Propuesto |
|---|---|---|
| 1 | Molino de Carne Industrial JRD 160 Technofood | Molino de Carne Industrial JRD 160 Technofood |
| 2 | Molino de Carne Industrial JR 130 Technofood | Molino de Carne Industrial JR 130 Technofood |
| 3 | Mezclador de Carne JB 650 Technofood | Mezclador de Carne JB 150 Technofood |
| 4 | Mezclador de Carne JB 2000 Technofood | Mezclador de Carne JB 650 Technofood |
| 5 | Mezclador de Carne JB 150 Technofood | Mezclador de Carne JB 2000 Technofood |
| 6 | Mezclador al Vacío JBZK 650 Technofood | Mezclador al Vacío JBZK 650 Technofood |
| 7 | Masajeadora al Vacío con Refrigeración GRKL 1600 Technofood | Masajeadora al Vacío con Refrigeración GRKL 1600 Technofood |
| 8 | Masajeador al Vacío TH 1800 Technofood | Masajeador al Vacío con Refrigeración GRKL 3500 Technofood |
| 9 | Masajeador al Vacío GRZK 2500 Technofood | Masajeador al Vacío TH 1800 Technofood |
| 10 | Masajeador al Vacío GRZK 1000 Technofood | Masajeador al Vacío GRZK 100 Technofood |
| 11 | Masajeador al Vacío GRZK 100 Technofood | Masajeador al Vacío GRZK 1000 Technofood |
| 12 | Masajeador al Vacío con Refrigeración GRKL 3500 Technofood | Masajeador al Vacío GRZK 2500 Technofood |
| 13 | Elevador de Carros TS 200 Technofood | Elevador de Carros TS 200 Technofood |
| 14 | Cutter Industrial ZBG 20 Technofood | Cutter Industrial ZBG 20 Technofood |
| 15 | Cutter Industrial ZBG 125 Technofood | Cutter Industrial de Alta Velocidad ZBG 80 II Technofood |
| 16 | Cutter Industrial de Alta Velocidad ZBG 80 II Technofood | Cutter Industrial ZBG 125 Technofood |
| 17 | Cutter Industrial de Alta Velocidad ZBG 200 Technofood | Cutter Industrial de Alta Velocidad ZBG 200 Technofood |
| 18 | Cortadora de Bloques de Carne Congelada QP 5230 Technofood | Cortadora de Bloques de Carne Congelada QP 5230 Technofood |

### rebanadoras-y-cortadoras

| # | Hoy (más vendidos) | Propuesto |
|---|---|---|
| 1 | Cortadora de Queso y Verduras Talía Zanolli | Cortadora de Queso y Verduras Talía Zanolli |
| 2 | Cortadora de Pan EFE 09 Hércules Matas | Cortadora de Pan EFE 01 Matas |
| 3 | Cortadora de Pan EFE 01 Matas | Cortadora de Pan EFE 09 Hércules Matas |
| 4 | Rebanadora de Pan y Aperitivos TP60 Dovaina | Rebanadora de Pan y Aperitivos TP60 Dovaina |
| 5 | Rebanadora de Pan DPPL55 Dovaina | Rebanadora de Pan DPPL55 Dovaina |
| 6 | Rebanadora de Pan DP 70 Dovaina | Rebanadora de Pan DP 35 Dovaina |
| 7 | Rebanadora de Pan DP 35 Dovaina | Rebanadora de Pan DP 70 Dovaina |
| 8 | Cortadora Horizontal BDP XD Dovaina | Cortadora Horizontal BDP XD Dovaina |

### refrigeracion-y-abatimiento

| # | Hoy (más vendidos) | Propuesto |
|---|---|---|
| 1 | Ultracongelador RBM 202 Fagor | Ultracongelador RBM 202 Fagor |
| 2 | Nevera de Congelación MUN 22G Fagor | Nevera de Congelación MUN 22G Fagor |
| 3 | Abatidor de Temperatura Concept Fagor | Abatidor de Temperatura Concept Fagor |
| 4 | Abatidor de Temperatura Advance Fagor | Abatidor de Temperatura Advance Fagor |
| 5 | Abatidor de Temperatura 10 Bandejas ABCO 101 Fagor | Abatidor de Temperatura 10 Bandejas ABCO 101 Fagor |
| 6 | Abatidor de Temperatura 10 Bandejas ABC 101 HC Fagor | Abatidor de Temperatura 10 Bandejas ABC 101 HC Fagor |

