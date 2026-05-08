"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuoteFormData {
  phone: string;
  stairType: string;
  province: string;
}

interface Props {
  locale: string;
  light?: boolean;
}

export default function QuickQuoteForm({ locale, light }: Props) {
  const t = useTranslations("home.quickQuote");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>();

  async function onSubmit(data: QuoteFormData) {
    setStatus("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "quick-quote", locale }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center text-white py-8">
        <CheckCircle size={56} className="mx-auto mb-4 text-[var(--success)]" aria-hidden />
        <h3 className="font-display text-2xl font-bold mb-2">
          {locale === "es" ? "¡Mensaje recibido!" : "Message received!"}
        </h3>
        <p className="text-white/80">
          {locale === "es"
            ? "Te llamaremos en menos de 24 horas."
            : "We will call you within 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
        {t("title")}
      </h2>
      <p className="text-white/80 mb-10 text-lg">{t("subtitle")}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="text-left">
            <Label htmlFor="qqphone" className="text-white/80 text-sm mb-1.5 block">
              {t("phone")} *
            </Label>
            <Input
              id="qqphone"
              type="tel"
              autoComplete="tel"
              placeholder="600 000 000"
              className={cn(
                "h-12 bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-white focus:bg-white/20",
                errors.phone && "border-red-400"
              )}
              aria-required="true"
              aria-invalid={!!errors.phone}
              {...register("phone", {
                required: true,
                minLength: 9,
                pattern: /^[+\d\s\-()]{9,15}$/,
              })}
            />
            {errors.phone && (
              <p className="text-red-300 text-xs mt-1">
                {locale === "es" ? "Introduce un teléfono válido" : "Enter a valid phone number"}
              </p>
            )}
          </div>

          <div className="text-left">
            <Label htmlFor="qqstairtype" className="text-white/80 text-sm mb-1.5 block">
              {t("stairType")}
            </Label>
            <select
              id="qqstairtype"
              className="w-full h-12 rounded-md border border-white/30 bg-white/15 text-white px-3 text-sm focus:outline-none focus:border-white focus:bg-white/20"
              {...register("stairType")}
            >
              <option value="straight" className="text-ink">{t("stairTypeOptions.straight")}</option>
              <option value="curved" className="text-ink">{t("stairTypeOptions.curved")}</option>
              <option value="outdoor" className="text-ink">{t("stairTypeOptions.outdoor")}</option>
              <option value="unknown" className="text-ink">{t("stairTypeOptions.unknown")}</option>
            </select>
          </div>

          <div className="text-left">
            <Label htmlFor="qqprovince" className="text-white/80 text-sm mb-1.5 block">
              {t("province")}
            </Label>
            <Input
              id="qqprovince"
              type="text"
              autoComplete="address-level2"
              placeholder={locale === "es" ? "Málaga, Sevilla..." : "Málaga, Seville..."}
              className="h-12 bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-white focus:bg-white/20"
              {...register("province")}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          size="lg"
          className="w-full sm:w-auto min-w-[280px] bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 text-base shadow-lg"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" aria-hidden />
              {locale === "es" ? "Enviando..." : "Sending..."}
            </>
          ) : (
            t("submit")
          )}
        </Button>

        {status === "error" && (
          <p className="mt-3 text-red-300 text-sm flex items-center justify-center gap-1.5">
            <AlertCircle size={14} aria-hidden />
            {locale === "es"
              ? "Error. Llámanos al 900 100 133."
              : "Error. Please call 900 100 133."}
          </p>
        )}

        <p className="mt-4 text-xs text-white/50 max-w-md mx-auto">
          {t("legal")}{" "}
          <Link
            href={`/${locale}/politica-privacidad`}
            className="underline hover:text-white/80"
          >
            {locale === "es" ? "Política de privacidad" : "Privacy policy"}
          </Link>
        </p>
      </form>
    </div>
  );
}
