"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  nameEs: string;
  nameEn: string;
  locationEs: string;
  locationEn: string;
  textEs: string;
  textEn: string;
  rating: number;
  product?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    nameEs: "Carmen R.",
    nameEn: "Carmen R.",
    locationEs: "Málaga",
    locationEn: "Málaga",
    textEs: "Llevábamos años sin poder subir a mi madre al primer piso. Solteva nos visitó al día siguiente, sin compromiso, y en una semana teníamos la silla instalada. Mi madre volvió a dormir en su habitación. Maravilloso.",
    textEn: "For years my mother couldn't get upstairs. Solteva visited the next day with no obligation, and within a week the lift was installed. My mother slept in her own room again. Wonderful.",
    rating: 5,
    product: "Handicare 950",
  },
  {
    nameEs: "Antonio M.",
    nameEn: "Antonio M.",
    locationEs: "Sevilla",
    locationEn: "Seville",
    textEs: "Muy profesionales desde el primer momento. La instalación fue impecable, en 4 días sin obras ni suciedad. El técnico nos explicó todo con mucha paciencia. Totalmente recomendable.",
    textEn: "Very professional from the start. The installation was impeccable, 4 days with no building work or mess. The technician explained everything patiently. Highly recommended.",
    rating: 5,
    product: "Platinum Ergo",
  },
  {
    nameEs: "Comunidad Vecinos Cártama",
    nameEn: "Residents Community, Cártama",
    locationEs: "Cártama, Málaga",
    locationEn: "Cártama, Málaga",
    textEs: "Instalaron una plataforma salvaescaleras en nuestra escalera de 4 plantas. Todo el proceso fue muy ágil y el precio muy competitivo. El servicio de mantenimiento es también excelente.",
    textEn: "They installed a platform lift on our 4-storey staircase. The whole process was very smooth and the price very competitive. The maintenance service is also excellent.",
    rating: 5,
    product: "Plataforma Slim",
  },
  {
    nameEs: "María José P.",
    nameEn: "María José P.",
    locationEs: "Jaén",
    locationEn: "Jaén",
    textEs: "Mi padre tiene Parkinson y ya no podía subir las escaleras de casa. Gracias a Solteva recuperó su independencia. El equipo es muy humano, te tratan como a una familia. Gracias de corazón.",
    textEn: "My father has Parkinson's and could no longer manage the stairs at home. Thanks to Solteva he regained his independence. The team is very humane, they treat you like family. Thank you from the heart.",
    rating: 5,
    product: "Handicare 950",
  },
  {
    nameEs: "Hotel Costa del Sol",
    nameEn: "Hotel Costa del Sol",
    locationEs: "Marbella, Málaga",
    locationEn: "Marbella, Málaga",
    textEs: "Necesitábamos cumplir con la normativa de accesibilidad y Solteva nos ofreció la solución perfecta para nuestro hotel. Instalación rápida, discreta y resultado excelente.",
    textEn: "We needed to comply with accessibility regulations and Solteva offered us the perfect solution for our hotel. Fast, discreet installation and excellent result.",
    rating: 5,
    product: "Elevador EPA",
  },
];

interface TestimonialsCarouselProps {
  locale: string;
  title: string;
  subtitle?: string;
}

export default function TestimonialsCarousel({
  locale,
  title,
  subtitle,
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[current];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-4">{title}</h2>
        {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 lg:p-10">
          <Quote
            size={40}
            className="text-[var(--primary)]/20 mb-4"
            aria-hidden
          />

          <blockquote className="text-lg text-foreground leading-relaxed mb-6">
            &ldquo;{locale === "es" ? t.textEs : t.textEn}&rdquo;
          </blockquote>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-semibold text-ink">
                {locale === "es" ? t.nameEs : t.nameEn}
              </p>
              <p className="text-sm text-muted-foreground">
                {locale === "es" ? t.locationEs : t.locationEn}
                {t.product && ` · ${t.product}`}
              </p>
            </div>
            <div className="flex gap-0.5" aria-label={`${t.rating} estrellas`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-[var(--accent)] text-[var(--accent)]"
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-border bg-white hover:bg-secondary transition-colors"
            aria-label={locale === "es" ? "Testimonio anterior" : "Previous testimonial"}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === current
                    ? "bg-[var(--primary)] w-5"
                    : "bg-border hover:bg-muted-foreground"
                )}
                aria-label={`Ir al testimonio ${i + 1}`}
                aria-current={i === current}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-border bg-white hover:bg-secondary transition-colors"
            aria-label={locale === "es" ? "Siguiente testimonio" : "Next testimonial"}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
