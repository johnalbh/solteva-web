import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ImageOff } from "lucide-react";
import type { Product } from "@/lib/products";

const CATEGORY_SLUG: Record<string, string> = {
  stairlifts: "sillas-salvaescaleras",
  platforms: "plataformas",
  verticalLifts: "elevadores-verticales",
  poolLift: "grua-piscina",
  ramps: "rampas",
};

interface RelatedProductsProps {
  products: Product[];
  locale: string;
  title: string;
  learnMore: string;
}

export default function RelatedProducts({ products, locale, title, learnMore }: RelatedProductsProps) {
  if (!products.length) return null;
  const es = locale === "es";

  return (
    <section className="section-py">
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12">
        <p className="eyebrow mb-3">{es ? "También te puede interesar" : "You might also like"}</p>
        <h2
          className="text-ink mb-10"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
          {products.map((p) => {
            const name = es ? p.nameEs : p.nameEn;
            const desc = es ? p.shortDescEs : p.shortDescEn;
            const href = `/${locale}/productos/${CATEGORY_SLUG[p.category]}/${p.slug}`;
            const hasImage = Boolean(p.heroImage);

            return (
              <Link
                key={p.id}
                href={href}
                className="group flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.009]"
                style={{ background: "rgb(245,245,247)", borderRadius: "var(--corner-radius)" }}
              >
                {/* Image / placeholder */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 200, borderRadius: "var(--corner-radius) var(--corner-radius) 0 0" }}
                >
                  {hasImage ? (
                    <Image
                      src={p.heroImage}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: "rgb(232,232,237)" }}>
                      <ImageOff size={36} style={{ color: "rgb(134,134,139)" }} aria-hidden />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 p-5">
                  <h3
                    className="text-ink font-semibold mb-1.5"
                    style={{ fontSize: "0.98rem", letterSpacing: "-0.016em", lineHeight: 1.25 }}
                  >
                    {name}
                  </h3>
                  <p
                    className="text-ink-secondary mb-4"
                    style={{ fontSize: "0.88rem", lineHeight: 1.47, letterSpacing: "-0.01em" }}
                  >
                    {desc}
                  </p>
                  <span className="link-more mt-auto" style={{ fontSize: "0.88rem" }}>
                    {learnMore} <ChevronRight size={13} aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
