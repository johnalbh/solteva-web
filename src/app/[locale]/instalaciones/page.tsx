import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Building2, School, Hotel, Store, Home, Waves } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";
import { installationCategories } from "@/lib/installations";

type Props = { params: Promise<{ locale: string }> };

const ICONS: Record<string, React.ElementType> = {
  Building2,
  School,
  Hotel,
  Store,
  Apartment: Building2,
  Home,
  Waves,
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Instalaciones de Confianza — Solteva Elevación"
        : "Trusted Installations — Solteva Elevación",
    description:
      locale === "es"
        ? "Miles de instalaciones en organismos públicos, colegios, hoteles, comunidades de vecinos y casas particulares."
        : "Thousands of installations in public institutions, schools, hotels, residential communities and private homes.",
    locale,
    path: "/instalaciones",
  });
}

export default async function InstalacionesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "installations" });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-white/85">{t("subtitle")}</p>
        </div>
      </section>

      {/* Category cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {installationCategories.map((cat) => {
              const Icon = ICONS[cat.icon] || Building2;
              return (
                <Link
                  key={cat.slug}
                  href={`/${locale}/instalaciones/${cat.slug}`}
                  className="group bg-white rounded-2xl border border-border shadow-sm p-6 hover:shadow-lg transition-all hover:border-[var(--primary)]/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--primary)]/20 transition-colors">
                    <Icon
                      size={24}
                      className="text-[var(--primary)]"
                      aria-hidden
                    />
                  </div>
                  <h2 className="font-display text-xl font-bold text-ink mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {locale === "es" ? cat.labelEs : cat.labelEn}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {locale === "es" ? cat.descEs : cat.descEn}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[var(--primary)] font-semibold text-sm">
                    {locale === "es" ? "Ver instalaciones" : "View installations"}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--warm-bg)] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "+1.000", labelEs: "instalaciones realizadas", labelEn: "installations completed" },
              { value: "+20", labelEs: "provincias", labelEn: "provinces" },
              { value: "15+", labelEs: "años de experiencia", labelEn: "years of experience" },
              { value: "100%", labelEs: "clientes satisfechos", labelEn: "satisfied clients" },
            ].map((s) => (
              <div key={s.value}>
                <p className="font-display text-4xl font-bold text-[var(--primary)]">{s.value}</p>
                <p className="text-muted-foreground text-sm mt-1">
                  {locale === "es" ? s.labelEs : s.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            {locale === "es"
              ? "¿Necesitas una instalación?"
              : "Need an installation?"}
          </h2>
          <p className="text-white/80 mb-8">
            {locale === "es"
              ? "Visita gratuita en 24 horas. Presupuesto sin compromiso."
              : "Free visit in 24 hours. No-obligation quote."}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 px-8"
            )}
          >
            {locale === "es" ? "Pedir presupuesto gratis" : "Request free quote"}
          </Link>
        </div>
      </section>
    </div>
  );
}
