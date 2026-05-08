import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ProductCategoryGrid from "@/components/home/ProductCategoryGrid";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import TrustStrip from "@/components/home/TrustStrip";
import BrandsCarousel from "@/components/home/BrandsCarousel";
import FAQAccordion from "@/components/home/FAQAccordion";
import QuickQuoteForm from "@/components/home/QuickQuoteForm";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import FinancingCalculator from "@/components/home/FinancingCalculator";
import ProductConfigurator from "@/components/home/ProductConfigurator";
import ProyectosTeaser from "@/components/home/ProyectosTeaser";
import ServiciosStrip from "@/components/home/ServiciosStrip";
import ProductFinder from "@/components/home/ProductFinder";
import FadeIn from "@/components/shared/FadeIn";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      locale: locale === "es" ? "es_ES" : "en_GB",
      type: "website",
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      {/* 1. Hero — full viewport, cinematic */}
      <Hero locale={locale} />

      {/* 2. Product finder — interactive wizard */}
      <section className="section-py-lg" style={{ background: "var(--surface-1)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <ProductFinder locale={locale} />
          </FadeIn>
        </div>
      </section>

      {/* 3. Product lineup — full catalogue */}
      <section className="section-py-lg" style={{ background: "var(--surface-2)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <ProductCategoryGrid locale={locale} />
          </FadeIn>
        </div>
      </section>

      {/* 4. Trust stats — dark section */}
      <FadeIn>
        <TrustStrip locale={locale} />
      </FadeIn>

      {/* 5. Process — white */}
      <section className="section-py-lg" style={{ background: "var(--surface-1)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <ProcessTimeline locale={locale} />
          </FadeIn>
        </div>
      </section>

      {/* 5. Proyectos — gray surface */}
      <section className="section-py-lg" style={{ background: "var(--surface-2)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <ProyectosTeaser locale={locale} />
          </FadeIn>
        </div>
      </section>

      {/* 6. Servicios — white */}
      <section className="section-py-lg" style={{ background: "var(--surface-1)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <ServiciosStrip locale={locale} />
          </FadeIn>
        </div>
      </section>

      {/* 7. Testimonials — gray */}
      <section className="section-py" style={{ background: "var(--surface-2)" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <TestimonialsCarousel
              locale={locale}
              title={t("testimonials.title")}
              subtitle={t("testimonials.subtitle")}
            />
          </FadeIn>
        </div>
      </section>

      {/* 8. Brands — white, minimal */}
      <section className="section-py" style={{ background: "var(--surface-1)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <BrandsCarousel />
          </FadeIn>
        </div>
      </section>

      {/* 9. FAQ — gray */}
      <section className="section-py" style={{ background: "var(--surface-2)" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <FAQAccordion />
          </FadeIn>
        </div>
      </section>

      {/* 10. Configurator + Quote — white */}
      <section className="section-py-lg" style={{ background: "var(--surface-1)" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <ProductConfigurator locale={locale} />
              <div
                className="rounded-3xl p-8 lg:p-10"
                style={{ background: "var(--surface-dark)" }}
              >
                <QuickQuoteForm locale={locale} light />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 11. Financing — dark */}
      <section
        className="section-py"
        style={{ background: "oklch(from var(--primary) calc(l * 0.85) calc(c * 0.7) h)" }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <FinancingCalculator locale={locale} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
