import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { generateSEOMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Glosario de Sillas Salvaescaleras y Accesibilidad | Solteva"
        : "Stairlift and Accessibility Glossary | Solteva",
    description:
      locale === "es"
        ? "Términos técnicos y vocabulario del sector salvaescaleras explicados en lenguaje claro. Raíl, estación de carga, peldaño, inclinación y mucho más."
        : "Technical terms and sector vocabulary explained in plain language. Rail, charging station, step, incline and much more.",
    locale,
    path: "/glosario",
  });
}

interface GlossaryTerm {
  termEs: string;
  termEn: string;
  defEs: string;
  defEn: string;
  letter: string;
}

const TERMS: GlossaryTerm[] = [
  {
    letter: "A",
    termEs: "Anclaje",
    termEn: "Anchor / Fixing",
    defEs:
      "Elemento que sujeta el raíl de la silla salvaescaleras a los peldaños de la escalera. En la mayoría de instalaciones el anclaje se realiza en los peldaños, no en la pared, por lo que no requiere obras.",
    defEn:
      "Element that attaches the stairlift rail to the staircase steps. In most installations the fixing is made to the steps, not the wall, so no construction work is required.",
  },
  {
    letter: "B",
    termEs: "Batería",
    termEn: "Battery",
    defEs:
      "Las sillas salvaescaleras modernas funcionan con baterías recargables que permiten su uso incluso durante cortes de luz. La batería se recarga automáticamente cuando la silla está en la estación de carga.",
    defEn:
      "Modern stairlifts run on rechargeable batteries that allow use even during power cuts. The battery recharges automatically when the stairlift is at its charging station.",
  },
  {
    letter: "C",
    termEs: "Capacidad de carga",
    termEn: "Weight / Load capacity",
    defEs:
      "Peso máximo que puede trasladar la silla salvaescaleras de forma segura. Los modelos estándar soportan hasta 120 kg; los modelos reforzados llegan a 160 kg. Siempre debe verificarse antes de la instalación.",
    defEn:
      "Maximum weight the stairlift can safely carry. Standard models support up to 120 kg; heavy-duty models reach 160 kg. Always verify before installation.",
  },
  {
    letter: "C",
    termEs: "Carril (raíl)",
    termEn: "Rail / Track",
    defEs:
      "Guía metálica sobre la que se desplaza la silla salvaescaleras. En modelos rectos es estándar y se corta a medida. En modelos curvos se fabrica completamente a medida para adaptarse a los giros y rellanos de cada escalera.",
    defEn:
      "Metal guide rail along which the stairlift travels. In straight models it is standard and cut to length. In curved models it is completely custom-made to match the turns and landings of each individual staircase.",
  },
  {
    letter: "D",
    termEs: "Doble raíl",
    termEn: "Dual rail",
    defEs:
      "Configuración de raíl en la que se utilizan dos perfiles paralelos en lugar de uno solo. Ofrece mayor estabilidad y permite mayor capacidad de carga. Típico en modelos de gama media-alta como la Platinum Ergo.",
    defEn:
      "Rail configuration using two parallel profiles instead of one. Offers greater stability and allows a higher load capacity. Typical in mid-to-high-range models such as the Platinum Ergo.",
  },
  {
    letter: "E",
    termEs: "Elevador vertical",
    termEn: "Vertical platform lift / Through-floor lift",
    defEs:
      "Dispositivo de elevación que sube y baja en vertical, como un pequeño ascensor sin cabina. Se instala en viviendas y edificios para salvar desniveles de hasta varios metros sin necesidad de sala de máquinas ni foso.",
    defEn:
      "Lifting device that rises and descends vertically, like a small lift without a shaft. Installed in homes and buildings to overcome height differences of several metres without the need for a machine room or pit.",
  },
  {
    letter: "E",
    termEs: "Estación de carga",
    termEn: "Charging station / Parking station",
    defEs:
      "Posición en la parte inferior o superior de la escalera donde la silla salvaescaleras se estaciona cuando no está en uso. En esta posición se recarga automáticamente la batería a través del raíl.",
    defEn:
      "Position at the bottom or top of the staircase where the stairlift parks when not in use. At this position the battery recharges automatically through the rail.",
  },
  {
    letter: "F",
    termEs: "Final de carrera",
    termEn: "Limit switch",
    defEs:
      "Sensor de seguridad que detecta cuando la silla ha llegado al final del recorrido (arriba o abajo) y detiene el motor automáticamente para evitar que sobrepase los extremos del raíl.",
    defEn:
      "Safety sensor that detects when the chair has reached the end of its travel (top or bottom) and stops the motor automatically to prevent it overshooting the ends of the rail.",
  },
  {
    letter: "G",
    termEs: "Grado de discapacidad",
    termEn: "Disability degree",
    defEs:
      "Reconocimiento oficial del grado de discapacidad de una persona, expedido por la comunidad autónoma. A partir del 33% se acceden a determinadas ayudas y deducciones fiscales para la compra de productos de accesibilidad.",
    defEn:
      "Official recognition of a person's degree of disability, issued by the regional government. From 33% onwards, certain grants and tax deductions for accessibility products become available.",
  },
  {
    letter: "I",
    termEs: "Inclinación (ángulo de escalera)",
    termEn: "Staircase incline / Pitch angle",
    defEs:
      "Ángulo que forma la escalera con la horizontal. La mayoría de sillas salvaescaleras funcionan en un rango de 20° a 55°. Escaleras muy empinadas (>55°) o muy tendidas (<20°) pueden requerir modelos especiales.",
    defEn:
      "Angle that the staircase makes with the horizontal. Most stairlifts work in the 20° to 55° range. Very steep (>55°) or very shallow (<20°) staircases may require special models.",
  },
  {
    letter: "M",
    termEs: "Mando a distancia",
    termEn: "Remote control",
    defEs:
      "Control inalámbrico que permite llamar o enviar la silla al otro extremo de la escalera. Todos los modelos incluyen al menos dos mandos (arriba y abajo). Facilita el uso a los cuidadores.",
    defEn:
      "Wireless control that allows calling or sending the chair to the other end of the staircase. All models include at least two controls (top and bottom). Facilitates use by carers.",
  },
  {
    letter: "M",
    termEs: "Mono-raíl",
    termEn: "Single rail / Monorail",
    defEs:
      "Configuración de raíl que utiliza un único perfil. Es más compacta y ligera que el doble raíl, ocupando menos espacio en la escalera. El Handicare Freecurve es el ejemplo más conocido.",
    defEn:
      "Rail configuration using a single profile. More compact and lighter than dual rail, taking up less space on the staircase. The Handicare Freecurve is the best-known example.",
  },
  {
    letter: "P",
    termEs: "Peldaño",
    termEn: "Step / Tread",
    defEs:
      "Cada uno de los escalones que forman la escalera. El raíl de la silla salvaescaleras se ancla directamente a los peldaños, lo que evita hacer obras en las paredes o el suelo.",
    defEn:
      "Each of the steps that make up the staircase. The stairlift rail is anchored directly to the steps, avoiding any work on walls or flooring.",
  },
  {
    letter: "P",
    termEs: "Plataforma salvaescaleras",
    termEn: "Platform stairlift / Platform lift",
    defEs:
      "Variante del salvaescaleras que dispone de una plataforma en lugar de un asiento. Permite que el usuario permanezca en su silla de ruedas durante el desplazamiento. Disponible en modelos rectos y curvos.",
    defEn:
      "Stairlift variant with a platform instead of a seat. Allows the user to remain in their wheelchair during the journey. Available in straight and curved models.",
  },
  {
    letter: "R",
    termEs: "Rellano",
    termEn: "Landing",
    defEs:
      "Zona horizontal entre dos tramos de escalera. Cuando hay un rellano con cambio de dirección, se necesita una silla curva o dos sillas rectas independientes.",
    defEn:
      "Horizontal area between two flights of stairs. When there is a landing with a change of direction, a curved stairlift or two independent straight stairlifts are required.",
  },
  {
    letter: "S",
    termEs: "Sensor de obstáculos",
    termEn: "Obstacle sensor",
    defEs:
      "Sistema de seguridad integrado en el reposapiés y la silla que detecta obstáculos en el recorrido y detiene automáticamente el movimiento. Fundamental para la seguridad en escaleras compartidas.",
    defEn:
      "Safety system integrated in the footrest and chair that detects obstacles on the travel path and automatically stops movement. Essential for safety on shared staircases.",
  },
  {
    letter: "V",
    termEs: "Visita técnica gratuita",
    termEn: "Free technical visit",
    defEs:
      "Visita de un técnico especializado al domicilio del cliente para medir la escalera, evaluar el tipo de producto más adecuado y elaborar un presupuesto detallado. En Solteva se realiza en menos de 24 horas laborables y sin ningún compromiso de compra.",
    defEn:
      "Visit by a specialist technician to the customer's home to measure the staircase, assess the most suitable product and provide a detailed quote. At Solteva this is carried out within 24 working hours with no purchase commitment.",
  },
];

// Group terms by letter
const grouped = TERMS.reduce<Record<string, GlossaryTerm[]>>((acc, term) => {
  acc[term.letter] = acc[term.letter] ? [...acc[term.letter], term] : [term];
  return acc;
}, {});

const letters = Object.keys(grouped).sort();

export default async function GlosarioPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: isEs
      ? "Glosario de Sillas Salvaescaleras — Solteva Elevación"
      : "Stairlift Glossary — Solteva Elevación",
    description: isEs
      ? "Términos técnicos del sector salvaescaleras explicados en lenguaje claro"
      : "Technical stairlift sector terms explained in plain language",
    url: `https://solteva.com/${locale}/glosario`,
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: isEs ? t.termEs : t.termEn,
      description: isEs ? t.defEs : t.defEn,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-4" aria-label="breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                  {isEs ? "Inicio" : "Home"}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{isEs ? "Glosario" : "Glossary"}</li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {isEs
              ? "Glosario de sillas salvaescaleras"
              : "Stairlift glossary"}
          </h1>
          <p className="text-white/85 text-lg max-w-2xl">
            {isEs
              ? "Todos los términos técnicos del sector accesibilidad explicados en lenguaje claro y sencillo."
              : "All the technical terms of the accessibility sector explained in plain, simple language."}
          </p>

          {/* Letter index */}
          <div className="flex flex-wrap gap-2 mt-8">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/15 hover:bg-white/30 text-white font-bold text-sm transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {letters.map((letter) => (
          <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-24">
            <h2 className="font-display text-3xl font-bold text-[var(--primary)] border-b-2 border-[var(--primary)]/20 pb-3 mb-6">
              {letter}
            </h2>
            <div className="space-y-6">
              {grouped[letter].map((term) => (
                <div
                  key={term.termEs}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
                >
                  <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-1">
                    {isEs ? term.termEs : term.termEn}
                  </h3>
                  {isEs && term.termEn !== term.termEs && (
                    <p className="text-sm text-[var(--primary)] font-medium mb-3">
                      EN: {term.termEn}
                    </p>
                  )}
                  {!isEs && (
                    <p className="text-sm text-[var(--primary)] font-medium mb-3">
                      ES: {term.termEs}
                    </p>
                  )}
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {isEs ? term.defEs : term.defEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="mt-12 bg-[var(--primary)] rounded-2xl p-8 text-center text-white">
          <h2 className="font-display text-2xl font-bold mb-3">
            {isEs
              ? "¿Tienes dudas? Te llamamos gratis"
              : "Have a question? We'll call you for free"}
          </h2>
          <p className="text-white/80 mb-6">
            {isEs
              ? "Nuestros asesores te explican cualquier término y evalúan gratis tu caso concreto."
              : "Our advisers will explain any term and assess your specific situation free of charge."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold px-6 py-3 rounded-xl transition-colors"
            >
              {isEs ? "Solicitar asesoramiento" : "Request advice"}
              <ChevronRight size={16} />
            </Link>
            <a
              href="tel:+34900100133"
              className="inline-flex items-center gap-2 border border-white/50 text-white hover:bg-white/10 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              900 100 133
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
