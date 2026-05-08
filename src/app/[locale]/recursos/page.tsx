import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ChevronRight, BookOpen } from "lucide-react";
import { generateSEOMeta } from "@/lib/seo";
import { posts } from "@/lib/posts";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Recursos y Guías — Sillas Salvaescaleras | Solteva"
        : "Resources & Guides — Stairlifts | Solteva",
    description:
      locale === "es"
        ? "Guías de compra, comparativas, subvenciones y consejos de mantenimiento sobre sillas salvaescaleras. Todo lo que necesitas saber."
        : "Buying guides, comparisons, grants and maintenance tips for stairlifts. Everything you need to know.",
    locale,
    path: "/recursos",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  guide: "bg-blue-100 text-blue-700",
  comparison: "bg-purple-100 text-purple-700",
  subsidies: "bg-green-100 text-green-700",
  maintenance: "bg-orange-100 text-orange-700",
  finance: "bg-amber-100 text-amber-700",
};

export default async function RecursosPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";
  const [featured, ...rest] = posts;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(isEs ? "es-ES" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: isEs ? "Recursos Solteva Elevación" : "Solteva Elevación Resources",
    description: isEs
      ? "Guías, comparativas y consejos sobre sillas salvaescaleras"
      : "Guides, comparisons and tips on stairlifts",
    url: `https://solteva.com/${locale}/recursos`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {isEs ? "Inicio" : "Home"}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">{isEs ? "Recursos" : "Resources"}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={28} className="text-[var(--accent)]" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold">
              {isEs ? "Recursos y Guías" : "Resources & Guides"}
            </h1>
          </div>
          <p className="text-white/85 text-lg max-w-2xl">
            {isEs
              ? "Todo lo que necesitas saber antes de comprar una silla salvaescaleras: precios, comparativas, subvenciones y mantenimiento."
              : "Everything you need to know before buying a stairlift: prices, comparisons, grants and maintenance."}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Featured post */}
        {featured && (
          <Link
            href={`/${locale}/recursos/${featured.slug}`}
            className="group block mb-14"
          >
            <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="relative aspect-[4/3] lg:aspect-auto bg-slate-100">
                <Image
                  src={featured.heroImage}
                  alt={isEs ? featured.titleEs : featured.titleEn}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-10 bg-white flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      CATEGORY_COLORS[featured.category] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isEs ? featured.categoryLabelEs : featured.categoryLabelEn}
                  </span>
                  <span className="text-[var(--accent)] text-xs font-semibold uppercase tracking-wide">
                    {isEs ? "Destacado" : "Featured"}
                  </span>
                </div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-[var(--ink)] mb-3 group-hover:text-[var(--primary)] transition-colors leading-tight">
                  {isEs ? featured.titleEs : featured.titleEn}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  {isEs ? featured.descriptionEs : featured.descriptionEn}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(featured.dateIso)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {featured.readingMinutes} min
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-8">
          {isEs ? "Todos los artículos" : "All articles"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/recursos/${post.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-[var(--primary)] hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={isEs ? post.titleEs : post.titleEn}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span
                  className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                    CATEGORY_COLORS[post.category] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {isEs ? post.categoryLabelEs : post.categoryLabelEn}
                </span>
                <h3 className="font-display font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--primary)] transition-colors leading-snug flex-1">
                  {isEs ? post.titleEs : post.titleEn}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {isEs ? post.descriptionEs : post.descriptionEn}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(post.dateIso)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingMinutes} min
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-[var(--primary)]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
