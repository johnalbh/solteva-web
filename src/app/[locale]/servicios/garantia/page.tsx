import type { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle, X, Phone, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Garantía de Sillas Salvaescaleras y Elevadores | Solteva"
        : "Stairlift & Lift Warranty | Solteva",
    description:
      locale === "es"
        ? "Garantía de fábrica y extensión de garantía hasta 5 años para sillas salvaescaleras, plataformas y elevadores. Sin letra pequeña. Cobertura completa de piezas y mano de obra."
        : "Manufacturer's warranty and extension up to 5 years for stairlifts, platforms and lifts. No small print. Full parts and labour coverage.",
    locale,
    path: "/servicios/garantia",
  });
}

export default async function GarantiaPage({ params }: Props) {
  const { locale } = await params;
  const es = locale === "es";

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6" aria-label="breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href={`/${locale}`} className="hover:text-white">{es ? "Inicio" : "Home"}</Link></li>
              <li>/</li>
              <li><Link href={`/${locale}/servicios`} className="hover:text-white">{es ? "Servicios" : "Services"}</Link></li>
              <li>/</li>
              <li className="text-white">{es ? "Garantía" : "Warranty"}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield size={20} aria-hidden />
            </div>
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
              {es ? "Garantía" : "Warranty"}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {es ? "Garantía Solteva" : "Solteva Warranty"}
          </h1>
          <p className="text-xl text-white/85 max-w-3xl">
            {es
              ? "Todos nuestros equipos incluyen garantía de fábrica. Ampliable hasta 5 años con cobertura completa de piezas y mano de obra. Sin letra pequeña."
              : "All our equipment comes with a manufacturer's warranty. Extendable up to 5 years with full parts and labour coverage. No small print."}
          </p>
        </div>
      </section>

      {/* Standard warranty */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-2xl font-bold mb-4">
                {es ? "Garantía estándar de fábrica" : "Standard manufacturer's warranty"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {es
                  ? "Todos los equipos que instalamos vienen con la garantía oficial del fabricante, que varía según el modelo y el tipo de equipo."
                  : "All equipment we install comes with the manufacturer's official warranty, which varies by model and equipment type."}
              </p>
              <div className="space-y-3">
                {[
                  { labelEs: "Sillas salvaescaleras rectas", labelEn: "Straight stairlifts", years: "2 años / 2 years" },
                  { labelEs: "Sillas salvaescaleras curvas", labelEn: "Curved stairlifts", years: "2 años / 2 years" },
                  { labelEs: "Plataformas salvaescaleras", labelEn: "Stairlift platforms", years: "2 años / 2 years" },
                  { labelEs: "Elevadores verticales", labelEn: "Vertical lifts", years: "2 años / 2 years" },
                  { labelEs: "Grúas de piscina", labelEn: "Pool hoists", years: "1 año / 1 year" },
                ].map((item) => (
                  <div key={item.labelEs} className="flex items-center justify-between p-4 rounded-xl bg-[var(--warm-bg)]">
                    <span className="text-sm font-medium">{es ? item.labelEs : item.labelEn}</span>
                    <span className="text-sm font-bold text-[var(--primary)]">
                      {es ? item.years.split("/")[0].trim() : item.years.split("/")[1].trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's covered */}
            <div>
              <h3 className="font-display text-xl font-bold mb-4">
                {es ? "¿Qué cubre la garantía estándar?" : "What does the standard warranty cover?"}
              </h3>
              <div className="space-y-2 mb-6">
                {[
                  { es: "Defectos de fabricación", en: "Manufacturing defects" },
                  { es: "Fallos en componentes electrónicos", en: "Electronic component failures" },
                  { es: "Problemas con motor y transmisión", en: "Motor and transmission problems" },
                  { es: "Defectos en acabados estructurales", en: "Structural finish defects" },
                ].map((item) => (
                  <div key={item.es} className="flex items-center gap-2.5 text-sm text-green-800 bg-green-50 rounded-lg px-4 py-2.5">
                    <CheckCircle size={15} className="text-green-600 shrink-0" aria-hidden />
                    {es ? item.es : item.en}
                  </div>
                ))}
              </div>
              <h3 className="font-display text-xl font-bold mb-4">
                {es ? "¿Qué NO cubre?" : "What is NOT covered?"}
              </h3>
              <div className="space-y-2">
                {[
                  { es: "Desgaste normal de piezas (frenos, batería…)", en: "Normal wear of parts (brakes, battery…)" },
                  { es: "Daños por uso incorrecto o accidente", en: "Damage from incorrect use or accident" },
                  { es: "Mantenimiento no realizado", en: "Unmaintained equipment" },
                  { es: "Modificaciones por terceros", en: "Third-party modifications" },
                ].map((item) => (
                  <div key={item.es} className="flex items-center gap-2.5 text-sm text-red-800 bg-red-50 rounded-lg px-4 py-2.5">
                    <X size={15} className="text-red-500 shrink-0" aria-hidden />
                    {es ? item.es : item.en}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended warranty plans */}
      <section className="py-16 lg:py-24 bg-[var(--warm-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3">
              {es ? "Amplía tu garantía" : "Extend your warranty"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {es
                ? "Más allá de la garantía de fábrica, ofrecemos extensiones que incluyen piezas y mano de obra sin límite de intervenciones."
                : "Beyond the manufacturer's warranty, we offer extensions that include parts and labour with no call-out limit."}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                yearEs: "3 años total",
                yearEn: "3 years total",
                priceEs: "199 €",
                priceEn: "€199",
                noteEs: "(pago único)",
                noteEn: "(one-off payment)",
                featuresEs: ["Piezas cubiertas", "Mano de obra cubierta", "2 revisiones anuales incluidas"],
                featuresEn: ["Parts covered", "Labour covered", "2 annual inspections included"],
                highlight: false,
              },
              {
                yearEs: "4 años total",
                yearEn: "4 years total",
                priceEs: "299 €",
                priceEn: "€299",
                noteEs: "(pago único)",
                noteEn: "(one-off payment)",
                featuresEs: ["Piezas cubiertas", "Mano de obra cubierta", "2 revisiones anuales incluidas", "SAT prioritario"],
                featuresEn: ["Parts covered", "Labour covered", "2 annual inspections included", "Priority SAT"],
                highlight: true,
              },
              {
                yearEs: "5 años total",
                yearEn: "5 years total",
                priceEs: "399 €",
                priceEn: "€399",
                noteEs: "(pago único)",
                noteEn: "(one-off payment)",
                featuresEs: ["Piezas cubiertas", "Mano de obra cubierta", "Revisiones anuales incluidas", "SAT urgente 24h", "Transferible al inmueble"],
                featuresEn: ["Parts covered", "Labour covered", "Annual inspections included", "24h urgent SAT", "Transferable with property"],
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.yearEs}
                className={cn(
                  "rounded-2xl p-6 flex flex-col",
                  plan.highlight
                    ? "bg-[var(--primary)] text-white shadow-xl ring-2 ring-[var(--primary)] scale-105"
                    : "bg-white border border-border"
                )}
              >
                {plan.highlight && (
                  <span className="text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 rounded-full w-fit mb-4">
                    {es ? "Más popular" : "Most popular"}
                  </span>
                )}
                <h3 className={cn("font-display text-xl font-bold mb-1", plan.highlight ? "text-white" : "text-ink")}>
                  {es ? plan.yearEs : plan.yearEn}
                </h3>
                <p className={cn("text-3xl font-bold mb-1", plan.highlight ? "text-white" : "text-[var(--primary)]")}>
                  {es ? plan.priceEs : plan.priceEn}
                </p>
                <p className={cn("text-sm mb-5", plan.highlight ? "text-white/70" : "text-muted-foreground")}>
                  {es ? plan.noteEs : plan.noteEn}
                </p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {(es ? plan.featuresEs : plan.featuresEn).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle
                        size={14}
                        className={cn("shrink-0", plan.highlight ? "text-white/80" : "text-[var(--primary)]")}
                        aria-hidden
                      />
                      <span className={plan.highlight ? "text-white/90" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/contacto`}
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    plan.highlight
                      ? "bg-white text-[var(--primary)] hover:bg-white/90"
                      : "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                  )}
                >
                  {es ? "Solicitar" : "Request"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">
            {es ? "Preguntas frecuentes sobre garantía" : "Frequently asked questions about warranty"}
          </h2>
          <div className="space-y-4">
            {[
              {
                qEs: "¿Puedo ampliar la garantía después de la compra?",
                qEn: "Can I extend the warranty after purchase?",
                aEs: "Sí, la garantía extendida se puede contratar en cualquier momento mientras el equipo esté en garantía estándar. Una vez vencida la garantía estándar, realizamos una inspección previa gratuita.",
                aEn: "Yes, the extended warranty can be taken out at any time while the equipment is still under standard warranty. Once the standard warranty expires, we carry out a free prior inspection.",
              },
              {
                qEs: "¿La garantía cubre si me mudo?",
                qEn: "Does the warranty cover me if I move?",
                aEs: "La garantía extendida de 5 años es transferible al inmueble, lo que puede ser un valor añadido a la hora de vender la vivienda. Los planes de 3 y 4 años no son transferibles.",
                aEn: "The 5-year extended warranty is transferable with the property, which can add value when selling the home. The 3- and 4-year plans are not transferable.",
              },
              {
                qEs: "¿La garantía cubre las piezas de desgaste?",
                qEn: "Does the warranty cover wear parts?",
                aEs: "Las piezas de desgaste normal (como la batería recargable, frenos y elementos de fijación sujetos a roce) no están cubiertas por la garantía estándar. Los planes extendidos incluyen opción de cobertura ampliada bajo consulta.",
                aEn: "Normal wear parts (such as the rechargeable battery, brakes and fixing elements subject to friction) are not covered by the standard warranty. Extended plans include an option for broader coverage on request.",
              },
            ].map((item) => (
              <details key={item.qEs} className="group rounded-xl border border-border bg-[var(--warm-bg)] overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-sm list-none">
                  {es ? item.qEs : item.qEn}
                  <span className="text-[var(--primary)] group-open:rotate-180 transition-transform ml-3">▼</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-muted-foreground">{es ? item.aEs : item.aEn}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary)] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-3">
            {es ? "¿Tienes dudas sobre tu garantía?" : "Have questions about your warranty?"}
          </h2>
          <p className="text-white/80 mb-6">
            {es
              ? "Llámanos gratis al 900 100 133 y te explicamos qué cubre tu garantía actual y cómo ampliarla."
              : "Call us free on 900 100 133 and we'll explain what your current warranty covers and how to extend it."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+34900100133"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-[var(--primary)] hover:bg-white/90 font-bold h-12 px-8"
              )}
            >
              <Phone size={18} className="mr-2" aria-hidden />
              900 100 133
            </a>
            <Link
              href={`/${locale}/contacto`}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/50 text-white hover:bg-white/10 hover:text-white font-bold h-12 px-8 bg-transparent"
              )}
            >
              {es ? "Formulario de garantía" : "Warranty form"}
              <ArrowRight size={16} className="ml-2" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
