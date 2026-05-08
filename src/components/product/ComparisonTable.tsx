import Link from "next/link";
import { Check } from "lucide-react";
import type { Product } from "@/lib/products";

interface ComparisonTableProps {
  products: Product[];
  currentSlug: string;
  locale: string;
  categoryPath: string; // e.g. "sillas-salvaescaleras"
}

export default function ComparisonTable({
  products,
  currentSlug,
  locale,
  categoryPath,
}: ComparisonTableProps) {
  if (products.length < 2) return null;

  const es = locale === "es";

  // Collect all unique spec labels ordered by first appearance
  const seenLabels = new Map<string, { es: string; en: string }>();
  for (const p of products) {
    for (const s of p.specs) {
      if (!seenLabels.has(s.labelEs)) {
        seenLabels.set(s.labelEs, { es: s.labelEs, en: s.labelEn });
      }
    }
  }
  const specLabels = Array.from(seenLabels.values());

  // Build spec map per product
  const specMaps = products.map((p) => {
    const map = new Map<string, string>();
    for (const s of p.specs) map.set(s.labelEs, s.value);
    return map;
  });

  return (
    <div>
      <h2
        className="text-ink mb-8"
        style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
      >
        {es ? "Compara los modelos" : "Compare models"}
      </h2>

      <div className="overflow-x-auto -mx-4 px-4">
        <table
          className="w-full min-w-[520px] text-left"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead>
            <tr>
              {/* Feature column header */}
              <th
                className="text-ink-secondary"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0 16px 16px 0",
                  borderBottom: "1px solid rgb(232,232,237)",
                  whiteSpace: "nowrap",
                }}
              >
                {es ? "Característica" : "Feature"}
              </th>

              {products.map((p) => {
                const isCurrent = p.slug === currentSlug;
                const name = es ? p.nameEs : p.nameEn;
                return (
                  <th
                    key={p.slug}
                    style={{
                      padding: "0 12px 16px",
                      borderBottom: isCurrent
                        ? "2px solid var(--cta-blue)"
                        : "1px solid rgb(232,232,237)",
                      verticalAlign: "bottom",
                      minWidth: 160,
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                        color: isCurrent ? "var(--cta-blue)" : "rgb(29,29,31)",
                        lineHeight: 1.3,
                      }}
                    >
                      {name}
                    </span>
                    {isCurrent && (
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: 4,
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--cta-blue)",
                          background: "rgba(0,113,227,0.08)",
                          padding: "2px 8px",
                          borderRadius: 980,
                        }}
                      >
                        {es ? "Este modelo" : "This model"}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {specLabels.map((label, rowIdx) => (
              <tr key={label.es} style={{ background: rowIdx % 2 === 0 ? "transparent" : "rgb(245,245,247)" }}>
                {/* Label */}
                <td
                  className="text-ink-secondary"
                  style={{
                    fontSize: "0.85rem",
                    letterSpacing: "-0.01em",
                    padding: "12px 16px 12px 0",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid rgb(232,232,237)",
                  }}
                >
                  {es ? label.es : label.en}
                </td>

                {/* Values per product */}
                {products.map((p, pi) => {
                  const isCurrent = p.slug === currentSlug;
                  const val = specMaps[pi].get(label.es);
                  return (
                    <td
                      key={p.slug}
                      style={{
                        padding: "12px",
                        fontSize: "0.88rem",
                        letterSpacing: "-0.01em",
                        color: isCurrent ? "rgb(29,29,31)" : "rgb(110,110,115)",
                        fontWeight: isCurrent ? 500 : 400,
                        borderBottom: "1px solid rgb(232,232,237)",
                        borderLeft: isCurrent ? "2px solid rgba(0,113,227,0.15)" : undefined,
                        borderRight: isCurrent ? "2px solid rgba(0,113,227,0.15)" : undefined,
                      }}
                    >
                      {val ?? "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td />
              {products.map((p) => {
                const isCurrent = p.slug === currentSlug;
                const name = es ? p.nameEs : p.nameEn;
                return (
                  <td
                    key={p.slug}
                    style={{
                      padding: "16px 12px 0",
                      borderLeft: isCurrent ? "2px solid rgba(0,113,227,0.15)" : undefined,
                      borderRight: isCurrent ? "2px solid rgba(0,113,227,0.15)" : undefined,
                    }}
                  >
                    {isCurrent ? (
                      <span
                        className="inline-flex items-center gap-1.5"
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--cta-blue)",
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        <Check size={14} aria-hidden />
                        {es ? "Modelo seleccionado" : "Selected model"}
                      </span>
                    ) : (
                      <Link
                        href={`/${locale}/productos/${categoryPath}/${p.slug}`}
                        className="link-more"
                        style={{ fontSize: "0.82rem" }}
                        aria-label={es ? `Ver ${name}` : `View ${name}`}
                      >
                        {es ? "Ver modelo" : "View model"}
                      </Link>
                    )}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
