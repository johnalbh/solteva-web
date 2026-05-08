import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Shield, Zap, HeartHandshake, ArrowRight, Phone, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Servicios de Accesibilidad — Mantenimiento, SAT y Garantía | Solteva"
        : "Accessibility Services — Maintenance, Support & Warranty | Solteva",
    description:
      locale === "es"
        ? "Mantenimiento preventivo, asistencia técnica urgente y garantía extendida para sillas salvaescaleras, plataformas y elevadores. Servicio en toda Andalucía."
        : "Preventive maintenance, urgent technical assistance and extended warranty for stairlifts, platforms and lifts. Service across all Andalusia.",
    locale,
    path: "/servicios",
  });
}

const SERVICES = [
  {
    icon: Wrench,
    slug: "mantenimiento",
    titleEs: "Mantenimiento Preventivo",
    titleEn: "Preventive Maintenance",
    descEs: "Revisiones periódicas anuales o bianuales que garantizan el funcionamiento óptimo y prolongan la vida útil de tu equipo. Incluye ajuste de velocidades, revisión de sistemas de seguridad y engrase de guías.",
    descEn: "Annual or biannual periodic inspections that guarantee optimal operation and extend the life of your equipment. Includes speed adjustment, safety system checks and guide lubrication.",
    features: [
      { es: "Revisión anual completa", en: "Full annual inspection" },
      { es: "Informe técnico detallado", en: "Detailed technical report" },
      { es: "Ajuste y calibración incluidos", en: "Adjustment and calibration included" },
      { es: "Piezas de desgaste a precio preferente", en: "Wear parts at preferential price" },
    ],
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Zap,
    slug: "sat",
    titleEs: "Asistencia Técnica Urgente (SAT)",
    titleEn: "Urgent Technical Assistance (SAT)",
    descEs: "Servicio de urgencias con técnicos especializados en toda Andalucía. Tiempo de respuesta garantizado. Disponible para todos nuestros modelos de sillas, plataformas y elevadores, independientemente del año de instalación.",
    descEn: "Emergency service with specialist technicians across all Andalusia. Guaranteed response time. Available for all our stairlift, platform and lift models, regardless of installation year.",
    features: [
      { es: "Técnico en tu domicilio", en: "Technician at your door" },
      { es: "Tiempo de respuesta garantizado", en: "Guaranteed response time" },
      { es: "Stock de recambios en furgoneta", en: "Spare parts stock in van" },
      { es: "Presupuesto antes de comenzar", en: "Quote before starting" },
    ],
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Shield,
    slug: "garantia",
    titleEs: "Garantía Extendida Solteva",
    titleEn: "Solteva Extended Warranty",
    descEs: "Todos nuestros equipos incluyen garantía de fábrica. Además, ofrecemos planes de garantía extendida de hasta 5 años que cubren piezas y mano de obra, sin costes ocultos ni letra pequeña.",
    descEn: "All our equipment includes manufacturer's warranty. We also offer extended warranty plans of up to 5 years covering parts and labour, with no hidden costs or small print.",
    features: [
      { es: "Hasta 5 años de cobertura", en: "Up to 5 years of coverage" },
      { es: "Piezas y mano de obra incluidas", en: "Parts and labour included" },
      { es: "Sin límite de intervenciones", en: "No limit on call-outs" },
      { es: "Transferible en caso de venta", en: "Transferable on sale of property" },
    ],
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: HeartHandshake,
    slug: null,
    titleEs: "Instalación Express (24-48h)",
    titleEn: "Express Installation (24-48h)",
    descEs: "Cuando el tiempo es crítico, nuestra instalación express pone el equipo en funcionamiento en 24 a 48 horas desde la visita técnica. Sin obras, sin ruido, sin polvo. La escalera queda libre para el resto de usuarios.",
    descEn: "When time is critical, our express installation has the equipment up and running within 24 to 48 hours of the technical visit. No building work, no noise, no dust. The staircase remains free for all other users.",
    features: [
      { es: "Visita y presupuesto en 24h", en: "Visit and quote in 24h" },
      { es: "Instalación sin obra", en: "No construction required" },
      { es: "Equipo certificado CE", en: "CE-certified equipment" },
      { es: "Formación de uso incluida", en: "User training included" },
    ],
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600",
  },
];

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  const es = locale === "es";

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6" aria-label="breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                  {es ? "Inicio" : "Home"}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{es ? "Servicios" : "Services"}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {es ? "Servicios Solteva" : "Solteva Services"}
          </h1>
          <p className="text-xl text-white/85 max-w-3xl">
            {es
              ? "No terminamos nuestra relación con la instalación. Mantenemos, reparamos y garantizamos tu equipo durante toda su vida útil."
              : "Our relationship doesn't end with installation. We maintain, repair and warrant your equipment throughout its entire useful life."}
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 lg:py-24 bg-[var(--warm-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.slug ?? svc.titleEs}
                  className={cn("rounded-2xl border-2 p-8", svc.color)}
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white shadow-sm", svc.iconColor)}>
                    <Icon size={24} aria-hidden />
                  </div>
                  <h2 className="font-display text-xl font-bold text-ink mb-3">
                    {es ? svc.titleEs : svc.titleEn}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {es ? svc.descEs : svc.descEn}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {svc.features.map((f) => (
                      <li key={f.es} className="flex items-start gap-2 text-sm">
                        <span className={cn("mt-0.5 shrink-0 font-bold", svc.iconColor)}>✓</span>
                        <span>{es ? f.es : f.en}</span>
                      </li>
                    ))}
                  </ul>
                  {svc.slug ? (
                    <Link
                      href={`/${locale}/servicios/${svc.slug}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "font-semibold"
                      )}
                    >
                      {es ? "Más información" : "Learn more"}
                      <ArrowRight size={14} className="ml-1.5" aria-hidden />
                    </Link>
                  ) : (
                    <Link
                      href={`/${locale}/contacto`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "font-semibold"
                      )}
                    >
                      {es ? "Solicitar presupuesto" : "Request quote"}
                      <ArrowRight size={14} className="ml-1.5" aria-hidden />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment strip */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-10">
            {es ? "Nuestro compromiso contigo" : "Our commitment to you"}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                titleEs: "Respuesta rápida",
                titleEn: "Fast response",
                descEs: "Nos comprometemos a responder en menos de 2 horas en horario laboral y a desplazar técnico el mismo día en urgencias.",
                descEn: "We commit to responding within 2 hours during working hours and to send a technician the same day for emergencies.",
              },
              {
                icon: Shield,
                titleEs: "Transparencia total",
                titleEn: "Full transparency",
                descEs: "Presupuesto detallado antes de cualquier intervención. Sin sorpresas, sin costes ocultos.",
                descEn: "Detailed quote before any intervention. No surprises, no hidden costs.",
              },
              {
                icon: HeartHandshake,
                titleEs: "Técnicos certificados",
                titleEn: "Certified technicians",
                descEs: "Todo nuestro equipo técnico está formado y certificado por los fabricantes de cada equipo.",
                descEn: "All our technical staff are trained and certified by the equipment manufacturers.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titleEs} className="text-center">
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

      {/* CTA */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            {es ? "¿Necesitas asistencia técnica?" : "Need technical assistance?"}
          </h2>
          <p className="text-white/80 mb-8">
            {es
              ? "Llama gratis al 900 100 133 o escríbenos y un técnico se pondrá en contacto contigo en menos de 2 horas."
              : "Call free on 900 100 133 or message us and a technician will contact you within 2 hours."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/contacto`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-[var(--primary)] hover:bg-white/90 font-bold h-14 px-8"
              )}
            >
              {es ? "Contactar ahora" : "Contact us now"}
            </Link>
            <a
              href="tel:+34900100133"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/50 text-white hover:bg-white/10 hover:text-white font-bold h-14 px-8 bg-transparent"
              )}
            >
              <Phone size={18} className="mr-2" aria-hidden />
              900 100 133
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
