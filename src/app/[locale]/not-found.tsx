import Link from "next/link";
import { Home, Phone, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg text-center">
        <p className="font-display text-8xl font-bold text-[var(--primary)] opacity-20 leading-none mb-4">
          404
        </p>
        <h1 className="font-display text-3xl font-bold text-[var(--ink)] mb-3">
          Página no encontrada
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-8">
          Lo sentimos, esta página no existe o ha cambiado de dirección. Puede
          que hayas seguido un enlace antiguo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/es"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-bold h-12 px-6"
            )}
          >
            <Home size={18} className="mr-2" aria-hidden />
            Ir al inicio
          </Link>
          <a
            href="tel:+34900100133"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-[var(--primary)] text-[var(--primary)] font-bold h-12 px-6"
            )}
          >
            <Phone size={18} className="mr-2" aria-hidden />
            900 100 133
          </a>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500 mb-4">
            Puede que estés buscando:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "Sillas salvaescaleras", href: "/es/productos/sillas-salvaescaleras" },
              { label: "Plataformas", href: "/es/productos/plataformas" },
              { label: "Elevadores verticales", href: "/es/productos/elevadores-verticales" },
              { label: "Delegaciones", href: "/es/delegaciones" },
              { label: "Contacto", href: "/es/contacto" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 text-sm text-[var(--primary)] font-medium hover:underline border border-[var(--primary)]/30 px-3 py-1.5 rounded-full hover:bg-[var(--primary)]/5 transition-colors"
              >
                <Search size={12} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
