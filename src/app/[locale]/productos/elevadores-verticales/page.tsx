import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronRight, ImageOff, Shield, CreditCard } from "lucide-react";
import { generateSEOMeta } from "@/lib/seo";
import { getProductsByCategory } from "@/lib/products";
import SubsidiesStrip from "@/components/shared/SubsidiesStrip";
import FAQAccordion from "@/components/home/FAQAccordion";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Elevadores Verticales — Alternativa al Ascensor | Solteva"
        : "Vertical Platform Lifts — Lift Alternative | Solteva",
    description:
      locale === "es"
        ? "Elevadores verticales sin obras, sin sala de máquinas. La alternativa más económica al ascensor. Financiación disponible. Visita gratuita en 24h. 900 100 133."
        : "Vertical platform lifts, no construction, no machine room. Most economical lift alternative. Financing available. Free visit in 24h. 900 100 133.",
    locale,
    path: "/productos/elevadores-verticales",
  });
}

const LIFT_TYPES = [
  {
    tagEs: "Más compacto",
    tagEn: "Most compact",
    titleEs: "Corta altura (hasta 3 m)",
    titleEn: "Short rise (up to 3 m)",
    descEs: "Sin foso, sin sala de máquinas. Se instala en cualquier espacio interior. Ideal para salvar 1-2 escalones o alturas reducidas.",
    descEn: "No pit, no machine room. Installs in any indoor space. Ideal for 1-2 steps or reduced heights.",
    idealEs: "Ideal para: acceso entre plantas desfasadas, porches elevados, garajes.",
    idealEn: "Ideal for: split-level access, raised porches, garages.",
    color: "rgba(0,113,227,0.07)",
    textColor: "rgb(0,113,227)",
  },
  {
    tagEs: "Mayor capacidad",
    tagEn: "Higher capacity",
    titleEs: "Media-gran altura (3-12 m)",
    titleEn: "Medium-large rise (3-12 m)",
    descEs: "Para edificios de 2-4 plantas. Con foso mínimo o sin él. Alternativa económica al ascensor convencional.",
    descEn: "For 2-4 storey buildings. Minimal or no pit. Economic alternative to a conventional lift.",
    idealEs: "Ideal para: comunidades de propietarios, edificios sin ascensor, hoteles, colegios.",
    idealEn: "Ideal for: residential communities, buildings without a lift, hotels, schools.",
    color: "rgba(88,86,214,0.07)",
    textColor: "rgb(88,86,214)",
  },
];

export default async function ElevadoresVerticalesPage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const products = getProductsByCategory("verticalLifts");
  const es = locale === "es";

  return (
    <>
      {/* Breadcrumb */}
      <nav
        style={{ background: "rgb(245,245,247)", borderBottom: "1px solid rgb(232,232,237)" }}
        aria-label="breadcrumb"
      >
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12 py-3">
          <ol className="flex items-center gap-2" style={{ fontSize: "0.82rem", color: "rgb(110,110,115)" }}>
            <li><Link href={`/${locale}`} className="hover:text-ink transition-colors">{es ? "Inicio" : "Home"}</Link></li>
            <li aria-hidden>/</li>
            <li><Link href={`/${locale}/productos`} className="hover:text-ink transition-colors">{es ? "Productos" : "Products"}</Link></li>
            <li aria-hidden>/</li>
            <li className="text-ink font-medium">{es ? "Elevadores Verticales" : "Vertical Lifts"}</li>
          </ol>
        </div>
      </nav>

      {/* Hero header */}
      <section className="section-py">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="eyebrow mb-3">{es ? "Alternativa al ascensor" : "Lift alternative"}</p>
          <h1
            className="text-ink mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, letterSpacing: "-0.022em", maxWidth: "22ch" }}
          >
            {es ? "Elevadores Verticales" : "Vertical Platform Lifts"}
          </h1>
          <p
            className="text-ink-secondary mb-6"
            style={{ fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em", maxWidth: "52ch" }}
          >
            {es
              ? "Sin obras, sin sala de máquinas. La alternativa más económica al ascensor para edificios de 2-4 plantas."
              : "No construction, no machine room. The most economical lift alternative for 2-4 storey buildings."}
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { iconEl: <Shield size={13} aria-hidden />, textEs: "Garantía 2 años", textEn: "2-year warranty" },
              { iconEl: <CreditCard size={13} aria-hidden />, textEs: "Financiación disponible", textEn: "Financing available" },
            ].map((badge) => (
              <span
                key={badge.textEs}
                className="inline-flex items-center gap-1.5"
                style={{
                  fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.02em",
                  color: "var(--cta-blue)", background: "rgba(0,113,227,0.08)",
                  borderRadius: 980, padding: "5px 12px",
                }}
              >
                {badge.iconEl}
                {es ? badge.textEs : badge.textEn}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-py" style={{ background: "rgb(245,245,247)" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
            {products.map((product) => {
              const name = es ? product.nameEs : product.nameEn;
              const desc = es ? product.shortDescEs : product.shortDescEn;
              const hasImage = Boolean(product.heroImage);

              return (
                <Link
                  key={product.id}
                  href={`/${locale}/productos/elevadores-verticales/${product.slug}`}
                  className="group flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.009]"
                  style={{ background: "#fff", borderRadius: "var(--corner-radius)" }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 240, borderRadius: "var(--corner-radius) var(--corner-radius) 0 0" }}
                  >
                    {hasImage ? (
                      <Image
                        src={product.heroImage}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: "rgb(232,240,251)" }}>
                        <ImageOff size={36} style={{ color: "rgb(134,134,139)" }} aria-hidden />
                        <p style={{ fontSize: "0.8rem", color: "rgb(134,134,139)" }}>
                          {es ? "Imágenes disponibles al solicitar" : "Images available on request"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h2
                      className="text-ink font-semibold mb-2"
                      style={{ fontSize: "1.05rem", letterSpacing: "-0.018em", lineHeight: 1.2 }}
                    >
                      {name}
                    </h2>
                    <p
                      className="text-ink-secondary mb-5"
                      style={{ fontSize: "0.9rem", lineHeight: 1.47, letterSpacing: "-0.01em" }}
                    >
                      {desc}
                    </p>
                    <span className="link-more mt-auto" style={{ fontSize: "0.9rem" }}>
                      {tCommon("learnMore")} <ChevronRight size={14} aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Height segmentation */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">{es ? "Elige tu solución" : "Choose your solution"}</p>
            <h2
              className="text-ink"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              {es ? "¿Cuántas plantas necesitas salvar?" : "How many floors do you need to cover?"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16, maxWidth: 740, margin: "0 auto" }}>
            {LIFT_TYPES.map((type) => (
              <div
                key={type.titleEs}
                style={{ borderRadius: 20, padding: "28px 24px", background: type.color }}
              >
                <span
                  style={{
                    display: "inline-block", fontSize: "0.72rem", fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: type.textColor, marginBottom: 12,
                  }}
                >
                  {es ? type.tagEs : type.tagEn}
                </span>
                <h3
                  style={{
                    fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.018em",
                    color: "rgb(29,29,31)", marginBottom: 10,
                  }}
                >
                  {es ? type.titleEs : type.titleEn}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.55, color: "rgb(110,110,115)", marginBottom: 12 }}>
                  {es ? type.descEs : type.descEn}
                </p>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.4, color: type.textColor, fontWeight: 500 }}>
                  {es ? type.idealEs : type.idealEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing banner */}
      <section style={{ background: "rgb(245,245,247)" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12 py-8">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{ background: "#fff", borderRadius: 20, padding: "24px 32px", border: "1.5px solid rgb(232,232,237)" }}
          >
            <div className="flex items-center gap-4">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(0,113,227,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CreditCard size={22} style={{ color: "var(--cta-blue)" }} aria-hidden />
              </div>
              <div>
                <p style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.016em", color: "rgb(29,29,31)" }}>
                  {es ? "Financiación para comunidades y particulares" : "Financing for communities and individuals"}
                </p>
                <p style={{ fontSize: "0.875rem", color: "rgb(110,110,115)", letterSpacing: "-0.01em" }}>
                  {es
                    ? "Sin entrada · Plazos hasta 60 meses · Tramitación completa a cargo de Solteva"
                    : "No down payment · Up to 60 months · Full processing handled by Solteva"}
                </p>
              </div>
            </div>
            <Link
              href={`/${locale}/contacto`}
              className="btn-pill shrink-0"
              style={{ background: "var(--cta-blue)", color: "#fff", whiteSpace: "nowrap" }}
            >
              {es ? "Consultar financiación" : "Ask about financing"}
            </Link>
          </div>
        </div>
      </section>

      {/* Subsidies */}
      <section className="section-py" style={{ background: "rgb(245,245,247)" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <SubsidiesStrip locale={locale} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
          <FAQAccordion
            ids={["obras-necesarias", "tiempo-instalacion", "garantia", "financiacion", "mantenimiento-otras-marcas", "permisos-licencias"]}
            title={es ? "Preguntas frecuentes sobre elevadores" : "Frequently asked questions about lifts"}
          />
        </div>
      </section>

      {/* CTA banner */}
      <section className="section-py text-center" style={{ background: "rgb(29,29,31)" }}>
        <div className="max-w-2xl mx-auto px-6 sm:px-10">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.022em", lineHeight: 1.08 }}
          >
            {es ? "¿Necesitas un elevador?" : "Do you need a platform lift?"}
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.56)", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}>
            {es
              ? "Primera visita gratuita en 24 h. Estudiamos tu caso y te presupuestamos sin compromiso."
              : "First free visit in 24 h. We assess your needs and quote with no commitment."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={`/${locale}/contacto`} className="btn-pill" style={{ background: "var(--cta-blue)", color: "#fff" }}>
              {es ? "Pedir presupuesto gratis" : "Request free quote"}
            </Link>
            <a href="tel:+34900100133" className="btn-pill flex items-center gap-2" style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
              <Phone size={15} aria-hidden />
              900 100 133
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
