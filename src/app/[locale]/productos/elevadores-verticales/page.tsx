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
        ? "Elevadores Verticales — Alternativa al Ascensor | Solteva"
        : "Vertical Platform Lifts — Lift Alternative | Solteva",
    description:
      locale === "es"
        ? "Elevadores verticales sin obras, sin sala de máquinas. La alternativa más económica al ascensor. Visita gratuita en 24h. 900 100 133."
        : "Vertical platform lifts, no construction, no machine room. Most economical lift alternative. Free visit in 24h. 900 100 133.",
    locale,
    path: "/productos/elevadores-verticales",
  });
}

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
          <p className="eyebrow mb-3">{es ? "Accesibilidad vertical" : "Vertical accessibility"}</p>
          <h1
            className="text-ink mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, letterSpacing: "-0.022em", maxWidth: "22ch" }}
          >
            {es ? "Elevadores Verticales" : "Vertical Platform Lifts"}
          </h1>
          <p
            className="text-ink-secondary"
            style={{ fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em", maxWidth: "52ch" }}
          >
            {es
              ? "Sin foso, sin sala de máquinas, sin obras mayores. La alternativa económica al ascensor para desniveles de cualquier altura."
              : "No pit, no machine room, no major construction. The economical lift alternative for any height difference."}
          </p>
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
                    style={{ height: 220, borderRadius: "var(--corner-radius) var(--corner-radius) 0 0" }}
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
                        <ImageOff size={32} style={{ color: "rgb(134,134,139)" }} aria-hidden />
                        <p style={{ fontSize: "0.8rem", color: "rgb(134,134,139)" }}>
                          {es ? "Imágenes disponibles al solicitar" : "Images available on request"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h2
                      className="text-ink font-semibold mb-2"
                      style={{ fontSize: "0.98rem", letterSpacing: "-0.016em", lineHeight: 1.25 }}
                    >
                      {name}
                    </h2>
                    <p
                      className="text-ink-secondary mb-4"
                      style={{ fontSize: "0.88rem", lineHeight: 1.47, letterSpacing: "-0.01em" }}
                    >
                      {desc}
                    </p>
                    <span className="link-more mt-auto" style={{ fontSize: "0.88rem" }}>
                      {tCommon("learnMore")} <ChevronRight size={13} aria-hidden />
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
            {es ? "Estudio gratuito sin compromiso" : "Free no-obligation study"}
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.56)", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}>
            {es
              ? "Visita en 24 horas. Nuestro técnico analiza tu espacio y te propone el elevador adecuado."
              : "Visit in 24 hours. Our technician analyses your space and recommends the right lift."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/contacto`}
              className="btn-pill"
              style={{ background: "var(--cta-blue)", color: "#fff" }}
            >
              {es ? "Pedir estudio gratuito" : "Request free study"}
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
