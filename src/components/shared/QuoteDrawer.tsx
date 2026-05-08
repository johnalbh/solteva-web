"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, CheckCircle2, Phone, Accessibility, MoveVertical, Waves, ArrowUpFromDot } from "lucide-react";

type Category = "stairlifts" | "platforms" | "verticalLifts" | "poolLift";
type Step = 1 | 2 | "success";

const CATS: { key: Category; es: string; en: string; icon: React.ElementType }[] = [
  { key: "stairlifts",    es: "Silla Salvaescaleras", en: "Stairlift",      icon: Accessibility },
  { key: "platforms",     es: "Plataforma Elevadora", en: "Platform Lift",  icon: ArrowUpFromDot },
  { key: "verticalLifts", es: "Elevador Vertical",    en: "Vertical Lift",  icon: MoveVertical },
  { key: "poolLift",      es: "Grúa de Piscina",      en: "Pool Hoist",     icon: Waves },
];

interface Props {
  open: boolean;
  onClose: () => void;
  locale: string;
  preselect?: Category;
}

export default function QuoteDrawer({ open, onClose, locale, preselect }: Props) {
  const es = locale === "es";
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>(preselect ? 2 : 1);
  const [category, setCategory] = useState<Category | null>(preselect ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Drive animation
  useEffect(() => {
    if (open) {
      setVisible(true);
      setStep(preselect ? 2 : 1);
      setCategory(preselect ?? null);
      setError("");
      setTimeout(() => firstInputRef.current?.focus(), 300);
    } else {
      setVisible(false);
    }
  }, [open, preselect]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          type: "quote",
          category,
          name: fd.get("name"),
          phone: fd.get("phone"),
          city: fd.get("city"),
        }),
      });
      if (!res.ok) throw new Error();
      setStep("success");
    } catch {
      setError(es ? "Error al enviar. Inténtalo de nuevo." : "Error sending. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open && !visible) return null;

  const catLabel = category ? CATS.find((c) => c.key === category)?.[es ? "es" : "en"] : "";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: "fixed", inset: 0, zIndex: 60,
          background: "rgba(0,0,0,0.46)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.32s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal
        aria-label={es ? "Solicitar presupuesto" : "Request a quote"}
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          zIndex: 61,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          maxHeight: "92svh",
          overflowY: "auto",
          transform: open ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.38s cubic-bezier(0.32,0.72,0,1)",
          willChange: "transform",
        }}
      >
        {/* Handle bar */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgb(210,210,215)" }} />
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {step === 2 && (
              <button
                onClick={() => { setStep(1); setCategory(null); }}
                style={{ background: "rgb(245,245,247)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                aria-label={es ? "Volver" : "Back"}
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <div>
              {step !== "success" && (
                <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgb(110,110,115)", marginBottom: 2 }}>
                  {es ? `Paso ${step} de 2` : `Step ${step} of 2`}
                </p>
              )}
              <h2 style={{ fontSize: "1.15rem", fontWeight: 600, letterSpacing: "-0.018em", color: "rgb(29,29,31)", margin: 0 }}>
                {step === 1 && (es ? "¿Qué producto necesitas?" : "What product do you need?")}
                {step === 2 && (es ? "Tus datos de contacto" : "Your contact details")}
                {step === "success" && (es ? "¡Solicitud recibida!" : "Request received!")}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "rgb(245,245,247)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            aria-label={es ? "Cerrar" : "Close"}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "0 24px 40px" }}>

          {/* ── STEP 1: Category selection ───────────── */}
          {step === 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {CATS.map(({ key, es: labelEs, en: labelEn, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => { setCategory(key); setStep(2); }}
                  style={{
                    background: "rgb(245,245,247)",
                    border: "2px solid transparent",
                    borderRadius: 20,
                    padding: "20px 16px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    transition: "all 0.18s ease",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--cta-blue)"; (e.currentTarget as HTMLElement).style.background = "rgba(0,113,227,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "transparent"; (e.currentTarget as HTMLElement).style.background = "rgb(245,245,247)"; }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(0,113,227,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={22} style={{ color: "var(--cta-blue)" }} aria-hidden />
                  </div>
                  <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "rgb(29,29,31)", letterSpacing: "-0.014em", lineHeight: 1.3 }}>
                    {es ? labelEs : labelEn}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* ── STEP 2: Contact form ─────────────────── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} noValidate>
              {/* Selected category badge */}
              {catLabel && (
                <div style={{ marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,113,227,0.08)", borderRadius: 980, padding: "5px 12px" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--cta-blue)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{catLabel}</span>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <QuoteField label={es ? "Tu nombre" : "Your name"} name="name" type="text" placeholder={es ? "María García" : "John Smith"} inputRef={firstInputRef} />
                <QuoteField label={es ? "Teléfono *" : "Phone *"} name="phone" type="tel" placeholder="600 000 000" required />
                <QuoteField label={es ? "Ciudad *" : "City *"} name="city" type="text" placeholder={es ? "Madrid" : "Madrid"} required />
              </div>

              {/* Honeypot */}
              <input type="text" name="honeypot" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden />

              <p style={{ fontSize: "0.78rem", color: "rgb(134,134,139)", lineHeight: 1.5, margin: "16px 0" }}>
                {es
                  ? "Al enviar aceptas nuestra política de privacidad. Te contactaremos en menos de 24 h."
                  : "By submitting you accept our privacy policy. We'll contact you within 24 h."}
              </p>

              {error && (
                <p style={{ fontSize: "0.85rem", color: "rgb(255,59,48)", background: "rgba(255,59,48,0.08)", borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  height: 52,
                  borderRadius: 980,
                  background: submitting ? "rgb(134,134,139)" : "var(--cta-blue)",
                  color: "#fff",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "-0.014em",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "background 0.18s",
                }}
              >
                {submitting
                  ? (es ? "Enviando…" : "Sending…")
                  : (es ? "Solicitar presupuesto gratis" : "Request free quote")}
              </button>
            </form>
          )}

          {/* ── SUCCESS ──────────────────────────────── */}
          {step === "success" && (
            <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(52,199,89,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <CheckCircle2 size={32} style={{ color: "rgb(52,199,89)" }} aria-hidden />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, letterSpacing: "-0.018em", color: "rgb(29,29,31)", marginBottom: 10 }}>
                {es ? "¡Solicitud enviada!" : "Request sent!"}
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "rgb(110,110,115)", marginBottom: 28 }}>
                {es
                  ? "Nuestro equipo te llamará en menos de 24 horas. También puedes llamarnos ahora:"
                  : "Our team will call you within 24 hours. You can also call us now:"}
              </p>
              <a
                href="tel:+34900100133"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgb(245,245,247)", color: "rgb(29,29,31)",
                  borderRadius: 980, padding: "12px 24px",
                  fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.014em",
                  textDecoration: "none",
                }}
              >
                <Phone size={16} aria-hidden /> 900 100 133
              </a>
              <button
                onClick={onClose}
                style={{ display: "block", margin: "20px auto 0", background: "none", border: "none", fontSize: "0.88rem", color: "rgb(134,134,139)", cursor: "pointer", letterSpacing: "-0.01em" }}
              >
                {es ? "Cerrar" : "Close"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function QuoteField({
  label, name, type, placeholder, required, inputRef,
}: {
  label: string; name: string; type: string; placeholder: string; required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "rgb(110,110,115)", letterSpacing: "-0.01em", marginBottom: 6 }}>
        {label}
      </label>
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={type === "tel" ? "tel" : type === "email" ? "email" : "name"}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 14,
          border: "1.5px solid rgb(232,232,237)",
          background: "rgb(245,245,247)",
          padding: "0 16px",
          fontSize: "1rem",
          letterSpacing: "-0.014em",
          color: "rgb(29,29,31)",
          outline: "none",
          transition: "border-color 0.18s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--cta-blue)"; e.currentTarget.style.background = "#fff"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgb(232,232,237)"; e.currentTarget.style.background = "rgb(245,245,247)"; }}
      />
    </div>
  );
}
