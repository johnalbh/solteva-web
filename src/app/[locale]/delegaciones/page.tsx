import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";
import { delegaciones, centralContact, coverageProvinces } from "@/lib/delegaciones";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Delegaciones — Solteva Elevación"
        : "Branches — Solteva Elevación",
    description:
      locale === "es"
        ? "6 delegaciones propias en Andalucía y servicio en más de 20 provincias. Encuentra la delegación Solteva más cercana."
        : "6 own branches in Andalusia and service in over 20 provinces. Find your nearest Solteva branch.",
    locale,
    path: "/delegaciones",
  });
}

export default async function DelegacionesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "branches" });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-white/85">{t("subtitle")}</p>
        </div>
      </section>

      {/* Central contact */}
      <section className="bg-[var(--accent)] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold opacity-90">{t("centralPhone")}</p>
              <a
                href={`tel:${centralContact.phone}`}
                className="font-display text-3xl font-bold hover:opacity-80 transition-opacity"
              >
                {centralContact.phone}
              </a>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div className="text-center">
              <p className="text-sm opacity-90">{t("scheduleValue")}</p>
              <div className="flex items-center gap-2 font-semibold">
                <Clock size={16} aria-hidden />
                {locale === "es" ? centralContact.scheduleEs : centralContact.scheduleEn}
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <a
              href={`mailto:${centralContact.email}`}
              className="font-semibold hover:opacity-80 transition-opacity"
            >
              {centralContact.email}
            </a>
          </div>
        </div>
      </section>

      {/* Branch cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {delegaciones.map((d) => (
              <article
                key={d.id}
                className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-[var(--primary)] px-6 py-4">
                  <h2 className="font-display font-bold text-xl text-white">{d.name}</h2>
                  <p className="text-white/80 text-sm flex items-center gap-1.5 mt-1">
                    <MapPin size={13} aria-hidden />
                    {d.city}, {d.province}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-muted-foreground" aria-hidden />
                    <address className="not-italic text-sm text-foreground leading-snug">
                      {d.address}
                      <br />
                      {d.postalCode} {d.city}
                    </address>
                  </div>

                  <div className="space-y-2">
                    {d.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 text-sm text-foreground hover:text-[var(--primary)] transition-colors"
                      >
                        <Phone size={15} aria-hidden />
                        {phone}
                      </a>
                    ))}
                  </div>

                  {d.email && (
                    <a
                      href={`mailto:${d.email}`}
                      className="flex items-center gap-2 text-sm text-foreground hover:text-[var(--primary)] transition-colors"
                    >
                      <Mail size={15} aria-hidden />
                      {d.email}
                    </a>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={15} aria-hidden />
                    {t("scheduleValue")}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.address + " " + d.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "flex-1 gap-1.5"
                      )}
                    >
                      <ExternalLink size={13} aria-hidden />
                      Google Maps
                    </a>
                    <a
                      href={`https://maps.apple.com/?address=${encodeURIComponent(d.address + ", " + d.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "flex-1 gap-1.5"
                      )}
                    >
                      <ExternalLink size={13} aria-hidden />
                      Apple Maps
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-12 bg-[var(--warm-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-4">
            {t("coverage")}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {coverageProvinces.map((p) => (
              <span
                key={p}
                className="px-3 py-1.5 rounded-full bg-white border border-border text-sm text-muted-foreground shadow-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            {locale === "es"
              ? "¿No encuentras tu provincia?"
              : "Can't find your province?"}
          </h2>
          <p className="text-white/80 mb-8">
            {locale === "es"
              ? "Llámanos al 900 100 133 (gratuito) y te asignamos el técnico más cercano."
              : "Call us on 900 100 133 (free) and we'll assign your nearest technician."}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 px-8"
            )}
          >
            {locale === "es" ? "Pedir presupuesto" : "Request a quote"}
          </Link>
        </div>
      </section>
    </div>
  );
}
