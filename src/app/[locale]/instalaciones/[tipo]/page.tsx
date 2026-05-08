import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";
import {
  getInstallationCategory,
  installationCategories,
  type InstallationType,
} from "@/lib/installations";

type Props = { params: Promise<{ locale: string; tipo: string }> };

export async function generateStaticParams() {
  return installationCategories.flatMap((cat) =>
    ["es", "en"].map((locale) => ({ locale, tipo: cat.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, tipo } = await params;
  const cat = getInstallationCategory(tipo);
  if (!cat) return {};

  return generateSEOMeta({
    title: `${locale === "es" ? cat.labelEs : cat.labelEn} — Solteva Elevación`,
    description:
      locale === "es" ? cat.descEs : cat.descEn,
    locale,
    path: `/instalaciones/${tipo}`,
  });
}

const BENEFIT_MAP: Record<
  InstallationType,
  { es: string[]; en: string[] }
> = {
  "organismos-publicos": {
    es: [
      "Cumplimiento normativa de accesibilidad",
      "Documentación técnica completa para expedientes",
      "Garantía CE e ISO",
      "Mantenimiento preventivo anual",
    ],
    en: [
      "Accessibility regulation compliance",
      "Complete technical documentation",
      "CE and ISO certified",
      "Annual preventive maintenance",
    ],
  },
  colegios: {
    es: [
      "Soluciones homologadas para entornos escolares",
      "Instalación sin interrumpir la actividad lectiva",
      "Fácil uso para alumnos y personal",
      "Mantenimiento y asistencia técnica propia",
    ],
    en: [
      "Approved solutions for school environments",
      "Installation without disrupting school activities",
      "Easy use for students and staff",
      "In-house maintenance and technical support",
    ],
  },
  hoteles: {
    es: [
      "Cumplimiento normativa hotelera de accesibilidad",
      "Diseño elegante que se integra en cualquier interior",
      "Operación silenciosa y sin vibraciones",
      "Contrato de mantenimiento preventivo",
    ],
    en: [
      "Hotel accessibility regulation compliance",
      "Elegant design that blends with any interior",
      "Silent and vibration-free operation",
      "Preventive maintenance contract",
    ],
  },
  "locales-comercios": {
    es: [
      "Soluciones compactas para espacios reducidos",
      "Instalación rápida con mínima afección al negocio",
      "Atractivo diseño que no resta imagen al local",
      "Mantenimiento y asistencia técnica en 24h",
    ],
    en: [
      "Compact solutions for small spaces",
      "Fast installation with minimal business disruption",
      "Attractive design that enhances the premises",
      "Maintenance and technical support in 24h",
    ],
  },
  "comunidades-vecinos": {
    es: [
      "La solución más demandada sin obras mayores",
      "Instalación en escaleras de hasta 5 plantas",
      "Pliegue automático para no obstaculizar la escalera",
      "Mantenimiento periódico incluido en contratos",
    ],
    en: [
      "The most requested solution without major building work",
      "Installation on staircases up to 5 floors",
      "Automatic folding to keep the staircase clear",
      "Periodic maintenance included in contracts",
    ],
  },
  "casas-particulares": {
    es: [
      "Adaptación perfecta a cualquier escalera del hogar",
      "Instalación en 3-5 días sin obras",
      "Modelos rectos, curvos e incluso para exterior",
      "Formación personalizada incluida en la instalación",
    ],
    en: [
      "Perfect adaptation to any home staircase",
      "Installation in 3-5 days without building work",
      "Straight, curved and outdoor models",
      "Personalised training included in installation",
    ],
  },
  "instalaciones-piscina": {
    es: [
      "Sin electricidad en el agua — máxima seguridad",
      "Instalación sobre el bordillo sin obras",
      "Resistente al cloro y agua salada",
      "Capacidad hasta 136 kg",
    ],
    en: [
      "No electricity in water — maximum safety",
      "Installation on pool edge without building work",
      "Resistant to chlorine and salt water",
      "Capacity up to 136 kg",
    ],
  },
};

export default async function InstalacionTipoPage({ params }: Props) {
  const { locale, tipo } = await params;
  const cat = getInstallationCategory(tipo);
  if (!cat) notFound();

  const t = await getTranslations({ locale, namespace: "installations" });
  const label = locale === "es" ? cat.labelEs : cat.labelEn;
  const desc = locale === "es" ? cat.descEs : cat.descEn;
  const benefits = BENEFIT_MAP[cat.slug as InstallationType];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-4" aria-label="breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-white">
                  {locale === "es" ? "Inicio" : "Home"}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/${locale}/instalaciones`} className="hover:text-white">
                  {t("title")}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{label}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{label}</h1>
          <p className="text-xl text-white/85 max-w-3xl">{desc}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-6">
                {locale === "es"
                  ? "¿Por qué elegir Solteva?"
                  : "Why choose Solteva?"}
              </h2>
              <ul className="space-y-4">
                {(locale === "es" ? benefits.es : benefits.en).map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="shrink-0 mt-0.5 text-[var(--success)]"
                      aria-hidden
                    />
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--warm-bg)] rounded-2xl p-8 space-y-5">
              <h3 className="font-display text-xl font-bold text-ink">
                {locale === "es"
                  ? "Solicita información"
                  : "Request information"}
              </h3>
              <p className="text-muted-foreground">
                {locale === "es"
                  ? "Cuéntanos tu proyecto y te respondemos en menos de 24 horas con un presupuesto sin compromiso."
                  : "Tell us about your project and we'll respond within 24 hours with a no-obligation quote."}
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/${locale}/contacto`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14"
                  )}
                >
                  {locale === "es" ? "Pedir presupuesto" : "Request quote"}
                </Link>
                <a
                  href="tel:+34900100133"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "font-bold h-14 gap-2"
                  )}
                >
                  <Phone size={18} aria-hidden />
                  900 100 133
                </a>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {locale === "es"
                  ? "Llamada gratuita · Lunes a viernes 8:30–14:30"
                  : "Free call · Monday to Friday 8:30–14:30"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="py-12 bg-[var(--warm-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink mb-6">
            {locale === "es" ? "Otros tipos de instalaciones" : "Other installation types"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {installationCategories
              .filter((c) => c.slug !== cat.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/instalaciones/${c.slug}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  {locale === "es" ? c.labelEs : c.labelEn}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
