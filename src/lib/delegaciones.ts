export interface Delegacion {
  id: string
  name: string
  nameEn: string
  address: string
  city: string
  postalCode: string
  province: string
  lat: number
  lng: number
  phones: string[]
  email: string
  coverageEs: string
  coverageEn: string
}

export const delegaciones: Delegacion[] = [
  {
    id: "malaga",
    name: "Solteva Málaga",
    nameEn: "Solteva Málaga",
    address: "Calle La Gitanilla, 17 – Nave 14",
    city: "Málaga",
    postalCode: "29004",
    province: "Málaga",
    lat: 36.7213,
    lng: -4.4214,
    phones: ["952 197 636", "605 037 606"],
    email: "[email protected]",
    coverageEs: "Málaga capital, Costa del Sol Este y Axarquía",
    coverageEn: "Málaga city, Costa del Sol East and Axarquía",
  },
  {
    id: "mijas",
    name: "Solteva Mijas",
    nameEn: "Solteva Mijas",
    address: "C/ Archidona, P.I. La Vega, Nave 7C",
    city: "Mijas",
    postalCode: "29651",
    province: "Málaga",
    lat: 36.5967,
    lng: -4.6365,
    phones: ["952 197 636", "628 342 179"],
    email: "[email protected]",
    coverageEs: "Mijas, Fuengirola, Marbella, Torremolinos, Benalmádena, Costa del Sol Oeste",
    coverageEn: "Mijas, Fuengirola, Marbella, Torremolinos, Benalmádena, Costa del Sol West",
  },
  {
    id: "cartama",
    name: "Solteva Cártama",
    nameEn: "Solteva Cártama",
    address: "Calle Juan Carlos I, 83",
    city: "Cártama",
    postalCode: "29570",
    province: "Málaga",
    lat: 36.7167,
    lng: -4.6333,
    phones: ["952 42 85 27", "628 342 179"],
    email: "[email protected]",
    coverageEs: "Cártama, Álora, Valle del Guadalhorce, Comarca de Antequera",
    coverageEn: "Cártama, Álora, Guadalhorce Valley, Antequera Region",
  },
  {
    id: "manilva",
    name: "Solteva Manilva",
    nameEn: "Solteva Manilva",
    address: "C/ Mar, Local 7B",
    city: "Manilva",
    postalCode: "29691",
    province: "Málaga",
    lat: 36.376,
    lng: -5.242,
    phones: ["952 892 808", "695 870 902"],
    email: "[email protected]",
    coverageEs: "Manilva, Estepona, Casares, Gibraltar, Campo de Gibraltar",
    coverageEn: "Manilva, Estepona, Casares, Gibraltar, Campo de Gibraltar",
  },
  {
    id: "jaen",
    name: "Solteva Jaén",
    nameEn: "Solteva Jaén",
    address: "Calle Millán de Priego, 77",
    city: "Jaén",
    postalCode: "23007",
    province: "Jaén",
    lat: 37.7796,
    lng: -3.7849,
    phones: ["953 05 57 68", "628 342 179"],
    email: "[email protected]",
    coverageEs: "Jaén provincia: Jaén capital, Úbeda, Baeza, Linares, Alcalá la Real",
    coverageEn: "Jaén province: Jaén city, Úbeda, Baeza, Linares, Alcalá la Real",
  },
  {
    id: "cordoba",
    name: "Solteva Córdoba",
    nameEn: "Solteva Córdoba",
    address: "Calle Platero Pedro de Bares, 32",
    city: "Córdoba",
    postalCode: "14007",
    province: "Córdoba",
    lat: 37.8882,
    lng: -4.7794,
    phones: ["900 100 133", "628 342 179"],
    email: "[email protected]",
    coverageEs: "Córdoba provincia: Córdoba capital, Lucena, Montilla, Priego de Córdoba",
    coverageEn: "Córdoba province: Córdoba city, Lucena, Montilla, Priego de Córdoba",
  },
]

export const centralContact = {
  phone: "900 100 133",
  phoneMobile: "628 342 179",
  email: "[email protected]",
  whatsapp: "+34628342179",
  scheduleEs: "Lunes a viernes, 8:30 - 14:30h",
  scheduleEn: "Monday to Friday, 8:30 - 14:30h",
}

export const coverageProvinces = [
  "Málaga",
  "Sevilla",
  "Córdoba",
  "Jaén",
  "Huelva",
  "Almería",
  "Cádiz",
  "Granada",
  "Gibraltar",
  "Murcia",
  "Alicante",
  "Valencia",
  "Albacete",
  "Cuenca",
  "Toledo",
  "Ciudad Real",
  "Badajoz",
  "Cáceres",
  "Salamanca",
  "Ávila",
  "Segovia",
  "Guadalajara",
  "Madrid",
]
