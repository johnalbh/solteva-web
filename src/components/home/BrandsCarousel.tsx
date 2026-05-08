"use client";

import { useLocale } from "next-intl";

/*
  To add real brand logos:
  1. Place PNG/SVG files in /public/images/brands/<slug>.svg (or .png)
  2. Set logo: "/images/brands/<slug>.svg" in each brand entry below
  3. The component will render <Image> instead of the text fallback
*/

const BRANDS: {
  name: string;
  category: "stairlifts" | "platforms" | "lifts" | "pool";
  logo?: string; // path to /public/images/brands/<file>
}[] = [
  { name: "Handicare",  category: "stairlifts" },
  { name: "Platinum",   category: "stairlifts" },
  { name: "Freelift",   category: "stairlifts" },
  { name: "Acorn",      category: "stairlifts" },
  { name: "Extrema",    category: "platforms"  },
  { name: "Vimec",      category: "lifts"      },
  { name: "Dizalo",     category: "lifts"      },
  { name: "EPA",        category: "lifts"      },
  { name: "SE",         category: "pool"       },
  { name: "Minivator",  category: "stairlifts" },
];

const CATEGORY_COLOR: Record<string, string> = {
  stairlifts: "rgba(0,113,227,0.07)",
  platforms:  "rgba(10,74,153,0.07)",
  lifts:      "rgba(88,86,214,0.07)",
  pool:       "rgba(0,180,200,0.07)",
};

const CATEGORY_TEXT: Record<string, string> = {
  stairlifts: "rgb(0,113,227)",
  platforms:  "rgb(10,74,153)",
  lifts:      "rgb(88,86,214)",
  pool:       "rgb(0,155,170)",
};

// Duplicate for seamless loop
const LOOP = [...BRANDS, ...BRANDS];

export default function BrandsCarousel() {
  const locale = useLocale();
  const es = locale === "es";

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <p className="eyebrow mb-3">{es ? "Marcas de confianza" : "Trusted brands"}</p>
        <h2
          className="text-ink"
          style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {es ? "Distribuidores oficiales autorizados" : "Authorised official distributors"}
        </h2>
        <p
          className="text-ink-secondary mx-auto mt-3"
          style={{ fontSize: "0.95rem", lineHeight: 1.5, maxWidth: "44ch", letterSpacing: "-0.012em" }}
        >
          {es
            ? "Trabajamos exclusivamente con fabricantes líderes en Europa, con certificación CE e ISO."
            : "We work exclusively with Europe's leading manufacturers, CE and ISO certified."}
        </p>
      </div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
        <div
          className="flex w-max"
          style={{ animation: "brands-scroll 32s linear infinite", gap: 14 }}
        >
          {LOOP.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              aria-hidden={i >= BRANDS.length}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 140,
                height: 80,
                borderRadius: 20,
                background: CATEGORY_COLOR[brand.category],
                padding: "0 20px",
                flexShrink: 0,
              }}
            >
              {brand.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{ height: 32, width: "auto", objectFit: "contain" }}
                />
              ) : (
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: CATEGORY_TEXT[brand.category],
                  }}
                >
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes brands-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Static grid — visible on ≥lg for a richer feel */}
      <div
        className="hidden lg:grid mt-10"
        style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}
      >
        {BRANDS.slice(0, 10).map((brand) => (
          <div
            key={brand.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 72,
              borderRadius: 18,
              background: CATEGORY_COLOR[brand.category],
              gap: 4,
            }}
          >
            {brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logo} alt={brand.name} style={{ height: 28, width: "auto", objectFit: "contain" }} />
            ) : (
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: CATEGORY_TEXT[brand.category],
                }}
              >
                {brand.name}
              </span>
            )}
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: CATEGORY_TEXT[brand.category],
                opacity: 0.55,
              }}
            >
              {es
                ? brand.category === "stairlifts" ? "Salvaescaleras"
                  : brand.category === "platforms" ? "Plataformas"
                  : brand.category === "lifts" ? "Elevadores"
                  : "Piscina"
                : brand.category === "stairlifts" ? "Stairlifts"
                  : brand.category === "platforms" ? "Platforms"
                  : brand.category === "lifts" ? "Lifts"
                  : "Pool"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
