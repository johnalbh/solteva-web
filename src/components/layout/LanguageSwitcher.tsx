"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1" role="navigation" aria-label="Language selection">
      <Button
        variant={locale === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => switchLocale("es")}
        aria-label="Español"
        aria-current={locale === "es" ? "true" : undefined}
        className="text-sm font-semibold h-8 px-2"
      >
        ES
      </Button>
      <span className="text-muted-foreground text-xs">/</span>
      <Button
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => switchLocale("en")}
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
        className="text-sm font-semibold h-8 px-2"
      >
        EN
      </Button>
    </div>
  );
}
