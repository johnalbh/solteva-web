"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    if (next === locale) return;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  }

  return (
    <div
      role="navigation"
      aria-label="Selector de idioma"
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "rgb(245,245,247)",
        borderRadius: 980,
        padding: 3,
        gap: 0,
      }}
    >
      {(["es", "en"] as const).map((lang) => {
        const active = locale === lang;
        return (
          <button
            key={lang}
            onClick={() => switchLocale(lang)}
            aria-label={lang === "es" ? "Español" : "English"}
            aria-current={active ? "true" : undefined}
            style={{
              height: 28,
              minWidth: 36,
              borderRadius: 980,
              border: "none",
              cursor: active ? "default" : "pointer",
              background: active ? "#fff" : "transparent",
              color: active ? "rgb(29,29,31)" : "rgb(110,110,115)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: "background 0.18s, color 0.18s",
              boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              padding: "0 10px",
            }}
          >
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
