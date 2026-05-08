"use client";

import { useTranslations } from "next-intl";

const BRANDS = [
  "HANDICARE", "MINIVATOR", "FREELIFT", "EP", "THYSSEN", "KRUPP",
  "EXTREMA", "ACORN", "BISON", "VIMEC", "HIROLIFT", "LIFTUP",
];

export default function BrandsCarousel() {
  const t = useTranslations("home.brands");

  return (
    <div>
      <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
        {t("title")}
      </h2>
      <div className="relative overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" aria-hidden />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" aria-hidden />

        <div className="flex gap-6 animate-[marquee_30s_linear_infinite] w-max">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center justify-center min-w-[140px] h-14 rounded-xl border border-border bg-white px-5 shadow-sm"
              aria-hidden={i >= BRANDS.length}
            >
              <span className="text-sm font-bold tracking-wider text-muted-foreground">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
