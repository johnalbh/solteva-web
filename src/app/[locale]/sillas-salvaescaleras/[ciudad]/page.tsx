import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  ChevronRight,
  Star,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cities, getCityData } from "@/lib/cities";
import { delegaciones } from "@/lib/delegaciones";
import { products } from "@/lib/products";
import { generateSEOMeta } from "@/lib/seo";
import SectionHeader from "@/components/shared/SectionHeader";
import CTABanner from "@/components/shared/CTABanner";

type Props = {
  params: Promise<{ locale: string; ciudad: string }>;
};

export async function generateStaticParams() {
  return cities.flatMap((city) =>
    ["es", "en"].map((locale) => ({ locale, ciudad: city.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, ciudad } = await params;
  const city = getCityData(ciudad);
  if (!city) return {};

  const title =
    locale === "es"
      ? `${city.h1Es} | Solteva Elevación`
      : `${city.h1En} | Solteva Elevación`;
  const description = locale === "es" ? city.descEs : city.descEn;

  return generateSEOMeta({
    title,
    description,
    locale,
    path: `/sillas-salvaescaleras/${ciudad}`,
  });
}

const STAIRLIFT_PRODUCTS = products.filter((p) => p.category === "stairlifts");

const LOCAL_FAQS_ES = (cityName: string) => [
  {
    q: `¿Cuánto tiempo tarda la instalación de una silla salvaescaleras en ${cityName}?`,
    a: `En ${cityName} y alrededores, el plazo habitual de instalación es de 3 a 5 días laborables desde la visita técnica gratuita. Las sillas rectas suelen instalarse en una sola jornada. Para escaleras curvas el plazo puede ser algo mayor al fabricarse el raíl a medida.`,
  },
  {
    q: `¿Hay alguna subvención para sillas salvaescaleras en ${cityName}?`,
    a: `Existen varias vías de ayuda: el Plan Renove de accesibilidad de la Junta de Andalucía (si ${cityName} está en Andalucía), subvenciones municipales de dependencia y la deducción en el IRPF por obras de accesibilidad. Nuestro equipo te asesorará sin coste sobre las ayudas disponibles en tu municipio.`,
  },
  {
    q: `¿Qué modelos de silla salvaescaleras son compatibles con escaleras en ${cityName}?`,
    a: `Dependemos del tipo de escalera: recta, curva o exterior. Distribuimos marcas líderes como Handicare, Minivator y Freelift. Tras una visita gratuita, nuestro técnico determina el modelo idóneo para la escalera específica de tu domicilio en ${cityName}.`,
  },
  {
    q: `¿Cuánto cuesta una silla salvaescaleras en ${cityName}?`,
    a: `El precio depende del modelo y del tipo de escalera. Las sillas rectas parten desde aproximadamente 2.490 €, mientras que las curvas personalizadas pueden superar los 5.000 €. Ofrecemos financiación desde 38,91 €/mes. La visita y el presupuesto son completamente gratuitos y sin compromiso.`,
  },
  {
    q: `¿Tienen servicio técnico y mantenimiento en ${cityName}?`,
    a: `Sí. Contamos con técnicos propios que cubren ${cityName} y su zona. El mantenimiento anual incluye revisión completa, lubricación, ajuste de tensores y verificación de seguridades. Respuesta en menos de 24 horas para avisos de avería.`,
  },
];

const LOCAL_FAQS_EN = (cityName: string) => [
  {
    q: `How long does stairlift installation take in ${cityName}?`,
    a: `In ${cityName} and surroundings, the typical installation time is 3 to 5 working days from the free technical visit. Straight stairlifts are usually installed in a single day. For curved stairlifts the timeline may be slightly longer as the rail is custom-made.`,
  },
  {
    q: `Are there grants or subsidies for stairlifts in ${cityName}?`,
    a: `There are several routes: the Junta de Andalucía accessibility renovation scheme, local council care and dependency grants, and the IRPF tax deduction for accessibility works. Our team will advise you free of charge on the aid available in your area.`,
  },
  {
    q: `Which stairlift models work on staircases in ${cityName}?`,
    a: `It depends on your staircase type: straight, curved or outdoor. We distribute leading brands including Handicare, Minivator and Freelift. After a free visit, our technician determines the ideal model for the specific staircase in your ${cityName} home.`,
  },
  {
    q: `How much does a stairlift cost in ${cityName}?`,
    a: `The price depends on the model and staircase type. Straight stairlifts start from approximately €2,490, while bespoke curved models can exceed €5,000. We offer financing from €38.91/month. The visit and quote are completely free with no obligation.`,
  },
  {
    q: `Do you have technicians and maintenance service in ${cityName}?`,
    a: `Yes. We have in-house technicians covering ${cityName} and the surrounding area. Annual maintenance includes a full inspection, lubrication, tensioner adjustment and safety checks. We respond to breakdown calls within 24 hours.`,
  },
];

export default async function CityLandingPage({ params }: Props) {
  const { locale, ciudad } = await params;
  const city = getCityData(ciudad);
  if (!city) notFound();

  const cityName = locale === "es" ? city.nameEs : city.nameEn;
  const provinceName = locale === "es" ? city.provinceEs : city.provinceEn;
  const h1 = locale === "es" ? city.h1Es : city.h1En;
  const desc = locale === "es" ? city.descEs : city.descEn;
  const phone = city.phone || "900 100 133";

  const nearestDelegacion = city.delegacionId
    ? delegaciones.find((d) => d.id === city.delegacionId)
    : null;

  const faqs = locale === "es" ? LOCAL_FAQS_ES(cityName) : LOCAL_FAQS_EN(cityName);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://solteva.com/${locale}/sillas-salvaescaleras/${ciudad}`,
    name: "Solteva Elevación",
    description: desc,
    url: `https://solteva.com/${locale}/sillas-salvaescaleras/${ciudad}`,
    telephone: phone,
    email: "[email protected]",
    areaServed: {
      "@type": "City",
      name: cityName,
    },
    address: nearestDelegacion
      ? {
          "@type": "PostalAddress",
          streetAddress: nearestDelegacion.address,
          addressLocality: nearestDelegacion.city,
          postalCode: nearestDelegacion.postalCode,
          addressRegion: nearestDelegacion.province,
          addressCountry: "ES",
        }
      : {
          "@type": "PostalAddress",
          streetAddress: "Calle La Gitanilla, 17 – Nave 14",
          addressLocality: "Málaga",
          postalCode: "29004",
          addressRegion: "Málaga",
          addressCountry: "ES",
        },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "14:30",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "es" ? "Sillas Salvaescaleras" : "Stairlifts",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--primary)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-white/60 text-sm mb-6"
            >
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {locale === "es" ? "Inicio" : "Home"}
              </Link>
              <ChevronRight size={14} />
              <Link
                href={`/${locale}/productos/sillas-salvaescaleras`}
                className="hover:text-white transition-colors"
              >
                {locale === "es" ? "Sillas Salvaescaleras" : "Stairlifts"}
              </Link>
              <ChevronRight size={14} />
              <span className="text-white">{cityName}</span>
            </nav>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {h1}
            </h1>
            <p className="text-white/85 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl">
              {desc}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                locale === "es" ? "Visita gratis 24h" : "Free visit 24h",
                locale === "es" ? "Sin obras" : "No building works",
                locale === "es" ? "Instalación 3-5 días" : "3-5 day installation",
                locale === "es" ? "Garantía CE" : "CE warranty",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium"
                >
                  <CheckCircle size={14} className="text-[var(--success)]" />
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/contacto`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 text-base px-8 shadow-lg"
                )}
              >
                {locale === "es"
                  ? "Solicitar presupuesto gratuito"
                  : "Request a free quote"}
              </Link>
              <a
                href={`tel:+34${phone.replace(/\s/g, "")}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white text-white hover:bg-white hover:text-[var(--primary)] h-14 text-base px-8 font-bold"
                )}
              >
                <Phone size={18} className="mr-2" aria-hidden />
                {phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nearest branch info (if delegation exists) */}
      {nearestDelegacion && (
        <section className="bg-[var(--warm-bg)] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--ink)] text-sm">
                    {locale === "es"
                      ? `Delegación más cercana: ${nearestDelegacion.name}`
                      : `Nearest branch: ${nearestDelegacion.nameEn}`}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {nearestDelegacion.address}, {nearestDelegacion.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--primary)] shrink-0" />
                <a
                  href={`tel:+34${nearestDelegacion.phones[0].replace(/\s/g, "")}`}
                  className="font-bold text-[var(--primary)] hover:underline"
                >
                  {nearestDelegacion.phones[0]}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-[var(--primary)] shrink-0" />
                <p className="text-slate-600 text-sm">
                  {locale === "es"
                    ? "Lunes a viernes · 8:30–14:30h"
                    : "Monday to Friday · 8:30–14:30"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={
              locale === "es"
                ? `Modelos disponibles en ${cityName}`
                : `Models available in ${cityName}`
            }
            subtitle={
              locale === "es"
                ? "Todos los modelos se instalan sin obras, en 3-5 días laborables."
                : "All models installed without building works, in 3-5 working days."
            }
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {STAIRLIFT_PRODUCTS.map((product) => {
              const name =
                locale === "es" ? product.nameEs : product.nameEn;
              const shortDesc =
                locale === "es" ? product.shortDescEs : product.shortDescEn;
              return (
                <Link
                  key={product.slug}
                  href={`/${locale}/productos/sillas-salvaescaleras/${product.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-[var(--primary)] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <Image
                      src={product.heroImage}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display font-semibold text-[var(--ink)] text-base leading-snug mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed flex-1">
                      {shortDesc}
                    </p>
                    <span className="mt-4 text-[var(--primary)] text-sm font-semibold flex items-center gap-1">
                      {locale === "es" ? "Ver detalles" : "View details"}
                      <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Solteva */}
      <section className="py-20 bg-[var(--warm-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={
              locale === "es"
                ? `¿Por qué elegir Solteva en ${cityName}?`
                : `Why choose Solteva in ${cityName}?`
            }
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {(locale === "es"
              ? [
                  {
                    icon: <Clock size={24} className="text-[var(--primary)]" />,
                    title: "Visita gratuita en 24 horas",
                    text: `Un técnico especializado visita tu domicilio en ${cityName} sin coste y sin compromiso. Evaluamos tu escalera y recomendamos el modelo idóneo.`,
                  },
                  {
                    icon: <ShieldCheck size={24} className="text-[var(--primary)]" />,
                    title: "Instalación sin obras",
                    text: "Nuestras sillas salvaescaleras se instalan sin taladrar paredes ni reformas. El raíl se fija a los peldaños. Tu hogar queda intacto.",
                  },
                  {
                    icon: <CheckCircle size={24} className="text-[var(--primary)]" />,
                    title: "+15 años de experiencia",
                    text: "Más de 15 años instalando sillas salvaescaleras en Andalucía y resto de España. Técnicos propios certificados por los fabricantes.",
                  },
                  {
                    icon: <Star size={24} className="text-[var(--primary)]" />,
                    title: "Marcas líderes mundiales",
                    text: "Distribuimos Handicare, Minivator, Freelift, Thyssen y otras marcas de primer nivel con certificación CE y garantía de fábrica.",
                  },
                  {
                    icon: <Phone size={24} className="text-[var(--primary)]" />,
                    title: "Servicio técnico propio",
                    text: `Soporte posventa y mantenimiento en ${cityName} con técnicos propios. Asistencia en avería en menos de 24 horas.`,
                  },
                  {
                    icon: <MapPin size={24} className="text-[var(--primary)]" />,
                    title: `Cobertura en ${provinceName}`,
                    text: `Cubrimos toda la provincia de ${provinceName} con técnicos locales. Conocemos las escaleras típicas de la zona y los requisitos municipales.`,
                  },
                ]
              : [
                  {
                    icon: <Clock size={24} className="text-[var(--primary)]" />,
                    title: "Free visit within 24 hours",
                    text: `A specialist technician visits your home in ${cityName} free of charge and with no obligation. We assess your staircase and recommend the ideal model.`,
                  },
                  {
                    icon: <ShieldCheck size={24} className="text-[var(--primary)]" />,
                    title: "No building works required",
                    text: "Our stairlifts are installed without drilling walls or any renovation. The rail attaches to the steps. Your home remains untouched.",
                  },
                  {
                    icon: <CheckCircle size={24} className="text-[var(--primary)]" />,
                    title: "15+ years' experience",
                    text: "Over 15 years installing stairlifts across Andalusia and the rest of Spain. In-house technicians certified by manufacturers.",
                  },
                  {
                    icon: <Star size={24} className="text-[var(--primary)]" />,
                    title: "World-leading brands",
                    text: "We distribute Handicare, Minivator, Freelift, Thyssen and other top brands with CE certification and factory warranty.",
                  },
                  {
                    icon: <Phone size={24} className="text-[var(--primary)]" />,
                    title: "In-house technical service",
                    text: `After-sales support and maintenance in ${cityName} with our own technicians. Breakdown assistance within 24 hours.`,
                  },
                  {
                    icon: <MapPin size={24} className="text-[var(--primary)]" />,
                    title: `Coverage across ${provinceName}`,
                    text: `We cover the entire province of ${provinceName} with local technicians who know typical local staircases and municipal requirements.`,
                  },
                ]
            ).map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-display font-semibold text-[var(--ink)] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={
              locale === "es"
                ? `Preguntas frecuentes — ${cityName}`
                : `Frequently asked questions — ${cityName}`
            }
            centered
          />
          <div className="mt-12 divide-y divide-slate-200">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-5 cursor-pointer list-none">
                <summary className="flex items-start justify-between gap-4 font-semibold text-[var(--ink)] text-base select-none">
                  <span>{faq.q}</span>
                  <ChevronRight
                    size={18}
                    className="text-[var(--primary)] shrink-0 mt-0.5 group-open:rotate-90 transition-transform duration-200"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title={
          locale === "es"
            ? `¿Listo para recuperar tu independencia en ${cityName}?`
            : `Ready to regain your independence in ${cityName}?`
        }
        subtitle={
          locale === "es"
            ? "Visita gratuita en 24 horas · Presupuesto sin compromiso · Instalación en 3-5 días"
            : "Free visit within 24 hours · No-obligation quote · Installation in 3-5 days"
        }
        quoteLabel={locale === "es" ? "Solicitar presupuesto gratis" : "Request a free quote"}
        callLabel="900 100 133"
        quoteHref={`/${locale}/contacto`}
      />
    </>
  );
}
