export interface Post {
  slug: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  dateIso: string;
  readingMinutes: number;
  category: "guide" | "finance" | "maintenance" | "subsidies" | "comparison";
  categoryLabelEs: string;
  categoryLabelEn: string;
  heroImage: string;
  keywords: string[];
}

export const posts: Post[] = [
  {
    slug: "cuanto-cuesta-silla-salvaescaleras",
    titleEs: "¿Cuánto cuesta una silla salvaescaleras? Guía de precios 2026",
    titleEn: "How much does a stairlift cost? 2026 price guide",
    descriptionEs:
      "Precios reales de sillas salvaescaleras rectas, curvas y exteriores. Qué factores afectan al coste, opciones de financiación y cómo ahorrar.",
    descriptionEn:
      "Real prices for straight, curved and outdoor stairlifts. What factors affect cost, financing options and how to save.",
    dateIso: "2026-03-01",
    readingMinutes: 7,
    category: "guide",
    categoryLabelEs: "Guía de compra",
    categoryLabelEn: "Buying guide",
    heroImage: "/images/products/stairlifts/handicare-950/img-1.jpg",
    keywords: ["precio silla salvaescaleras", "coste salvaescaleras", "cuanto cuesta"],
  },
  {
    slug: "silla-recta-vs-curva",
    titleEs: "Silla salvaescaleras recta vs. curva: ¿cuál necesito?",
    titleEn: "Straight vs. curved stairlift: which do I need?",
    descriptionEs:
      "Comparativa completa entre modelos rectos y curvos. Diferencias de precio, instalación, raíl y cuándo elegir cada uno.",
    descriptionEn:
      "Complete comparison between straight and curved models. Price, installation, rail differences and when to choose each.",
    dateIso: "2026-03-15",
    readingMinutes: 6,
    category: "comparison",
    categoryLabelEs: "Comparativa",
    categoryLabelEn: "Comparison",
    heroImage: "/images/products/stairlifts/freecurve/img-1.jpg",
    keywords: ["silla recta curva diferencia", "salvaescaleras recta curva"],
  },
  {
    slug: "subvenciones-silla-salvaescaleras-2026",
    titleEs: "Subvenciones para sillas salvaescaleras en Andalucía 2026",
    titleEn: "Stairlift grants and subsidies in Andalusia 2026",
    descriptionEs:
      "Guía completa de ayudas, bonos y deducciones fiscales para la compra de sillas salvaescaleras en Andalucía. Importes, requisitos y cómo solicitarlos.",
    descriptionEn:
      "Complete guide to grants, vouchers and tax deductions for buying a stairlift in Andalusia. Amounts, requirements and how to apply.",
    dateIso: "2026-04-01",
    readingMinutes: 8,
    category: "subsidies",
    categoryLabelEs: "Subvenciones",
    categoryLabelEn: "Grants",
    heroImage: "/images/products/stairlifts/platinum-ergo/main.jpg",
    keywords: ["subvenciones salvaescaleras andalucia", "ayudas accesibilidad 2026"],
  },
  {
    slug: "mantenimiento-silla-salvaescaleras",
    titleEs: "Mantenimiento de sillas salvaescaleras: qué incluye y con qué frecuencia",
    titleEn: "Stairlift maintenance: what is included and how often",
    descriptionEs:
      "Todo sobre el mantenimiento anual de sillas salvaescaleras: qué revisiones hay que hacer, qué incluye el contrato y cuánto cuesta.",
    descriptionEn:
      "Everything about annual stairlift maintenance: what checks are needed, what the service contract includes and how much it costs.",
    dateIso: "2026-04-15",
    readingMinutes: 5,
    category: "maintenance",
    categoryLabelEs: "Mantenimiento",
    categoryLabelEn: "Maintenance",
    heroImage: "/images/products/stairlifts/handicare-2000-exterior/img-1.jpg",
    keywords: ["mantenimiento salvaescaleras", "revision anual silla salvaescaleras"],
  },
  {
    slug: "como-elegir-silla-salvaescaleras",
    titleEs: "Cómo elegir una silla salvaescaleras: guía completa del comprador",
    titleEn: "How to choose a stairlift: the complete buyer's guide",
    descriptionEs:
      "Los 7 factores clave para elegir la silla salvaescaleras correcta: tipo de escalera, capacidad, opciones, marca y presupuesto.",
    descriptionEn:
      "The 7 key factors for choosing the right stairlift: staircase type, capacity, features, brand and budget.",
    dateIso: "2026-05-01",
    readingMinutes: 9,
    category: "guide",
    categoryLabelEs: "Guía de compra",
    categoryLabelEn: "Buying guide",
    heroImage: "/images/products/stairlifts/handicare-950/img-1.jpg",
    keywords: ["elegir silla salvaescaleras", "guia compra salvaescaleras"],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): Post[] {
  const post = getPost(slug);
  if (!post) return posts.slice(0, count);
  return posts.filter((p) => p.slug !== slug).slice(0, count);
}
