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
        ? "Plataformas Salvaescaleras — Para Sillas de Ruedas | Solteva"
        : "Platform Stairlifts — Wheelchair Accessible | Solteva",
    description:
      locale === "es"
        ? "Plataformas salvaescaleras para escaleras rectas y curvas. Ideales para sillas de ruedas. Financiación disponible. Visita gratuita en 24h. 900 100 133."
        : "Platform lifts for straight and curved staircases. Ideal for wheelchairs. Financing available. Free visit in 24h. 900 100 133.",
    locale,
    path: "/productos/plataformas",
  });
}

const PLATFORM_TYPES = [
  {
    tagEs: "Para sillas de ruedas",
    tagEn: "For wheelchairs",
    titleEs: "Plataforma horizontal",
    titleEn: "Horizontal platform",
    descEs: "La persona no abandona la silla de ruedas en ningún momento. La plataforma la transporta completa junto a la escalera.",
    descEn: "The person never leaves the wheelchair. The platform carries it alongside the staircase.",
    idealEs: "Ideal para: usuarios de silla de ruedas eléctrica o manual, acompañantes.",
    idealEn: "Ideal for: electric or manual wheelchair users, companions.",
    color: "rgba(10,74,153,0.07)",
    textColor: "rgb(10,74,153)",
  },
  {
    tagEs: "Movilidad reducida",
    tagEn: "Limited mobility",
    titleEs: "Plataforma inclinada",
    titleEn: "Inclined platform",
    descEs: "Para personas con movilidad muy reducida que no pueden usar la silla tradicional. Mayor capacidad de carga.",
    descEn: "For people with very limited mobility who cannot use a traditional chair. Higher load capacity.",
    idealEs: "Ideal para: escaleras de comunidades, uso público, personas con andador.",
    idealEn: "Ideal for: community stairs, public use, people using walkers.",
    color: "rgba(88,86,214,0.07)",
    textColor: "rgb(88,86,214)",
  },
];

export default async function PlataformasPage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const products = getProductsByCategory("platforms");
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
            <li className="text-ink font-medium">{es ? "Plataformas Elevadoras" : "Lifting Platforms"}</li>
          </ol>
        </div>
      </nav>

      {/* Hero header */}
      <section className="section-py">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="eyebrow mb-3">{es ? "Accesibilidad total" : "Full accessibility"}</p>
          <h1
            className="text-ink mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, letterSpacing: "-0.022em", maxWidth: "22ch" }}
          >
            {es ? "Plataformas Elevadoras" : "Lifting Platforms"}
          </h1>
          <p
            className="text-ink-secondary mb-6"
            style={{ fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em", maxWidth: "52ch" }}
          >
            {es
              ? "La solución definitiva para usuarios de silla de ruedas. Ultra-slim, con batería y cierre motorizado."
              : "The definitive solution for wheelchair users. Ultra-slim, battery-operated with motorised closure."}
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
          <div className="grid sm:grid-cols-2" style={{ gap: "20px" }}>
            {products.map((product) => {
              const name = es ? product.nameEs : product.nameEn;
              const desc = es ? product.shortDescEs : product.shortDescEn;
              const hasImage = Boolean(product.heroImage);

              return (
                <Link
                  key={product.id}
                  href={`/${locale}/productos/plataformas/${product.slug}`}
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

      {/* "Para quién es" segmentation */}
      <section className="section-py" style={{ background: "#fff" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">{es ? "Encuentra tu modelo" : "Find your model"}</p>
            <h2
              className="text-ink"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              {es ? "¿Silla salvaescaleras o plataforma?" : "Stairlift or platform?"}
            </h2>
            <p className="text-ink-secondary mx-auto mt-3" style={{ fontSize: "0.95rem", lineHeight: 1.5, maxWidth: "52ch" }}>
              {es
                ? "La plataforma es la solución si el usuario viaja en silla de ruedas o tiene movilidad muy reducida."
                : "A platform lift is the solution if the user travels in a wheelchair or has very limited mobility."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16, maxWidth: 740, margin: "0 auto" }}>
            {PLATFORM_TYPES.map((type) => (
              <div key={type.titleEs} style={{ borderRadius: 20, padding: "28px 24px", background: type.color }}>
                <span style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: type.textColor, marginBottom: 12 }}>
                  {es ? type.tagEs : type.tagEn}
                </span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.018em", color: "rgb(29,29,31)", marginBottom: 10 }}>
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
                  {es ? "Financiación sin entrada" : "Financing with no down payment"}
                </p>
                <p style={{ fontSize: "0.875rem", color: "rgb(110,110,115)", letterSpacing: "-0.01em" }}>
                  {es
                    ? "Sin entrada · Plazos hasta 60 meses · Tramitación gestionada por Solteva"
                    : "No down payment · Up to 60 months · Processing managed by Solteva"}
                </p>
              </div>
            </div>
            <Link href={`/${locale}/contacto`} className="btn-pill shrink-0" style={{ background: "var(--cta-blue)", color: "#fff", whiteSpace: "nowrap" }}>
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
            ids={["silla-vs-plataforma", "obras-necesarias", "tiempo-instalacion", "garantia", "financiacion", "permisos-licencias"]}
            title={es ? "Preguntas frecuentes sobre plataformas" : "Frequently asked questions about platform lifts"}
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
            {es ? "¿Necesitas una plataforma?" : "Need a platform lift?"}
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.56)", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}>
            {es
              ? "Primera visita gratuita en 24 h. Te asesoramos y presupuestamos sin compromiso."
              : "First free visit in 24 h. We advise and quote with no commitment."}
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
