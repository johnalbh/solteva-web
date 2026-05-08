import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ServiciosStripProps { locale: string }

const SERVICIOS = [
  {
    path: "/servicios/mantenimiento",
    num: "01",
    titleEs: "Mantenimiento preventivo",
    titleEn: "Preventive maintenance",
    descEs: "Contratos anuales que previenen averías y prolongan la vida útil de tu equipo.",
    descEn: "Annual contracts that prevent breakdowns and extend equipment life.",
    badgeEs: "Desde 89 €/año",
    badgeEn: "From €89/year",
  },
  {
    path: "/servicios/sat",
    num: "02",
    titleEs: "Asistencia técnica urgente",
    titleEn: "Urgent technical assistance",
    descEs: "Técnico especializado a domicilio. Respuesta garantizada en toda Andalucía.",
    descEn: "Specialist technician at your home. Guaranteed response across Andalusia.",
    badgeEs: "Respuesta garantizada",
    badgeEn: "Guaranteed response",
  },
  {
    path: "/servicios/garantia",
    num: "03",
    titleEs: "Garantía extendida",
    titleEn: "Extended warranty",
    descEs: "Amplía la garantía de fábrica hasta 5 años. Piezas y mano de obra incluidas.",
    descEn: "Extend the manufacturer's warranty up to 5 years. Parts and labour included.",
    badgeEs: "Hasta 5 años",
    badgeEn: "Up to 5 years",
  },
];

export default function ServiciosStrip({ locale }: ServiciosStripProps) {
  const es = locale === "es";

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <p className="eyebrow mb-3">{es ? "Después de la instalación" : "After installation"}</p>
        <h2 className="headline-xl text-ink mb-4">
          {es ? "Siempre a tu lado" : "Always by your side"}
        </h2>
        <p
          className="text-ink-secondary mx-auto"
          style={{ maxWidth: "44ch", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}
        >
          {es
            ? "No terminamos con la instalación. Te acompañamos toda la vida útil de tu equipo."
            : "We don't stop at installation. We support you throughout your equipment's life."}
        </p>
      </div>

      {/* Service tiles — same #f5f5f7 Apple tile pattern */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "20px" }}>
        {SERVICIOS.map((svc) => (
          <Link
            key={svc.path}
            href={`/${locale}${svc.path}`}
            className="group flex flex-col p-8 transition-transform duration-300 hover:scale-[1.009]"
            style={{
              background: "rgb(245, 245, 247)",
              borderRadius: "var(--corner-radius)",
            }}
          >
            {/* Number */}
            <span
              className="block mb-8 select-none"
              style={{
                fontSize: "3.8rem",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                fontWeight: 600,
                color: "var(--primary)",
                opacity: 0.18,
              }}
              aria-hidden
            >
              {svc.num}
            </span>

            <h3
              className="text-ink font-semibold mb-3 group-hover:text-[var(--cta-blue)] transition-colors"
              style={{ fontSize: "1.1rem", letterSpacing: "-0.018em", lineHeight: 1.2 }}
            >
              {es ? svc.titleEs : svc.titleEn}
            </h3>

            <p
              className="text-ink-secondary mb-8"
              style={{ fontSize: "0.9rem", lineHeight: 1.47, letterSpacing: "-0.01em", maxWidth: "26ch" }}
            >
              {es ? svc.descEs : svc.descEn}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <span
                className="text-[0.75rem] font-semibold px-3 py-1"
                style={{
                  background: "rgba(10, 74, 153, 0.08)",
                  color: "var(--primary)",
                  borderRadius: "980px",
                  letterSpacing: "0.02em",
                }}
              >
                {es ? svc.badgeEs : svc.badgeEn}
              </span>
              <ChevronRight
                size={17}
                className="text-ink-tertiary group-hover:text-[var(--cta-blue)] group-hover:translate-x-0.5 transition-all"
                aria-hidden
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
