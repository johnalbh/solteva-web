import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";
import CTABanner from "@/components/shared/CTABanner";
import SectionHeader from "@/components/shared/SectionHeader";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Rampas de Accesibilidad — Obra y Portátiles | Solteva"
        : "Accessibility Ramps — Fixed and Portable | Solteva",
    description:
      locale === "es"
        ? "Rampas de obra y rampas portátiles para eliminar barreras arquitectónicas. Instalación sin obras mayores. Presupuesto gratuito. 900 100 133."
        : "Fixed and portable accessibility ramps to eliminate architectural barriers. No major construction. Free quote. 900 100 133.",
    locale,
    path: "/productos/rampas",
  });
}

const RAMP_TYPES = [
  {
    keyEs: "obra",
    keyEn: "fixed",
    nameEs: "Rampas de Obra",
    nameEn: "Fixed Construction Ramps",
    descEs:
      "Rampas fijas construidas in situ para eliminar desniveles permanentes en portales, accesos y patios. Se fabrican en aluminio de alta resistencia o acero galvanizado y se anclan al suelo con fijaciones duraderas.",
    descEn:
      "Fixed ramps built on-site to permanently eliminate level differences at entrances, access points and courtyards. Made from high-strength aluminium or galvanised steel, anchored to the floor with durable fixings.",
    featuresEs: [
      "Antideslizante certificado",
      "Carga máxima 300-500 kg según modelo",
      "Pendiente adaptada a normativa",
      "Sin mantenimiento especial",
      "Acabado en aluminio o galvanizado",
    ],
    featuresEn: [
      "Certified non-slip surface",
      "Maximum load 300-500 kg depending on model",
      "Gradient compliant with regulations",
      "No special maintenance",
      "Aluminium or galvanised steel finish",
    ],
    image: "/images/products/stairlifts/handicare-950/img-1.jpg",
  },
  {
    keyEs: "portatil",
    keyEn: "portable",
    nameEs: "Rampas Portátiles",
    nameEn: "Portable Ramps",
    descEs:
      "Solución flexible para superar desniveles temporales o en viviendas de alquiler. Disponibles en aluminio plegable y telescópico. Se colocan y retiran sin herramientas ni obras.",
    descEn:
      "Flexible solution for temporary level changes or rented properties. Available in folding and telescopic aluminium. Placed and removed without tools or construction work.",
    featuresEs: [
      "Sin instalación: se coloca directamente",
      "Plegable y fácil de transportar",
      "Varios largos: 60, 90, 120, 150, 180, 213 cm",
      "Carga máxima hasta 272 kg",
      "Homologadas para sillas de ruedas manuales y eléctricas",
    ],
    featuresEn: [
      "No installation: place directly in position",
      "Foldable and easy to transport",
      "Various lengths: 60, 90, 120, 150, 180, 213 cm",
      "Maximum load up to 272 kg",
      "Approved for manual and electric wheelchairs",
    ],
    image: "/images/products/platforms/slim/img-1.jpg",
  },
];

export default async function RampassPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isEs ? "Rampas de Accesibilidad Solteva" : "Solteva Accessibility Ramps",
    description: isEs
      ? "Rampas de obra y portátiles para eliminar barreras arquitectónicas"
      : "Fixed and portable ramps to eliminate architectural barriers",
    brand: { "@type": "Brand", name: "Solteva Elevación" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Solteva Elevación" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-4" aria-label="breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                  {isEs ? "Inicio" : "Home"}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/${locale}/productos`} className="hover:text-white transition-colors">
                  {isEs ? "Productos" : "Products"}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{isEs ? "Rampas" : "Ramps"}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {isEs ? "Rampas de Accesibilidad" : "Accessibility Ramps"}
          </h1>
          <p className="text-xl text-white/85 max-w-3xl">
            {isEs
              ? "Eliminamos barreras arquitectónicas con rampas de obra fijas y rampas portátiles. La solución más rápida y económica para desniveles en portales, accesos y jardines."
              : "We eliminate architectural barriers with fixed construction ramps and portable ramps. The fastest, most economical solution for level changes at entrances, access points and gardens."}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href={`/${locale}/contacto`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 px-8"
              )}
            >
              {isEs ? "Solicitar presupuesto" : "Request a quote"}
            </Link>
            <a
              href="tel:+34900100133"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white text-white hover:bg-white hover:text-[var(--primary)] font-bold h-14 px-8"
              )}
            >
              <Phone size={18} className="mr-2" aria-hidden />
              900 100 133
            </a>
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isEs ? "Tipos de rampas" : "Types of ramps"}
            subtitle={
              isEs
                ? "Asesoramos sin compromiso sobre qué tipo se adapta mejor a cada situación."
                : "We advise free of charge on which type best suits each situation."
            }
            centered
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {RAMP_TYPES.map((ramp) => {
              const name = isEs ? ramp.nameEs : ramp.nameEn;
              const desc = isEs ? ramp.descEs : ramp.descEn;
              const features = isEs ? ramp.featuresEs : ramp.featuresEn;
              return (
                <div
                  key={ramp.keyEs}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <Image
                      src={ramp.image}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-3">
                      {name}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{desc}</p>
                    <ul className="space-y-2">
                      {features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle
                            size={16}
                            className="text-[var(--success)] mt-0.5 shrink-0"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* When to choose */}
      <section className="py-20 bg-[var(--warm-bg)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={isEs ? "¿Cuándo conviene cada opción?" : "When is each option the right choice?"}
            centered
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {(isEs
              ? [
                  {
                    title: "Elige rampa de obra si…",
                    items: [
                      "El desnivel es permanente y no va a cambiar",
                      "Es un acceso muy transitado (portal, garaje)",
                      "Necesitas máxima estabilidad y durabilidad",
                      "La vivienda es en propiedad",
                    ],
                  },
                  {
                    title: "Elige rampa portátil si…",
                    items: [
                      "La situación es temporal o puede cambiar",
                      "La vivienda es de alquiler",
                      "Necesitas transportarla (visitas, viajes)",
                      "El desnivel es pequeño (5-15 cm)",
                    ],
                  },
                ]
              : [
                  {
                    title: "Choose a fixed ramp if…",
                    items: [
                      "The level difference is permanent and will not change",
                      "It is a heavily trafficked access point (entrance, garage)",
                      "You need maximum stability and durability",
                      "The property is owner-occupied",
                    ],
                  },
                  {
                    title: "Choose a portable ramp if…",
                    items: [
                      "The situation is temporary or may change",
                      "The property is rented",
                      "You need to transport it (visits, travel)",
                      "The level difference is small (5-15 cm)",
                    ],
                  },
                ]
            ).map((col) => (
              <div key={col.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-display font-semibold text-[var(--primary)] mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <ChevronRight size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={
          isEs
            ? "Presupuesto gratuito para tu rampa"
            : "Free quote for your ramp"
        }
        subtitle={
          isEs
            ? "Visita técnica gratuita · Instalación rápida · Sin obras mayores"
            : "Free technical visit · Fast installation · No major construction"
        }
        quoteLabel={isEs ? "Solicitar presupuesto" : "Request a quote"}
        callLabel="900 100 133"
        quoteHref={`/${locale}/contacto`}
      />
    </>
  );
}
