import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

interface HeroProps { locale: string }

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations("home.hero");
  const es = locale === "es";

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <Image
          src="/images/products/stairlifts/platinum-ergo/main.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient: dark all over, lighter at top-right to show photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.42) 75%, rgba(0,0,0,0.28) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Content — Apple iPhone hero: centered, max-width constrained */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-[100svh]"
        style={{ padding: "clamp(6rem, 10vw, 10rem) clamp(1.5rem, 6.25vw, 6rem) clamp(5rem, 8vw, 8rem)" }}
      >
        {/* Eyebrow */}
        <p
          className="mb-5 text-white/55"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
          }}
        >
          {t("badge")}
        </p>

        {/* Display headline — centered, Apple scale */}
        <h1
          id="hero-heading"
          className="text-white mx-auto mb-6"
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            maxWidth: "16ch",
          }}
        >
          {t("title")}
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/72 mx-auto mb-10"
          style={{
            fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
            lineHeight: 1.47,
            letterSpacing: "-0.016em",
            maxWidth: "38ch",
          }}
        >
          {t("subtitle")}
        </p>

        {/* CTAs — centered row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            href={`/${locale}/contacto`}
            className="btn-pill"
            style={{ background: "var(--cta-blue)", color: "#fff" }}
          >
            {t("cta_quote")}
          </Link>
          <a
            href="tel:+34900100133"
            aria-label="Llamar 900 100 133"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            style={{ fontSize: "0.94rem", letterSpacing: "-0.01em" }}
          >
            <Phone size={15} aria-hidden />
            900 100 133
          </a>
        </div>

        {/* Trust micro-copy */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          {[t("promise1"), t("promise2"), t("promise3")].map((p) => (
            <span
              key={p}
              className="flex items-center gap-1.5 text-white/40"
              style={{ fontSize: "0.8rem", letterSpacing: "-0.01em" }}
            >
              <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" aria-hidden />
              {p}
            </span>
          ))}
        </div>

        {/* Product label — bottom center, higher contrast */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          aria-hidden
        >
          <div
            className="inline-block px-5 py-3 rounded-2xl"
            style={{
              background: "rgba(0,0,0,0.62)",
              backdropFilter: "saturate(180%) blur(20px)",
              WebkitBackdropFilter: "saturate(180%) blur(20px)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <p
              className="text-white font-semibold"
              style={{ fontSize: "0.88rem", letterSpacing: "-0.015em" }}
            >
              Platinum Ergo — Curva Doble Raíl
            </p>
            <p className="text-white/55 mt-0.5" style={{ fontSize: "0.76rem" }}>
              {es ? "Instalación en 10 días · A medida" : "10-day installation · Custom-made"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--surface-1), transparent)" }}
        aria-hidden
      />
    </section>
  );
}
