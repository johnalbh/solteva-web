"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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

export default function TestimonialsCarousel({ locale, title, subtitle }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const es = locale === "es";

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[current];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <p className="eyebrow mb-3">{es ? "Testimonios" : "Testimonials"}</p>
        <h2
          className="text-ink"
          style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-ink-secondary mx-auto mt-3"
            style={{ fontSize: "0.95rem", lineHeight: 1.5, maxWidth: "44ch", letterSpacing: "-0.012em" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "var(--corner-radius)",
          padding: "clamp(2rem, 4vw, 3rem)",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {/* Stars */}
        <div className="flex gap-1 mb-5" aria-label={`${t.rating} estrellas`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star
              key={i}
              size={16}
              style={{ fill: "rgb(255,159,10)", color: "rgb(255,159,10)" }}
              aria-hidden
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
            lineHeight: 1.55,
            letterSpacing: "-0.016em",
            color: "rgb(29,29,31)",
            marginBottom: 28,
          }}
        >
          &ldquo;{es ? t.textEs : t.textEn}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p style={{ fontSize: "0.92rem", fontWeight: 600, letterSpacing: "-0.014em", color: "rgb(29,29,31)" }}>
              {es ? t.nameEs : t.nameEn}
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgb(110,110,115)", letterSpacing: "-0.01em", marginTop: 2 }}>
              {es ? t.locationEs : t.locationEn}
              {t.product && ` · ${t.product}`}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          aria-label={es ? "Testimonio anterior" : "Previous testimonial"}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgb(245,245,247)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronLeft size={18} style={{ color: "rgb(110,110,115)" }} />
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              aria-current={i === current}
              style={{
                height: 8, width: i === current ? 20 : 8,
                borderRadius: 980, border: "none", cursor: "pointer",
                background: i === current ? "var(--cta-blue)" : "rgb(210,210,215)",
                transition: "all 0.2s",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label={es ? "Siguiente testimonio" : "Next testimonial"}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgb(245,245,247)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ChevronRight size={18} style={{ color: "rgb(110,110,115)" }} />
        </button>
      </div>
    </div>
  );
}
