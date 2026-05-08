"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { useLocale } from "next-intl";
import { faqs, type FAQ } from "@/lib/faqs";

interface Props {
  category?: FAQ["category"];
  limit?: number;
  showLink?: boolean;
  title?: string;
  ids?: string[];
}

export default function FAQAccordion({ category, limit = 6, showLink = true, title, ids }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const locale = useLocale();
  const es = locale === "es";

  let visible = ids
    ? faqs.filter((f) => ids.includes(f.id))
    : category
    ? faqs.filter((f) => f.category === category)
    : faqs;
  visible = visible.slice(0, limit);

  const defaultTitle = es ? "Preguntas frecuentes" : "Frequently asked questions";

  return (
    <div>
      <div className="text-center mb-10">
        <p className="eyebrow mb-3">FAQ</p>
        <h2
          className="text-ink"
          style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {title ?? defaultTitle}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.map((faq) => {
          const isOpen = open === faq.id;
          return (
            <div
              key={faq.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                border: `1.5px solid ${isOpen ? "var(--cta-blue)" : "rgb(232,232,237)"}`,
                transition: "border-color 0.18s",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "18px 22px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "-0.014em",
                    color: "rgb(29,29,31)",
                    lineHeight: 1.3,
                  }}
                >
                  {es ? faq.questionEs : faq.questionEn}
                </span>
                <span
                  style={{
                    flexShrink: 0,
                    width: 24, height: 24,
                    borderRadius: "50%",
                    background: isOpen ? "var(--cta-blue)" : "rgb(245,245,247)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.18s",
                  }}
                  aria-hidden
                >
                  {isOpen
                    ? <Minus size={12} style={{ color: "#fff" }} />
                    : <Plus size={12} style={{ color: "rgb(110,110,115)" }} />}
                </span>
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: "0 22px 20px",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    letterSpacing: "-0.01em",
                    color: "rgb(110,110,115)",
                  }}
                >
                  {es ? faq.answerEs : faq.answerEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showLink && (
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link
            href={`/${locale}/contacto`}
            style={{ color: "var(--cta-blue)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            {es ? "¿Más dudas? Consúltanos →" : "More questions? Ask us →"}
          </Link>
        </div>
      )}
    </div>
  );
}
