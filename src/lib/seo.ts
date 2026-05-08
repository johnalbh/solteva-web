import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://solteva.com";

interface SEOMetaProps {
  title: string;
  description: string;
  locale: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

export function generateSEOMeta({
  title,
  description,
  locale,
  path,
  image,
  type = "website",
}: SEOMetaProps): Metadata {
  const url = `${BASE_URL}/${locale}${path}`;
  const ogImage = image || `${BASE_URL}/images/logos/logo_grupo_solteva.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${BASE_URL}/es${path}`,
        en: `${BASE_URL}/en${path}`,
        "x-default": `${BASE_URL}/es${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: locale === "es" ? "es_ES" : "en_GB",
      siteName: "Solteva Elevación",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function generateProductJsonLd(product: {
  nameEs: string;
  nameEn: string;
  shortDescEs: string;
  shortDescEn: string;
  fromPrice?: string;
  heroImage: string;
  slug: string;
  category: string;
}, locale: string) {
  const name = locale === "es" ? product.nameEs : product.nameEn;
  const description = locale === "es" ? product.shortDescEs : product.shortDescEn;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: `${BASE_URL}${product.heroImage}`,
    url: `${BASE_URL}/${locale}/productos/${product.category}/${product.slug}`,
    brand: { "@type": "Brand", name: "Solteva Elevación" },
    offers: product.fromPrice
      ? {
          "@type": "Offer",
          price: product.fromPrice.replace(/[^0-9.]/g, ""),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}

export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Solteva Elevación",
    description:
      "Líderes en España en sillas salvaescaleras, plataformas, elevadores verticales y grúas de piscina.",
    url: BASE_URL,
    telephone: "+34900100133",
    email: "info@soltevaelevacion.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle La Gitanilla 17, Nave 14",
      addressLocality: "Málaga",
      postalCode: "29004",
      addressCountry: "ES",
    },
    geo: { "@type": "GeoCoordinates", latitude: 36.7213028, longitude: -4.4216366 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "14:30",
      },
    ],
    areaServed: "España",
    priceRange: "€€",
  };
}
