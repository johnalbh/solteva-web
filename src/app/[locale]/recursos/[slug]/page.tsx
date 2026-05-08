import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSEOMeta } from "@/lib/seo";
import { posts, getPost, getRelatedPosts } from "@/lib/posts";
import CTABanner from "@/components/shared/CTABanner";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return posts.flatMap((p) =>
    ["es", "en"].map((locale) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return generateSEOMeta({
    title: `${locale === "es" ? post.titleEs : post.titleEn} | Solteva`,
    description: locale === "es" ? post.descriptionEs : post.descriptionEn,
    locale,
    path: `/recursos/${slug}`,
    image: post.heroImage,
    type: "article",
  });
}

// --- Post content registry ---

type ArticleContent = {
  es: React.ReactNode;
  en: React.ReactNode;
};

function PriceTable({
  rows,
  headers,
}: {
  rows: string[][];
  headers: string[];
}) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--primary)] text-white">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[var(--ink)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoBox({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "tip" | "warning";
}) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    tip: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-amber-50 border-amber-300 text-amber-900",
  };
  const icons = { info: "ℹ️", tip: "✅", warning: "⚠️" };
  return (
    <div className={`border rounded-xl p-4 my-6 text-sm leading-relaxed ${styles[variant]}`}>
      <span className="mr-2">{icons[variant]}</span>
      {children}
    </div>
  );
}

const ARTICLES: Record<string, ArticleContent> = {
  "cuanto-cuesta-silla-salvaescaleras": {
    es: (
      <>
        <p className="lead">
          El precio de una silla salvaescaleras varía considerablemente según el tipo de escalera, la marca y las opciones elegidas. En España, los rangos orientativos en 2026 son los siguientes.
        </p>

        <h2>Precios por tipo de silla salvaescaleras</h2>

        <PriceTable
          headers={["Tipo", "Precio orientativo", "Instalación incluida"]}
          rows={[
            ["Recta (interior)", "2.490 € – 4.500 €", "Sí (3-5 días)"],
            ["Curva (interior)", "4.000 € – 8.000 €", "Sí (5-10 días)"],
            ["Exterior", "4.500 € – 9.000 €", "Sí (5-10 días)"],
            ["Plataforma silla de ruedas", "3.200 € – 7.500 €", "Sí (3-7 días)"],
          ]}
        />

        <InfoBox variant="tip">
          <strong>Importante:</strong> estos son rangos orientativos. El precio final depende de la longitud de la escalera, el modelo elegido y si incluye opciones como asiento premium, mando a distancia adicional o mantenimiento.
        </InfoBox>

        <h2>¿Qué factores afectan al precio?</h2>

        <h3>1. Tipo de escalera</h3>
        <p>
          Es el factor más determinante. Una escalera recta requiere un raíl estándar que se fabrica en serie; una escalera curva necesita un raíl fabricado a medida para cada instalación, lo que eleva significativamente el coste.
        </p>

        <h3>2. Longitud de la escalera</h3>
        <p>
          A más peldaños, más longitud de raíl. En escaleras rectas, el precio sube aproximadamente 100-200 € por cada metro adicional de raíl.
        </p>

        <h3>3. Marca y modelo</h3>
        <p>
          Las marcas líderes (Handicare, Minivator, Acorn, Thyssen) tienen precios superiores pero ofrecen mayor fiabilidad, red de servicio técnico y duración. Modelos de entrada pueden ser más económicos pero con menos garantías.
        </p>

        <h3>4. Opciones y accesorios</h3>
        <ul>
          <li>Asiento ergonómico premium: +300-600 €</li>
          <li>Mando a distancia extra: +50-150 €</li>
          <li>Rieles plegables en reposo: incluidos en la mayoría</li>
          <li>Sensor de obstáculos avanzado: incluido en gama alta</li>
        </ul>

        <h2>¿Y el mantenimiento?</h2>
        <p>
          Un contrato de mantenimiento anual cuesta entre 150 € y 300 € e incluye la revisión completa, lubricación y ajuste de tensores. Sin contrato, una revisión puntual cuesta 80-150 €.
        </p>

        <h2>Opciones de financiación</h2>
        <p>
          En Solteva ofrecemos financiación a través de nuestras entidades colaboradoras. Para una silla de 3.000 € a 36 meses, la cuota mensual es de aproximadamente <strong>88 €/mes</strong>. Para 60 meses, baja a unos <strong>55 €/mes</strong>.
        </p>

        <InfoBox variant="info">
          Recuerda que existen <Link href="/es/recursos/subvenciones-silla-salvaescaleras-2026" className="underline font-semibold">subvenciones y deducciones fiscales</Link> que pueden reducir significativamente el coste final.
        </InfoBox>

        <h2>Cómo obtener un presupuesto exacto</h2>
        <p>
          La única forma de obtener un precio exacto es mediante una visita técnica gratuita. Nuestro técnico mide la escalera, evalúa el tipo de raíl necesario y te entrega un presupuesto detallado sin ningún compromiso.
        </p>
        <p>
          En Solteva realizamos visitas en 24 horas laborables en toda Andalucía y zonas próximas.
        </p>
      </>
    ),
    en: (
      <>
        <p className="lead">
          The price of a stairlift varies considerably depending on the staircase type, brand and chosen options. In Spain, the indicative ranges for 2026 are as follows.
        </p>

        <h2>Prices by stairlift type</h2>

        <PriceTable
          headers={["Type", "Indicative price", "Installation included"]}
          rows={[
            ["Straight (indoor)", "€2,490 – €4,500", "Yes (3-5 days)"],
            ["Curved (indoor)", "€4,000 – €8,000", "Yes (5-10 days)"],
            ["Outdoor", "€4,500 – €9,000", "Yes (5-10 days)"],
            ["Wheelchair platform lift", "€3,200 – €7,500", "Yes (3-7 days)"],
          ]}
        />

        <InfoBox variant="tip">
          <strong>Important:</strong> these are indicative ranges. The final price depends on the staircase length, chosen model and whether it includes options such as premium seat, additional remote control or maintenance.
        </InfoBox>

        <h2>What factors affect the price?</h2>

        <h3>1. Staircase type</h3>
        <p>
          This is the most decisive factor. A straight staircase requires a standard off-the-shelf rail; a curved staircase needs a custom-made rail for each installation, significantly raising the cost.
        </p>

        <h3>2. Staircase length</h3>
        <p>
          More steps means more rail length. For straight staircases, the price increases approximately €100–200 per additional metre of rail.
        </p>

        <h3>3. Brand and model</h3>
        <p>
          Leading brands (Handicare, Minivator, Acorn, Thyssen) command higher prices but offer greater reliability, technical support network and longevity. Entry-level models may be cheaper but with fewer guarantees.
        </p>

        <h3>4. Options and accessories</h3>
        <ul>
          <li>Premium ergonomic seat: +€300–600</li>
          <li>Extra remote control: +€50–150</li>
          <li>Folding rails at rest: included on most models</li>
          <li>Advanced obstacle sensor: included in high-end range</li>
        </ul>

        <h2>What about maintenance?</h2>
        <p>
          An annual maintenance contract costs between €150 and €300 and includes a full inspection, lubrication and tensioner adjustment. Without a contract, a one-off service costs €80–150.
        </p>

        <h2>Financing options</h2>
        <p>
          At Solteva we offer financing through our partner lenders. For a €3,000 stairlift over 36 months, the monthly payment is approximately <strong>€88/month</strong>. Over 60 months it drops to around <strong>€55/month</strong>.
        </p>

        <h2>How to get an exact quote</h2>
        <p>
          The only way to get an exact price is through a free technical visit. Our technician measures the staircase, assesses the rail type required and provides you with a detailed quote with no obligation.
        </p>
      </>
    ),
  },

  "silla-recta-vs-curva": {
    es: (
      <>
        <p className="lead">
          Elegir entre una silla salvaescaleras recta y una curva es la decisión más importante del proceso de compra. Aquí te explicamos las diferencias clave para que puedas decidir con seguridad.
        </p>

        <h2>La diferencia fundamental: el raíl</h2>
        <p>
          La distinción principal entre modelos rectos y curvos está en el raíl, no en la silla en sí. En los modelos rectos el raíl es estándar y se corta a la longitud necesaria. En los curvos, el raíl se fabrica a medida para adaptarse exactamente a los giros, rellanos y ángulos de tu escalera.
        </p>

        <h2>Comparativa rápida</h2>

        <PriceTable
          headers={["Característica", "Recta", "Curva"]}
          rows={[
            ["Precio orientativo", "2.490–4.500 €", "4.000–8.000 €"],
            ["Tiempo de instalación", "1-2 días", "3-5 días"],
            ["Fabricación raíl", "En serie (estándar)", "A medida (exclusivo)"],
            ["Tiempo de entrega raíl", "Inmediato", "2-4 semanas"],
            ["Escaleras compatibles", "Solo rectas", "Rectas y curvas"],
            ["Mantenimiento", "Similar", "Similar"],
            ["Segunda vida / reventa", "Posible", "Limitada (raíl a medida)"],
          ]}
        />

        <h2>¿Cómo sé si mi escalera es recta o curva?</h2>
        <p>
          Una escalera es recta cuando todos los peldaños están en línea recta desde abajo hasta arriba. Si tiene:
        </p>
        <ul>
          <li>Algún giro o curva (aunque sea mínimo)</li>
          <li>Un rellano intermedio con cambio de dirección</li>
          <li>Peldaños de abanico o radiales</li>
          <li>Una forma de caracol o espiral</li>
        </ul>
        <p>entonces necesitarás una silla curva o, en algunos casos, dos sillas rectas independientes (solución más económica si el rellano es amplio).</p>

        <InfoBox variant="tip">
          En caso de duda, lo más sencillo es enviar una foto de tu escalera a nuestro equipo o solicitar una visita gratuita. Te daremos la respuesta en minutos.
        </InfoBox>

        <h2>¿Cuándo merece la pena una silla curva?</h2>
        <p>
          La silla curva es imprescindible cuando la escalera tiene cualquier tipo de giro. No hay alternativa para este caso. Los modelos curvos modernos (como el Handicare Freecurve o la Platinum Ergo) son elegantes, silenciosos y se adaptan a prácticamente cualquier configuración.
        </p>

        <h2>¿Y si tengo dos tramos rectos con rellano?</h2>
        <p>
          En este caso tienes dos opciones: instalar una silla curva que recorra ambos tramos y el rellano en un único movimiento, o instalar dos sillas rectas independientes con un pequeño giro manual en el rellano. La segunda opción es más económica pero requiere que el usuario pueda transferirse entre las dos sillas.
        </p>

        <h2>Conclusión</h2>
        <p>
          Si tu escalera es completamente recta, la silla recta es la opción más económica e igualmente eficaz. Si tiene cualquier giro, la silla curva a medida es la solución correcta. En ambos casos, la visita técnica gratuita es el primer paso.
        </p>
      </>
    ),
    en: (
      <>
        <p className="lead">
          Choosing between a straight and a curved stairlift is the most important decision in the buying process. Here we explain the key differences so you can decide with confidence.
        </p>

        <h2>The fundamental difference: the rail</h2>
        <p>
          The main distinction between straight and curved models lies in the rail, not the chair itself. Straight models use a standard rail cut to the required length. Curved models use a custom-made rail built specifically to match the turns, landings and angles of your staircase.
        </p>

        <h2>Quick comparison</h2>

        <PriceTable
          headers={["Feature", "Straight", "Curved"]}
          rows={[
            ["Indicative price", "€2,490–€4,500", "€4,000–€8,000"],
            ["Installation time", "1-2 days", "3-5 days"],
            ["Rail manufacture", "Standard (off the shelf)", "Custom (bespoke)"],
            ["Rail lead time", "Immediate", "2-4 weeks"],
            ["Compatible staircases", "Straight only", "Straight and curved"],
            ["Maintenance", "Similar", "Similar"],
            ["Resale value", "Possible", "Limited (bespoke rail)"],
          ]}
        />

        <h2>How do I know if my staircase is straight or curved?</h2>
        <p>
          A staircase is straight when all the steps are in a straight line from bottom to top. If yours has:
        </p>
        <ul>
          <li>Any turn or bend (however slight)</li>
          <li>An intermediate landing with a change of direction</li>
          <li>Winder or fan-shaped steps</li>
          <li>A spiral or helical form</li>
        </ul>
        <p>then you will need a curved stairlift or, in some cases, two independent straight stairlifts (a more economical solution if the landing is wide enough).</p>

        <InfoBox variant="tip">
          If in doubt, the simplest solution is to send a photo of your staircase to our team or request a free visit. We will give you the answer within minutes.
        </InfoBox>

        <h2>Conclusion</h2>
        <p>
          If your staircase is completely straight, a straight stairlift is the most economical and equally effective option. If it has any turn at all, a custom curved stairlift is the right solution. In both cases, the free technical visit is the first step.
        </p>
      </>
    ),
  },

  "subvenciones-silla-salvaescaleras-2026": {
    es: (
      <>
        <p className="lead">
          En España existen varias vías de ayuda económica para la compra e instalación de sillas salvaescaleras y otros equipos de accesibilidad. Te explicamos las principales para 2026.
        </p>

        <InfoBox variant="warning">
          Las condiciones, importes y plazos de las ayudas cambian cada año y varían por comunidad autónoma y municipio. Consulta siempre las convocatorias vigentes o pregunta a nuestro equipo, que te asesora sin coste.
        </InfoBox>

        <h2>1. Plan Renove de Accesibilidad (Junta de Andalucía)</h2>
        <p>
          La Junta de Andalucía convoca periódicamente el Plan Renove de Accesibilidad, que incluye subvenciones para la instalación de sillas salvaescaleras, elevadores y plataformas en viviendas particulares y edificios residenciales.
        </p>
        <ul>
          <li><strong>Importe:</strong> hasta el 50% del coste del equipo e instalación, con un límite que varía por convocatoria (habitualmente entre 2.000 € y 5.000 €)</li>
          <li><strong>Beneficiarios:</strong> personas con movilidad reducida, mayores de 65 años o con certificado de discapacidad</li>
          <li><strong>Tramitación:</strong> a través de los ayuntamientos o directamente en la Consejería de Fomento</li>
        </ul>

        <h2>2. Ayudas municipales de dependencia</h2>
        <p>
          Muchos ayuntamientos andaluces tienen partidas presupuestarias específicas para ayudas de accesibilidad domiciliaria. Los importes son variables (500–2.500 €) y la tramitación es directa en el Ayuntamiento o a través de los Servicios Sociales municipales.
        </p>

        <h2>3. Prestación vinculada al servicio (Ley de Dependencia)</h2>
        <p>
          Las personas con reconocimiento de grado de dependencia (Grado I, II o III) pueden tener derecho a prestaciones económicas para adquisición de productos de apoyo, incluidas sillas salvaescaleras. El importe depende del grado reconocido:
        </p>
        <PriceTable
          headers={["Grado de dependencia", "Prestación máxima anual (orientativa)"]}
          rows={[
            ["Grado I (moderado)", "~400 €/año"],
            ["Grado II (severo)", "~715 €/año"],
            ["Grado III (gran dependencia)", "~833 €/año"],
          ]}
        />

        <h2>4. Deducción en el IRPF por obras de accesibilidad</h2>
        <p>
          En la declaración de la renta, las obras e instalaciones destinadas a la adaptación de la vivienda habitual de personas con discapacidad o mayores de 65 años son deducibles. La deducción puede llegar al <strong>15% del importe invertido</strong> (hasta 9.040 € de base), lo que supone hasta 1.356 € de ahorro fiscal en el IRPF.
        </p>

        <InfoBox variant="tip">
          Para aplicar la deducción, la instalación debe realizarse en la vivienda habitual, la persona debe tener un grado de discapacidad reconocido igual o superior al 33%, o ser mayor de 65 años. Guarda siempre las facturas.
        </InfoBox>

        <h2>5. Financiación sin intereses o bonificada</h2>
        <p>
          Aunque no es una subvención, muchos ayuntamientos y comunidades autónomas tienen convenios con entidades bancarias para ofrecer financiación a tipo cero o bonificado para la compra de productos de accesibilidad. Consulta en tu banco o en los Servicios Sociales municipales.
        </p>

        <h2>¿Cómo tramitar las ayudas?</h2>
        <ol>
          <li>Solicita una visita técnica gratuita y presupuesto de Solteva</li>
          <li>Con el presupuesto en mano, acude a tu Ayuntamiento o Servicios Sociales</li>
          <li>Presenta la documentación requerida (presupuesto, certificado de discapacidad o informe médico si se requiere)</li>
          <li>Una vez concedida la ayuda, procede a la instalación</li>
          <li>Solicita la factura final a Solteva para la deducción fiscal</li>
        </ol>

        <p>
          Nuestro equipo comercial tiene experiencia en ayudar a los clientes a tramitar estas ayudas. <Link href="/es/contacto" className="text-[var(--primary)] font-semibold underline">Contáctanos</Link> y te orientamos sin compromiso.
        </p>
      </>
    ),
    en: (
      <>
        <p className="lead">
          In Spain there are several routes to financial assistance for purchasing and installing stairlifts and other accessibility equipment. Here we explain the main ones for 2026.
        </p>

        <InfoBox variant="warning">
          Grant conditions, amounts and deadlines change each year and vary by region and municipality. Always check the current schemes or ask our team, who can advise you free of charge.
        </InfoBox>

        <h2>1. Andalusia Accessibility Renewal Scheme</h2>
        <p>
          The Junta de Andalucía periodically launches an accessibility renewal scheme covering grants for the installation of stairlifts, lifts and platform lifts in private homes and residential buildings. Grants can cover up to 50% of the equipment and installation cost, typically capped at €2,000–€5,000.
        </p>

        <h2>2. Personal Income Tax (IRPF) deduction for accessibility works</h2>
        <p>
          Works and installations to adapt a main residence for a person with a disability (recognised degree ≥33%) or over 65 years of age are deductible on the Spanish income tax return. The deduction can reach <strong>15% of the investment</strong> (up to a base of €9,040), saving up to €1,356 in tax.
        </p>

        <h2>3. Dependency benefit linked to service</h2>
        <p>
          People with a recognised dependency grade (Grade I, II or III) may be entitled to economic benefits for acquiring support products, including stairlifts.
        </p>

        <h2>How to apply</h2>
        <ol>
          <li>Request a free technical visit and quote from Solteva</li>
          <li>With the quote in hand, contact your local council or Social Services</li>
          <li>Submit the required documentation</li>
          <li>Once the grant is approved, proceed with installation</li>
          <li>Request a final invoice from Solteva for the tax deduction</li>
        </ol>

        <p>
          Our team has experience helping customers navigate these grants. <Link href="/en/contacto" className="text-[var(--primary)] font-semibold underline">Contact us</Link> for free guidance.
        </p>
      </>
    ),
  },

  "mantenimiento-silla-salvaescaleras": {
    es: (
      <>
        <p className="lead">
          El mantenimiento preventivo es clave para garantizar el funcionamiento seguro y duradero de tu silla salvaescaleras. Te explicamos qué incluye, con qué frecuencia hay que hacerlo y cuánto cuesta.
        </p>

        <h2>¿Con qué frecuencia hay que revisar una silla salvaescaleras?</h2>
        <p>
          Los fabricantes y la normativa de seguridad recomiendan una revisión completa <strong>al menos una vez al año</strong>. En instalaciones de uso intensivo (uso varias veces al día por varios usuarios) se recomienda cada 6 meses.
        </p>

        <h2>¿Qué incluye el mantenimiento anual?</h2>
        <ul>
          <li>Inspección visual completa del raíl y sus fijaciones</li>
          <li>Lubricación del raíl y engranajes</li>
          <li>Verificación y ajuste de tensores</li>
          <li>Comprobación de todos los sistemas de seguridad (sensores, finales de carrera, freno de emergencia)</li>
          <li>Verificación del estado de la batería y el sistema de carga</li>
          <li>Comprobación del estado del cableado</li>
          <li>Prueba de funcionamiento completo (subida, bajada, plegado)</li>
          <li>Ajuste de velocidad si procede</li>
        </ul>

        <h2>¿Cuánto cuesta el mantenimiento?</h2>

        <PriceTable
          headers={["Tipo de servicio", "Coste orientativo"]}
          rows={[
            ["Revisión anual sin contrato", "80–150 €"],
            ["Contrato de mantenimiento anual", "150–300 €/año"],
            ["Contrato con asistencia de averías incluida", "200–400 €/año"],
            ["Visita por avería (sin contrato)", "80–200 € + piezas"],
          ]}
        />

        <InfoBox variant="tip">
          Un contrato de mantenimiento con asistencia incluida te garantiza que, si la silla falla, un técnico acudirá en menos de 24 horas sin coste adicional. Para personas mayores que dependen de la silla, esto da una tranquilidad muy valiosa.
        </InfoBox>

        <h2>Averías más frecuentes y cómo evitarlas</h2>
        <ul>
          <li><strong>Batería agotada:</strong> asegúrate de que la silla siempre regrese a la estación de carga. La carga continua en el raíl evita este problema en los modelos Handicare.</li>
          <li><strong>Raíl sucio o sin lubricar:</strong> se evita con el mantenimiento anual regular.</li>
          <li><strong>Mando a distancia sin batería:</strong> sustituye las pilas del mando cada 6-12 meses.</li>
          <li><strong>Sensor de obstáculos activado:</strong> revisa que no haya objetos bajo el reposapiés.</li>
        </ul>

        <h2>¿Puedo hacerlo yo mismo?</h2>
        <p>
          El usuario puede limpiar la tapicería y el reposapiés con un paño húmedo, y verificar que la silla regresa a la posición de carga. Cualquier otra intervención debe realizarla un técnico certificado para no anular la garantía y garantizar la seguridad.
        </p>
      </>
    ),
    en: (
      <>
        <p className="lead">
          Preventive maintenance is key to ensuring the safe and long-lasting operation of your stairlift. We explain what is included, how often it should be done and what it costs.
        </p>

        <h2>How often should a stairlift be serviced?</h2>
        <p>
          Manufacturers and safety regulations recommend a full service <strong>at least once a year</strong>. For intensive use installations (used several times daily by multiple users), every 6 months is recommended.
        </p>

        <h2>What does annual maintenance include?</h2>
        <ul>
          <li>Full visual inspection of the rail and its fixings</li>
          <li>Rail and gearbox lubrication</li>
          <li>Tension adjustment and verification</li>
          <li>Check of all safety systems (sensors, limit switches, emergency brake)</li>
          <li>Battery and charging system condition check</li>
          <li>Wiring condition check</li>
          <li>Full operational test (up, down, folding)</li>
          <li>Speed adjustment if required</li>
        </ul>

        <h2>How much does maintenance cost?</h2>

        <PriceTable
          headers={["Service type", "Indicative cost"]}
          rows={[
            ["Annual service without contract", "€80–150"],
            ["Annual maintenance contract", "€150–300/year"],
            ["Contract with breakdown cover included", "€200–400/year"],
            ["Breakdown visit (no contract)", "€80–200 + parts"],
          ]}
        />

        <InfoBox variant="tip">
          A maintenance contract with breakdown cover guarantees that if the stairlift fails, a technician will attend within 24 hours at no additional cost. For people who depend on the stairlift, this peace of mind is invaluable.
        </InfoBox>
      </>
    ),
  },

  "como-elegir-silla-salvaescaleras": {
    es: (
      <>
        <p className="lead">
          Elegir una silla salvaescaleras es una decisión importante que afecta a la calidad de vida del usuario durante años. Estos son los 7 factores clave que debes evaluar.
        </p>

        <h2>1. Tipo de escalera</h2>
        <p>
          Es el primer paso y el más determinante. Recta, curva, con rellano o exterior: cada tipo requiere un raíl diferente. Lee nuestra guía sobre <Link href="/es/recursos/silla-recta-vs-curva" className="text-[var(--primary)] underline font-semibold">recta vs. curva</Link> para decidir.
        </p>

        <h2>2. Capacidad de carga</h2>
        <p>
          La mayoría de modelos estándar soportan hasta 120 kg. Si el usuario pesa más, existen versiones reforzadas de hasta 160 kg (como la Platinum Ergo en versión heavy-duty). Indica siempre el peso real del usuario, no el aproximado.
        </p>

        <h2>3. Anchura de la escalera</h2>
        <p>
          Se mide el ancho libre entre pasamanos. El mínimo recomendado es de 70 cm, aunque existen modelos muy compactos que funcionan en escaleras de 60 cm. Una escalera de menos de 60 cm puede no ser apta para una silla salvaescaleras estándar y requiere evaluación técnica.
        </p>

        <h2>4. Necesidades específicas del usuario</h2>
        <ul>
          <li><strong>Dificultad para sentarse o levantarse:</strong> modelos con asiento elevador o con posibilidad de subir/bajar de pie</li>
          <li><strong>Usuario de silla de ruedas:</strong> plataforma salvaescaleras en lugar de silla</li>
          <li><strong>Uso en exterior:</strong> modelos certificados para uso exterior (lluvia, temperatura, UV)</li>
          <li><strong>Varios usuarios:</strong> mando a distancia en ambos extremos de la escalera</li>
        </ul>

        <h2>5. Marca y garantía</h2>
        <p>
          Opta por marcas con red de servicio técnico propio en España: Handicare, Minivator, Acorn, Thyssen. La garantía estándar es de 2 años; algunas marcas ofrecen hasta 5 años en componentes principales. Verifica siempre que el distribuidor tenga técnicos propios, no subcontratados.
        </p>

        <h2>6. Presupuesto y financiación</h2>
        <p>
          Define un presupuesto máximo pero considera el coste total: equipo + instalación + mantenimiento durante los primeros 5 años. Con financiación, muchas familias prefieren una cuota mensual asequible en lugar de un pago único elevado.
        </p>

        <h2>7. Instalador de confianza</h2>
        <p>
          El instalador es tan importante como el equipo. Verifica que:
        </p>
        <ul>
          <li>Tenga técnicos propios certificados por el fabricante</li>
          <li>Ofrezca servicio posventa en tu zona</li>
          <li>Tenga referencias verificables de instalaciones cercanas</li>
          <li>Entregue documentación CE y garantía por escrito</li>
        </ul>

        <InfoBox variant="tip">
          En Solteva cumplimos todos estos criterios: llevamos más de 15 años instalando en Andalucía con técnicos propios. Solicita una visita gratuita y sin compromiso para recibir asesoramiento personalizado.
        </InfoBox>
      </>
    ),
    en: (
      <>
        <p className="lead">
          Choosing a stairlift is an important decision that will affect the user's quality of life for years to come. Here are the 7 key factors to evaluate.
        </p>

        <h2>1. Staircase type</h2>
        <p>
          This is the first and most decisive step. Straight, curved, with landing or outdoor: each type requires a different rail. Read our guide on <Link href="/en/recursos/silla-recta-vs-curva" className="text-[var(--primary)] underline font-semibold">straight vs. curved</Link> to decide.
        </p>

        <h2>2. Weight capacity</h2>
        <p>
          Most standard models support up to 120 kg. If the user weighs more, reinforced versions of up to 160 kg are available. Always state the user's actual weight, not an approximation.
        </p>

        <h2>3. Staircase width</h2>
        <p>
          Measure the clear width between handrails. The recommended minimum is 70 cm, although very compact models work on 60 cm staircases. Less than 60 cm may not be suitable for a standard stairlift and requires technical evaluation.
        </p>

        <h2>4. User's specific needs</h2>
        <ul>
          <li><strong>Difficulty sitting or standing:</strong> models with a powered seat elevator</li>
          <li><strong>Wheelchair user:</strong> platform stairlift instead of a seat lift</li>
          <li><strong>Outdoor use:</strong> models certified for outdoor use (rain, temperature, UV)</li>
          <li><strong>Multiple users:</strong> remote controls at both ends of the staircase</li>
        </ul>

        <h2>5. Brand and warranty</h2>
        <p>
          Choose brands with their own technical service network in Spain: Handicare, Minivator, Acorn, Thyssen. Standard warranty is 2 years; some brands offer up to 5 years on main components.
        </p>

        <h2>6. Budget and financing</h2>
        <p>
          Define a maximum budget but consider the total cost: equipment + installation + maintenance over the first 5 years. With financing, many families prefer an affordable monthly payment rather than a large upfront sum.
        </p>

        <h2>7. Trusted installer</h2>
        <p>
          The installer is as important as the equipment. Verify that they have manufacturer-certified in-house technicians, offer after-sales service in your area, and provide CE documentation and warranty in writing.
        </p>

        <InfoBox variant="tip">
          At Solteva we meet all these criteria: over 15 years installing across Andalusia with our own technicians. Request a free, no-obligation visit for personalised advice.
        </InfoBox>
      </>
    ),
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  guide: "bg-blue-100 text-blue-700",
  comparison: "bg-purple-100 text-purple-700",
  subsidies: "bg-green-100 text-green-700",
  maintenance: "bg-orange-100 text-orange-700",
  finance: "bg-amber-100 text-amber-700",
};

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const isEs = locale === "es";
  const title = isEs ? post.titleEs : post.titleEn;
  const description = isEs ? post.descriptionEs : post.descriptionEn;
  const relatedPosts = getRelatedPosts(slug, 3);

  const content = ARTICLES[slug];
  if (!content) notFound();

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(isEs ? "es-ES" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: `https://solteva.com${post.heroImage}`,
    datePublished: post.dateIso,
    dateModified: post.dateIso,
    author: {
      "@type": "Organization",
      name: "Solteva Elevación",
    },
    publisher: {
      "@type": "Organization",
      name: "Solteva Elevación",
      logo: {
        "@type": "ImageObject",
        url: "https://solteva.com/images/logos/solteva-logo.svg",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-slate-900 overflow-hidden">
        <Image
          src={post.heroImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                CATEGORY_COLORS[post.category] || "bg-white/20 text-white"
              }`}
            >
              {isEs ? post.categoryLabelEs : post.categoryLabelEn}
            </span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb + meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <nav className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link href={`/${locale}`} className="hover:text-[var(--primary)] transition-colors">
              {isEs ? "Inicio" : "Home"}
            </Link>
            <ChevronRight size={14} />
            <Link href={`/${locale}/recursos`} className="hover:text-[var(--primary)] transition-colors">
              {isEs ? "Recursos" : "Resources"}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[var(--ink)] line-clamp-1">{title}</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-slate-400 shrink-0">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.dateIso)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readingMinutes} min
            </span>
          </div>
        </div>

        {/* Lead description */}
        <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
          {description}
        </p>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[var(--ink)] prose-a:text-[var(--primary)] prose-strong:text-[var(--ink)] prose-li:text-slate-700 prose-p:text-slate-700 prose-p:leading-relaxed">
          {isEs ? content.es : content.en}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            href={`/${locale}/recursos`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "gap-2"
            )}
          >
            <ArrowLeft size={16} />
            {isEs ? "Ver todos los artículos" : "View all articles"}
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-6">
              {isEs ? "También puede interesarte" : "You might also like"}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/${locale}/recursos/${rp.slug}`}
                  className="group rounded-xl border border-slate-200 hover:border-[var(--primary)] overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                    <Image
                      src={rp.heroImage}
                      alt={isEs ? rp.titleEs : rp.titleEn}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        CATEGORY_COLORS[rp.category] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {isEs ? rp.categoryLabelEs : rp.categoryLabelEn}
                    </span>
                    <h3 className="mt-2 text-sm font-semibold text-[var(--ink)] leading-snug group-hover:text-[var(--primary)] transition-colors">
                      {isEs ? rp.titleEs : rp.titleEn}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <CTABanner
        title={isEs ? "¿Listo para dar el primer paso?" : "Ready to take the first step?"}
        subtitle={
          isEs
            ? "Visita gratuita en 24 horas · Presupuesto sin compromiso · Instalación en 3-5 días"
            : "Free visit within 24 hours · No-obligation quote · Installation in 3-5 days"
        }
        quoteLabel={isEs ? "Solicitar presupuesto gratis" : "Request a free quote"}
        callLabel="900 100 133"
        quoteHref={`/${locale}/contacto`}
      />
    </>
  );
}
