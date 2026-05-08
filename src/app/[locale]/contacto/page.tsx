import { getTranslations } from "next-intl/server";
import { Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { generateSEOMeta } from "@/lib/seo";
import ContactForm from "@/components/forms/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return generateSEOMeta({
    title: t("contactTitle"),
    description: t("contactDesc"),
    locale,
    path: "/contacto",
  });
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-white/85">{t("subtitle")}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form — takes 3 cols */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
                <h2 className="font-display text-2xl font-bold text-ink mb-6">
                  {t("form.title")}
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Info — takes 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              {/* Phone */}
              <div className="bg-[var(--primary)] text-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Phone size={20} aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold">{t("info.phone")}</p>
                    <p className="text-white/70 text-sm">{t("info.phoneSub")}</p>
                  </div>
                </div>
                <a
                  href="tel:+34900100133"
                  className="font-display text-3xl font-bold hover:opacity-80 transition-opacity"
                >
                  {t("info.phone")}
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[var(--warm-bg)] flex items-center justify-center">
                    <Mail size={20} className="text-[var(--primary)]" aria-hidden />
                  </div>
                  <p className="font-semibold text-foreground">{t("info.email")}</p>
                </div>
                <a
                  href={`mailto:${t("info.email")}`}
                  className="text-[var(--primary)] hover:underline font-medium"
                >
                  {t("info.email")}
                </a>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[var(--warm-bg)] flex items-center justify-center">
                    <Clock size={20} className="text-[var(--primary)]" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t("info.schedule")}</p>
                    <p className="text-muted-foreground">{t("info.scheduleHours")}</p>
                  </div>
                </div>
              </div>

              {/* Promises */}
              <div className="bg-[var(--warm-bg)] rounded-2xl p-6 space-y-3">
                <h3 className="font-semibold text-foreground">
                  {locale === "es" ? "Te prometemos" : "We promise you"}
                </h3>
                {[t("info.freeVisit"), t("info.noCommitment")].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[var(--success)] shrink-0" aria-hidden />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
