"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { X, Clock, Phone, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  locale: string;
}

const STORAGE_KEY = "solteva_exit_intent_shown";
const DELAY_MS = 15000;

export default function ExitIntentModal({ locale }: Props) {
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);
  const isEs = locale === "es";

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    // Desktop: mouse leaves viewport upward
    function onMouseLeave(e: MouseEvent) {
      if (shownRef.current) return;
      if (e.clientY <= 0) {
        shownRef.current = true;
        setVisible(true);
      }
    }

    // Mobile: rapid upward scroll (approximates back-gesture or about-to-leave)
    let lastScrollY = window.scrollY;
    let scrollTimer: ReturnType<typeof setTimeout>;
    function onScroll() {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        if (shownRef.current) return;
        // Scrolled up quickly and near top
        if (delta < -80 && window.scrollY < 300) {
          shownRef.current = true;
          setVisible(true);
        }
      }, 150);
    }

    // Fallback: show after DELAY_MS if user hasn't triggered it yet
    const fallbackTimer = setTimeout(() => {
      if (shownRef.current) return;
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) return;
      } catch {}
      shownRef.current = true;
      setVisible(true);
    }, DELAY_MS);

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(fallbackTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEs ? "Oferta especial" : "Special offer"}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[var(--primary)] text-white px-6 py-5 text-center relative">
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors p-1"
            aria-label={isEs ? "Cerrar" : "Close"}
          >
            <X size={18} />
          </button>
          <div className="text-3xl mb-2">🎁</div>
          <h2 className="font-display text-xl font-bold">
            {isEs ? "¡Espera! Visita gratuita en 24h" : "Wait! Free visit within 24h"}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-[var(--ink)] text-center mb-5 leading-relaxed">
            {isEs
              ? "Antes de irte, recuerda que puedes solicitar una visita de nuestro técnico completamente gratuita y sin compromiso."
              : "Before you go, remember you can request a completely free, no-obligation visit from our technician."}
          </p>

          <ul className="space-y-2 mb-6">
            {(isEs
              ? [
                  "Visita gratuita en menos de 24 horas",
                  "Presupuesto personalizado sin compromiso",
                  "Instalación en 3-5 días sin obras",
                  "Financiación desde 38,91 €/mes",
                ]
              : [
                  "Free visit within 24 hours",
                  "Personalised quote with no obligation",
                  "Installation in 3-5 days, no building work",
                  "Financing from €38.91/month",
                ]
            ).map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle size={16} className="text-[var(--success)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            <Link
              href={`/${locale}/contacto`}
              onClick={dismiss}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-12 text-sm"
              )}
            >
              {isEs ? "Solicitar visita gratuita" : "Request a free visit"}
            </Link>
            <a
              href="tel:+34900100133"
              onClick={dismiss}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5 font-bold h-12 text-sm"
              )}
            >
              <Phone size={16} className="mr-2" aria-hidden />
              900 100 133
            </a>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
            <Clock size={12} />
            {isEs
              ? "Atención: Lunes a viernes, 8:30–14:30h"
              : "Office hours: Monday to Friday, 8:30–14:30"}
          </p>
        </div>

        {/* Footer dismiss */}
        <div className="pb-4 text-center">
          <button
            onClick={dismiss}
            className="text-slate-400 hover:text-slate-600 text-xs underline"
          >
            {isEs ? "No, gracias" : "No thanks"}
          </button>
        </div>
      </div>
    </div>
  );
}
