"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { faqs } from "@/lib/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SHOW_COUNT = 6;

export default function FAQAccordion() {
  const locale = useLocale();
  const t = useTranslations("home.faq");
  const tCommon = useTranslations("common");

  const visibleFaqs = faqs.slice(0, SHOW_COUNT);

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-4">
          {t("title")}
        </h2>
      </div>

      <Accordion className="space-y-3">
        {visibleFaqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border border-border rounded-xl px-6 bg-white shadow-sm"
          >
            <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline hover:text-[var(--primary)]">
              {locale === "es" ? faq.questionEs : faq.questionEn}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {locale === "es" ? faq.answerEs : faq.answerEn}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-8">
        <Link
          href={`/${locale}/contacto`}
          className="text-[var(--primary)] font-semibold hover:underline text-sm"
        >
          {tCommon("seeMore")} →
        </Link>
      </div>
    </div>
  );
}
