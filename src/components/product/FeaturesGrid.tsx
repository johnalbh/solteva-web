import { CheckCircle } from "lucide-react";

interface FeaturesGridProps {
  features: { es: string; en: string }[];
  locale: string;
}

export default function FeaturesGrid({ features, locale }: FeaturesGridProps) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle
            size={20}
            className="shrink-0 mt-0.5 text-[var(--success)]"
            aria-hidden
          />
          <span className="text-foreground">
            {locale === "es" ? f.es : f.en}
          </span>
        </li>
      ))}
    </ul>
  );
}
