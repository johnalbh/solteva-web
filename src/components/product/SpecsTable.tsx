import type { ProductSpec } from "@/lib/products";

interface SpecsTableProps {
  specs: ProductSpec[];
  locale: string;
}

export default function SpecsTable({ specs, locale }: SpecsTableProps) {
  if (!specs.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[var(--warm-bg)]"}>
              <td className="px-4 py-3 font-semibold text-foreground w-1/2 border-b border-border">
                {locale === "es" ? spec.labelEs : spec.labelEn}
              </td>
              <td className="px-4 py-3 text-muted-foreground border-b border-border">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
