import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
  Preview,
} from "@react-email/components";

interface ConfirmationEmailProps {
  name?: string;
  phone: string;
  locale: "es" | "en";
}

const PRIMARY = "#0F4C81";
const ACCENT = "#F59E0B";

const CONTENT = {
  es: {
    preview: "Hemos recibido tu solicitud — Te llamamos en menos de 24h",
    greeting: (name?: string) =>
      name ? `Hola ${name},` : "Hola,",
    intro:
      "Hemos recibido correctamente tu solicitud de información. Nuestro equipo se pondrá en contacto contigo en menos de 24 horas laborables.",
    whatNext: "¿Qué sucede ahora?",
    steps: [
      "Un asesor especializado revisará tu solicitud",
      "Te llamaremos al número que nos has facilitado para concertar una visita gratuita",
      "Nuestro técnico visitará tu domicilio sin ningún compromiso",
      "Recibirás un presupuesto detallado y personalizado",
    ],
    urgent: "¿Necesitas respuesta urgente?",
    callUs: "Llámanos ahora:",
    freeCall: "Llamada gratuita · Lunes a viernes 8:30–14:30h",
    thanks: "Gracias por confiar en Solteva Elevación.",
    team: "El equipo de Solteva Elevación",
    footer:
      "Solteva Elevación S.L. · Calle La Gitanilla 17, Nave 14, 29004 Málaga · info@soltevaelevacion.com",
  },
  en: {
    preview: "We have received your request — We will call you within 24h",
    greeting: (name?: string) =>
      name ? `Hello ${name},` : "Hello,",
    intro:
      "We have received your information request. Our team will contact you within 24 working hours.",
    whatNext: "What happens next?",
    steps: [
      "A specialist adviser will review your request",
      "We will call you on the number you provided to arrange a free visit",
      "Our technician will visit your home with no commitment",
      "You will receive a detailed, personalised quote",
    ],
    urgent: "Need an urgent response?",
    callUs: "Call us now:",
    freeCall: "Free call · Monday to Friday 8:30–14:30h",
    thanks: "Thank you for trusting Solteva Elevación.",
    team: "The Solteva Elevación team",
    footer:
      "Solteva Elevación S.L. · Calle La Gitanilla 17, Nave 14, 29004 Málaga · info@soltevaelevacion.com",
  },
};

export default function ConfirmationEmail({
  name,
  phone,
  locale = "es",
}: ConfirmationEmailProps) {
  const c = CONTENT[locale];

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{c.preview}</Preview>
      <Body
        style={{
          backgroundColor: "#f8fafc",
          fontFamily: "sans-serif",
          margin: 0,
          padding: "40px 0",
        }}
      >
        <Container style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Header */}
          <Section
            style={{
              backgroundColor: PRIMARY,
              borderRadius: "12px 12px 0 0",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 32, margin: "0 0 8px", lineHeight: 1 }}>
              ✓
            </Text>
            <Heading
              style={{
                color: "#ffffff",
                fontSize: 22,
                margin: 0,
                fontWeight: 700,
              }}
            >
              {locale === "es" ? "Solicitud recibida" : "Request received"}
            </Heading>
          </Section>

          {/* Body */}
          <Section
            style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "0" }}
          >
            <Text
              style={{ fontSize: 16, color: "#374151", margin: "0 0 16px", fontWeight: 600 }}
            >
              {c.greeting(name)}
            </Text>
            <Text style={{ fontSize: 15, color: "#374151", lineHeight: 1.6, margin: "0 0 24px" }}>
              {c.intro}
            </Text>

            <Heading
              as="h2"
              style={{ fontSize: 16, color: PRIMARY, margin: "0 0 12px", fontWeight: 700 }}
            >
              {c.whatNext}
            </Heading>
            <ol style={{ paddingLeft: 20, margin: "0 0 24px" }}>
              {c.steps.map((step, i) => (
                <li key={i} style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, marginBottom: 6 }}>
                  {step}
                </li>
              ))}
            </ol>

            {/* Urgent box */}
            <Section
              style={{
                backgroundColor: "#fffbeb",
                border: `1px solid ${ACCENT}`,
                borderRadius: 8,
                padding: "16px 20px",
                marginBottom: 24,
              }}
            >
              <Text style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14, color: "#92400e" }}>
                {c.urgent}
              </Text>
              <Text style={{ margin: 0, fontSize: 14, color: "#92400e" }}>
                {c.callUs}{" "}
                <Link
                  href="tel:+34900100133"
                  style={{ color: PRIMARY, fontWeight: 700, textDecoration: "none" }}
                >
                  900 100 133
                </Link>
              </Text>
              <Text style={{ margin: "4px 0 0", fontSize: 12, color: "#b45309" }}>
                {c.freeCall}
              </Text>
            </Section>

            <Text style={{ fontSize: 15, color: "#374151", margin: "0 0 4px" }}>
              {c.thanks}
            </Text>
            <Text style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>{c.team}</Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: "0 0 12px 12px",
              padding: "16px 32px",
              textAlign: "center",
            }}
          >
            <Text style={{ color: "#94a3b8", fontSize: 11, margin: 0 }}>
              {c.footer}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
