"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Menu, ChevronDown, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const PRODUCT_CATEGORIES = [
  { keyEs: "sillas-salvaescaleras", labelKey: "stairlifts" },
  { keyEs: "plataformas", labelKey: "platforms" },
  { keyEs: "elevadores-verticales", labelKey: "verticalLifts" },
  { keyEs: "grua-piscina", labelKey: "poolLift" },
];

const SERVICIOS = [
  { path: "/servicios/mantenimiento", labelEs: "Mantenimiento preventivo", labelEn: "Preventive maintenance" },
  { path: "/servicios/sat", labelEs: "Asistencia técnica (SAT)", labelEn: "Technical assistance (SAT)" },
  { path: "/servicios/garantia", labelEs: "Garantía extendida", labelEn: "Extended warranty" },
];

const EMPRESA_LINKS = [
  { path: "/empresa", labelEs: "Sobre Solteva", labelEn: "About Solteva" },
  { path: "/delegaciones", labelEs: "Nuestras delegaciones", labelEn: "Our offices" },
  { path: "/instalaciones", labelEs: "Instalaciones", labelEn: "Installations" },
  { path: "/proyectos", labelEs: "Proyectos realizados", labelEn: "Completed projects" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [empresaOpen, setEmpresaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const h = (path: string) => `/${locale}${path}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/82" : "bg-transparent"
      )}
      style={scrolled ? {
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      } : undefined}
      role="banner"
    >
      <nav
        className="max-w-[1260px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between"
        style={{ height: 56 }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href={h("")} aria-label="Solteva Elevación — Inicio" className="shrink-0">
          <Image
            src="/images/logos/logo_grupo_solteva.png"
            alt="Solteva Elevación"
            width={130}
            height={40}
            priority
            className="h-7 lg:h-8 w-auto"
          />
        </Link>

        {/* Desktop — center links */}
        <div className="hidden lg:flex items-center gap-0.5">
          <Dropdown label={t("products")} open={productsOpen} setOpen={setProductsOpen}>
            <DropItem href={h("/productos")} onClick={() => setProductsOpen(false)} strong>
              {locale === "es" ? "Ver todos →" : "View all →"}
            </DropItem>
            <div className="h-px bg-black/5 my-1" />
            {PRODUCT_CATEGORIES.map((cat) => (
              <DropItem key={cat.keyEs} href={h(`/productos/${cat.keyEs}`)} onClick={() => setProductsOpen(false)}>
                {t(cat.labelKey as Parameters<typeof t>[0])}
              </DropItem>
            ))}
          </Dropdown>

          <Dropdown
            label={locale === "es" ? "Servicios" : "Services"}
            open={serviciosOpen}
            setOpen={setServiciosOpen}
          >
            <DropItem href={h("/servicios")} onClick={() => setServiciosOpen(false)} strong>
              {locale === "es" ? "Ver todos →" : "View all →"}
            </DropItem>
            <div className="h-px bg-black/5 my-1" />
            {SERVICIOS.map((s) => (
              <DropItem key={s.path} href={h(s.path)} onClick={() => setServiciosOpen(false)}>
                {locale === "es" ? s.labelEs : s.labelEn}
              </DropItem>
            ))}
          </Dropdown>

          <NavLink href={h("/recursos")}>{locale === "es" ? "Blog" : "Blog"}</NavLink>

          <Dropdown
            label={locale === "es" ? "Empresa" : "Company"}
            open={empresaOpen}
            setOpen={setEmpresaOpen}
          >
            {EMPRESA_LINKS.map((e) => (
              <DropItem key={e.path} href={h(e.path)} onClick={() => setEmpresaOpen(false)}>
                {locale === "es" ? e.labelEs : e.labelEn}
              </DropItem>
            ))}
          </Dropdown>
        </div>

        {/* Desktop — right side */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="tel:+34900100133"
            aria-label="Llamar 900 100 133"
            className="flex items-center gap-1.5 text-[0.82rem] font-normal tracking-[-0.01em] text-foreground/60 hover:text-foreground transition-colors"
          >
            <Phone size={13} aria-hidden />
            900 100 133
          </a>
          <Link
            href={h("/contacto")}
            className="btn-pill"
            style={{
              background: "var(--cta-blue)",
              color: "#fff",
              fontSize: "0.84rem",
              padding: "0.55rem 1.2rem",
            }}
          >
            {t("requestQuote")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden items-center gap-2.5">
          <LanguageSwitcher />
          <a href="tel:+34900100133" aria-label="Llamar 900 100 133" className="text-[var(--primary)]">
            <Phone size={18} aria-hidden />
          </a>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Abrir menú" />}>
              <Menu size={20} aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-0 overflow-y-auto">
              <SheetHeader className="border-b pb-4 pt-4">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex items-center justify-between">
                  <Image src="/images/logos/logo_grupo_solteva.png" alt="Solteva" width={110} height={34} className="h-7 w-auto" />
                  <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Cerrar">
                    <X size={18} aria-hidden />
                  </Button>
                </div>
              </SheetHeader>

              <nav className="py-3 flex flex-col" aria-label="Mobile navigation">
                <MobileLink href={h("")} onClick={() => setMobileOpen(false)}>
                  {locale === "es" ? "Inicio" : "Home"}
                </MobileLink>

                {/* Productos */}
                <p className="px-4 pt-4 pb-1 text-[0.67rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  {t("products")}
                </p>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <MobileLink key={cat.keyEs} href={h(`/productos/${cat.keyEs}`)} onClick={() => setMobileOpen(false)} indent>
                    {t(cat.labelKey as Parameters<typeof t>[0])}
                  </MobileLink>
                ))}

                {/* Servicios */}
                <p className="px-4 pt-4 pb-1 text-[0.67rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  {locale === "es" ? "Servicios" : "Services"}
                </p>
                {SERVICIOS.map((s) => (
                  <MobileLink key={s.path} href={h(s.path)} onClick={() => setMobileOpen(false)} indent>
                    {locale === "es" ? s.labelEs : s.labelEn}
                  </MobileLink>
                ))}

                {/* Blog */}
                <MobileLink href={h("/recursos")} onClick={() => setMobileOpen(false)}>
                  Blog
                </MobileLink>

                {/* Empresa — separado con divider */}
                <div className="h-px bg-border mx-4 my-2" />
                <p className="px-4 pt-2 pb-1 text-[0.67rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  {locale === "es" ? "Empresa" : "Company"}
                </p>
                {EMPRESA_LINKS.map((e) => (
                  <MobileLink key={e.path} href={h(e.path)} onClick={() => setMobileOpen(false)} indent>
                    {locale === "es" ? e.labelEs : e.labelEn}
                  </MobileLink>
                ))}
              </nav>

              <div className="border-t px-4 pt-4 pb-6 flex flex-col gap-2.5">
                <Link
                  href={h("/contacto")}
                  onClick={() => setMobileOpen(false)}
                  className="btn-pill w-full justify-center"
                  style={{ background: "var(--cta-blue)", color: "#fff" }}
                >
                  {t("requestQuote")}
                </Link>
                <a
                  href="tel:+34900100133"
                  className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center gap-2 rounded-full")}
                >
                  <Phone size={14} aria-hidden />
                  900 100 133
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-[1rem] font-normal tracking-[-0.01em] text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-black/5"
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label, open, setOpen, children,
}: {
  label: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  children: React.ReactNode;
}) {
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleEnter = () => {
    clearTimeout(closeTimeout.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 180);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="flex items-center gap-0.5 px-3 py-2 text-[1rem] font-normal tracking-[-0.01em] text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-black/5"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown
          size={12}
          className={cn("ml-0.5 opacity-50 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 min-w-[230px] bg-white rounded-2xl py-1.5 z-50"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 6px rgba(0,0,0,0.06)" }}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function DropItem({
  href, onClick, children, strong,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-4 py-2 text-[0.9rem] rounded-xl mx-1 transition-colors hover:bg-black/5",
        strong ? "font-semibold text-[var(--cta-blue)]" : "text-foreground/75 hover:text-foreground"
      )}
      role="menuitem"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href, onClick, children, indent,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  indent?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block py-2.5 text-[0.9rem] font-normal tracking-[-0.01em] text-foreground/80 hover:text-foreground transition-colors",
        indent ? "pl-8 pr-4" : "px-4"
      )}
    >
      {children}
    </Link>
  );
}
