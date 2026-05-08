"use client";

import { MessageCircle } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const MESSAGES: Record<string, string> = {
  default: "Hola, me gustaría recibir información sobre sus productos de accesibilidad.",
  stairlifts: "Hola, me gustaría recibir información sobre sus sillas salvaescaleras.",
  platforms: "Hola, me gustaría recibir información sobre sus plataformas salvaescaleras.",
  "vertical-lifts": "Hola, me gustaría recibir información sobre sus elevadores verticales.",
  "pool-lift": "Hola, me gustaría recibir información sobre su grúa de piscina.",
  contacto: "Hola, me gustaría solicitar un presupuesto.",
};

function getWhatsAppMessage(pathname: string): string {
  for (const [key, msg] of Object.entries(MESSAGES)) {
    if (key !== "default" && pathname.includes(key)) return msg;
  }
  return MESSAGES.default;
}

export default function WhatsAppButton() {
  const locale = useLocale();
  const pathname = usePathname();

  const message = encodeURIComponent(getWhatsAppMessage(pathname));
  const url = `https://wa.me/34628342179?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-[#25D366] hover:bg-[#22bf5c] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Contactar por WhatsApp (abre en nueva pestaña)"
    >
      <MessageCircle size={22} aria-hidden />
      <span className="text-sm font-bold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
        {locale === "es" ? "WhatsApp" : "WhatsApp"}
      </span>
    </a>
  );
}
