import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronRight, ImageOff, CheckCircle2 } from "lucide-react";
import { generateSEOMeta } from "@/lib/seo";
import { getProductsByCategory } from "@/lib/products";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Grúa de Piscina — Acceso sin Barreras a tu Piscina | Solteva"
        : "Pool Hoist — Barrier-Free Pool Access | Solteva",
    description:
      locale === "es"
        ? "Grúa hidráulica para piscina privada y comunitaria. Instalación sin obras. Visita gratuita en 24h. 900 100 133."
        : "Hydraulic pool hoist for private and communal pools. No building work. Free visit in 24h. 900 100 133.",
    locale,
    path: "/productos/grua-piscina",
  });
}

export default async function GruaPiscinaPage({ params }: Props) {
  const { locale } = await params;
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const products = getProductsByCategory("poolLift");
  const es = locale === "es";

  const features = es
    ? [
        "Sistema hidráulico: sin electricidad cerca del agua",
        "Instalación sobre el bordillo, sin obras",
        "Giro 90° o 360° según modelo",
        "Capacidad hasta 136 kg",
        "Acero inoxidable resistente al cloro",
      ]
    : [
        "Hydraulic system: no electricity near the water",
        "Installed on pool edge, no construction needed",
        "90° or 360° rotation depending on model",
        "Capacity up to 136 kg",
        "Chlorine-resistant stainless steel",
      ];

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
            <li className="text-ink font-medium">{es ? "Grúa de Piscina" : "Pool Hoist"}</li>
          </ol>
        </div>
      </nav>

      {/* Hero header */}
      <section className="section-py">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="eyebrow mb-3">{es ? "Acceso a la piscina" : "Pool access"}</p>
          <h1
            className="text-ink mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, letterSpacing: "-0.022em", maxWidth: "22ch" }}
          >
            {es ? "Grúa de Piscina" : "Pool Hoist"}
          </h1>
          <p
            className="text-ink-secondary"
            style={{ fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em", maxWidth: "52ch" }}
          >
            {es
              ? "Tu piscina sin barreras. Solución hidráulica elegante para piscinas privadas y comunitarias."
              : "Your barrier-free pool. Elegant hydraulic solution for private and communal pools."}
          </p>
        </div>
      </section>

      {/* Products + features */}
      <section className="section-py" style={{ background: "rgb(245,245,247)" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2" style={{ gap: "20px" }}>
            {/* Product cards */}
            <div className="flex flex-col" style={{ gap: "20px" }}>
              {products.map((product) => {
                const name = es ? product.nameEs : product.nameEn;
                const desc = es ? product.shortDescEs : product.shortDescEn;
                const hasImage = Boolean(product.heroImage);

                return (
                  <Link
                    key={product.id}
                    href={`/${locale}/productos/grua-piscina/${product.slug}`}
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
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: "rgb(224,244,251)" }}>
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

            {/* Feature list */}
            <div
              className="flex flex-col justify-center p-8"
              style={{ background: "#fff", borderRadius: "var(--corner-radius)" }}
            >
              <h2
                className="text-ink mb-6"
                style={{ fontSize: "1.3rem", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                {es ? "¿Por qué elegir nuestra grúa?" : "Why choose our pool hoist?"}
              </h2>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "var(--cta-blue)" }} aria-hidden />
                    <span style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "rgb(29,29,31)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
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
            {es ? "¿Tienes piscina?" : "Do you have a pool?"}
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.56)", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}>
            {es
              ? "Te visitamos y estudiamos la mejor solución para tu piscina, sin compromiso."
              : "We visit and study the best solution for your pool, with no commitment."}
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
