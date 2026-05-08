"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(2, "Campo obligatorio"),
  province: z.string().optional(),
  phone: z.string().min(9, "Teléfono inválido").max(20),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  howKnown: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  privacy: z.boolean().refine((v) => v, "Debes aceptar la política de privacidad"),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const locale = useLocale();
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <CheckCircle size={56} className="text-[var(--success)]" aria-hidden />
        <h3 className="font-display text-2xl font-bold text-ink">{t("successTitle")}</h3>
        <p className="text-muted-foreground">{t("successDesc")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[var(--primary)] font-semibold hover:underline text-sm mt-2"
        >
          {locale === "es" ? "Enviar otro mensaje" : "Send another message"}
        </button>
      </div>
    );
  }

  const howKnownOptions = [
    { value: "google", label: t("howKnownOptions.google") },
    { value: "recommendation", label: t("howKnownOptions.recommendation") },
    { value: "facebook", label: t("howKnownOptions.facebook") },
    { value: "advertising", label: t("howKnownOptions.advertising") },
    { value: "other", label: t("howKnownOptions.other") },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t("name")} error={errors.name?.message}>
          <Input
            {...register("name")}
            placeholder={locale === "es" ? "Tu nombre" : "Your name"}
            className={cn(errors.name && "border-destructive")}
          />
        </Field>
        <Field label={t("phone")} error={errors.phone?.message} required>
          <Input
            {...register("phone")}
            type="tel"
            placeholder="900 100 133"
            aria-required
            className={cn(errors.phone && "border-destructive")}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t("city")} error={errors.city?.message} required>
          <Input
            {...register("city")}
            placeholder={locale === "es" ? "Tu ciudad" : "Your city"}
            aria-required
            className={cn(errors.city && "border-destructive")}
          />
        </Field>
        <Field label={t("province")} error={errors.province?.message}>
          <Input
            {...register("province")}
            placeholder={locale === "es" ? "Provincia" : "Province"}
          />
        </Field>
      </div>

      <Field label={t("email")} error={errors.email?.message}>
        <Input
          {...register("email")}
          type="email"
          placeholder="correo@ejemplo.com"
          className={cn(errors.email && "border-destructive")}
        />
      </Field>

      <Field label={t("howKnown")} error={errors.howKnown?.message}>
        <select
          {...register("howKnown")}
          className="w-full h-12 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">{locale === "es" ? "Seleccionar..." : "Select..."}</option>
          {howKnownOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t("subject")} error={errors.subject?.message}>
        <Input
          {...register("subject")}
          placeholder={
            locale === "es"
              ? "Ej: Presupuesto silla salvaescaleras"
              : "E.g.: Quote for stairlift"
          }
        />
      </Field>

      <Field label={t("message")} error={errors.message?.message}>
        <Textarea
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          rows={4}
          className="resize-none"
        />
      </Field>

      {/* Privacy consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          {...register("privacy")}
          className="mt-1 h-4 w-4 rounded border-border accent-[var(--primary)]"
          aria-required
        />
        <label htmlFor="privacy" className="text-sm text-muted-foreground leading-snug">
          {t("privacy")}{" "}
          <Link
            href={`/${locale}/politica-privacidad`}
            className="text-[var(--primary)] underline hover:no-underline"
          >
            {t("privacyLink")}
          </Link>
        </label>
      </div>
      {errors.privacy && (
        <p className="text-destructive text-sm flex items-center gap-1">
          <AlertCircle size={14} />
          {errors.privacy.message}
        </p>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-4 py-3">
          <AlertCircle size={16} />
          {t("errorDesc")}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold text-base"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-destructive text-xs flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}
