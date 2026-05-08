import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, CreditCard, Users, Wrench, Settings, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return generateSEOMeta({
    title: t("companyTitle"),
    description: t("companyDesc"),
    locale,
    path: "/empresa",
  });
}

const STATS = [
  { value: "+15", labelEs: "años de experiencia", labelEn: "years of experience" },
  { value: "+6", labelEs: "delegaciones propias", labelEn: "own branches" },
  { value: "+20", labelEs: "provincias cubiertas", labelEn: "provinces covered" },
  { value: "100%", labelEs: "clientes satisfechos", labelEn: "satisfied clients" },
];

const SERVICES = [
  {
    key: "financing",
    Icon: CreditCard,
  },
  {
    key: "consultation",
    Icon: Users,
  },
  {
    key: "installation",
    Icon: Wrench,
  },
  {
    key: "maintenance",
    Icon: Settings,
  },
] as const;

const BRANDS = [
  "HANDICARE", "MINIVATOR", "FREELIFT", "EP", "THYSSEN", "KRUPP",
  "EXTREMA", "ACORN", "BISON", "VIMEC", "HIROLIFT", "LIFTUP",
];

export default async function EmpresaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  const tHome = await getTranslations({ locale, namespace: "home.cta" });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-white/85 leading-relaxed">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[var(--accent)] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.value}>
                <p className="font-display text-4xl font-bold text-white">{s.value}</p>
                <p className="text-white/90 text-sm mt-1">
                  {locale === "es" ? s.labelEs : s.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + image */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-6">
                {t("about.title")}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <p>{t("about.p3")}</p>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  locale === "es"
                    ? "Distribuidores autorizados de las mejores marcas"
                    : "Authorised distributors of the best brands",
                  locale === "es"
                    ? "Productos certificados CE e ISO"
                    : "CE and ISO certified products",
                  locale === "es"
                    ? "Técnicos con más de 15 años de experiencia"
                    : "Technicians with over 15 years' experience",
                  locale === "es"
                    ? "Financiación a medida desde 38,91 €/mes"
                    : "Tailored financing from €38.91/month",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={20} className="shrink-0 text-[var(--success)]" aria-hidden />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/corporate/oficina_solteva.jpg"
                alt="Oficina central Solteva Elevación"
                width={600}
                height={450}
                className="object-cover w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20 bg-[var(--warm-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink">
              {t("services.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ key, Icon }) => (
              <div
                key={key}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-[var(--primary)]" aria-hidden />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t(`services.${key}.title` as never)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`services.${key}.desc` as never)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet image */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/corporate/vehiculos_solteva.jpg"
                alt="Flota de vehículos Solteva Elevación"
                width={600}
                height={400}
                className="object-cover w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-ink mb-4">
                {locale === "es"
                  ? "Equipo técnico propio"
                  : "Our own technical team"}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                {locale === "es"
                  ? "Contamos con una flota de vehículos equipados y técnicos especializados que cubren más de 20 provincias. Toda la instalación y el mantenimiento los realizamos nosotros directamente, sin subcontratas."
                  : "We have a fleet of equipped vehicles and specialist technicians covering over 20 provinces. All installation and maintenance is carried out directly by us, with no subcontractors."}
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                {t("coverage.title")}: {t("coverage.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-[var(--warm-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink mb-8">
            {locale === "es"
              ? "Distribuidores oficiales de las mejores marcas"
              : "Official distributors of the best brands"}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {BRANDS.map((brand) => (
              <span
                key={brand}
                className="px-4 py-2 rounded-full bg-white border border-border text-sm font-semibold text-muted-foreground shadow-sm"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            {tHome("title")}
          </h2>
          <p className="text-white/80 text-lg mb-8">{tHome("subtitle")}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/contacto`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 px-8"
              )}
            >
              {tHome("quote")}
            </Link>
            <a
              href="tel:+34900100133"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/50 text-white hover:bg-white/10 hover:text-white font-bold h-14 px-8 bg-transparent"
              )}
            >
              <Phone size={18} className="mr-2" aria-hidden />
              900 100 133
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
