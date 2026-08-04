// Listado de insumos solicitados (pestaña "Insumos previos" del archivo).
// Se muestra en la página "Cargar información" como checklist de entrega.
import type { Insumo } from "@/types";

export const insumos: Insumo[] = [
  {
    id: "insumo-1",
    number: 1,
    title: "Documentación habilitación Colpass (IP-REV)",
    detail:
      "Resolución del Ministerio de Transporte, alcance de la habilitación, plazos y condiciones. Determina el filtro regulatorio del proyecto.",
  },
  {
    id: "insumo-2",
    number: 2,
    title: "Data agregada / anonimizada de la base 55K",
    detail:
      "Segmentación (tipo de vehículo, zona, antigüedad), uso de app (activos vs. instalados), métricas de comportamiento in-app. Sin datos personales.",
  },
  {
    id: "insumo-3",
    number: 3,
    title: "NPS, encuestas o estudios de usabilidad previos",
    detail:
      "Cualquier estudio interno o externo sobre satisfacción, uso o percepción de los servicios actuales de la app.",
  },
  {
    id: "insumo-4",
    number: 4,
    title: "Ficha técnica del dispositivo IoT instalado",
    detail:
      "Especificaciones del hardware, generaciones desplegadas en la base, capacidades de actualización remota. Documentación, no acceso a infraestructura.",
  },
  {
    id: "insumo-5",
    number: 5,
    title: "Diagrama de arquitectura de la app (alto nivel)",
    detail:
      "Backend, frontend, integraciones existentes, stack tecnológico, capa de API. Si no está documentado, capturarlo en vivo en el Bloque 4A.",
  },
  {
    id: "insumo-6",
    number: 6,
    title: "Ficha pública de la app (revisión interna Tita)",
    detail:
      "App Store, Play Store, sitio web y manual de plataforma. Levantar qué está en producción hoy para no tratarlo como hipotético en Bloque 6.",
  },
  {
    id: "insumo-7",
    number: 7,
    title: "Modelo de monetización actual por servicio",
    detail:
      "Qué servicios son gratuitos, cuáles vienen incluidos en la financiación, cuáles son de pago independiente y su ticket promedio si aplica.",
  },
  {
    id: "insumo-8",
    number: 8,
    title: "Convenios activos con terceros",
    detail:
      "Listado de convenios vigentes (talleres, aseguradoras, parqueaderos, asistencias) que puedan servir como palanca para servicios nuevos.",
  },
  {
    id: "insumo-9",
    number: 9,
    title: "Política de tratamiento de datos personales",
    detail:
      "Marco de habeas data vigente para poder cruzar datos de la base 55K en la investigación, incluso en formato agregado.",
  },
  {
    id: "insumo-10",
    number: 10,
    title: "Guía de marca / manual visual de Simón",
    detail:
      "Logo, tipografías, paleta, componentes UI. Insumo directo para construir el prototipo del Activo Digital Validado con el look & feel real.",
  },
];
