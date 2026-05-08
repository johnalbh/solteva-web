"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ChevronRight, RotateCcw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StairShape = "straight" | "curved" | "outdoor";
type InstallLocation = "indoor" | "outdoor";
type UserType = "personal" | "wheelchair";

interface ProductRecommendation {
  slug: string;
  categorySlug: string;
  nameEs: string;
  nameEn: string;
  descEs: string;
  descEn: string;
  heroImage: string;
  fromPrice: string;
  badge?: string;
}

const RECOMMENDATIONS: Record<string, ProductRecommendation[]> = {
  "straight-indoor-personal": [
    {
      slug: "handicare-950",
      categorySlug: "sillas-salvaescaleras",
      nameEs: "Handicare 950 Recta",
      nameEn: "Handicare 950 Straight",
      descEs: "La opción más económica y fiable para escaleras rectas interiores.",
      descEn: "The most affordable and reliable option for straight indoor staircases.",
      heroImage: "/images/products/stairlifts/handicare-950/img-1.jpg",
      fromPrice: "2.490",
      badge: "Más vendida",
    },
  ],
  "curved-indoor-personal": [
    {
      slug: "freecurve",
      categorySlug: "sillas-salvaescaleras",
      nameEs: "Handicare Freecurve",
      nameEn: "Handicare Freecurve",
      descEs: "Raíl único para curvas. Diseño compacto y elegante.",
      descEn: "Single curved rail. Compact and elegant design.",
      heroImage: "/images/products/stairlifts/freecurve/img-1.jpg",
      fromPrice: "3.990",
      badge: "Mono-raíl",
    },
    {
      slug: "platinum-ergo",
      categorySlug: "sillas-salvaescaleras",
      nameEs: "Platinum Ergo Curva",
      nameEn: "Platinum Ergo Curved",
      descEs: "Doble raíl para mayor estabilidad en escaleras con muchas curvas.",
      descEn: "Dual rail for maximum stability on complex curved staircases.",
      heroImage: "/images/products/stairlifts/platinum-ergo/main.jpg",
      fromPrice: "4.290",
    },
  ],
  "outdoor-outdoor-personal": [
    {
      slug: "handicare-2000-exterior",
      categorySlug: "sillas-salvaescaleras",
      nameEs: "Handicare 2000 Exterior",
      nameEn: "Handicare 2000 Outdoor",
      descEs: "Resistente a la lluvia, sol y temperatura. Para escaleras exteriores.",
      descEn: "Rain, sun and temperature resistant. Designed for outdoor staircases.",
      heroImage: "/images/products/stairlifts/handicare-2000-exterior/img-1.jpg",
      fromPrice: "4.890",
      badge: "Todo tiempo",
    },
  ],
  "straight-indoor-wheelchair": [
    {
      slug: "logic",
      categorySlug: "plataformas",
      nameEs: "Plataforma Logic",
      nameEn: "Logic Platform Lift",
      descEs: "Plataforma salvaescaleras recta para silla de ruedas o movilidad reducida.",
      descEn: "Straight platform stairlift for wheelchairs or reduced mobility.",
      heroImage: "/images/products/platforms/logic/img-10.jpg",
      fromPrice: "3.200",
      badge: "Silla de ruedas",
    },
  ],
  "curved-indoor-wheelchair": [
    {
      slug: "supra",
      categorySlug: "plataformas",
      nameEs: "Plataforma Supra",
      nameEn: "Supra Platform Lift",
      descEs: "Plataforma curva adaptable a cualquier escalera con accesibilidad total.",
      descEn: "Curved platform adaptable to any staircase with full accessibility.",
      heroImage: "/images/products/platforms/supra/img-1.jpg",
      fromPrice: "5.800",
    },
  ],
  "outdoor-outdoor-wheelchair": [
    {
      slug: "slim",
      categorySlug: "plataformas",
      nameEs: "Plataforma Slim Exterior",
      nameEn: "Slim Outdoor Platform",
      descEs: "Plataforma compacta para uso exterior, resistente a la intemperie.",
      descEn: "Compact outdoor platform, weather-resistant construction.",
      heroImage: "/images/products/platforms/slim/img-1.jpg",
      fromPrice: "4.500",
    },
  ],
};

function getRecommendations(
  shape: StairShape,
  location: InstallLocation,
  userType: UserType
): ProductRecommendation[] {
  const key = `${shape}-${location}-${userType}`;
  return (
    RECOMMENDATIONS[key] ||
    RECOMMENDATIONS[`${shape}-${shape === "outdoor" ? "outdoor" : "indoor"}-personal`] ||
    []
  );
}

const STEPS = {
  stairShape: {
    questionEs: "¿Cómo es tu escalera?",
    questionEn: "What type of staircase do you have?",
    options: [
      {
        value: "straight" as StairShape,
        labelEs: "Recta",
        labelEn: "Straight",
        descEs: "Todos los peldaños en línea recta",
        descEn: "All steps in a straight line",
        icon: "▱",
      },
      {
        value: "curved" as StairShape,
        labelEs: "Curva / Con rellano",
        labelEn: "Curved / With landing",
        descEs: "Con curva, giro o rellano intermedio",
        descEn: "With a curve, turn or intermediate landing",
        icon: "↩",
      },
      {
        value: "outdoor" as StairShape,
        labelEs: "Exterior",
        labelEn: "Outdoor",
        descEs: "Escalera al aire libre o jardín",
        descEn: "Outdoor or garden staircase",
        icon: "⛅",
      },
    ],
  },
  userType: {
    questionEs: "¿Quién va a utilizarla?",
    questionEn: "Who will be using it?",
    options: [
      {
        value: "personal" as UserType,
        labelEs: "Persona que camina",
        labelEn: "Someone who walks",
        descEs: "Con dificultad para subir escaleras",
        descEn: "With difficulty climbing stairs",
        icon: "🚶",
      },
      {
        value: "wheelchair" as UserType,
        labelEs: "Usuario de silla de ruedas",
        labelEn: "Wheelchair user",
        descEs: "Necesita trasladar la silla de ruedas",
        descEn: "Needs to carry the wheelchair",
        icon: "♿",
      },
    ],
  },
};

interface ConfiguratorProps {
  locale: string;
}

export default function ProductConfigurator({ locale }: ConfiguratorProps) {
  const [step, setStep] = useState<"stairShape" | "userType" | "results">("stairShape");
  const [stairShape, setStairShape] = useState<StairShape | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);

  const isEs = locale === "es";

  function reset() {
    setStep("stairShape");
    setStairShape(null);
    setUserType(null);
  }

  function selectStairShape(v: StairShape) {
    setStairShape(v);
    setStep("userType");
  }

  function selectUserType(v: UserType) {
    setUserType(v);
    setStep("results");
  }

  const recommendations =
    step === "results" && stairShape && userType
      ? getRecommendations(stairShape, stairShape === "outdoor" ? "outdoor" : "indoor", userType)
      : [];

  const progressLabels = isEs
    ? ["Tipo de escalera", "Usuario", "Recomendación"]
    : ["Staircase type", "User", "Recommendation"];
  const currentStepIndex =
    step === "stairShape" ? 0 : step === "userType" ? 1 : 2;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--primary)] text-white px-6 py-5">
        <h2 className="font-display text-xl font-bold">
          {isEs ? "¿Qué producto necesito?" : "Which product do I need?"}
        </h2>
        <p className="text-white/75 text-sm mt-1">
          {isEs
            ? "Responde 2 preguntas — te recomendamos el modelo ideal"
            : "Answer 2 questions — we'll recommend the ideal model"}
        </p>
      </div>

      {/* Progress */}
      <div className="px-6 pt-5">
        <div className="flex items-center gap-2">
          {progressLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                  i < currentStepIndex
                    ? "bg-[var(--success)] text-white"
                    : i === currentStepIndex
                    ? "bg-[var(--primary)] text-white"
                    : "bg-slate-200 text-slate-500"
                )}
              >
                {i < currentStepIndex ? (
                  <CheckCircle size={14} />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium truncate",
                  i === currentStepIndex ? "text-[var(--ink)]" : "text-slate-400"
                )}
              >
                {label}
              </span>
              {i < progressLabels.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 mx-1 transition-colors",
                    i < currentStepIndex ? "bg-[var(--success)]" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {step === "stairShape" && (
          <div>
            <p className="font-semibold text-[var(--ink)] mb-4">
              {STEPS.stairShape[isEs ? "questionEs" : "questionEn"]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STEPS.stairShape.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectStairShape(opt.value)}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-slate-200 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all text-left cursor-pointer"
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <span className="font-semibold text-[var(--ink)] text-sm">
                    {isEs ? opt.labelEs : opt.labelEn}
                  </span>
                  <span className="text-slate-500 text-xs text-center">
                    {isEs ? opt.descEs : opt.descEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "userType" && (
          <div>
            <p className="font-semibold text-[var(--ink)] mb-4">
              {STEPS.userType[isEs ? "questionEs" : "questionEn"]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STEPS.userType.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectUserType(opt.value)}
                  className="group flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-slate-200 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all cursor-pointer"
                >
                  <span className="text-4xl">{opt.icon}</span>
                  <span className="font-semibold text-[var(--ink)]">
                    {isEs ? opt.labelEs : opt.labelEn}
                  </span>
                  <span className="text-slate-500 text-sm text-center">
                    {isEs ? opt.descEs : opt.descEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "results" && recommendations.length > 0 && (
          <div>
            <p className="font-semibold text-[var(--ink)] mb-4">
              {isEs
                ? "Te recomendamos estos modelos:"
                : "We recommend these models:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.slug}
                  className="rounded-xl border border-slate-200 overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-slate-100">
                    <Image
                      src={rec.heroImage}
                      alt={isEs ? rec.nameEs : rec.nameEn}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover"
                    />
                    {rec.badge && (
                      <span className="absolute top-2 left-2 bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-bold px-2 py-1 rounded-full">
                        {rec.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-[var(--ink)] text-sm mb-1">
                      {isEs ? rec.nameEs : rec.nameEn}
                    </h3>
                    <p className="text-slate-500 text-xs mb-2 leading-relaxed">
                      {isEs ? rec.descEs : rec.descEn}
                    </p>
                    <p className="text-[var(--primary)] font-bold text-sm mb-3">
                      {isEs ? `Desde ${rec.fromPrice} €` : `From €${rec.fromPrice}`}
                    </p>
                    <Link
                      href={`/${locale}/productos/${rec.categorySlug}/${rec.slug}`}
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-semibold"
                      )}
                    >
                      {isEs ? "Ver modelo" : "View model"}
                      <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {recommendations.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-4">
                {isEs
                  ? "Contáctanos para una recomendación personalizada."
                  : "Contact us for a personalised recommendation."}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-5 flex items-center justify-between border-t border-slate-100 pt-4">
        {step !== "stairShape" ? (
          <button
            onClick={reset}
            className="text-slate-500 hover:text-[var(--primary)] text-sm flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={14} />
            {isEs ? "Volver a empezar" : "Start over"}
          </button>
        ) : (
          <span />
        )}
        <Link
          href={`/${locale}/contacto`}
          className="text-[var(--primary)] text-sm font-semibold hover:underline flex items-center gap-1"
        >
          {isEs ? "Hablar con un asesor" : "Talk to an adviser"}
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
