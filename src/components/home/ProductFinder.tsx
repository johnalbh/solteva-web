"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Building2, Waves, Users, ChevronRight, RotateCcw, Check } from "lucide-react";

interface Props { locale: string }

type Q1Answer = "stair" | "building" | "pool" | null;
type Q2Answer = "sit" | "wheelchair" | null;

const RESULT = {
  stairlift: {
    slugEs: "sillas-salvaescaleras",
    titleEs: "Silla Salvaescaleras",
    titleEn: "Stairlift",
    descEs: "Instalación en 3-5 días, sin obras. Modelos rectos, curvos y para exterior. Desde 2.490 €.",
    descEn: "Installed in 3-5 days, no construction. Straight, curved and outdoor models. From €2,490.",
    color: "rgba(0,113,227,0.08)",
    textColor: "rgb(0,113,227)",
  },
  platform: {
    slugEs: "plataformas",
    titleEs: "Plataforma Elevadora",
    titleEn: "Platform Lift",
    descEs: "La solución para usuarios de silla de ruedas. Sube y baja la escalera sin levantarse del asiento.",
    descEn: "The solution for wheelchair users. Go up and down stairs without leaving the seat.",
    color: "rgba(10,74,153,0.08)",
    textColor: "rgb(10,74,153)",
  },
  lift: {
    slugEs: "elevadores-verticales",
    titleEs: "Elevador Vertical",
    titleEn: "Vertical Platform Lift",
    descEs: "La alternativa al ascensor para edificios de 2-4 plantas. Sin obras, sin sala de máquinas.",
    descEn: "The lift alternative for 2-4 storey buildings. No construction, no machine room.",
    color: "rgba(88,86,214,0.08)",
    textColor: "rgb(88,86,214)",
  },
  pool: {
    slugEs: "grua-piscina",
    titleEs: "Grúa de Piscina",
    titleEn: "Pool Hoist",
    descEs: "Sistema hidráulico sin electricidad cerca del agua. Instalación en 1 día sin obras.",
    descEn: "Hydraulic system, no electricity near the water. Installed in 1 day, no construction.",
    color: "rgba(0,155,170,0.1)",
    textColor: "rgb(0,130,145)",
  },
};

export default function ProductFinder({ locale }: Props) {
  const [q1, setQ1] = useState<Q1Answer>(null);
  const [q2, setQ2] = useState<Q2Answer>(null);
  const es = locale === "es";

  const resultKey = q1 === "building"
    ? "lift"
    : q1 === "pool"
    ? "pool"
    : q2 === "wheelchair"
    ? "platform"
    : q2 === "sit"
    ? "stairlift"
    : null;

  const result = resultKey ? RESULT[resultKey] : null;

  const reset = () => { setQ1(null); setQ2(null); };

  return (
    <div
      style={{
        background: "rgb(245,245,247)",
        borderRadius: "var(--corner-radius)",
        padding: "clamp(2rem, 4vw, 3.5rem)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <p className="eyebrow mb-3">{es ? "Encuentra tu solución" : "Find your solution"}</p>
        <h2
          className="text-ink"
          style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {es ? "¿Cuál es tu situación?" : "What is your situation?"}
        </h2>
        <p className="text-ink-secondary mx-auto mt-2" style={{ fontSize: "0.92rem", lineHeight: 1.5, maxWidth: "44ch" }}>
          {es ? "Responde 1-2 preguntas y te recomendamos el producto ideal." : "Answer 1-2 questions and we'll recommend the ideal product."}
        </p>
      </div>

      {/* Step 1 — only show if q1 not yet answered */}
      {!q1 && (
        <div>
          <p style={{ textAlign: "center", fontSize: "0.82rem", fontWeight: 600, color: "rgb(110,110,115)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 16 }}>
            {es ? "Necesito solución para…" : "I need a solution for…"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 12 }}>
            {[
              {
                id: "stair" as Q1Answer,
                Icon: Home,
                labelEs: "Escalera en casa o comunidad",
                labelEn: "Staircase at home or community",
              },
              {
                id: "building" as Q1Answer,
                Icon: Building2,
                labelEs: "Edificio sin ascensor",
                labelEn: "Building without a lift",
              },
              {
                id: "pool" as Q1Answer,
                Icon: Waves,
                labelEs: "Acceso a la piscina",
                labelEn: "Pool access",
              },
            ].map(({ id, Icon, labelEs, labelEn }) => (
              <button
                key={String(id)}
                onClick={() => setQ1(id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 12, padding: "24px 16px",
                  background: "#fff", borderRadius: 20, border: "1.5px solid transparent",
                  cursor: "pointer", transition: "border-color 0.18s, transform 0.15s",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cta-blue)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <span style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(0,113,227,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} style={{ color: "var(--cta-blue)" }} aria-hidden />
                </span>
                <span style={{ fontSize: "0.92rem", fontWeight: 600, letterSpacing: "-0.014em", color: "rgb(29,29,31)", lineHeight: 1.3 }}>
                  {es ? labelEs : labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — only for stair, before q2 answered */}
      {q1 === "stair" && !q2 && (
        <div>
          <p style={{ textAlign: "center", fontSize: "0.82rem", fontWeight: 600, color: "rgb(110,110,115)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 16 }}>
            {es ? "¿La persona puede sentarse y levantarse?" : "Can the person sit down and stand up?"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, maxWidth: 560, margin: "0 auto" }}>
            {[
              {
                id: "sit" as Q2Answer,
                Icon: Users,
                labelEs: "Sí, aunque con dificultad",
                labelEn: "Yes, though with difficulty",
                subEs: "Se puede sentar en la silla",
                subEn: "Can sit in a chair",
              },
              {
                id: "wheelchair" as Q2Answer,
                Icon: Users,
                labelEs: "No, usa silla de ruedas",
                labelEn: "No, uses a wheelchair",
                subEs: "No puede sentarse solo/a",
                subEn: "Cannot sit independently",
              },
            ].map(({ id, Icon, labelEs, labelEn, subEs, subEn }) => (
              <button
                key={String(id)}
                onClick={() => setQ2(id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 10, padding: "24px 16px",
                  background: "#fff", borderRadius: 20, border: "1.5px solid transparent",
                  cursor: "pointer", transition: "border-color 0.18s, transform 0.15s",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cta-blue)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <span style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(0,113,227,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} style={{ color: "var(--cta-blue)" }} aria-hidden />
                </span>
                <span style={{ fontSize: "0.92rem", fontWeight: 600, letterSpacing: "-0.014em", color: "rgb(29,29,31)", lineHeight: 1.3 }}>
                  {es ? labelEs : labelEn}
                </span>
                <span style={{ fontSize: "0.78rem", color: "rgb(110,110,115)" }}>
                  {es ? subEs : subEn}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={reset}
            style={{ display: "flex", alignItems: "center", gap: 6, margin: "16px auto 0", background: "none", border: "none", cursor: "pointer", fontSize: "0.82rem", color: "rgb(110,110,115)" }}
          >
            <RotateCcw size={12} aria-hidden />
            {es ? "Volver" : "Back"}
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div>
          <div
            style={{
              background: result.color,
              borderRadius: 20,
              padding: "28px 28px",
              maxWidth: 560,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                color: result.textColor, marginBottom: 12,
              }}
            >
              <Check size={13} aria-hidden />
              {es ? "Nuestra recomendación" : "Our recommendation"}
            </span>
            <h3
              style={{
                fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em",
                color: "rgb(29,29,31)", marginBottom: 10,
              }}
            >
              {es ? result.titleEs : result.titleEn}
            </h3>
            <p
              style={{
                fontSize: "0.92rem", lineHeight: 1.55, color: "rgb(110,110,115)",
                marginBottom: 22, maxWidth: "40ch", marginLeft: "auto", marginRight: "auto",
              }}
            >
              {es ? result.descEs : result.descEn}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href={`/${locale}/productos/${result.slugEs}`}
                className="btn-pill inline-flex items-center gap-1.5"
                style={{ background: result.textColor, color: "#fff" }}
              >
                {es ? "Ver modelos" : "View models"}
                <ChevronRight size={14} aria-hidden />
              </Link>
              <Link
                href={`/${locale}/contacto`}
                className="btn-pill"
                style={{ background: "#fff", color: "rgb(29,29,31)", border: "1.5px solid rgb(232,232,237)" }}
              >
                {es ? "Pedir visita gratis" : "Request free visit"}
              </Link>
            </div>
          </div>
          <button
            onClick={reset}
            style={{ display: "flex", alignItems: "center", gap: 6, margin: "16px auto 0", background: "none", border: "none", cursor: "pointer", fontSize: "0.82rem", color: "rgb(110,110,115)" }}
          >
            <RotateCcw size={12} aria-hidden />
            {es ? "Volver a empezar" : "Start over"}
          </button>
        </div>
      )}
    </div>
  );
}
