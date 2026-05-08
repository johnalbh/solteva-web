import Link from "next/link";
import { Phone, ShieldCheck, Clock, Wrench, CheckCircle2 } from "lucide-react";
import type { Product } from "@/lib/products";
import ImageGallery from "./ImageGallery";
import SpecsTable from "./SpecsTable";
import FeatureCards from "./FeatureCards";
import ComparisonTable from "./ComparisonTable";
import DownloadCard from "./DownloadCard";
import RelatedProducts from "./RelatedProducts";

interface ProductDetailLayoutProps {
  product: Product;
  categoryProducts: Product[];
  locale: string;
  categorySlugEs: string;          // e.g. "sillas-salvaescaleras"
  categoryLabel: string;           // e.g. "Sillas Salvaescaleras"
  categoryHref: string;            // e.g. "/productos/sillas-salvaescaleras"
  relatedProducts: Product[];
  t: {
    getQuote: string;
    specs: string;
    idealFor: string;
    relatedProducts: string;
  };
  tCommon: { download: string; learnMore: string };
  jsonLd: object;
}

export default function ProductDetailLayout({
  product,
  categoryProducts,
  locale,
  categorySlugEs,
  categoryLabel,
  categoryHref,
  relatedProducts,
  t,
  tCommon,
  jsonLd,
}: ProductDetailLayoutProps) {
  const es = locale === "es";
  const name = es ? product.nameEs : product.nameEn;
  const longDesc = es ? product.longDescEs : product.longDescEn;
  const idealFor = es ? product.idealForEs : product.idealForEn;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
            <li><Link href={`/${locale}${categoryHref}`} className="hover:text-ink transition-colors">{categoryLabel}</Link></li>
            <li aria-hidden>/</li>
            <li className="text-ink font-medium truncate max-w-[200px]">{name}</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO: Gallery + Info ───────────────────────────── */}
      <section className="section-py">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Gallery */}
            <div className="lg:sticky lg:top-16">
              <ImageGallery images={product.galleryImages} alt={name} />
            </div>

            {/* Info column */}
            <div className="flex flex-col gap-6">
              {/* Brand tags */}
              <div className="flex flex-wrap gap-2">
                {product.brands.map((brand) => (
                  <span
                    key={brand}
                    className="text-[0.72rem] font-semibold px-2.5 py-1"
                    style={{
                      background: "rgba(0,113,227,0.08)",
                      color: "var(--cta-blue)",
                      borderRadius: 980,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {brand}
                  </span>
                ))}
              </div>

              {/* Product name */}
              <h1
                className="text-ink"
                style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 600, letterSpacing: "-0.022em", lineHeight: 1.1 }}
              >
                {name}
              </h1>

              {/* Long description */}
              <p
                className="text-ink-secondary"
                style={{ fontSize: "1rem", lineHeight: 1.6, letterSpacing: "-0.016em" }}
              >
                {longDesc}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Clock, textEs: "Visita en 24 h", textEn: "Visit in 24 h" },
                  { icon: ShieldCheck, textEs: "Certificado CE/ISO", textEn: "CE/ISO Certified" },
                  { icon: Wrench, textEs: "Instalación incluida", textEn: "Installation included" },
                ].map(({ icon: Icon, textEs, textEn }) => (
                  <span
                    key={textEs}
                    className="inline-flex items-center gap-1.5"
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      padding: "6px 12px",
                      background: "rgb(245,245,247)",
                      color: "rgb(29,29,31)",
                      borderRadius: 980,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <Icon size={12} aria-hidden />
                    {es ? textEs : textEn}
                  </span>
                ))}
              </div>

              {/* Why this model */}
              <div style={{ background: "rgb(245,245,247)", borderRadius: "var(--corner-radius)", padding: "20px 24px" }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgb(29,29,31)", letterSpacing: "-0.015em", marginBottom: 12 }}>
                  {es ? "¿Por qué elegir este modelo?" : "Why choose this model?"}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {product.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: "var(--cta-blue)" }} aria-hidden />
                      <span style={{ fontSize: "0.88rem", lineHeight: 1.47, color: "rgb(66,66,69)" }}>
                        {es ? f.es : f.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contacto?producto=${encodeURIComponent(name)}`}
                  className="btn-pill flex-1 sm:flex-none justify-center"
                  style={{ background: "var(--cta-blue)", color: "#fff" }}
                >
                  {t.getQuote}
                </Link>
                <a
                  href="tel:+34900100133"
                  className="btn-pill flex-1 sm:flex-none justify-center gap-2"
                  style={{ background: "rgb(245,245,247)", color: "rgb(29,29,31)" }}
                >
                  <Phone size={15} aria-hidden />
                  900 100 133
                </a>
              </div>

              {/* Downloads */}
              {product.pdfs.length > 0 && (
                <DownloadCard pdfs={product.pdfs} locale={locale} downloadLabel={tCommon.download} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISUAL ADVANTAGES GUIDE ───────────────────────── */}
      <section className="section-py" style={{ background: "rgb(245,245,247)" }}>
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10">
            <p className="eyebrow mb-3">{es ? "Ventajas del producto" : "Product advantages"}</p>
            <h2
              className="text-ink"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)", fontWeight: 600, letterSpacing: "-0.022em" }}
            >
              {es ? "Todo lo que incluye este modelo" : "Everything included with this model"}
            </h2>
          </div>
          <FeatureCards features={product.features} locale={locale} />
        </div>
      </section>

      {/* ── TECHNICAL SPECS ───────────────────────────────── */}
      <section className="section-py">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2
                className="text-ink mb-6"
                style={{ fontSize: "1.4rem", fontWeight: 600, letterSpacing: "-0.02em" }}
              >
                {t.specs}
              </h2>
              <SpecsTable specs={product.specs} locale={locale} />
            </div>

            {/* Ideal for */}
            {idealFor.length > 0 && (
              <div>
                <h2
                  className="text-ink mb-6"
                  style={{ fontSize: "1.4rem", fontWeight: 600, letterSpacing: "-0.02em" }}
                >
                  {es ? "¿Para quién es ideal?" : "Who is it ideal for?"}
                </h2>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "var(--cta-blue)" }} aria-hidden />
                      <span style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "rgb(29,29,31)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────── */}
      {categoryProducts.length > 1 && (
        <section className="section-py" style={{ background: "rgb(245,245,247)" }}>
          <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
            <p className="eyebrow mb-3">{es ? "Ayuda para elegir" : "Choosing guide"}</p>
            <ComparisonTable
              products={categoryProducts}
              currentSlug={product.slug}
              locale={locale}
              categoryPath={categorySlugEs}
            />
          </div>
        </section>
      )}

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="section-py text-center" style={{ background: "rgb(29,29,31)" }}>
        <div className="max-w-2xl mx-auto px-6 sm:px-10">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.022em", lineHeight: 1.08 }}
          >
            {es ? `¿Te interesa el ${name}?` : `Interested in the ${name}?`}
          </h2>
          <p
            className="mb-8"
            style={{ color: "rgba(255,255,255,0.56)", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}
          >
            {es
              ? "Primera visita gratuita en 24 h. Presupuesto exacto sin compromiso de compra."
              : "First visit free within 24 h. Exact quote with no purchase commitment."}
          </p>
          <Link
            href={`/${locale}/contacto?producto=${encodeURIComponent(name)}`}
            className="btn-pill"
            style={{ background: "var(--cta-blue)", color: "#fff" }}
          >
            {t.getQuote}
          </Link>
        </div>
      </section>

      {/* ── RELATED ───────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          locale={locale}
          title={t.relatedProducts}
          learnMore={tCommon.learnMore}
        />
      )}
    </>
  );
}
