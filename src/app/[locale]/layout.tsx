import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyContactBar from "@/components/layout/StickyContactBar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ExitIntentModal from "@/components/shared/ExitIntentModal";
import CookieBanner from "@/components/shared/CookieBanner";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  alternates: {
    languages: {
      es: "/es",
      en: "/en",
      "x-default": "/es",
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <a href="#main-content" className="skip-link">
        {locale === "es" ? "Ir al contenido principal" : "Skip to main content"}
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyContactBar />
      <WhatsAppButton />
      <ExitIntentModal locale={locale} />
      <CookieBanner locale={locale} />
    </NextIntlClientProvider>
  );
}
