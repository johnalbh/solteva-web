import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight } from "lucide-react";
import { proyectos } from "@/lib/proyectos";

interface ProyectosTeaserProps {
  locale: string;
}

const TIPO_LABEL: Record<string, { es: string; en: string }> = {
  residencial: { es: "Residencial", en: "Residential" },
  comunidad: { es: "Comunidad", en: "Community" },
  comercial: { es: "Comercial", en: "Commercial" },
  institucional: { es: "Institucional", en: "Institutional" },
};

export default function ProyectosTeaser({ locale }: ProyectosTeaserProps) {
  const es = locale === "es";
  const [hero, ...rest] = proyectos.slice(0, 4);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div>
          <p className="eyebrow mb-4">{es ? "Casos reales" : "Real cases"}</p>
          <h2 className="headline-xl text-ink mb-4">
            {es ? "Proyectos recientes" : "Recent projects"}
          </h2>
          <p
            className="text-ink-secondary"
            style={{ maxWidth: "38ch", fontSize: "1.05rem", lineHeight: 1.47, letterSpacing: "-0.016em" }}
          >
            {es
              ? "Más de 500 instalaciones en Andalucía y España."
              : "Over 500 installations in Andalusia and Spain."}
          </p>
        </div>
        <Link
          href={`/${locale}/proyectos`}
          className="link-more shrink-0"
        >
          {es ? "Ver todos los proyectos" : "View all projects"}
          <ChevronRight size={15} aria-hidden />
        </Link>
      </div>

      {/* Grid — Apple editorial layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "20px" }}>
        {/* Featured — 2 cols on desktop */}
        <Link
          href={`/${locale}/proyectos`}
          className="group relative overflow-hidden lg:col-span-2"
          style={{ minHeight: 400, borderRadius: "var(--corner-radius)" }}
          aria-label={es ? hero.tituloEs : hero.tituloEn}
        >
          <Image
            src={hero.imagen}
            alt={es ? hero.tituloEs : hero.tituloEn}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <span
              className="inline-block text-white/60 mb-2"
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase" }}
            >
              {TIPO_LABEL[hero.tipo]?.[es ? "es" : "en"]} · {hero.ciudad}
            </span>
            <h3
              className="text-white font-semibold"
              style={{ fontSize: "1.3rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              {es ? hero.tituloEs : hero.tituloEn}
            </h3>
            <p className="text-white/60 text-sm mt-1.5">
              {es ? hero.productoEs : hero.productoEn}
            </p>
          </div>
        </Link>

        {/* Smaller cards */}
        <div className="flex flex-col" style={{ gap: "20px" }}>
          {rest.slice(0, 2).map((proyecto) => (
            <Link
              key={proyecto.id}
              href={`/${locale}/proyectos`}
              className="group relative overflow-hidden flex-1"
              style={{ minHeight: 188, borderRadius: "var(--corner-radius)" }}
              aria-label={es ? proyecto.tituloEs : proyecto.tituloEn}
            >
              <Image
                src={proyecto.imagen}
                alt={es ? proyecto.tituloEs : proyecto.tituloEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }}
                aria-hidden
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MapPin size={11} className="text-white/50" aria-hidden />
                  <span
                    className="text-white/50"
                    style={{ fontSize: "0.72rem", letterSpacing: "0.08em", fontWeight: 600, textTransform: "uppercase" }}
                  >
                    {proyecto.ciudad}
                  </span>
                </div>
                <h3
                  className="text-white font-semibold"
                  style={{ fontSize: "1rem", letterSpacing: "-0.01em", lineHeight: 1.25 }}
                >
                  {es ? proyecto.tituloEs : proyecto.tituloEn}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
