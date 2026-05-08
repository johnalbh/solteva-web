import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Clock, Phone, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "SAT — Servicio de Asistencia Técnica Urgente | Solteva"
        : "SAT — Urgent Technical Assistance Service | Solteva",
    description:
      locale === "es"
        ? "Servicio técnico urgente para sillas salvaescaleras, plataformas y elevadores averiados. Técnicos especializados en Andalucía. Presupuesto antes de comenzar. 900 100 133."
        : "Urgent technical service for broken stairlifts, platforms and lifts. Specialist technicians in Andalusia. Quote before starting. 900 100 133.",
    locale,
    path: "/servicios/sat",
  });
}

export default async function SATPage({ params }: Props) {
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
              <li className="text-white">SAT</li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap size={20} aria-hidden />
            </div>
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
              {es ? "Urgencias" : "Emergency service"}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {es ? "Asistencia Técnica Urgente" : "Urgent Technical Assistance"}
          </h1>
          <p className="text-xl text-white/85 max-w-3xl mb-8">
            {es
              ? "Si tu silla salvaescaleras, plataforma o elevador ha dejado de funcionar, llámanos. Técnicos especializados en toda Andalucía con stock de recambios en furgoneta."
              : "If your stairlift, platform or lift has stopped working, call us. Specialist technicians across Andalusia with spare parts stocked in the van."}
          </p>
          {/* Emergency CTA */}
          <a
            href="tel:+34900100133"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 px-8 text-lg"
            )}
          >
            <Phone size={20} className="mr-2" aria-hidden />
            900 100 133 — {es ? "Llamar ahora" : "Call now"}
          </a>
        </div>
      </section>

      {/* Urgent notice */}
      <div className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" aria-hidden />
          <p className="text-sm text-amber-800">
            <strong>{es ? "Si es una urgencia:" : "If it is an emergency:"}</strong>{" "}
            {es
              ? "Llama directamente al 900 100 133. Atendemos llamadas de lunes a viernes de 8:30 a 14:30h. Fuera de ese horario, deja un mensaje y te llamamos en menos de 2 horas al retomar el servicio."
              : "Call directly on 900 100 133. We answer calls Monday to Friday 8:30–14:30. Outside those hours, leave a message and we will call you back within 2 hours when service resumes."}
          </p>
        </div>
      </div>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold mb-10 text-center">
            {es ? "¿Cómo funciona el SAT?" : "How does our SAT work?"}
          </h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                icon: Phone,
                titleEs: "Llamas o escribes",
                titleEn: "You call or write",
                descEs: "Contacta por teléfono, WhatsApp o formulario. En horario de atención, respondemos en menos de 30 min.",
                descEn: "Contact us by phone, WhatsApp or form. During office hours, we respond in under 30 minutes.",
              },
              {
                n: "02",
                icon: Zap,
                titleEs: "Diagnóstico remoto",
                titleEn: "Remote diagnosis",
                descEs: "Nuestro técnico intenta diagnosticar la avería por teléfono para preparar el material necesario.",
                descEn: "Our technician tries to diagnose the fault by phone to prepare the necessary materials.",
              },
              {
                n: "03",
                icon: Clock,
                titleEs: "Visita técnica",
                titleEn: "Technical visit",
                descEs: "Desplazamos técnico al domicilio el mismo día o siguiente según disponibilidad y zona.",
                descEn: "We send a technician to the home the same or next day depending on availability and area.",
              },
              {
                n: "04",
                icon: CheckCircle,
                titleEs: "Reparación y certificado",
                titleEn: "Repair and certificate",
                descEs: "Reparamos la avería y entregamos parte de trabajo escrito con la reparación realizada.",
                descEn: "We repair the fault and issue a written work order with details of the repair carried out.",
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="text-center">
                  <div className="relative w-12 h-12 mx-auto mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white font-bold text-xs flex items-center justify-center">
                      {step.n}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{es ? step.titleEs : step.titleEn}</h3>
                  <p className="text-xs text-muted-foreground">{es ? step.descEs : step.descEn}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 bg-[var(--warm-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-2xl font-bold mb-4">
                {es ? "¿Reparamos todos los modelos?" : "Do we repair all models?"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {es
                  ? "Sí. Atendemos equipos instalados por Solteva y también equipos de otras marcas y distribuidores. Nuestros técnicos están formados en los principales fabricantes del sector."
                  : "Yes. We service equipment installed by Solteva and also equipment from other brands and distributors. Our technicians are trained by the leading manufacturers in the sector."}
              </p>
              <ul className="space-y-3">
                {[
                  "HANDICARE / MINIVATOR",
                  "THYSSEN / KRUPP",
                  "ACORN / BISON",
                  "VIMEC / HIROLIFT",
                  "FREELIFT / EP",
                  es ? "Y muchas más marcas" : "And many more brands",
                ].map((brand) => (
                  <li key={brand} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle size={16} className="text-[var(--primary)] shrink-0" aria-hidden />
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="font-display text-xl font-bold mb-5">
                {es ? "Solicitar SAT" : "Request SAT"}
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="tel:+34900100133"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-[var(--primary)] text-white font-bold justify-center gap-2"
                  )}
                >
                  <Phone size={18} aria-hidden />
                  {es ? "Llamar ahora — Gratis" : "Call now — Free"}
                </a>
                <a
                  href={`https://wa.me/34628342179?text=${encodeURIComponent(es ? "Hola, necesito asistencia técnica urgente para mi silla salvaescaleras." : "Hello, I need urgent technical assistance for my stairlift.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "justify-center gap-2"
                  )}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#25D366" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <Link
                  href={`/${locale}/contacto`}
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-center text-muted-foreground")}
                >
                  {es ? "Formulario de contacto" : "Contact form"}
                  <ArrowRight size={14} className="ml-1" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing clarity */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-4">
            {es ? "Precios claros, sin sorpresas" : "Clear prices, no surprises"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {es
              ? "Antes de comenzar cualquier reparación te facilitamos un presupuesto detallado. Solo si lo aceptas procedemos. Sin cargos ocultos."
              : "Before starting any repair we provide you with a detailed quote. We only proceed if you accept it. No hidden charges."}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              {
                titleEs: "Desplazamiento",
                titleEn: "Call-out",
                priceEs: "Desde 49 €",
                priceEn: "From €49",
                noteEs: "IVA incluido. Gratis con plan Premium.",
                noteEn: "VAT included. Free with Premium plan.",
              },
              {
                titleEs: "Mano de obra",
                titleEn: "Labour",
                priceEs: "60 €/h",
                priceEn: "€60/h",
                noteEs: "Primera hora completa mínimo.",
                noteEn: "First hour charged as minimum.",
              },
              {
                titleEs: "Piezas",
                titleEn: "Parts",
                priceEs: "A precio de coste",
                priceEn: "At cost price",
                noteEs: "Precio preferente para clientes con contrato.",
                noteEn: "Preferential price for contract customers.",
              },
            ].map((item) => (
              <div key={item.titleEs} className="bg-[var(--warm-bg)] rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {es ? item.titleEs : item.titleEn}
                </p>
                <p className="font-bold text-[var(--primary)] text-xl mb-1">{es ? item.priceEs : item.priceEn}</p>
                <p className="text-xs text-muted-foreground">{es ? item.noteEs : item.noteEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
