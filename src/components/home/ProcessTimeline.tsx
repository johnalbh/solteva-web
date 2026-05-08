import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

const STEPS = ["step1", "step2", "step3", "step4"] as const;

export default async function ProcessTimeline({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home.process" });

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-20">
        <p className="eyebrow mb-4">{locale === "es" ? "El proceso" : "The process"}</p>
        <h2 className="headline-xl text-ink mb-5">
          {t("title")}
        </h2>
        <p
          className="text-muted-foreground mx-auto"
          style={{ maxWidth: "40ch", fontSize: "1.05rem", lineHeight: 1.55 }}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* Steps */}
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8" aria-label={locale === "es" ? "Pasos del proceso" : "Process steps"}>
        {STEPS.map((key, index) => (
          <li key={key} className="flex flex-col">
            {/* Number */}
            <span
              className="block mb-6 font-bold select-none"
              style={{
                fontSize: "4.5rem",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: "var(--primary)",
                opacity: 0.18,
              }}
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Step line — desktop */}
            <div
              className="hidden lg:block h-px mb-8"
              style={{ background: "var(--border)" }}
              aria-hidden
            />

            <h3
              className="font-semibold text-ink mb-3"
              style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", lineHeight: 1.25 }}
            >
              {t(`${key}.title` as `${typeof key}.title`)}
            </h3>
            <p
              className="text-muted-foreground text-sm leading-relaxed"
              style={{ maxWidth: "22ch" }}
            >
              {t(`${key}.desc` as `${typeof key}.desc`)}
            </p>
          </li>
        ))}
      </ol>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href={`/${locale}/contacto`}
          className="inline-flex items-center gap-2 rounded-full font-semibold transition-opacity hover:opacity-80"
          style={{
            background: "var(--primary)",
            color: "#fff",
            padding: "0.8rem 2rem",
            fontSize: "0.92rem",
          }}
        >
          {locale === "es" ? "Comenzar mi proceso" : "Start my process"}
        </Link>
        <p className="mt-4 text-muted-foreground text-xs">
          {locale === "es" ? "Primera visita gratuita · Sin compromiso de compra" : "First visit free · No purchase commitment"}
        </p>
      </div>
    </div>
  );
}
