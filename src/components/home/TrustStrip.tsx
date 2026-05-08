import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Props { locale: string }

const STATS = [
  { value: "15+", key: "years" },
  { value: "+500", key: "satisfied" },
  { value: "9", key: "coverage" },
  { value: "98%", key: "certified" },
] as const;

export default async function TrustStrip({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home.trust" });
  const es = locale === "es";

  return (
    <section
      className="section-py"
      style={{ background: "rgb(29, 29, 31)" }}  /* Apple #1d1d1f */
      aria-label={es ? "Por qué elegirnos" : "Why choose us"}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1260px", padding: "0 clamp(1.5rem, 6.25vw, 6rem)" }}
      >
        {/* Eyebrow */}
        <p
          className="text-center mb-12"
          style={{
            color: "rgba(255,255,255,0.40)",
            fontSize: "0.75rem",
            letterSpacing: "0.10em",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {t("title")}
        </p>

        {/* Stats — Apple divider pattern */}
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ value, key }, i) => (
            <li
              key={key}
              className={[
                "flex flex-col items-center text-center py-8 px-4 border-white/[0.07]",
                i % 2 !== 0 ? "border-l" : "",      // col-2 on mobile
                i >= 2 ? "border-t lg:border-t-0" : "",  // row-2 on mobile only
                i > 0 ? "lg:border-l" : "",          // all except first on desktop
              ].filter(Boolean).join(" ")}
            >
              <span
                className="stat-number mb-2"
                style={{ color: "rgb(255, 255, 255)" }}
              >
                {value}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.42)",
                  fontSize: "0.9rem",
                  lineHeight: 1.4,
                  maxWidth: "14ch",
                  letterSpacing: "-0.01em",
                }}
              >
                {t(key)}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href={`/${locale}/contacto`}
            className="btn-pill"
            style={{ background: "var(--cta-blue)", color: "#fff" }}
          >
            {es ? "Solicitar visita sin compromiso" : "Request a free visit"}
          </Link>
          <p
            className="mt-4"
            style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.78rem", letterSpacing: "-0.01em" }}
          >
            {es
              ? "Sin permanencia · Presupuesto gratuito en 24 h"
              : "No commitment · Free quote within 24 h"}
          </p>
        </div>
      </div>
    </section>
  );
}
