import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.soltevaelevacion.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // WordPress URLs → new structure (301 preserva SEO)
      { source: "/silla-salvaescaleras-recta-handicare-950/:path*", destination: "/es/productos/sillas-salvaescaleras/handicare-950", permanent: true },
      { source: "/silla-salvaescaleras-curva-doble-rail-platinum-ergo/:path*", destination: "/es/productos/sillas-salvaescaleras/platinum-ergo", permanent: true },
      { source: "/silla-salvaescaleras-curva-mono-rail-handicare-freecurve/:path*", destination: "/es/productos/sillas-salvaescaleras/freecurve", permanent: true },
      { source: "/silla-salvaescaleras-curva-doble-rail-handicare-2000-exterior/:path*", destination: "/es/productos/sillas-salvaescaleras/handicare-2000-exterior", permanent: true },
      { source: "/plataforma-salvaescaleras-logic/:path*", destination: "/es/productos/plataformas/logic", permanent: true },
      { source: "/plataforma-salvaescaleras-slim/:path*", destination: "/es/productos/plataformas/slim", permanent: true },
      { source: "/plataforma-salvaescaleras-supra/:path*", destination: "/es/productos/plataformas/supra", permanent: true },
      { source: "/plataforma-salvaescaleras-stepper/:path*", destination: "/es/productos/plataformas/stepper", permanent: true },
      { source: "/elevador-vertical-dizalo/:path*", destination: "/es/productos/elevadores-verticales/dizalo", permanent: true },
      { source: "/elevador-vertical-mizar-y-liliput/:path*", destination: "/es/productos/elevadores-verticales/mizar-liliput", permanent: true },
      { source: "/elevador-vertical-teorema/:path*", destination: "/es/productos/elevadores-verticales/teorema", permanent: true },
      { source: "/elevador-vertical-elfo/:path*", destination: "/es/productos/elevadores-verticales/elfo", permanent: true },
      { source: "/elevador-vertical-orion/:path*", destination: "/es/productos/elevadores-verticales/orion", permanent: true },
      { source: "/elevador-vertical-corta-altura-epa-1/:path*", destination: "/es/productos/elevadores-verticales/epa-1", permanent: true },
      { source: "/elevador-vertical-gran-altura-epa-2000/:path*", destination: "/es/productos/elevadores-verticales/epa-2000", permanent: true },
      { source: "/grua-salvaescaleras-hidraulica-piscina/:path*", destination: "/es/productos/grua-piscina", permanent: true },
      { source: "/gruas-de-piscina/:path*", destination: "/es/productos/grua-piscina", permanent: true },
      { source: "/sillas-salvaescaleras/:path*", destination: "/es/productos/sillas-salvaescaleras", permanent: true },
      { source: "/plataforma-salvaescaleras/:path*", destination: "/es/productos/plataformas", permanent: true },
      { source: "/elevador-vertical/:path*", destination: "/es/productos/elevadores-verticales", permanent: true },
      { source: "/productos/:path*", destination: "/es/productos", permanent: true },
      { source: "/empresa/:path*", destination: "/es/empresa", permanent: true },
      { source: "/delegaciones/:path*", destination: "/es/delegaciones", permanent: true },
      { source: "/contacto/:path*", destination: "/es/contacto", permanent: true },
      { source: "/instalaciones/:path*", destination: "/es/instalaciones", permanent: true },
      { source: "/instalaciones-de-confianza/:path*", destination: "/es/instalaciones", permanent: true },
      { source: "/salvaescaleras-en-organismos-publicos/:path*", destination: "/es/instalaciones/organismos-publicos", permanent: true },
      { source: "/salvaescaleras-en-colegios/:path*", destination: "/es/instalaciones/colegios", permanent: true },
      { source: "/salvaescaleras-en-hoteles/:path*", destination: "/es/instalaciones/hoteles", permanent: true },
      { source: "/salvaescaleras-en-locales-y-comercios/:path*", destination: "/es/instalaciones/locales-comercios", permanent: true },
      { source: "/salvaescaleras-en-comunidad-de-vecinos/:path*", destination: "/es/instalaciones/comunidades-vecinos", permanent: true },
      { source: "/salvaescaleras-en-casas-particulares/:path*", destination: "/es/instalaciones/casas-particulares", permanent: true },
      { source: "/rampas-de-obra/:path*", destination: "/es/productos/rampas", permanent: true },
      { source: "/rampas-portatiles/:path*", destination: "/es/productos/rampas", permanent: true },
      { source: "/politicadeprotecciondedatosyprivacidad/:path*", destination: "/es/politica-privacidad", permanent: true },
      { source: "/malaga/:path*", destination: "/es/delegaciones", permanent: true },
      // English WP URLs
      { source: "/company/:path*", destination: "/en/empresa", permanent: true },
      { source: "/contact/:path*", destination: "/en/contacto", permanent: true },
      { source: "/offices/:path*", destination: "/en/delegaciones", permanent: true },
      { source: "/instalations/:path*", destination: "/en/instalaciones", permanent: true },
      { source: "/inicio/:path*", destination: "/es", permanent: true },
      { source: "/inicio_bk/:path*", destination: "/es", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
