"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale } from "next-intl";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Phone } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Nombre obligatorio"),
  phone: z.string().min(9, "Teléfono inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  city: z.string().min(2, "Ciudad obligatoria"),
  subject: z.string().optional(),
  message: z.string().optional(),
  privacy: z.boolean().refine((v) => v, "Requerido"),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const locale = useLocale();
  const es = locale === "es";
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, type: "contact" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(52,199,89,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <CheckCircle2 size={36} style={{ color: "rgb(52,199,89)" }} aria-hidden />
        </div>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 600, letterSpacing: "-0.02em", color: "rgb(29,29,31)", marginBottom: 10 }}>
          {es ? "¡Mensaje enviado!" : "Message sent!"}
        </h3>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "rgb(110,110,115)", marginBottom: 28 }}>
          {es
            ? "Nuestro equipo te contactará en menos de 24 horas. También puedes llamarnos ahora:"
            : "Our team will contact you within 24 hours. You can also call us now:"}
        </p>
        <a href="tel:+34900100133" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgb(245,245,247)", color: "rgb(29,29,31)", borderRadius: 980, padding: "12px 24px", fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.014em", textDecoration: "none" }}>
          <Phone size={16} aria-hidden /> 900 100 133
        </a>
        <button onClick={() => setStatus("idle")} style={{ display: "block", margin: "16px auto 0", background: "none", border: "none", fontSize: "0.85rem", color: "rgb(134,134,139)", cursor: "pointer", letterSpacing: "-0.01em" }}>
          {es ? "Enviar otro mensaje" : "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input type="text" {...register("honeypot")} style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden />

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
        <AppleField
          label={es ? "Nombre *" : "Name *"}
          error={errors.name?.message}
          inputProps={{ ...register("name"), type: "text", placeholder: es ? "Tu nombre" : "Your name", autoComplete: "name" }}
        />
        <AppleField
          label={es ? "Teléfono *" : "Phone *"}
          error={errors.phone?.message}
          inputProps={{ ...register("phone"), type: "tel", placeholder: "600 000 000", autoComplete: "tel" }}
        />
      </div>

      {/* Email + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
        <AppleField
          label="Email"
          error={errors.email?.message}
          inputProps={{ ...register("email"), type: "email", placeholder: "correo@ejemplo.com", autoComplete: "email" }}
        />
        <AppleField
          label={es ? "Ciudad *" : "City *"}
          error={errors.city?.message}
          inputProps={{ ...register("city"), type: "text", placeholder: es ? "Tu ciudad" : "Your city", autoComplete: "address-level2" }}
        />
      </div>

      {/* Subject */}
      <AppleField
        label={es ? "Asunto" : "Subject"}
        error={errors.subject?.message}
        inputProps={{ ...register("subject"), type: "text", placeholder: es ? "Ej: Presupuesto silla salvaescaleras recta" : "E.g.: Quote for straight stairlift" }}
      />

      {/* Message */}
      <div>
        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "rgb(110,110,115)", letterSpacing: "-0.01em", marginBottom: 6 }}>
          {es ? "Mensaje" : "Message"}
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder={es
            ? "Cuéntanos tu situación: tipo de escalera, número de plantas, si conviven personas mayores…"
            : "Tell us your situation: staircase type, number of floors, elderly residents…"}
          style={{
            width: "100%", borderRadius: 14, border: "1.5px solid rgb(232,232,237)",
            background: "rgb(245,245,247)", padding: "14px 16px",
            fontSize: "0.95rem", letterSpacing: "-0.012em", color: "rgb(29,29,31)",
            outline: "none", resize: "vertical", fontFamily: "inherit",
            lineHeight: 1.5, boxSizing: "border-box",
            transition: "border-color 0.18s, background 0.18s",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--cta-blue)"; e.currentTarget.style.background = "#fff"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgb(232,232,237)"; e.currentTarget.style.background = "rgb(245,245,247)"; }}
        />
      </div>

      {/* Privacy */}
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
        <input
          type="checkbox"
          {...register("privacy")}
          style={{ marginTop: 3, width: 18, height: 18, accentColor: "var(--cta-blue)", flexShrink: 0, cursor: "pointer" }}
        />
        <span style={{ fontSize: "0.82rem", lineHeight: 1.5, color: "rgb(110,110,115)" }}>
          {es ? "Acepto la " : "I accept the "}
          <Link href={`/${locale}/politica-privacidad`} style={{ color: "var(--cta-blue)", textDecoration: "underline" }}>
            {es ? "política de privacidad" : "privacy policy"}
          </Link>
          {es ? " y consiento el tratamiento de mis datos." : " and consent to processing of my data."}
        </span>
      </label>
      {errors.privacy && (
        <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "rgb(255,59,48)", marginTop: -8 }}>
          <AlertCircle size={13} aria-hidden /> {errors.privacy.message}
        </p>
      )}

      {/* API error */}
      {status === "error" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", color: "rgb(255,59,48)", background: "rgba(255,59,48,0.07)", borderRadius: 12, padding: "12px 16px" }}>
          <AlertCircle size={16} aria-hidden />
          {es ? "Error al enviar. Inténtalo de nuevo o llama al 900 100 133." : "Error sending. Try again or call 900 100 133."}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          height: 52, borderRadius: 980,
          background: isSubmitting ? "rgb(134,134,139)" : "var(--cta-blue)",
          color: "#fff", border: "none", fontSize: "1rem", fontWeight: 600,
          letterSpacing: "-0.014em", cursor: isSubmitting ? "not-allowed" : "pointer",
          transition: "background 0.18s, transform 0.12s", marginTop: 4,
        }}
        onMouseEnter={(e) => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.transform = "scale(1.01)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      >
        {isSubmitting ? (es ? "Enviando…" : "Sending…") : (es ? "Enviar mensaje" : "Send message")}
      </button>
    </form>
  );
}

function AppleField({ label, error, inputProps }: {
  label: string; error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "rgb(110,110,115)", letterSpacing: "-0.01em", marginBottom: 6 }}>
        {label}
      </label>
      <input
        {...inputProps}
        style={{
          width: "100%", height: 50, borderRadius: 14,
          border: `1.5px solid ${error ? "rgb(255,59,48)" : "rgb(232,232,237)"}`,
          background: error ? "rgba(255,59,48,0.04)" : "rgb(245,245,247)",
          padding: "0 16px", fontSize: "0.95rem", letterSpacing: "-0.012em",
          color: "rgb(29,29,31)", outline: "none", boxSizing: "border-box",
          transition: "border-color 0.18s, background 0.18s",
        }}
        onFocus={(e) => { if (!error) { e.currentTarget.style.borderColor = "var(--cta-blue)"; e.currentTarget.style.background = "#fff"; } }}
        onBlur={(e) => { if (!error) { e.currentTarget.style.borderColor = "rgb(232,232,237)"; e.currentTarget.style.background = "rgb(245,245,247)"; } }}
      />
      {error && (
        <p style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "rgb(255,59,48)", marginTop: 4 }}>
          <AlertCircle size={12} aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}
