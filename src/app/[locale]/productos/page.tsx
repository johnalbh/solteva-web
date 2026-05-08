import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Stethoscope } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";
import { getProductsByCategory } from "@/lib/products";

type Props = { params: Promise<{ locale: string }> };

const CATEGORIES = [
  {
    key: "stairlifts" as const,
    slug: "sillas-salvaescaleras",
    heroImage: "/images/products/stairlifts/handicare-950/img-1.jpg",
    fallbackBg: "bg-blue-50",
    titleEs: "Sillas Salvaescaleras",
    titleEn: "Stairlifts",
    subtitleEs: "La forma más económica y rápida de resolver el problema de las escaleras. Disponibles para escaleras rectas, curvas e incluso exteriores.",
    subtitleEn: "The most affordable and fastest solution for any staircase. Available for straight, curved and outdoor staircases.",
  },
  {
    key: "platforms" as const,
    slug: "plataformas",
    heroImage: "/images/products/platforms/logic/img-1.jpg",
    fallbackBg: "bg-green-50",
    titleEs: "Plataformas Salvaescaleras",
    titleEn: "Platform Stairlifts",
    subtitleEs: "La solución para usuarios de silla de ruedas o con movilidad muy reducida. Mayor espacio y confort en cualquier tipo de escalera.",
    subtitleEn: "The solution for wheelchair users or those with very limited mobility. More space and comfort on any staircase.",
  },
  {
    key: "verticalLifts" as const,
    slug: "elevadores-verticales",
    heroImage: "/images/products/vertical-lifts/dizalo/img-1.jpg",
    fallbackBg: "bg-purple-50",
    titleEs: "Elevadores Verticales",
    titleEn: "Vertical Platform Lifts",
    subtitleEs: "La alternativa al ascensor tradicional. Sin obras, sin sala de máquinas. Instalación interior o exterior.",
    subtitleEn: "The alternative to a traditional lift. No building work, no machine room. Indoor or outdoor installation.",
  },
  {
    key: "poolLift" as const,
    slug: "grua-piscina",
    heroImage: "/images/products/pool-lift/se-p20/img-1.jpg",
    fallbackBg: "bg-cyan-50",
    titleEs: "Grúa de Piscina",
    titleEn: "Pool Hoist",
    subtitleEs: "Tu piscina sin barreras. Solución hidráulica para piscinas privadas y comunitarias. Instalación sobre el bordillo sin obras.",
    subtitleEn: "Your barrier-free pool. Hydraulic solution for private and communal pools. Installation on the pool edge without building work.",
  },
];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Productos — Sillas Salvaescaleras, Elevadores y Plataformas"
        : "Products — Stairlifts, Lifts and Platforms",
    description:
      locale === "es"
        ? t("hub.subtitle")
        : "Browse our full range of stairlifts, platform lifts, vertical lifts and pool hoists. Find your perfect accessibility solution.",
    locale,
    path: "/productos",
  });
}

export default async function ProductosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t("hub.title")}</h1>
          <p className="text-xl text-white/85">{t("hub.subtitle")}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {CATEGORIES.map(({ key, slug, heroImage, fallbackBg, titleEs, titleEn, subtitleEs, subtitleEn }) => {
              const count = getProductsByCategory(key).length;
              const title = locale === "es" ? titleEs : titleEn;
              const subtitle = locale === "es" ? subtitleEs : subtitleEn;
              return (
                <Link
                  key={key}
                  href={`/${locale}/productos/${slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all bg-white"
                >
                  <div className={cn("relative aspect-[16/9] overflow-hidden", fallbackBg)}>
                    <Image
                      src={heroImage}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2 className="font-display text-2xl font-bold text-ink group-hover:text-[var(--primary)] transition-colors">
                        {title}
                      </h2>
                      <span className="shrink-0 text-xs font-semibold text-muted-foreground bg-[var(--warm-bg)] px-3 py-1 rounded-full">
                        {count} {locale === "es" ? "modelos" : "models"}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{subtitle}</p>
                    <span className="inline-flex items-center gap-1.5 text-[var(--primary)] font-semibold text-sm">
                      {tCommon("learnMore")}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Solteva strip */}
      <section className="bg-[var(--warm-bg)] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stethoscope size={24} className="text-[var(--primary)]" aria-hidden />
            <h2 className="font-display text-2xl font-bold text-ink">
              {locale === "es"
                ? "¿Cuál es la mejor solución para ti?"
                : "Which solution is right for you?"}
            </h2>
          </div>
          <p className="text-muted-foreground text-lg mb-6">
            {locale === "es"
              ? "Llama al 900 100 133 (gratuito) y nuestro equipo te asesora en menos de 5 minutos."
              : "Call 900 100 133 (free) and our team will advise you in under 5 minutes."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+34900100133"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-bold h-14 px-8"
              )}
            >
              900 100 133
            </a>
            <Link
              href={`/${locale}/contacto`}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "font-bold h-14 px-8"
              )}
            >
              {locale === "es" ? "Pedir presupuesto" : "Request quote"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
