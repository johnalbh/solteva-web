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
        ? "Sillas Salvaescaleras — Modelos Rectos, Curvos y Exterior | Solteva"
        : "Stairlifts — Straight, Curved & Outdoor Models | Solteva",
    description:
      locale === "es"
        ? "Catálogo completo de sillas salvaescaleras. Modelos rectos, curvos y para exterior. Financiación desde 38,91€/mes. Visita gratuita en 24h. 900 100 133."
        : "Complete stairlift catalogue. Straight, curved and outdoor models. Financing from €38.91/month. Free visit in 24h. 900 100 133.",
    locale,
    path: "/productos/sillas-salvaescaleras",
  });
}

const STAIR_TYPES = [
  {
    tagEs: "Más económica",
    tagEn: "Most affordable",
    titleEs: "Escalera recta",
    titleEn: "Straight staircase",
    descEs: "Sin curvas ni rellanos intermedios. Instalación en 3-5 días. La solución más rápida y económica.",
    descEn: "No curves or intermediate landings. Installed in 3-5 days. The fastest and most affordable solution.",
    idealEs: "Ideal para: casas unifamiliares de 1 planta, escaleras de comunidades simples.",
    idealEn: "Ideal for: single-storey houses, simple community staircases.",
    priceEs: "Desde 2.490 €",
    priceEn: "From €2,490",
    color: "rgba(0,113,227,0.07)",
    textColor: "rgb(0,113,227)",
  },
  {
    tagEs: "Más vendida",
    tagEn: "Best seller",
    titleEs: "Escalera curva",
    titleEn: "Curved staircase",
    descEs: "Fabricada a medida para cada escalera. Con curvas, giros de 90°/180° o rellanos. Raíl personalizado.",
    descEn: "Custom-made for each staircase. With curves, 90°/180° turns or landings. Personalised rail.",
    idealEs: "Ideal para: escaleras con giro, con rellano, en L o en U.",
    idealEn: "Ideal for: stairs with turns, landings, L-shaped or U-shaped.",
    priceEs: "Presupuesto a medida",
    priceEn: "Custom quote",
    color: "rgba(10,74,153,0.07)",
    textColor: "rgb(10,74,153)",
  },
  {
    tagEs: "Resistente IP65",
    tagEn: "IP65 rated",
    titleEs: "Escalera exterior",
    titleEn: "Outdoor staircase",
    descEs: "Protección IP65 contra agua y polvo. Acero inoxidable. Cubierta protectora incluida. Funciona bajo lluvia.",
    descEn: "IP65 protection against water and dust. Stainless steel. Protective cover included. Works in rain.",
    idealEs: "Ideal para: jardines, porches, garajes, edificios con escalera exterior.",
    idealEn: "Ideal for: gardens, porches, garages, buildings with outdoor stairs.",
    priceEs: "Desde 3.200 €",
    priceEn: "From €3,200",
    color: "rgba(0,155,170,0.07)",
    textColor: "rgb(0,130,145)",
  },
];

export default async function SillasSalvaescalerasPage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const products = getProductsByCategory("stairlifts");
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
            <li className="text-ink font-medium">{es ? "Sillas Salvaescaleras" : "Stairlifts"}</li>
          </ol>
        </div>
      </nav>

      {/* Hero header */}
      <section className="section-py">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="eyebrow mb-3">{es ? "Soluciones de movilidad" : "Mobility solutions"}</p>
          <h1
            className="text-ink mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, letterSpacing: "-0.022em", maxWidth: "22ch" }}
          >
            {es ? "Sillas Salvaescaleras" : "Stairlifts"}
          </h1>
          <p
            className="text-ink-secondary mb-6"
            style={{ fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em", maxWidth: "52ch" }}
          >
            {es
              ? "Modelos rectos, curvos y para escaleras exteriores. Fabricación a medida. Instalación en 3-5 días sin obras."
              : "Straight, curved and outdoor models. Custom-made. Installed in 3-5 days without construction."}
          </p>
          {/* Trust badges row */}
          <div className="flex flex-wrap gap-3">
            {[
              { iconEl: <Shield size={13} aria-hidden />, textEs: "Garantía 2 años", textEn: "2-year warranty" },
              { iconEl: <CreditCard size={13} aria-hidden />, textEs: "Financiación desde 38,91 €/mes", textEn: "Finance from €38.91/mo" },
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
          <div className="grid sm:grid-cols-2" style={{ gap: "20px" }}>
            {products.map((product) => {
              const name = es ? product.nameEs : product.nameEn;
              const desc = es ? product.shortDescEs : product.shortDescEn;
              const hasImage = Boolean(product.heroImage);

              return (
                <Link
                  key={product.id}
                  href={`/${locale}/productos/sillas-salvaescaleras/${product.slug}`}
                  className="group flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.009]"
                  style={{ background: "#fff", borderRadius: "var(--corner-radius)" }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 260, borderRadius: "var(--corner-radius) var(--corner-radius) 0 0" }}
                  >
                    {hasImage ? (
                      <Image
                        src={product.heroImage}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: "rgb(232,232,237)" }}>
                        <ImageOff size={36} style={{ color: "rgb(134,134,139)" }} aria-hidden />
                        <p style={{ fontSize: "0.8rem", color: "rgb(134,134,139)" }}>
                          {es ? "Imágenes disponibles al solicitar" : "Images available on request"}
                        </p>
                      </div>
                    )}
                    {product.isOutdoor && (
                      <span
                        className="absolute top-4 left-4 text-[0.72rem] font-semibold px-2.5 py-1"
                        style={{ background: "rgba(0,113,227,0.1)", color: "var(--cta-blue)", borderRadius: 980, letterSpacing: "0.04em", textTransform: "uppercase" }}
                      >
                        {es ? "Exterior" : "Outdoor"}
                      </span>
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

      {/* "¿Qué tipo de escalera tienes?" segmentation */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">{es ? "Encuentra tu modelo" : "Find your model"}</p>
            <h2
              className="text-ink"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              {es ? "¿Cómo es tu escalera?" : "What is your staircase like?"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16 }}>
            {STAIR_TYPES.map((type) => (
              <div
                key={type.titleEs}
                style={{
                  borderRadius: 20,
                  padding: "28px 24px",
                  background: type.color,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.72rem", fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: type.textColor, marginBottom: 12,
                  }}
                >
                  {es ? type.tagEs : type.tagEn}
                </span>
                <h3
                  style={{
                    fontSize: "1.15rem", fontWeight: 600, letterSpacing: "-0.018em",
                    color: "rgb(29,29,31)", marginBottom: 10,
                  }}
                >
                  {es ? type.titleEs : type.titleEn}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.55, color: "rgb(110,110,115)", marginBottom: 12 }}>
                  {es ? type.descEs : type.descEn}
                </p>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.4, color: type.textColor, fontWeight: 500, marginBottom: 16 }}>
                  {es ? type.idealEs : type.idealEn}
                </p>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: type.textColor }}>
                  {es ? type.priceEs : type.priceEn}
                </p>
              </div>
            ))}
          </div>
          <p
            style={{ textAlign: "center", marginTop: 20, fontSize: "0.875rem", color: "rgb(110,110,115)" }}
          >
            {es
              ? "¿No estás seguro de qué tipo de escalera tienes? "
              : "Not sure which type you have? "}
            <Link href={`/${locale}/contacto`} style={{ color: "var(--cta-blue)", fontWeight: 600 }}>
              {es ? "Te asesoramos gratis →" : "Free advice →"}
            </Link>
          </p>
        </div>
      </section>

      {/* Financing banner */}
      <section style={{ background: "rgb(245,245,247)" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12 py-8">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "24px 32px",
              border: "1.5px solid rgb(232,232,237)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(0,113,227,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <CreditCard size={22} style={{ color: "var(--cta-blue)" }} aria-hidden />
              </div>
              <div>
                <p style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.016em", color: "rgb(29,29,31)" }}>
                  {es ? "Financiación sin entrada" : "Financing with no down payment"}
                </p>
                <p style={{ fontSize: "0.875rem", color: "rgb(110,110,115)", letterSpacing: "-0.01em" }}>
                  {es
                    ? "Desde 38,91 €/mes · Plazos hasta 60 meses · TIN 7,99% · Aprobación en 24h"
                    : "From €38.91/month · Up to 60 months · 7.99% APR · Approval in 24h"}
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
            ids={["precio-silla", "obras-necesarias", "tiempo-instalacion", "funciona-sin-luz", "escalera-curva-estrecha", "financiacion", "permisos-licencias", "parado-en-escalera"]}
            title={es ? "Preguntas frecuentes sobre sillas salvaescaleras" : "Frequently asked questions about stairlifts"}
          />
        </div>
      </section>

      {/* Guarantee strip */}
      <section style={{ background: "rgb(245,245,247)" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12 py-8">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "24px 32px",
              border: "1.5px solid rgb(232,232,237)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(0,113,227,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Shield size={22} style={{ color: "var(--cta-blue)" }} aria-hidden />
              </div>
              <div>
                <p style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.016em", color: "rgb(29,29,31)" }}>
                  {es ? "Garantía de fábrica 2 años — ampliable hasta 5" : "2-year manufacturer's warranty — extendable to 5"}
                </p>
                <p style={{ fontSize: "0.875rem", color: "rgb(110,110,115)", letterSpacing: "-0.01em" }}>
                  {es
                    ? "Piezas y mano de obra cubiertos. Sin letra pequeña. SAT propio en toda Andalucía."
                    : "Parts and labour covered. No small print. In-house SAT across Andalusia."}
                </p>
              </div>
            </div>
            <Link
              href={`/${locale}/servicios/garantia`}
              className="btn-pill shrink-0"
              style={{ background: "rgb(245,245,247)", color: "rgb(29,29,31)", border: "1.5px solid rgb(232,232,237)", whiteSpace: "nowrap" }}
            >
              {es ? "Ver planes de garantía →" : "View warranty plans →"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="section-py text-center" style={{ background: "rgb(29,29,31)" }}>
        <div className="max-w-2xl mx-auto px-6 sm:px-10">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.022em", lineHeight: 1.08 }}
          >
            {es ? "¿No sabes qué modelo elegir?" : "Not sure which model to choose?"}
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.56)", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}>
            {es
              ? "Primera visita gratuita en 24 h. Nuestro técnico analiza tu escalera y te recomienda el modelo ideal."
              : "First free visit in 24 h. Our technician analyses your staircase and recommends the ideal model."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/contacto`}
              className="btn-pill"
              style={{ background: "var(--cta-blue)", color: "#fff" }}
            >
              {es ? "Pedir presupuesto gratis" : "Request free quote"}
            </Link>
            <a
              href="tel:+34900100133"
              className="btn-pill flex items-center gap-2"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
            >
              <Phone size={15} aria-hidden />
              900 100 133
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
