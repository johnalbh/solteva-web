import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MoveVertical, Waves } from "lucide-react";

interface Props { locale: string }

const CATEGORIES = [
  {
    key: "stairlifts" as const,
    slugEs: "sillas-salvaescaleras",
    image: "/images/products/stairlifts/handicare-950/img-4.jpg",
    imageAlt: "Silla salvaescaleras Handicare instalada",
    colorBg: null as string | null,
    Icon: null as React.ElementType | null,
    featured: true,
  },
  {
    key: "platforms" as const,
    slugEs: "plataformas",
    image: "/images/products/platforms/logic/img-12.jpg",
    imageAlt: "Plataforma elevadora residencial Logic",
    colorBg: null,
    Icon: null,
    featured: false,
  },
  {
    key: "verticalLifts" as const,
    slugEs: "elevadores-verticales",
    image: null,
    imageAlt: null,
    colorBg: "rgb(232, 240, 251)",
    Icon: MoveVertical as React.ElementType,
    featured: false,
  },
  {
    key: "poolLift" as const,
    slugEs: "grua-piscina",
    image: null,
    imageAlt: null,
    colorBg: "rgb(224, 244, 251)",
    Icon: Waves as React.ElementType,
    featured: false,
  },
];

export default async function ProductCategoryGrid({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home.categories" });
  const es = locale === "es";

  return (
    <div>
      {/* Header — Apple section pattern */}
      <div className="text-center mb-12">
        <p className="eyebrow mb-3">
          {es ? "Soluciones de accesibilidad" : "Accessibility solutions"}
        </p>
        <h2
          className="headline-xl text-ink mb-4"
          style={{ maxWidth: "20ch", marginLeft: "auto", marginRight: "auto" }}
        >
          {t("title")}
        </h2>
        <p
          className="text-ink-secondary mx-auto"
          style={{ maxWidth: "44ch", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* Apple product tile grid — #f5f5f7 tiles, 28px radius, no shadow */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ gap: "20px" }}   /* Apple --tile-card-gutter: 20px */
      >
        {CATEGORIES.map(({ key, slugEs, image, imageAlt, colorBg, Icon, featured }) => (
          <Link
            key={key}
            href={`/${locale}/productos/${slugEs}`}
            className="group flex flex-col overflow-hidden transition-transform duration-300"
            style={{
              background: "rgb(245, 245, 247)",  /* Apple #f5f5f7 tile bg */
              borderRadius: "var(--corner-radius)",
              /* Apple hover: barely perceptible scale — cubic-bezier(0,0,0.5,1) */
            }}
            aria-label={t(`${key}.name` as `${typeof key}.name`)}
          >
            {/* Visual area */}
            <div
              className="relative overflow-hidden"
              style={{
                height: 210,
                borderRadius: "var(--corner-radius) var(--corner-radius) 0 0",
              }}
            >
              {image ? (
                <Image
                  src={image}
                  alt={imageAlt ?? ""}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: colorBg ?? "" }}
                >
                  {Icon && (
                    <Icon
                      size={56}
                      strokeWidth={1}
                      style={{ color: "var(--primary)", opacity: 0.4 }}
                      aria-hidden
                    />
                  )}
                </div>
              )}

              {featured && (
                <span
                  className="absolute top-4 left-4 text-[0.68rem] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                  style={{
                    background: "rgba(245, 99, 0, 0.12)",
                    color: "rgb(182, 68, 0)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {es ? "Más vendido" : "Best seller"}
                </span>
              )}
            </div>

            {/* Text content — Apple tile copy area */}
            <div className="flex flex-col flex-1 p-6">
              <h3
                className="text-ink font-semibold mb-1.5"
                style={{ fontSize: "1.05rem", letterSpacing: "-0.018em", lineHeight: 1.2 }}
              >
                {t(`${key}.name` as `${typeof key}.name`)}
              </h3>
              <p
                className="text-ink-secondary mb-5"
                style={{ fontSize: "0.9rem", lineHeight: 1.47, letterSpacing: "-0.01em", maxWidth: "24ch" }}
              >
                {t(`${key}.desc` as `${typeof key}.desc`)}
              </p>

              {/* Apple dual CTA: "Saber más" link style */}
              <div className="mt-auto flex items-center justify-between">
                <span className="link-more" style={{ fontSize: "0.9rem" }}>
                  {es ? "Saber más" : "Learn more"}
                  <ChevronRight size={14} aria-hidden />
                </span>
                <span
                  className="text-ink-tertiary"
                  style={{ fontSize: "0.82rem", letterSpacing: "-0.01em" }}
                >
                  {t(`${key}.from` as `${typeof key}.from`)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom link — Apple "Ver todos los Mac" pattern */}
      <div className="text-center mt-10">
        <Link href={`/${locale}/productos`} className="link-more" style={{ fontSize: "1rem" }}>
          {es ? "Ver catálogo completo" : "View full catalogue"}
          <ChevronRight size={16} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
