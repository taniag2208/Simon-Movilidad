// AUTO-GENERADO por scripts/parse-discovery.mjs — NO editar a mano.
// Fuente: hoja "Preguntas Discovery". Solo preguntas ABIERTA / PARCIAL.
// Regenerar con: npm run parse:discovery -- <ruta-al-excel>

import type { DiscoveryBlock } from "@/types";

export const discoveryStats = {
  blocks: 14,
  open: 56,
  partial: 16,
  total: 72,
};

export const discoveryBlocks: DiscoveryBlock[] = [
  {
    "id": "1-portafolio-y-modelo-de-negocio",
    "number": "1",
    "title": "Portafolio y modelo de negocio",
    "questions": [
      {
        "id": "1-portafolio-y-modelo-de-negocio-1",
        "question": "De los servicios actuales (rastreo GPS, guantera digital, seguros, asistencias, convenios, reportes), ¿cuáles tienen mayor uso activo hoy? ¿Cómo lo miden?",
        "status": "PARCIAL",
        "notes": "Guantera digital, telemetría, SOAT, asistencias en producción. Falta ranking de uso activo por servicio."
      },
      {
        "id": "1-portafolio-y-modelo-de-negocio-2",
        "question": "¿Cuáles generan más solicitudes de soporte o quejas? ¿Qué patrón identifican en esas quejas?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "1-portafolio-y-modelo-de-negocio-3",
        "question": "¿Qué servicio les piden los clientes hoy que no tienen disponible?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "1-portafolio-y-modelo-de-negocio-4",
        "question": "¿Existe algún dato de retención o churn asociado a la app (no al vehículo/crédito)?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "1-portafolio-y-modelo-de-negocio-5",
        "question": "¿Cuál es el modelo de monetización actual de cada servicio — gratuito, incluido en la financiación, o de pago independiente?",
        "status": "PARCIAL",
        "notes": "Telemetría = costo cargado al crédito (mitigación de riesgo). Falta modelo de los servicios transaccionales nuevos."
      }
    ]
  },
  {
    "id": "2-modelo-b2c-b2b",
    "number": "2",
    "title": "Modelo B2C / B2B",
    "questions": [
      {
        "id": "2-modelo-b2c-b2b-1",
        "question": "De los 55.000 clientes, ¿qué proporción corresponde a vehículo particular (B2C) vs. flotas o transporte de carga/pasajeros (B2B)?",
        "status": "PARCIAL",
        "notes": "Finandina 100% B2C; Finanzauto >50-60% productivos/pymes. Falta % exacto sobre los 55K."
      },
      {
        "id": "2-modelo-b2c-b2b-2",
        "question": "Los servicios a evaluar (peajes, parqueaderos, SOAT, tecnomecánica) ¿se piensan para ambos segmentos por igual, o hay alguno que aplique solo a uno?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "2-modelo-b2c-b2b-3",
        "question": "¿Hay clientes B2B que ya hayan pedido explícitamente alguno de estos servicios (ej. control de peajes por flota)?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "2-modelo-b2c-b2b-4",
        "question": "¿La decisión de compra/uso en B2B la toma el conductor o una persona de gestión de flota?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "3-colpass-estado-real",
    "number": "3",
    "title": "Colpass — estado real",
    "questions": [
      {
        "id": "3-colpass-estado-real-1",
        "question": "¿La habilitación está integrada técnicamente en la app hoy, o es solo una autorización regulatoria sin desarrollo asociado?",
        "status": "PARCIAL",
        "notes": "Es autorización regulatoria; integración técnica al 76%. Confirmar estado de desarrollo en la app con tecnología."
      },
      {
        "id": "3-colpass-estado-real-2",
        "question": "¿Colpass depende de convenios individuales con cada concesión vial, o es un habilitador único a nivel nacional?",
        "status": "PARCIAL",
        "notes": "Integración con todas las concesiones a nivel nacional. Confirmar si es convenio por concesión o habilitador único."
      },
      {
        "id": "3-colpass-estado-real-3",
        "question": "¿Han conversado con Colpass directamente sobre plazos o requisitos técnicos de integración?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "4-infraestructura-tecnica",
    "number": "4",
    "title": "Infraestructura técnica",
    "questions": [
      {
        "id": "4-infraestructura-tecnica-1",
        "question": "¿En qué está desarrollada la app hoy — nativa (iOS/Android), híbrida (React Native, Flutter) o web app? ¿Un solo código para B2C y B2B o son productos separados?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-2",
        "question": "¿Cómo es la arquitectura del backend a alto nivel — monolito o microservicios? ¿Corre en cloud (AWS/Azure/GCP) o infraestructura propia?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-3",
        "question": "¿Existe una capa de API propia que permita integrar servicios y proveedores externos (pasarelas, aseguradoras, Colpass), o cada integración se ha hecho de forma ad hoc?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-4",
        "question": "¿El desarrollo y mantenimiento de la app es equipo interno, tercerizado, o mixto? ¿Quién lidera las decisiones técnicas hoy?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-5",
        "question": "¿Tienen ya alguna integración externa activa (pasarela de pago, aseguradora, proveedor de datos) que sirva como precedente?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-6",
        "question": "¿Qué tan modular es la arquitectura para añadir un servicio nuevo sin afectar las funcionalidades existentes?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-7",
        "question": "¿Hay planes de refactor, migración de stack o rediseño de la app ya en curso que puedan chocar o complementarse con este roadmap?",
        "status": "PARCIAL",
        "notes": "Hay refactorización en curso (portal de flotas web) y fusión de las 2 apps 'muy pronto'. Profundizar alcance/fechas."
      },
      {
        "id": "4-infraestructura-tecnica-8",
        "question": "¿Existe documentación técnica o diagramas de arquitectura de alto nivel que puedan compartir? (no acceso a repositorio)",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-9",
        "question": "Con esto, ¿dirías que la app está construida de forma que permite agregar módulos/servicios nuevos con relativa independencia, o que cualquier servicio nuevo implica un desarrollo mayor sobre el núcleo actual?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-10",
        "question": "¿El dispositivo instalado permite actualización de funciones vía software/firmware remoto, o cualquier función nueva requiere cambio de hardware?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-11",
        "question": "¿Qué tan reciente es el parque de dispositivos? ¿Hay un solo modelo o varias generaciones conviviendo en la base de 55K?",
        "status": "PARCIAL",
        "notes": "GPS con SIM+cables integrado a arquitectura del vehículo; servicio básico (geoloc) vs avanzado (lee data/km); versión portátil en desarrollo. Falta generaciones/firmware remoto."
      },
      {
        "id": "4-infraestructura-tecnica-12",
        "question": "De los servicios candidatos, ¿alguno ya saben de antemano que es técnicamente inviable sobre el hardware actual?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-13",
        "question": "¿La app se conecta con el dispositivo en tiempo real o hay latencia/sincronización por lotes?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-14",
        "question": "¿Tienen capacidad de hacer piloto con un subconjunto de dispositivos antes de desplegar a toda la base?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "4-infraestructura-tecnica-15",
        "question": "Con lo que nos acabas de contar, ¿dirías que el hardware actual permite o no permite construir sobre él los servicios que estamos evaluando?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "5-base-de-clientes",
    "number": "5",
    "title": "Base de clientes",
    "questions": [
      {
        "id": "5-base-de-clientes-1",
        "question": "¿Qué segmentación tienen hoy de los 55K — tipo de vehículo, antigüedad, zona geográfica, uso de la app?",
        "status": "PARCIAL",
        "notes": "~50K activos, 2.200-2.500 instalaciones/mes. Falta segmentación por tipo vehículo/zona/antigüedad."
      },
      {
        "id": "5-base-de-clientes-2",
        "question": "¿Tienen datos de comportamiento in-app (frecuencia de uso, funciones más usadas, abandono)?",
        "status": "PARCIAL",
        "notes": "Uso app 15-16% entran 1-2 veces/mes (meta 40%). Falta detalle de funciones más usadas/abandono."
      },
      {
        "id": "5-base-de-clientes-3",
        "question": "¿Tienen algún NPS, encuesta de satisfacción o estudio de usabilidad ya realizado, aunque sea informal?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "5-base-de-clientes-4",
        "question": "¿Pueden compartir esta información en formato agregado/anonimizado, tal como establece el charter, o requiere gestión adicional de aprobación interna?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "5-base-de-clientes-5",
        "question": "¿Hay diferencias relevantes de comportamiento entre clientes de vehículo nuevo vs. usado, o particular vs. carga pesada?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "6-servicios-candidatos",
    "number": "6",
    "title": "Servicios candidatos",
    "questions": [
      {
        "id": "6-servicios-candidatos-1",
        "question": "De los servicios ya en producción (SOAT digital, seguros, asistencias base, convenios base), ¿cuál tiene mayor adopción o uso activo? ¿Cómo lo miden?",
        "status": "PARCIAL",
        "notes": "SOAT bajo desempeño, asistencias con 2 inspecciones previas incluidas. Falta ranking de adopción."
      },
      {
        "id": "6-servicios-candidatos-2",
        "question": "¿Cuál de estos genera más quejas o solicitudes de soporte? ¿Qué patrón identifican ahí?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "6-servicios-candidatos-3",
        "question": "Sobre asistencias (grúa/carro taller/teleorientación): ¿qué tan seguido se activan? ¿Hay algún dolor recurrente reportado por los usuarios?",
        "status": "PARCIAL",
        "notes": "Asistencias = peritaje, grúa, técnico-mecánica asistida, 2 inspecciones previas. Falta frecuencia de activación."
      },
      {
        "id": "6-servicios-candidatos-4",
        "question": "Sobre convenios: ¿qué tan usado es hoy el catálogo? ¿Qué tipo de convenios tiene más tracción?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "6-servicios-candidatos-5",
        "question": "De los candidatos genuinamente nuevos (parqueaderos, tecnomecánica transaccional, renovación de documentos, asistencias premium, convenios ampliados), ¿cuál creen que tiene mayor demanda? ¿En qué basan esa creencia?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "6-servicios-candidatos-6",
        "question": "Sobre revisión tecnomecánica: hoy la guantera hace seguimiento y alertas de vencimiento, pero no es evidente que permita agendar/pagar la revisión desde la app — ¿es correcto? ¿Qué tan lejos están de ofrecer esa transacción?",
        "status": "PARCIAL",
        "notes": "La guantera hace seguimiento/alertas de vencimiento pero NO agenda/paga la revisión. Confirmar con tecnología si es viable."
      },
      {
        "id": "6-servicios-candidatos-7",
        "question": "Sobre asistencias premium: ¿qué representaría un nivel superior al servicio base de grúa/carro taller/teleorientación? ¿Ya identificaron qué le falta al nivel actual?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "6-servicios-candidatos-8",
        "question": "Sobre convenios ampliados: ¿qué tipo de convenios nuevos evalúan sumar al catálogo actual?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "6-servicios-candidatos-9",
        "question": "¿Hay algún servicio de esta lista que ya descartaron internamente? ¿Por qué?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "6-servicios-candidatos-10",
        "question": "¿Qué servicio de la competencia (GoPass, Flypass, Satrack, Detektor, etc.) admiran o les preocupa más? ¿Por qué específicamente ese?",
        "status": "PARCIAL",
        "notes": "Miran GoPass (UX les parece desordenada/saturada) y Samsara en B2B. Falta el 'por qué' específico y qué les preocupa."
      },
      {
        "id": "6-servicios-candidatos-11",
        "question": "Si tuvieran que elegir solo UN servicio genuinamente nuevo para lanzar primero, ¿cuál sería y qué los haría cambiar de opinión?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "6-servicios-candidatos-12",
        "question": "¿Han recibido peticiones directas de clientes pidiendo alguno de estos servicios nuevos? ¿Tienen evidencia (correos, tickets, encuestas)?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "6-servicios-candidatos-13",
        "question": "¿Existe alguna razón estratégica de negocio (no solo demanda) por la que un servicio nuevo sea prioritario — ej. relación comercial con una aseguradora, presión del grupo Finanzauto?",
        "status": "PARCIAL",
        "notes": "Pista — sinergias de grupo (Xren flotas, electrolineras propias, Seguros Mundial). Profundizar la razón estratégica."
      }
    ]
  },
  {
    "id": "7-criterios-de-exito-y-decision",
    "number": "7",
    "title": "Criterios de éxito y decisión",
    "questions": [
      {
        "id": "7-criterios-de-exito-y-decision-1",
        "question": "¿Qué tendría que mostrar esta investigación para que decidan avanzar con inversión de desarrollo (Momento 2 o construcción directa)?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "7-criterios-de-exito-y-decision-2",
        "question": "Además de Diana como Product Owner, ¿quién más participa en esa decisión de inversión — Óscar, Javier, alguien de Finanzauto?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "7-criterios-de-exito-y-decision-3",
        "question": "¿Hay un plazo o ventana de decisión interna (presupuesto 2027, junta directiva) que debamos considerar para la entrega de resultados?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "7-criterios-de-exito-y-decision-4",
        "question": "Si la investigación concluye que ningún servicio tiene demanda suficiente, ¿qué harían con la habilitación de Colpass?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "7-criterios-de-exito-y-decision-5",
        "question": "¿Cómo prefieren recibir la recomendación final — priorizada por potencial de negocio, por facilidad de implementación técnica, o ambas ponderadas?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "cierre-de-sesion",
    "number": null,
    "title": "Cierre de sesión",
    "questions": [
      {
        "id": "cierre-de-sesion-1",
        "question": "¿Hay algo que no les hayamos preguntado y que consideren que deberíamos saber antes de empezar a investigar?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "cierre-de-sesion-2",
        "question": "¿Hay estudios previos, consultorías anteriores o análisis internos sobre este mismo tema que puedan compartirnos?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "cierre-de-sesion-3",
        "question": "Confirmar disponibilidad de Javier / Diana para preguntas de seguimiento asíncronas durante la fase de investigación (canal de consulta puntual, no nueva sesión).",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "complementarias-datos-y-legal",
    "number": null,
    "title": "Complementarias · Datos y legal",
    "questions": [
      {
        "id": "complementarias-datos-y-legal-1",
        "question": "¿Qué marco de habeas data / política de tratamiento de datos personales tiene Simón hoy, y qué permite hacer con la base de 55K para efectos de esta investigación (aún en formato agregado)?",
        "status": "PARCIAL",
        "notes": "Mencionaron restricción legal para cargar datos del RUNT automáticamente (habeas data). Profundizar marco vigente."
      },
      {
        "id": "complementarias-datos-y-legal-2",
        "question": "Para el pago de peajes vía Colpass, ¿hay implicaciones regulatorias adicionales por operar transacciones financieras (SFC, medios de pago) que Simón deba considerar?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "complementarias-marca-y-prototipo",
    "number": null,
    "title": "Complementarias · Marca y prototipo",
    "questions": [
      {
        "id": "complementarias-marca-y-prototipo-1",
        "question": "¿Existe una guía de marca / manual visual actualizado de Simón que podamos usar como insumo para construir el prototipo del Activo Digital Validado con el look & feel real?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "complementarias-marca-y-prototipo-2",
        "question": "¿El prototipo debe respetar el naming/branding actual de Simón, o hay espacio para explorar naming alternativo por línea de servicio (ej. Simón Pay, Simón Trámites)?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "complementarias-gobernanza-del-proyecto",
    "number": null,
    "title": "Complementarias · Gobernanza del proyecto",
    "questions": [
      {
        "id": "complementarias-gobernanza-del-proyecto-1",
        "question": "¿Cuál es el tiempo esperado de respuesta de Simón ante solicitudes asíncronas de Tita durante la fase de investigación (SLA informal)?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "complementarias-gobernanza-del-proyecto-2",
        "question": "¿Quién de Simón valida y aprueba formalmente los entregables intermedios (documento de investigación, hipótesis refinadas)? ¿Es la misma persona que aprueba el entregable final?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "complementarias-gobernanza-del-proyecto-3",
        "question": "¿Cómo prefieren los checkpoints durante las semanas 1–6 — reunión semanal, quincenal, o reporte escrito con opción de sesión?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "complementarias-ecosistema-finanzauto",
    "number": null,
    "title": "Complementarias · Ecosistema Finanzauto",
    "questions": [
      {
        "id": "complementarias-ecosistema-finanzauto-1",
        "question": "¿Qué rol juega Finanzauto (grupo matriz) en la definición del roadmap? ¿Hay sinergias o servicios cruzados que debamos considerar como parte del universo de candidatos?",
        "status": "PARCIAL",
        "notes": "Finanzauto lidera mercadeo; grupo Celsa (Xren, electrolineras, Seguros Mundial, Finandina). Profundizar rol en el roadmap."
      }
    ]
  },
  {
    "id": "complementarias-modelo-economico",
    "number": null,
    "title": "Complementarias · Modelo económico",
    "questions": [
      {
        "id": "complementarias-modelo-economico-1",
        "question": "Para los servicios candidatos nuevos, ¿tienen un modelo de negocio preferido (comisión por transacción, suscripción, freemium, incluido en el plan actual)?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  },
  {
    "id": "8-alianzas-y-ecosistema-de-servicios",
    "number": "8",
    "title": "Alianzas y ecosistema de servicios",
    "questions": [
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-1",
        "question": "¿Qué alianzas o convenios con terceros están hoy activos en la app (aseguradoras, asistencias, CDAs, talleres, parqueaderos, pasarelas)? ¿Cuáles están firmados vs. en conversación?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-2",
        "question": "Para el SOAT, hoy es con Seguros Mundial vía web view. ¿Hay conversaciones con otras aseguradoras o comparadores para mejorar la conversión?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-3",
        "question": "De los servicios candidatos (parqueaderos, tecnomecánica transaccional, renovación de documentos, asistencias premium), ¿con cuáles YA han contactado proveedores o aliados? ¿En qué etapa está cada conversación?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-4",
        "question": "Para tecnomecánica: mencionaron convenios con CDAs. ¿Qué alcance tiene ese convenio hoy — solo agendamiento, o también pago/transacción in-app?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-5",
        "question": "Para parqueaderos y otros servicios de conveniencia, ¿ya hay un proveedor/red identificado, o es un frente aún sin explorar comercialmente?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-6",
        "question": "¿Qué servicios se apalancan en empresas del grupo Celsa (Xren para flotas, electrolineras para carga, Seguros Mundial, Finandina)? ¿Cuáles son sinergia obligada vs. opcional?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-7",
        "question": "¿Hay presión o direccionamiento del grupo para priorizar ciertos servicios o aliados por razones estratégicas (no solo demanda)?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-8",
        "question": "Para los servicios nuevos, ¿qué modelo comercial manejan o prefieren con los aliados — comisión por transacción, markup, membresía, revenue share?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-9",
        "question": "¿Hay algún servicio que hayan explorado con un aliado y descartado? ¿Por qué (económico, técnico, regulatorio, de marca)?",
        "status": "ABIERTA",
        "notes": null
      },
      {
        "id": "8-alianzas-y-ecosistema-de-servicios-10",
        "question": "Para la masificación (usuarios fuera del ecosistema), ¿qué canales de distribución de TAC están evaluando — retail, cajas de comercios, alianzas puntuales? ¿Alguno ya conversado?",
        "status": "ABIERTA",
        "notes": null
      }
    ]
  }
];
