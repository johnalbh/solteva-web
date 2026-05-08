export type ProyectoTipo = "residencial" | "comunidad" | "comercial" | "institucional"

export interface Proyecto {
  id: string
  slug: string
  tipo: ProyectoTipo
  ciudad: string
  provincia: string
  year: number
  productoEs: string
  productoEn: string
  tituloEs: string
  tituloEn: string
  descripcionEs: string
  descripcionEn: string
  imagen: string
  stats: { labelEs: string; labelEn: string; value: string }[]
  destacadoEs: string
  destacadoEn: string
}

export const proyectos: Proyecto[] = [
  {
    id: "comunidad-malaga-950",
    slug: "comunidad-vecinos-malaga",
    tipo: "comunidad",
    ciudad: "Málaga",
    provincia: "Málaga",
    year: 2024,
    productoEs: "Silla Handicare 950 (Recta)",
    productoEn: "Straight Stairlift Handicare 950",
    tituloEs: "Comunidad de vecinos — Málaga Centro",
    tituloEn: "Residential community — Málaga Centre",
    descripcionEs: "Instalación de silla salvaescaleras recta en edificio de 5 plantas sin ascensor en el centro de Málaga. La comunidad decidió instalar la silla para garantizar la movilidad de varios vecinos mayores de 75 años. Proyecto completado en 48 horas sin obras.",
    descripcionEn: "Installation of a straight stairlift in a 5-storey building without a lift in central Málaga. The community decided to install the stairlift to ensure mobility for several residents over 75. Project completed in 48 hours with no structural work.",
    imagen: "/images/products/stairlifts/handicare-950/img-4.jpg",
    stats: [
      { labelEs: "Plantas", labelEn: "Floors", value: "5" },
      { labelEs: "Vecinos beneficiados", labelEn: "Residents benefited", value: "8" },
      { labelEs: "Instalación", labelEn: "Installation", value: "48h" },
    ],
    destacadoEs: "Sin obras. Instalado en 48 horas.",
    destacadoEn: "No structural work. Installed in 48 hours.",
  },
  {
    id: "casa-marbella-platinum",
    slug: "casa-particular-marbella",
    tipo: "residencial",
    ciudad: "Marbella",
    provincia: "Málaga",
    year: 2024,
    productoEs: "Silla Platinum Ergo Curva (Doble Raíl)",
    productoEn: "Curved Dual-Rail Stairlift Platinum Ergo",
    tituloEs: "Chalet privado con escalera curva — Marbella",
    tituloEn: "Private villa with curved staircase — Marbella",
    descripcionEs: "Familia con tres generaciones bajo el mismo techo. La escalera de caracol impedía el acceso a la planta superior a la abuela de 82 años. La Platinum Ergo, fabricada a medida para la curva exacta de la escalera, devolvió la independencia completa en el hogar.",
    descripcionEn: "A three-generation family under one roof. The curved staircase prevented the 82-year-old grandmother from accessing the upper floor. The Platinum Ergo, custom-made for the exact staircase curve, restored complete independence at home.",
    imagen: "/images/products/stairlifts/platinum-ergo/main.jpg",
    stats: [
      { labelEs: "Curvas", labelEn: "Bends", value: "3" },
      { labelEs: "Capacidad", labelEn: "Capacity", value: "160 kg" },
      { labelEs: "Plazo", labelEn: "Lead time", value: "10 días" },
    ],
    destacadoEs: "Fabricada a medida para cada escalera.",
    destacadoEn: "Custom-made for each staircase.",
  },
  {
    id: "hotel-sevilla-plataforma",
    slug: "hotel-boutique-sevilla",
    tipo: "comercial",
    ciudad: "Sevilla",
    provincia: "Sevilla",
    year: 2024,
    productoEs: "Plataforma Salvaescaleras Logic",
    productoEn: "Logic Stairlift Platform",
    tituloEs: "Hotel boutique con acceso a planta noble — Sevilla",
    tituloEn: "Boutique hotel with accessible upper floor — Seville",
    descripcionEs: "Hotel de 4 estrellas en el centro histórico de Sevilla necesitaba garantizar el acceso al restaurante en primera planta para huéspedes con silla de ruedas. La plataforma Logic permite el paso de sillas de ruedas estándar y eléctricas. Cumple normativa hotelera de accesibilidad.",
    descripcionEn: "A 4-star hotel in Seville's historic centre needed to ensure access to the first-floor restaurant for wheelchair users. The Logic platform accommodates standard and electric wheelchairs. Complies with hotel accessibility regulations.",
    imagen: "/images/products/platforms/logic/img-10.jpg",
    stats: [
      { labelEs: "Tipo", labelEn: "Type", value: "Silla de ruedas" },
      { labelEs: "Capacidad", labelEn: "Capacity", value: "250 kg" },
      { labelEs: "Normativa", labelEn: "Regulation", value: "CTE-DB-SUA" },
    ],
    destacadoEs: "Cumple normativa hotelera de accesibilidad.",
    destacadoEn: "Complies with hotel accessibility regulations.",
  },
  {
    id: "ayuntamiento-antequera-elevador",
    slug: "ayuntamiento-antequera",
    tipo: "institucional",
    ciudad: "Antequera",
    provincia: "Málaga",
    year: 2023,
    productoEs: "Silla Handicare 950 (Recta)",
    productoEn: "Straight Stairlift Handicare 950",
    tituloEs: "Edificio municipal con acceso adaptado — Antequera",
    tituloEn: "Municipal building with adapted access — Antequera",
    descripcionEs: "El Ayuntamiento de Antequera requería adaptar el acceso a las oficinas de atención ciudadana en planta alta. La solución Handicare 950 de perfil reducido permitió mantener el espacio de paso en la escalera para el resto de usuarios, cumpliendo con el Plan Nacional de Accesibilidad.",
    descripcionEn: "The Antequera Town Hall needed to adapt access to citizen service offices on the upper floor. The slim-profile Handicare 950 solution maintained the staircase clearance for other users while meeting the National Accessibility Plan.",
    imagen: "/images/products/stairlifts/handicare-950/img-7.jpg",
    stats: [
      { labelEs: "Usuarios diarios", labelEn: "Daily users", value: "+40" },
      { labelEs: "Subvención", labelEn: "Grant", value: "Hasta 70%" },
      { labelEs: "Normativa", labelEn: "Regulation", value: "Plan Acc." },
    ],
    destacadoEs: "Subvención pública de hasta el 70%.",
    destacadoEn: "Public grant of up to 70%.",
  },
  {
    id: "colegio-cordoba-plataforma",
    slug: "colegio-concertado-cordoba",
    tipo: "institucional",
    ciudad: "Córdoba",
    provincia: "Córdoba",
    year: 2023,
    productoEs: "Plataforma Salvaescaleras Logic",
    productoEn: "Logic Stairlift Platform",
    tituloEs: "Centro educativo con alumnos de movilidad reducida — Córdoba",
    tituloEn: "School for pupils with reduced mobility — Córdoba",
    descripcionEs: "Colegio concertado de Córdoba con tres alumnos usuarios de silla de ruedas que necesitaban acceso a aulas en planta superior. La instalación de la plataforma Logic, financiada parcialmente por la Junta de Andalucía, garantizó la inclusión educativa plena.",
    descripcionEn: "A subsidised school in Córdoba with three wheelchair-using pupils who needed access to classrooms on the upper floor. Installation of the Logic platform, partially funded by the Junta de Andalucía, ensured full educational inclusion.",
    imagen: "/images/products/platforms/logic/img-12.jpg",
    stats: [
      { labelEs: "Alumnos beneficiados", labelEn: "Pupils benefited", value: "3" },
      { labelEs: "Financiación pública", labelEn: "Public funding", value: "60%" },
      { labelEs: "Garantía", labelEn: "Warranty", value: "3 años" },
    ],
    destacadoEs: "Financiación Junta de Andalucía.",
    destacadoEn: "Funded by Junta de Andalucía.",
  },
  {
    id: "residencia-jaen-multiple",
    slug: "residencia-mayores-jaen",
    tipo: "institucional",
    ciudad: "Jaén",
    provincia: "Jaén",
    year: 2024,
    productoEs: "3 × Silla Handicare 950 (Recta)",
    productoEn: "3 × Straight Stairlift Handicare 950",
    tituloEs: "Residencia de mayores con tres sillas — Jaén",
    tituloEn: "Care home with three stairlifts — Jaén",
    descripcionEs: "Residencia de mayores con varias escaleras interiores requería dotar de movilidad asistida a sus 85 residentes. Instalamos tres sillas Handicare 950 en las escaleras principales, con mantenimiento preventivo incluido. El proyecto incluyó formación al personal auxiliar.",
    descripcionEn: "A care home with several internal staircases needed to provide assisted mobility to its 85 residents. We installed three Handicare 950 stairlifts on the main staircases, including preventive maintenance. The project included training for auxiliary staff.",
    imagen: "/images/products/stairlifts/handicare-950/img-12.jpg",
    stats: [
      { labelEs: "Sillas instaladas", labelEn: "Stairlifts installed", value: "3" },
      { labelEs: "Residentes", labelEn: "Residents", value: "85" },
      { labelEs: "Mantenimiento", labelEn: "Maintenance", value: "Incluido" },
    ],
    destacadoEs: "Contrato de mantenimiento preventivo anual.",
    destacadoEn: "Annual preventive maintenance contract.",
  },
  {
    id: "chalet-granada-freecurve",
    slug: "chalet-sierra-nevada",
    tipo: "residencial",
    ciudad: "Granada",
    provincia: "Granada",
    year: 2023,
    productoEs: "Silla Handicare 950 (Recta)",
    productoEn: "Straight Stairlift Handicare 950",
    tituloEs: "Vivienda unifamiliar en zona rural — Granada",
    tituloEn: "Detached house in rural area — Granada",
    descripcionEs: "Familia de Granada con padre de 78 años operado de cadera. La escalera recta de acceso al dormitorio principal se convirtió en un obstáculo diario. La silla Handicare 950 instalada en 3 días devolvió la autonomía total. Financiación a 36 meses sin intereses.",
    descripcionEn: "A Granada family with a 78-year-old father who had hip surgery. The straight staircase to the master bedroom became a daily obstacle. The Handicare 950, installed in 3 days, restored full independence. Interest-free financing over 36 months.",
    imagen: "/images/products/stairlifts/handicare-950/img-19.jpg",
    stats: [
      { labelEs: "Instalación", labelEn: "Installation", value: "3 días" },
      { labelEs: "Financiación", labelEn: "Financing", value: "36 meses" },
      { labelEs: "Sin obras", labelEn: "No building work", value: "✓" },
    ],
    destacadoEs: "Financiación sin intereses disponible.",
    destacadoEn: "Interest-free financing available.",
  },
  {
    id: "local-cadiz-plataforma",
    slug: "local-comercial-cadiz",
    tipo: "comercial",
    ciudad: "Cádiz",
    provincia: "Cádiz",
    year: 2024,
    productoEs: "Plataforma Salvaescaleras Logic",
    productoEn: "Logic Stairlift Platform",
    tituloEs: "Tienda con acceso para clientes en silla de ruedas — Cádiz",
    tituloEn: "Shop with wheelchair-accessible upper floor — Cádiz",
    descripcionEs: "Tienda de moda en el centro de Cádiz con la planta principal en primer piso y la ropa de temporada en planta baja. Los propietarios instalaron una plataforma Logic para que ningún cliente con silla de ruedas se quedase sin acceso a la colección completa.",
    descripcionEn: "A fashion boutique in central Cádiz with the main floor upstairs and seasonal stock downstairs. The owners installed a Logic platform so no wheelchair-using customer would miss access to the full collection.",
    imagen: "/images/products/platforms/logic/img-11.jpg",
    stats: [
      { labelEs: "Anchura útil", labelEn: "Useful width", value: "900 mm" },
      { labelEs: "Clientes impactados", labelEn: "Customers reached", value: "+200/mes" },
      { labelEs: "Normativa", labelEn: "Regulation", value: "Ley 1/1999" },
    ],
    destacadoEs: "Cumple Ley de Accesibilidad de Andalucía.",
    destacadoEn: "Complies with Andalucía Accessibility Law.",
  },
]

export function getProyectosByTipo(tipo: ProyectoTipo) {
  return proyectos.filter((p) => p.tipo === tipo)
}
