export interface CityData {
  slug: string;
  nameEs: string;
  nameEn: string;
  provinceEs: string;
  provinceEn: string;
  delegacionId?: string;
  descEs: string;
  descEn: string;
  h1Es: string;
  h1En: string;
  phone?: string;
}

export const cities: CityData[] = [
  {
    slug: "malaga",
    nameEs: "Málaga",
    nameEn: "Málaga",
    provinceEs: "Málaga",
    provinceEn: "Málaga",
    delegacionId: "malaga",
    h1Es: "Sillas Salvaescaleras en Málaga",
    h1En: "Stairlifts in Málaga",
    descEs:
      "Solteva Elevación en Málaga — distribución, instalación y mantenimiento de sillas salvaescaleras, plataformas y elevadores verticales. Delegación propia en Málaga capital. Visita gratuita en 24 horas.",
    descEn:
      "Solteva Elevación in Málaga — distribution, installation and maintenance of stairlifts, platforms and vertical lifts. Own branch in Málaga. Free visit within 24 hours.",
    phone: "952 197 636",
  },
  {
    slug: "sevilla",
    nameEs: "Sevilla",
    nameEn: "Seville",
    provinceEs: "Sevilla",
    provinceEn: "Seville",
    h1Es: "Sillas Salvaescaleras en Sevilla",
    h1En: "Stairlifts in Seville",
    descEs:
      "Instalación de sillas salvaescaleras en Sevilla y provincia. Técnicos propios con más de 15 años de experiencia. Visita gratuita en 24 horas. Llamada gratuita 900 100 133.",
    descEn:
      "Stairlift installation in Seville and province. In-house technicians with over 15 years' experience. Free visit within 24 hours. Free call 900 100 133.",
    phone: "900 100 133",
  },
  {
    slug: "cordoba",
    nameEs: "Córdoba",
    nameEn: "Córdoba",
    provinceEs: "Córdoba",
    provinceEn: "Córdoba",
    delegacionId: "cordoba",
    h1Es: "Sillas Salvaescaleras en Córdoba",
    h1En: "Stairlifts in Córdoba",
    descEs:
      "Delegación Solteva en Córdoba. Sillas salvaescaleras, plataformas y elevadores verticales. Instalación en 3-5 días sin obras. Visita gratuita. 900 100 133.",
    descEn:
      "Solteva branch in Córdoba. Stairlifts, platforms and vertical lifts. Installation in 3-5 days without building work. Free visit. 900 100 133.",
    phone: "900 100 133",
  },
  {
    slug: "jaen",
    nameEs: "Jaén",
    nameEn: "Jaén",
    provinceEs: "Jaén",
    provinceEn: "Jaén",
    delegacionId: "jaen",
    h1Es: "Sillas Salvaescaleras en Jaén",
    h1En: "Stairlifts in Jaén",
    descEs:
      "Delegación Solteva en Jaén. Distribuimos, instalamos y mantenemos sillas salvaescaleras, plataformas y elevadores en toda la provincia de Jaén. Presupuesto sin compromiso.",
    descEn:
      "Solteva branch in Jaén. We distribute, install and maintain stairlifts, platforms and lifts throughout the province of Jaén. No-obligation quote.",
    phone: "953 05 57 68",
  },
  {
    slug: "granada",
    nameEs: "Granada",
    nameEn: "Granada",
    provinceEs: "Granada",
    provinceEn: "Granada",
    h1Es: "Sillas Salvaescaleras en Granada",
    h1En: "Stairlifts in Granada",
    descEs:
      "Solteva Elevación cubre toda la provincia de Granada con su servicio de sillas salvaescaleras, plataformas y elevadores. Visita gratuita en 24 horas desde nuestras delegaciones más cercanas.",
    descEn:
      "Solteva Elevación covers the entire province of Granada with stairlifts, platforms and lifts. Free visit within 24 hours from our nearest branches.",
    phone: "900 100 133",
  },
  {
    slug: "marbella",
    nameEs: "Marbella",
    nameEn: "Marbella",
    provinceEs: "Málaga",
    provinceEn: "Málaga",
    h1Es: "Sillas Salvaescaleras en Marbella",
    h1En: "Stairlifts in Marbella",
    descEs:
      "Instalamos sillas salvaescaleras, plataformas y elevadores en Marbella y toda la Costa del Sol. Técnicos propios en Mijas. Respuesta en 24 horas. Presupuesto gratuito.",
    descEn:
      "We install stairlifts, platforms and lifts in Marbella and the entire Costa del Sol. In-house technicians in Mijas. Response within 24 hours. Free quote.",
    phone: "952 197 636",
  },
  {
    slug: "almeria",
    nameEs: "Almería",
    nameEn: "Almería",
    provinceEs: "Almería",
    provinceEn: "Almería",
    h1Es: "Sillas Salvaescaleras en Almería",
    h1En: "Stairlifts in Almería",
    descEs:
      "Solteva Elevación cubre toda la provincia de Almería. Sillas salvaescaleras, plataformas y elevadores con instalación rápida. Presupuesto gratuito sin compromiso. 900 100 133.",
    descEn:
      "Solteva Elevación covers the entire province of Almería. Stairlifts, platforms and lifts with fast installation. Free no-obligation quote. 900 100 133.",
    phone: "900 100 133",
  },
  {
    slug: "cadiz",
    nameEs: "Cádiz",
    nameEn: "Cádiz",
    provinceEs: "Cádiz",
    provinceEn: "Cádiz",
    h1Es: "Sillas Salvaescaleras en Cádiz",
    h1En: "Stairlifts in Cádiz",
    descEs:
      "Servicio de sillas salvaescaleras, plataformas y elevadores en Cádiz y provincia. Instalación en 3-5 días. Visita gratuita en 24 horas. 900 100 133.",
    descEn:
      "Stairlift, platform and lift service in Cádiz and province. Installation in 3-5 days. Free visit in 24 hours. 900 100 133.",
    phone: "900 100 133",
  },
  {
    slug: "madrid",
    nameEs: "Madrid",
    nameEn: "Madrid",
    provinceEs: "Madrid",
    provinceEn: "Madrid",
    h1Es: "Sillas Salvaescaleras en Madrid",
    h1En: "Stairlifts in Madrid",
    descEs:
      "Solteva Elevación presta servicio en Madrid y provincia. Distribuimos e instalamos sillas salvaescaleras, plataformas y elevadores verticales con garantía CE. Presupuesto gratuito.",
    descEn:
      "Solteva Elevación provides service in Madrid and province. We distribute and install CE-certified stairlifts, platforms and vertical lifts. Free quote.",
    phone: "900 100 133",
  },
];

export function getCityData(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
