"use client";

import { useState } from "react";
import { Phone, FileText } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import QuoteDrawer from "./QuoteDrawer";

const WA_MESSAGES: Record<string, string> = {
  "sillas-salvaescaleras": "Hola, me gustaría información sobre sillas salvaescaleras.",
  plataformas: "Hola, me gustaría información sobre plataformas salvaescaleras.",
  "elevadores-verticales": "Hola, me gustaría información sobre elevadores verticales.",
  "grua-piscina": "Hola, me gustaría información sobre la grúa de piscina.",
  default: "Hola, me gustaría recibir información sobre sus productos de accesibilidad.",
};

export default function FloatingActions() {
  const locale = useLocale();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const es = locale === "es";

  let waMsg = WA_MESSAGES.default;
  for (const [key, msg] of Object.entries(WA_MESSAGES)) {
    if (key !== "default" && pathname.includes(key)) { waMsg = msg; break; }
  }
  const waUrl = `https://wa.me/34628342179?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      {/* Floating stack — bottom-right */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 20,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        {/* WhatsApp */}
        <FABLink
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          bg="#25D366"
          shadow="rgba(37,211,102,0.38)"
          label="WhatsApp"
          aria-label={es ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </FABLink>

        {/* Presupuesto */}
        <FABButton
          onClick={() => setDrawerOpen(true)}
          bg="var(--cta-blue)"
          shadow="rgba(0,113,227,0.38)"
          label={es ? "Presupuesto gratis" : "Free quote"}
          aria-label={es ? "Pedir presupuesto gratis" : "Get free quote"}
        >
          <FileText size={20} aria-hidden />
        </FABButton>

        {/* Llamar */}
        <FABLink
          href="tel:+34900100133"
          bg="rgb(29,29,31)"
          shadow="rgba(0,0,0,0.22)"
          label="900 100 133"
          aria-label={es ? "Llamar ahora" : "Call now"}
        >
          <Phone size={20} aria-hidden />
        </FABLink>
      </div>

      <QuoteDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} locale={locale} />
    </>
  );
}

/* ── Pill link ────────────────────────────────────────── */
function FABLink({
  href, target, rel, bg, shadow, label, children, "aria-label": ariaLabel,
}: {
  href: string; target?: string; rel?: string;
  bg: string; shadow: string; label: string;
  children: React.ReactNode; "aria-label": string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        background: bg, color: "#fff",
        borderRadius: 980,
        padding: "0 18px",
        height: 48,
        textDecoration: "none",
        fontSize: "0.9rem", fontWeight: 600, letterSpacing: "-0.012em",
        boxShadow: `0 4px 18px ${shadow}`,
        whiteSpace: "nowrap",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {children}
      <span className="hidden sm:block">{label}</span>
    </a>
  );
}

/* ── Pill button ──────────────────────────────────────── */
function FABButton({
  onClick, bg, shadow, label, children, "aria-label": ariaLabel,
}: {
  onClick: () => void;
  bg: string; shadow: string; label: string;
  children: React.ReactNode; "aria-label": string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        background: bg, color: "#fff",
        borderRadius: 980,
        padding: "0 18px",
        height: 48,
        border: "none", cursor: "pointer",
        fontSize: "0.9rem", fontWeight: 600, letterSpacing: "-0.012em",
        boxShadow: `0 4px 18px ${shadow}`,
        whiteSpace: "nowrap",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {children}
      <span className="hidden sm:block">{label}</span>
    </button>
  );
}
