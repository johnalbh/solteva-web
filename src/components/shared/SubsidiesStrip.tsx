import Link from "next/link";
import { Euro, Gift, FileText } from "lucide-react";

interface Props { locale: string }

const ITEMS = [
  {
    Icon: Euro,
    titleEs: "IVA al 4 %",
    titleEn: "4% VAT",
    descEs: "Los equipos de movilidad para personas con discapacidad o mayores de 65 años tributan al tipo superreducido del 4 % en lugar del 21 %.",
    descEn: "Mobility equipment for people with a disability or aged 65+ is taxed at the super-reduced 4% VAT rate instead of 21%.",
  },
  {
    Icon: Gift,
    titleEs: "Subvenciones CCAA",
    titleEn: "Regional grants",
    descEs: "Muchas comunidades autónomas ofrecen subvenciones directas de hasta 2.000 € para la instalación de ayudas técnicas de accesibilidad en el hogar.",
    descEn: "Many regional governments offer direct grants of up to €2,000 for installing home accessibility aids.",
  },
  {
    Icon: FileText,
    titleEs: "Deducción IRPF",
    titleEn: "Income tax deduction",
    descEs: "Las instalaciones de accesibilidad en vivienda habitual pueden desgravarse en la declaración de la renta. Consulta con tu gestor o asesor fiscal.",
    descEn: "Accessibility installations in your primary home may be tax-deductible in your annual income tax return.",
  },
];

export default function SubsidiesStrip({ locale }: Props) {
  const es = locale === "es";

  return (
    <section
      style={{
        background: "rgb(245,245,247)",
        borderRadius: "var(--corner-radius)",
        padding: "clamp(2rem, 4vw, 3rem)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <p className="eyebrow mb-3">
          {es ? "Ayudas y subvenciones" : "Grants & subsidies"}
        </p>
        <h2
          className="text-ink"
          style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {es ? "Tu equipo puede costarte mucho menos" : "Your equipment may cost much less"}
        </h2>
        <p
          className="text-ink-secondary mx-auto mt-3"
          style={{ fontSize: "0.95rem", lineHeight: 1.5, maxWidth: "52ch", letterSpacing: "-0.012em" }}
        >
          {es
            ? "Existen beneficios fiscales y ayudas públicas que pueden reducir significativamente el coste final."
            : "There are tax benefits and public grants that can significantly reduce the final cost."}
        </p>
      </div>

      {/* 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16 }}>
        {ITEMS.map(({ Icon, titleEs, titleEn, descEs, descEn }) => (
          <div
            key={titleEs}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "28px 24px",
            }}
          >
            <div
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(0,113,227,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Icon size={22} style={{ color: "var(--cta-blue)" }} aria-hidden />
            </div>
            <h3
              style={{
                fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.016em",
                color: "rgb(29,29,31)", marginBottom: 8,
              }}
            >
              {es ? titleEs : titleEn}
            </h3>
            <p
              style={{
                fontSize: "0.875rem", lineHeight: 1.55, letterSpacing: "-0.01em",
                color: "rgb(110,110,115)",
              }}
            >
              {es ? descEs : descEn}
            </p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p
        style={{
          textAlign: "center", marginTop: 24,
          fontSize: "0.875rem", color: "rgb(110,110,115)", letterSpacing: "-0.01em",
        }}
      >
        {es
          ? "Te asesoramos sin coste sobre las ayudas disponibles en tu comunidad. "
          : "We advise you free of charge on grants available in your region. "}
        <Link
          href={`/${locale}/contacto`}
          style={{ color: "var(--cta-blue)", fontWeight: 600 }}
        >
          {es ? "Consúltanos →" : "Ask us →"}
        </Link>
      </p>
    </section>
  );
}
