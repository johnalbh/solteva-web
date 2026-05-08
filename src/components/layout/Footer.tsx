import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const STAIRLIFTS = [
  { slug: "handicare-950", nameEs: "Handicare 950 (Recta)", nameEn: "Handicare 950 (Straight)" },
  { slug: "platinum-ergo", nameEs: "Platinum Ergo (Curva)", nameEn: "Platinum Ergo (Curved)" },
  { slug: "freecurve", nameEs: "Handicare Freecurve", nameEn: "Handicare Freecurve" },
  { slug: "handicare-2000-exterior", nameEs: "Handicare 2000 Exterior", nameEn: "Handicare 2000 Outdoor" },
];

const LIFTS = [
  { path: "plataformas", slug: "logic", nameEs: "Plataforma Logic", nameEn: "Logic Platform" },
  { path: "elevadores-verticales", slug: "dizalo", nameEs: "Elevador Dizalo", nameEn: "Dizalo Lift" },
  { path: "grua-piscina", slug: null, nameEs: "Grúa de Piscina", nameEn: "Pool Hoist" },
];

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  function href(path: string) {
    return `/${locale}${path}`;
  }

  return (
    <footer className="bg-[var(--ink)] text-white" role="contentinfo">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href={href("")} aria-label="Solteva Elevación — Inicio">
              <Image
                src="/images/logos/logo_grupo_solteva.png"
                alt="Solteva Elevación"
                width={140}
                height={42}
                className="h-10 w-auto brightness-0 invert mb-4"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="tel:+34900100133"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                aria-label="Llamar 900 100 133"
              >
                <Phone size={14} aria-hidden />
                <span className="font-semibold">900 100 133</span>
                <span className="text-white/50 text-xs">
                  {locale === "es" ? "(gratuito)" : "(free)"}
                </span>
              </a>
              <a
                href="mailto:[email protected]"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Mail size={14} aria-hidden />
                [email protected]
              </a>
              <div className="flex items-start gap-2 text-white/70 text-xs mt-1">
                <MapPin size={13} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  {locale === "es"
                    ? "Málaga · Sevilla · Córdoba · Jaén · Granada y más"
                    : "Málaga · Seville · Córdoba · Jaén · Granada and more"}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 — Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              {t("footer.products")}
            </h3>
            <ul className="flex flex-col gap-2">
              {STAIRLIFTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={href(`/productos/sillas-salvaescaleras/${p.slug}`)}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {locale === "es" ? p.nameEs : p.nameEn}
                  </Link>
                </li>
              ))}
              {LIFTS.map((p) => (
                <li key={`${p.path}-${p.slug}`}>
                  <Link
                    href={href(p.slug ? `/productos/${p.path}/${p.slug}` : `/productos/${p.path}`)}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {locale === "es" ? p.nameEs : p.nameEn}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={href("/productos")}
                  className="text-sm text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors font-medium"
                >
                  {t("common.viewAll")} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              {t("footer.company_section")}
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { path: "/empresa", labelEs: "Sobre nosotros", labelEn: "About us" },
                { path: "/proyectos", labelEs: "Proyectos realizados", labelEn: "Completed projects" },
                { path: "/instalaciones", labelEs: "Instalaciones de confianza", labelEn: "Trusted installations" },
                { path: "/servicios", labelEs: "Servicios y mantenimiento", labelEn: "Services & maintenance" },
                { path: "/delegaciones", labelEs: "Delegaciones", labelEn: "Offices" },
                { path: "/recursos", labelEs: "Guías y recursos", labelEn: "Guides & resources" },
                { path: "/glosario", labelEs: "Glosario", labelEn: "Glossary" },
                { path: "/contacto", labelEs: "Contacto", labelEn: "Contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={href(item.path)}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {locale === "es" ? item.labelEs : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3 mt-6">
              {locale === "es" ? "Síguenos" : "Follow us"}
            </h3>
            <a
              href="https://www.facebook.com/pages/Salvaescaleras-Solteva-Elevacion/702418139836170"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              aria-label="Facebook de Solteva Elevación (abre en nueva pestaña)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Facebook
              <ExternalLink size={10} aria-hidden />
            </a>
          </div>

          {/* Column 4 — Service zone */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              {locale === "es" ? "Zonas de servicio" : "Service areas"}
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              {locale === "es"
                ? "Málaga, Mijas, Cártama, Manilva, Sevilla, Córdoba, Jaén, Granada, Almería, Cádiz, Huelva, Gibraltar, Murcia, Alicante, Valencia, Badajoz, Cáceres, Madrid y más."
                : "Málaga, Mijas, Cártama, Manilva, Seville, Córdoba, Jaén, Granada, Almería, Cádiz, Huelva, Gibraltar, Murcia, Alicante, Valencia, Badajoz, Cáceres, Madrid and more."}
            </p>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">
                {locale === "es" ? "Horario" : "Hours"}
              </h3>
              <p className="text-sm text-white/70">
                {locale === "es" ? "Lunes a viernes" : "Monday to Friday"}<br />
                8:30 – 14:30h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Solteva Elevación. {t("footer.rights")}
          </p>
          <Link
            href={href("/politica-privacidad")}
            className="hover:text-white/70 transition-colors"
          >
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
