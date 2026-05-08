import {
  Battery, Wrench, ShieldCheck, Ruler, Building2, Zap,
  Droplets, Sun, Home, Scale, CheckCircle2, Package, Timer,
} from "lucide-react";

interface FeatureCardsProps {
  features: { es: string; en: string }[];
  locale: string;
}

function getIcon(text: string): React.ElementType {
  const t = text.toLowerCase();
  if (t.includes("batería") || t.includes("battery") || t.includes("electricidad") || t.includes("electric")) return Battery;
  if (t.includes("instala") || t.includes("install") || t.includes("obra") || t.includes("días") || t.includes("days")) return Timer;
  if (t.includes("seguridad") || t.includes("safety") || t.includes("certif") || t.includes("iso") || t.includes("ce ")) return ShieldCheck;
  if (t.includes("medida") || t.includes("custom") || t.includes("fabricación") || t.includes("manufactur") || t.includes("diseñ")) return Ruler;
  if (t.includes("planta") || t.includes("floor") || t.includes("edificio") || t.includes("altura") || t.includes("height")) return Building2;
  if (t.includes("rápid") || t.includes("fast") || t.includes("urgente") || t.includes("quick")) return Zap;
  if (t.includes("agua") || t.includes("water") || t.includes("hidráulico") || t.includes("hydraulic") || t.includes("piscina")) return Droplets;
  if (t.includes("exterior") || t.includes("outdoor")) return Sun;
  if (t.includes("interior") || t.includes("indoor") || t.includes("domés") || t.includes("home")) return Home;
  if (t.includes("kg") || t.includes("capacidad") || t.includes("load") || t.includes("peso") || t.includes("reforzad")) return Scale;
  if (t.includes("espacio") || t.includes("space") || t.includes("cm ") || t.includes("reducido") || t.includes("slim") || t.includes("perfil")) return Package;
  if (t.includes("mantenimiento") || t.includes("maintenance") || t.includes("durabl")) return Wrench;
  return CheckCircle2;
}

export default function FeatureCards({ features, locale }: FeatureCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 16 }}>
      {features.map((f, i) => {
        const text = locale === "es" ? f.es : f.en;
        const Icon = getIcon(text);
        return (
          <div
            key={i}
            className="flex items-start gap-4 p-5"
            style={{
              background: "rgb(245, 245, 247)",
              borderRadius: "var(--corner-radius)",
            }}
          >
            <div
              className="shrink-0 flex items-center justify-center rounded-xl"
              style={{
                width: 40,
                height: 40,
                background: "rgba(0, 113, 227, 0.08)",
              }}
            >
              <Icon size={20} style={{ color: "var(--cta-blue)" }} aria-hidden />
            </div>
            <p
              className="text-ink"
              style={{ fontSize: "0.9rem", lineHeight: 1.47, letterSpacing: "-0.01em", paddingTop: 2 }}
            >
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
