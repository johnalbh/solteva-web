import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight, Phone, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";
import { proyectos, type ProyectoTipo } from "@/lib/proyectos";

type Props = { params: Promise<{ locale: string }> };

const TIPO_LABELS: Record<ProyectoTipo, { es: string; en: string; color: string }> = {
  residencial: { es: "Residencial", en: "Residential", color: "bg-blue-100 text-blue-800" },
  comunidad: { es: "Comunidad", en: "Community", color: "bg-green-100 text-green-800" },
  comercial: { es: "Comercial", en: "Commercial", color: "bg-amber-100 text-amber-800" },
  institucional: { es: "Institucional", en: "Institutional", color: "bg-purple-100 text-purple-800" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Proyectos de Accesibilidad Realizados | Solteva Elevación"
        : "Completed Accessibility Projects | Solteva Elevación",
    description:
      locale === "es"
        ? "Más de 500 instalaciones completadas en Andalucía. Casos reales de sillas salvaescaleras, plataformas y elevadores en comunidades, casas, hoteles e instituciones."
        : "Over 500 completed installations across Andalusia. Real cases of stairlifts, platforms and lifts in communities, homes, hotels and institutions.",
    locale,
    path: "/proyectos",
  });
}

export default async function ProyectosPage({ params }: Props) {
  const { locale } = await params;
  const es = locale === "es";

  const totalByTipo = Object.entries(TIPO_LABELS).map(([tipo, labels]) => ({
    tipo,
    label: es ? labels.es : labels.en,
    count: proyectos.filter((p) => p.tipo === tipo).length,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6" aria-label="breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                  {es ? "Inicio" : "Home"}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{es ? "Proyectos" : "Projects"}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {es ? "Nuestros proyectos" : "Our projects"}
          </h1>
          <p className="text-xl text-white/85 max-w-3xl leading-relaxed mb-8">
            {es
              ? "Más de 500 instalaciones completadas en Andalucía, Madrid y toda España. Casos reales de familias, comunidades, hoteles y organismos públicos que mejoraron su accesibilidad con Solteva."
              : "Over 500 completed installations across Andalusia, Madrid and all of Spain. Real cases of families, communities, hotels and public bodies that improved their accessibility with Solteva."}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "+500", labelEs: "Instalaciones", labelEn: "Installations" },
              { value: "15+", labelEs: "Años de experiencia", labelEn: "Years of experience" },
              { value: "9", labelEs: "Delegaciones", labelEn: "Offices" },
              { value: "98%", labelEs: "Clientes satisfechos", labelEn: "Satisfied clients" },
            ].map((stat) => (
              <div key={stat.value} className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <p className="font-display text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-white/75 text-xs mt-1">{es ? stat.labelEs : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <div className="border-b border-border bg-white sticky top-[calc(var(--header-height,80px))] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0 mr-2">
            {es ? "Tipo:" : "Type:"}
          </span>
          <span className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--primary)] text-white">
            {es ? `Todos (${proyectos.length})` : `All (${proyectos.length})`}
          </span>
          {totalByTipo.map(({ tipo, label, count }) => (
            <span
              key={tipo}
              className={cn("shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-border text-muted-foreground", TIPO_LABELS[tipo as ProyectoTipo].color)}
            >
              {label} ({count})
            </span>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <section className="py-16 lg:py-24 bg-[var(--warm-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto) => {
              const tipoLabel = TIPO_LABELS[proyecto.tipo];
              return (
                <article
                  key={proyecto.id}
                  className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--warm-bg)]">
                    <Image
                      src={proyecto.imagen}
                      alt={es ? proyecto.tituloEs : proyecto.tituloEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full", tipoLabel.color)}>
                        {es ? tipoLabel.es : tipoLabel.en}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-semibold text-sm line-clamp-2">
                        {es ? proyecto.tituloEs : proyecto.tituloEn}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} aria-hidden />
                        {proyecto.ciudad}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} aria-hidden />
                        {proyecto.year}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[var(--primary)] mb-2">
                      {es ? proyecto.productoEs : proyecto.productoEn}
                    </p>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {es ? proyecto.descripcionEs : proyecto.descripcionEn}
                    </p>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                      {proyecto.stats.map((stat) => (
                        <div key={stat.value} className="text-center">
                          <p className="font-bold text-sm text-[var(--primary)]">{stat.value}</p>
                          <p className="text-[10px] text-muted-foreground">{es ? stat.labelEs : stat.labelEn}</p>
                        </div>
                      ))}
                    </div>

                    {/* Destacado */}
                    <div className="mt-3 flex items-center gap-2 bg-[var(--warm-bg)] rounded-lg px-3 py-2">
                      <CheckCircle size={14} className="text-[var(--primary)] shrink-0" aria-hidden />
                      <p className="text-xs font-medium text-[var(--primary)]">
                        {es ? proyecto.destacadoEs : proyecto.destacadoEn}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            {es ? "¿Cómo gestionamos tu proyecto?" : "How do we manage your project?"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            {es
              ? "Desde la primera llamada hasta la instalación completa, te acompañamos en cada paso."
              : "From the first call to full installation, we are with you every step of the way."}
          </p>
          <div className="grid sm:grid-cols-4 gap-6 mb-10">
            {[
              { n: "01", es: "Visita gratuita y sin compromiso", en: "Free, no-obligation visit" },
              { n: "02", es: "Presupuesto personalizado en 24h", en: "Personalised quote in 24h" },
              { n: "03", es: "Instalación sin obras en 24-72h", en: "Installation without building work in 24-72h" },
              { n: "04", es: "Soporte técnico durante toda la vida útil", en: "Technical support throughout the product's lifetime" },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white font-bold text-sm flex items-center justify-center">
                  {step.n}
                </div>
                <p className="text-sm font-medium text-center">{es ? step.es : step.en}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/contacto`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 px-8"
              )}
            >
              {es ? "Iniciar mi proyecto" : "Start my project"}
              <ArrowRight size={18} className="ml-2" aria-hidden />
            </Link>
            <a
              href="tel:+34900100133"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "font-bold h-14 px-8"
              )}
            >
              <Phone size={18} className="mr-2" aria-hidden />
              900 100 133
            </a>
          </div>
        </div>
      </section>

      {/* Institutional CTA */}
      <section className="bg-[var(--primary)] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            {es
              ? "¿Eres un organismo público o empresa?"
              : "Are you a public body or business?"}
          </h2>
          <p className="text-white/80 mb-6">
            {es
              ? "Gestionamos subvenciones y financiación colectiva para comunidades de vecinos, colegios, ayuntamientos y empresas. Consulta gratis."
              : "We manage grants and collective financing for residential communities, schools, councils and businesses. Free consultation."}
          </p>
          <Link
            href={`/${locale}/contacto`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-[var(--primary)] hover:bg-white/90 font-bold h-12 px-8"
            )}
          >
            {es ? "Solicitar consulta gratuita" : "Request free consultation"}
          </Link>
        </div>
      </section>
    </div>
  );
}
