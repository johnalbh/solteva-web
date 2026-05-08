import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Clock, Wrench, Phone, FileText, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";
import QuickQuoteForm from "@/components/home/QuickQuoteForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Mantenimiento de Sillas Salvaescaleras y Elevadores | Solteva"
        : "Stairlift & Lift Maintenance | Solteva",
    description:
      locale === "es"
        ? "Contratos de mantenimiento preventivo para sillas salvaescaleras, plataformas y elevadores. Revisión anual certificada, piezas a precio preferente. Técnicos en toda Andalucía."
        : "Preventive maintenance contracts for stairlifts, platforms and lifts. Certified annual inspection, preferential-price parts. Technicians across all Andalusia.",
    locale,
    path: "/servicios/mantenimiento",
  });
}

const PLANES = [
  {
    nombre: "Básico",
    nameEn: "Basic",
    precio: "89 €/año",
    priceEn: "€89/year",
    features: [
      { es: "1 revisión anual completa", en: "1 full annual inspection" },
      { es: "Ajuste de velocidades y frenos", en: "Speed and brake adjustment" },
      { es: "Lubricación de guías", en: "Guide lubrication" },
      { es: "Informe técnico por escrito", en: "Written technical report" },
    ],
    highlight: false,
  },
  {
    nombre: "Completo",
    nameEn: "Complete",
    precio: "149 €/año",
    priceEn: "€149/year",
    features: [
      { es: "Todo lo del plan Básico", en: "Everything in Basic" },
      { es: "2 revisiones al año", en: "2 inspections per year" },
      { es: "Piezas de desgaste incluidas", en: "Wear parts included" },
      { es: "Prioridad en urgencias", en: "Priority for emergencies" },
      { es: "Descuento 20% en reparaciones", en: "20% discount on repairs" },
    ],
    highlight: true,
  },
  {
    nombre: "Premium",
    nameEn: "Premium",
    precio: "229 €/año",
    priceEn: "€229/year",
    features: [
      { es: "Todo lo del plan Completo", en: "Everything in Complete" },
      { es: "SAT de emergencia 24h incluido", en: "24h emergency SAT included" },
      { es: "Sustitución de todas las piezas", en: "All parts replacement covered" },
      { es: "Equipo de sustitución si procede", en: "Loan equipment if applicable" },
      { es: "Certificación anual de seguridad", en: "Annual safety certification" },
    ],
    highlight: false,
  },
];

export default async function MantenimientoPage({ params }: Props) {
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
              <li className="text-white">{es ? "Mantenimiento" : "Maintenance"}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Wrench size={20} aria-hidden />
            </div>
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
              {es ? "Servicio" : "Service"}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {es ? "Mantenimiento preventivo" : "Preventive maintenance"}
          </h1>
          <p className="text-xl text-white/85 max-w-3xl">
            {es
              ? "Garantiza el funcionamiento óptimo de tu silla salvaescaleras, plataforma o elevador con nuestros contratos de mantenimiento. Técnicos certificados. Precio fijo anual."
              : "Ensure the optimal operation of your stairlift, platform or lift with our maintenance contracts. Certified technicians. Fixed annual price."}
          </p>
        </div>
      </section>

      {/* Why maintenance */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">
            {es ? "¿Por qué es importante el mantenimiento?" : "Why is maintenance important?"}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                titleEs: "Prolonga la vida útil",
                titleEn: "Extends equipment life",
                descEs: "Un mantenimiento regular puede multiplicar por 2 la vida útil del equipo, retrasando la inversión en sustitución.",
                descEn: "Regular maintenance can double the equipment's useful life, delaying the need for replacement investment.",
              },
              {
                icon: CheckCircle,
                titleEs: "Previene averías",
                titleEn: "Prevents breakdowns",
                descEs: "El 85% de las averías en equipos de movilidad se producen por falta de mantenimiento preventivo.",
                descEn: "85% of mobility equipment breakdowns occur due to lack of preventive maintenance.",
              },
              {
                icon: FileText,
                titleEs: "Certifica la seguridad",
                titleEn: "Certifies safety",
                descEs: "Nuestro informe técnico anual garantiza que el equipo cumple con todas las normas de seguridad vigentes.",
                descEn: "Our annual technical report guarantees the equipment meets all current safety standards.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titleEs} className="text-center p-6 rounded-2xl bg-[var(--warm-bg)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-[var(--primary)]" aria-hidden />
                  </div>
                  <h3 className="font-semibold mb-2">{es ? item.titleEs : item.titleEn}</h3>
                  <p className="text-sm text-muted-foreground">{es ? item.descEs : item.descEn}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24 bg-[var(--warm-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3">
              {es ? "Planes de mantenimiento" : "Maintenance plans"}
            </h2>
            <p className="text-muted-foreground">
              {es
                ? "Elige el plan que mejor se adapta a tu uso. Todos incluyen IVA y desplazamiento."
                : "Choose the plan that best suits your use. All include VAT and call-out."}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {PLANES.map((plan) => (
              <div
                key={plan.nombre}
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
                  {es ? plan.nombre : plan.nameEn}
                </h3>
                <p className={cn("text-3xl font-bold mb-5", plan.highlight ? "text-white" : "text-[var(--primary)]")}>
                  {es ? plan.precio : plan.priceEn}
                </p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f.es} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        size={15}
                        className={cn("mt-0.5 shrink-0", plan.highlight ? "text-white/80" : "text-[var(--primary)]")}
                        aria-hidden
                      />
                      <span className={plan.highlight ? "text-white/90" : "text-foreground"}>
                        {es ? f.es : f.en}
                      </span>
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
                  {es ? "Contratar" : "Get started"}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            {es
              ? "* Precios orientativos para un equipo estándar. Consulta para equipos especiales o múltiples equipos."
              : "* Guide prices for a standard single unit. Consult for special or multiple equipment."}
          </p>
        </div>
      </section>

      {/* What we check */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">
            {es ? "¿Qué incluye la revisión?" : "What does the inspection include?"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { es: "Revisión y calibración del motor", en: "Motor inspection and calibration" },
              { es: "Comprobación de sistemas de seguridad (asiento, reposapiés, obstáculos)", en: "Safety system check (seat, footrest, obstruction sensors)" },
              { es: "Ajuste de velocidad de subida y bajada", en: "Up/down speed adjustment" },
              { es: "Lubricación de cremallera y guías", en: "Rack and guide lubrication" },
              { es: "Revisión del estado de las baterías", en: "Battery condition check" },
              { es: "Comprobación del sistema de carga de batería", en: "Battery charging system verification" },
              { es: "Limpieza de pista y mecanismos", en: "Track and mechanism cleaning" },
              { es: "Informe técnico escrito y certificado", en: "Written and certified technical report" },
            ].map((item) => (
              <div key={item.es} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--warm-bg)]">
                <CheckCircle size={16} className="text-[var(--primary)] shrink-0" aria-hidden />
                <span className="text-sm">{es ? item.es : item.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + form */}
      <section className="py-16 lg:py-24 bg-[var(--warm-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold mb-4">
                {es ? "Solicita tu revisión" : "Request your inspection"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {es
                  ? "Rellena el formulario y nos pondremos en contacto contigo en menos de 24 horas para concertar la visita de tu técnico."
                  : "Fill in the form and we will contact you within 24 hours to arrange your technician visit."}
              </p>
              <div className="flex flex-col gap-3">
                <a href="tel:+34900100133" className={cn(buttonVariants({ variant: "outline" }), "justify-start gap-2 w-full sm:w-auto")}>
                  <Phone size={16} aria-hidden />
                  900 100 133 {es ? "(gratuito)" : "(free)"}
                </a>
                <Link
                  href={`/${locale}/proyectos`}
                  className="flex items-center gap-2 text-sm text-[var(--primary)] font-medium hover:underline"
                >
                  {es ? "Ver proyectos realizados" : "View completed projects"}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
            <div className="bg-[var(--primary)] rounded-2xl p-8">
              <QuickQuoteForm locale={locale} light />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
