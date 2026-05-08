"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, CheckCircle, ChevronRight, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

interface Props {
  products: Product[];
  categorySlug: string;
  locale: string;
}

const MAX_COMPARE = 3;

export default function ProductCompareTable({ products, categorySlug, locale }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const isEs = locale === "es";

  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < MAX_COMPARE
        ? [...prev, slug]
        : prev
    );
    setShowTable(false);
  }

  const selectedProducts = products.filter((p) => selected.includes(p.slug));

  // Collect all spec labels that appear in at least one selected product
  const allSpecLabels = Array.from(
    new Set(
      selectedProducts.flatMap((p) =>
        p.specs.map((s) => (isEs ? s.labelEs : s.labelEn))
      )
    )
  );

  return (
    <div>
      {/* Selection strip */}
      <div className="bg-[var(--warm-bg)] rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <BarChart2 size={18} className="text-[var(--primary)] shrink-0" />
          <p className="text-sm font-medium text-[var(--ink)]">
            {isEs
              ? `Selecciona hasta ${MAX_COMPARE} modelos para comparar:`
              : `Select up to ${MAX_COMPARE} models to compare:`}
          </p>
          {products.map((p) => {
            const isChecked = selected.includes(p.slug);
            const isDisabled = !isChecked && selected.length >= MAX_COMPARE;
            return (
              <button
                key={p.slug}
                onClick={() => !isDisabled && toggle(p.slug)}
                disabled={isDisabled}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all",
                  isChecked
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : isDisabled
                    ? "border-slate-200 text-slate-400 cursor-not-allowed"
                    : "border-slate-300 text-[var(--ink)] hover:border-[var(--primary)] hover:text-[var(--primary)] cursor-pointer"
                )}
                aria-pressed={isChecked}
              >
                {isChecked && <X size={12} />}
                {isEs ? p.nameEs.split(" ").slice(-2).join(" ") : p.nameEn.split(" ").slice(-2).join(" ")}
              </button>
            );
          })}
          {selected.length >= 2 && (
            <button
              onClick={() => setShowTable((v) => !v)}
              className="ml-auto flex items-center gap-1.5 bg-[var(--primary)] text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[var(--primary)]/90 transition-colors cursor-pointer"
            >
              {showTable
                ? isEs ? "Ocultar" : "Hide"
                : isEs ? "Comparar" : "Compare"}
              <ChevronRight
                size={14}
                className={cn("transition-transform", showTable && "rotate-90")}
              />
            </button>
          )}
          {selected.length > 0 && (
            <button
              onClick={() => { setSelected([]); setShowTable(false); }}
              className="text-slate-400 hover:text-slate-600 text-xs underline ml-1 cursor-pointer"
            >
              {isEs ? "Limpiar" : "Clear"}
            </button>
          )}
        </div>
      </div>

      {/* Comparison table */}
      {showTable && selectedProducts.length >= 2 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-4 py-3 text-slate-500 font-medium w-36 bg-slate-50">
                  {isEs ? "Característica" : "Feature"}
                </th>
                {selectedProducts.map((p) => (
                  <th key={p.slug} className="px-4 py-3 bg-white min-w-[180px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-full h-24 rounded-lg overflow-hidden bg-slate-100">
                        <Image
                          src={p.heroImage}
                          alt={isEs ? p.nameEs : p.nameEn}
                          fill
                          sizes="180px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-semibold text-[var(--ink)] text-xs leading-tight text-center">
                        {isEs ? p.nameEs : p.nameEn}
                      </span>
                      {p.fromPrice && (
                        <span className="text-[var(--primary)] font-bold text-xs">
                          {isEs ? `Desde ${p.fromPrice}` : `From ${p.fromPrice}`}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSpecLabels.map((label, i) => (
                <tr
                  key={label}
                  className={cn(
                    "border-b border-slate-100",
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  )}
                >
                  <td className="px-4 py-3 font-medium text-slate-600 bg-slate-50">
                    {label}
                  </td>
                  {selectedProducts.map((p) => {
                    const spec = p.specs.find(
                      (s) => (isEs ? s.labelEs : s.labelEn) === label
                    );
                    return (
                      <td key={p.slug} className="px-4 py-3 text-center text-[var(--ink)]">
                        {spec ? spec.value : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Ideal for */}
              <tr className="border-b border-slate-100 bg-white">
                <td className="px-4 py-3 font-medium text-slate-600 bg-slate-50">
                  {isEs ? "Ideal para" : "Ideal for"}
                </td>
                {selectedProducts.map((p) => {
                  const items = isEs ? p.idealForEs : p.idealForEn;
                  return (
                    <td key={p.slug} className="px-4 py-3">
                      {items && items.length > 0 ? (
                        <ul className="space-y-1">
                          {items.map((item, j) => (
                            <li key={j} className="flex items-start gap-1.5 text-xs text-slate-600">
                              <CheckCircle size={12} className="text-[var(--success)] mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "—"
                      )}
                    </td>
                  );
                })}
              </tr>
              {/* CTA row */}
              <tr className="bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-600 bg-slate-50">
                  {isEs ? "Más info" : "More info"}
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.slug} className="px-4 py-3 text-center">
                    <Link
                      href={`/${locale}/productos/${categorySlug}/${p.slug}`}
                      className="inline-flex items-center gap-1 text-[var(--primary)] font-semibold text-xs hover:underline"
                    >
                      {isEs ? "Ver ficha completa" : "View full details"}
                      <ChevronRight size={12} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
