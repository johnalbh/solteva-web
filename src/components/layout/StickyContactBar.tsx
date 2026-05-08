"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { Phone, MessageCircle, FileText } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/34628342179?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20productos%20de%20accesibilidad.";

export default function StickyContactBar() {
  const locale = useLocale();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      role="complementary"
      aria-label={locale === "es" ? "Contacto rápido" : "Quick contact"}
    >
      <div className="bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.1)] grid grid-cols-3">
        <a
          href="tel:+34900100133"
          className="flex flex-col items-center justify-center gap-0.5 py-3 px-2 text-[var(--primary)] hover:bg-secondary transition-colors"
          aria-label="Llamar 900 100 133"
        >
          <Phone size={20} aria-hidden />
          <span className="text-xs font-semibold">
            {locale === "es" ? "Llamar" : "Call"}
          </span>
        </a>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-3 px-2 bg-[#25D366] text-white hover:bg-[#22bf5c] transition-colors"
          aria-label="WhatsApp (abre en nueva pestaña)"
        >
          <MessageCircle size={20} aria-hidden />
          <span className="text-xs font-bold">WhatsApp</span>
        </a>

        <Link
          href={`/${locale}/contacto`}
          className="flex flex-col items-center justify-center gap-0.5 py-3 px-2 bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent)]/90 transition-colors"
          aria-label={locale === "es" ? "Pedir presupuesto" : "Get a quote"}
        >
          <FileText size={20} aria-hidden />
          <span className="text-xs font-bold">
            {locale === "es" ? "Presupuesto" : "Get quote"}
          </span>
        </Link>
      </div>

      {/* Safe area for phones with home indicator */}
      <div className="bg-white h-safe-area-inset-bottom" />
    </div>
  );
}
