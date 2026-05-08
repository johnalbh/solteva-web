"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  locale: string;
}

const TERMS = [12, 24, 36, 48, 60];
const ANNUAL_RATE = 0.0799;
const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 15000;

function monthlyPayment(principal: number, months: number): number {
  const r = ANNUAL_RATE / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function FinancingCalculator({ locale }: Props) {
  const [amount, setAmount] = useState(3500);
  const [term, setTerm] = useState(36);

  const monthly = monthlyPayment(amount, term);
  const total = monthly * term;
  const interest = total - amount;

  const isES = locale === "es";

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
          <Calculator size={22} className="text-[var(--primary)]" aria-hidden />
        </div>
        <h3 className="font-display text-xl font-bold text-ink">
          {isES ? "Simulador de financiación" : "Financing calculator"}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        {isES
          ? "Calcula tu cuota mensual orientativa. Tipo de interés anual nominal del 7,99% TIN."
          : "Calculate your indicative monthly payment. 7.99% nominal annual interest rate."}
      </p>

      {/* Amount slider */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-foreground">
            {isES ? "Importe" : "Amount"}
          </label>
          <span className="font-display text-xl font-bold text-[var(--primary)]">
            {amount.toLocaleString(isES ? "es-ES" : "en-GB", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
        <input
          type="range"
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={100}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
          aria-label={isES ? "Importe a financiar" : "Amount to finance"}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {MIN_AMOUNT.toLocaleString(isES ? "es-ES" : "en-GB", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </span>
          <span>
            {MAX_AMOUNT.toLocaleString(isES ? "es-ES" : "en-GB", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>

      {/* Term selector */}
      <div className="space-y-3 mb-8">
        <p className="text-sm font-semibold text-foreground">
          {isES ? "Plazo" : "Term"}
        </p>
        <div className="flex gap-2 flex-wrap">
          {TERMS.map((t) => (
            <button
              key={t}
              onClick={() => setTerm(t)}
              className={cn(
                "flex-1 min-w-[52px] py-2 rounded-lg text-sm font-semibold border transition-all",
                t === term
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "bg-white text-foreground border-border hover:border-[var(--primary)]/50"
              )}
            >
              {t} {isES ? "m" : "mo"}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="bg-[var(--warm-bg)] rounded-xl p-5 mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
          {isES ? "Cuota mensual aproximada" : "Approximate monthly payment"}
        </p>
        <p className="font-display text-4xl font-bold text-[var(--primary)]">
          {monthly.toLocaleString(isES ? "es-ES" : "en-GB", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          <span className="text-base font-normal text-muted-foreground ml-1">
            /{isES ? "mes" : "month"}
          </span>
        </p>
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          <span>
            {isES ? "Total:" : "Total:"}{" "}
            {total.toLocaleString(isES ? "es-ES" : "en-GB", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </span>
          <span>
            {isES ? "Intereses:" : "Interest:"}{" "}
            {interest.toLocaleString(isES ? "es-ES" : "en-GB", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-5">
        {isES
          ? "Simulación orientativa sujeta a aprobación. Contacta para conocer las condiciones exactas de financiación."
          : "Indicative simulation subject to approval. Contact us for exact financing conditions."}
      </p>

      <Link
        href={`/${locale}/contacto`}
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-12 gap-2"
        )}
      >
        {isES ? "Solicitar financiación real" : "Request actual financing"}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
