import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { generateSEOMeta, generateProductJsonLd } from "@/lib/seo";
import { getProductBySlug, getProductsByCategory, getRelatedProducts } from "@/lib/products";
import ProductDetailLayout from "@/components/product/ProductDetailLayout";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const { products } = await import("@/lib/products");
  return products
    .filter((p) => p.category === "verticalLifts")
    .flatMap((p) => ["es", "en"].map((locale) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return generateSEOMeta({
    title: `${locale === "es" ? product.nameEs : product.nameEn} — Solteva Elevación`,
    description: locale === "es" ? product.shortDescEs : product.shortDescEn,
    locale,
    path: `/productos/elevadores-verticales/${slug}`,
    image: product.heroImage,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.category !== "verticalLifts") notFound();

  const t = await getTranslations({ locale, namespace: "products" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <ProductDetailLayout
      product={product}
      categoryProducts={getProductsByCategory("verticalLifts")}
      locale={locale}
      categorySlugEs="elevadores-verticales"
      categoryLabel={locale === "es" ? "Elevadores Verticales" : "Vertical Lifts"}
      categoryHref="/productos/elevadores-verticales"
      relatedProducts={getRelatedProducts(product)}
      t={{
        getQuote: t("getQuote"),
        specs: t("specs"),
        idealFor: t("idealFor"),
        relatedProducts: t("relatedProducts"),
      }}
      tCommon={{ download: tCommon("download"), learnMore: tCommon("learnMore") }}
      jsonLd={generateProductJsonLd({ ...product, category: "elevadores-verticales" }, locale)}
    />
  );
}
