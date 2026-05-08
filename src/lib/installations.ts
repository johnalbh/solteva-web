export type InstallationType =
  | "organismos-publicos"
  | "colegios"
  | "hoteles"
  | "locales-comercios"
  | "comunidades-vecinos"
  | "casas-particulares"
  | "instalaciones-piscina";

export interface InstallationCase {
  id: string;
  type: InstallationType;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  location?: string;
  image?: string;
}

export interface InstallationCategory {
  slug: InstallationType;
  labelEs: string;
  labelEn: string;
  descEs: string;
  descEn: string;
  icon: string;
}

export const installationCategories: InstallationCategory[] = [
  {
    slug: "organismos-publicos",
    labelEs: "Organismos Públicos",
    labelEn: "Public Institutions",
    descEs:
      "Instalaciones de accesibilidad en ayuntamientos, hospitales, juzgados y demás organismos públicos de toda España.",
    descEn:
      "Accessibility installations in town halls, hospitals, courts and other public bodies across Spain.",
    icon: "Building2",
  },
  {
    slug: "colegios",
    labelEs: "Colegios",
    labelEn: "Schools",
    descEs:
      "Soluciones de accesibilidad para centros educativos. Garantizamos el acceso de todos los alumnos y personal a cualquier planta.",
    descEn:
      "Accessibility solutions for educational centres. We ensure access to all floors for students and staff.",
    icon: "School",
  },
  {
    slug: "hoteles",
    labelEs: "Hoteles",
    labelEn: "Hotels",
    descEs:
      "Plataformas y elevadores para hoteles y establecimientos turísticos. Cumplimiento normativa de accesibilidad.",
    descEn:
      "Platforms and lifts for hotels and tourist establishments. Accessibility regulation compliance.",
    icon: "Hotel",
  },
  {
    slug: "locales-comercios",
    labelEs: "Locales y Comercios",
    labelEn: "Shops & Businesses",
    descEs:
      "Rampas, plataformas y sillas salvaescaleras para locales comerciales, oficinas y espacios de trabajo accesibles.",
    descEn:
      "Ramps, platforms and stairlifts for shops, offices and accessible workplaces.",
    icon: "Store",
  },
  {
    slug: "comunidades-vecinos",
    labelEs: "Comunidades de Vecinos",
    labelEn: "Residential Communities",
    descEs:
      "La solución más demandada. Sillas salvaescaleras y plataformas para comunidades de hasta 5 plantas sin ascensor.",
    descEn:
      "The most requested solution. Stairlifts and platforms for communities up to 5 floors without a lift.",
    icon: "Apartment",
  },
  {
    slug: "casas-particulares",
    labelEs: "Casas Particulares",
    labelEn: "Private Homes",
    descEs:
      "Recupera la independencia en tu propio hogar. Sillas salvaescaleras rectas, curvas o de exterior para unifamiliares.",
    descEn:
      "Regain independence in your own home. Straight, curved or outdoor stairlifts for houses.",
    icon: "Home",
  },
  {
    slug: "instalaciones-piscina",
    labelEs: "Instalaciones de Piscina",
    labelEn: "Swimming Pools",
    descEs:
      "Grúas hidráulicas para piscinas privadas y comunitarias. Solución elegante y segura para el baño sin barreras.",
    descEn:
      "Hydraulic pool hoists for private and communal pools. Elegant and safe barrier-free bathing solution.",
    icon: "Waves",
  },
];

export function getInstallationCategory(
  slug: string
): InstallationCategory | undefined {
  return installationCategories.find((c) => c.slug === slug);
}
