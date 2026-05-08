"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "solteva_cookie_consent";

type ConsentValue = "accepted" | "rejected" | null;

interface Props {
  locale: string;
}

export default function CookieBanner({ locale }: Props) {
  const [consent, setConsent] = useState<ConsentValue | "loading">("loading");
  const isEs = locale === "es";

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue;
      setConsent(stored);
    } catch {
      setConsent(null);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {}
    setConsent("accepted");
    // Fire GA4 if present
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, unknown>).gtag as (
        cmd: string,
        target: string,
        params: Record<string, string>
      ) => void;
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
      });
    }
  }

  function reject() {
    try {
      localStorage.setItem(CONSENT_KEY, "rejected");
    } catch {}
    setConsent("rejected");
  }

  if (consent !== null && consent !== "loading") return null;
  if (consent === "loading") return null;

  return (
    <div
      role="dialog"
      aria-label={isEs ? "Aviso de cookies" : "Cookie notice"}
      className="fixed bottom-0 left-0 right-0 z-[150] md:bottom-4 md:left-4 md:right-auto md:max-w-sm"
    >
      <div className="bg-white border border-slate-200 shadow-2xl rounded-none md:rounded-2xl p-5">
        <div className="flex items-start gap-3 mb-4">
          <Cookie size={22} className="text-[var(--primary)] shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold text-[var(--ink)] text-sm mb-1">
              {isEs ? "Uso de cookies" : "Cookie usage"}
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">
              {isEs
                ? "Usamos cookies propias para el funcionamiento del sitio. Opcionalmente podemos usar cookies analíticas (Google Analytics) para mejorar nuestro servicio. Puedes aceptar o rechazar las cookies no esenciales."
                : "We use essential cookies for the site to function. Optionally we may use analytics cookies (Google Analytics) to improve our service. You can accept or decline non-essential cookies."}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={accept}
            className={cn(
              buttonVariants({ size: "sm" }),
              "flex-1 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-semibold text-xs h-9"
            )}
          >
            {isEs ? "Aceptar" : "Accept"}
          </button>
          <button
            onClick={reject}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex-1 text-xs h-9 border-slate-300 text-slate-600"
            )}
          >
            {isEs ? "Solo esenciales" : "Essential only"}
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400 text-center">
          <Link
            href={`/${locale}/politica-privacidad`}
            className="underline hover:text-slate-600 transition-colors"
          >
            {isEs ? "Política de privacidad" : "Privacy policy"}
          </Link>
        </p>
      </div>
    </div>
  );
}
