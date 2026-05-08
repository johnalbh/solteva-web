import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronRight, ImageOff } from "lucide-react";
import { generateSEOMeta } from "@/lib/seo";
import { getProductsByCategory } from "@/lib/products";

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
        ? "Catálogo completo de sillas salvaescaleras. Modelos rectos, curvos y para exterior. Visita gratuita en 24h. 900 100 133."
        : "Complete stairlift catalogue. Straight, curved and outdoor models. Free visit in 24h. 900 100 133.",
    locale,
    path: "/productos/sillas-salvaescaleras",
  });
}

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
            className="text-ink-secondary"
            style={{ fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em", maxWidth: "52ch" }}
          >
            {es
              ? "Modelos rectos, curvos y para escaleras exteriores. Fabricación a medida. Instalación en 3-5 días sin obras."
              : "Straight, curved and outdoor models. Custom-made. Installed in 3-5 days without construction."}
          </p>
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
