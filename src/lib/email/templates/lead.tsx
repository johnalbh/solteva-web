import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from "@react-email/components";

interface LeadEmailProps {
  name?: string;
  phone: string;
  email?: string;
  city?: string;
  province?: string;
  stairType?: string;
  subject?: string;
  message?: string;
  howKnown?: string;
  locale: string;
  type: "contact" | "quick-quote";
}

const PRIMARY = "#0F4C81";
const ACCENT = "#F59E0B";

export default function LeadEmail({
  name,
  phone,
  email,
  city,
  province,
  stairType,
  subject,
  message,
  howKnown,
  locale,
  type,
}: LeadEmailProps) {
  const isQuickQuote = type === "quick-quote";
  const previewText = isQuickQuote
    ? `Nuevo presupuesto rápido — ${phone} — ${province || "Sin provincia"}`
    : `Nuevo contacto web — ${name || "Sin nombre"} — ${phone}`;

  const stairTypeLabel: Record<string, string> = {
    straight: "Recta",
    curved: "Curva",
    outdoor: "Exterior",
    unknown: "Sin especificar",
  };

  const howKnownLabel: Record<string, string> = {
    google: "Google",
    recommendation: "Recomendación",
    facebook: "Facebook / Redes Sociales",
    advertising: "Publicidad",
    other: "Otro",
  };

  const rows: { label: string; value: string }[] = [
    ...(name ? [{ label: "Nombre", value: name }] : []),
    { label: "Teléfono", value: phone },
    ...(email ? [{ label: "Email", value: email }] : []),
    ...(city ? [{ label: "Localidad", value: city }] : []),
    ...(province ? [{ label: "Provincia", value: province }] : []),
    ...(stairType
      ? [{ label: "Tipo de escalera", value: stairTypeLabel[stairType] || stairType }]
      : []),
    ...(howKnown
      ? [{ label: "¿Cómo nos conoció?", value: howKnownLabel[howKnown] || howKnown }]
      : []),
    ...(subject ? [{ label: "Asunto", value: subject }] : []),
    ...(message ? [{ label: "Mensaje", value: message }] : []),
    { label: "Idioma", value: locale.toUpperCase() },
    { label: "Tipo", value: isQuickQuote ? "Presupuesto Rápido" : "Contacto Web" },
  ];

  return (
    <Html lang="es">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ backgroundColor: "#f8fafc", fontFamily: "sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Header */}
          <Section
            style={{
              backgroundColor: PRIMARY,
              borderRadius: "12px 12px 0 0",
              padding: "24px 32px",
              textAlign: "center",
            }}
          >
            <Heading
              style={{ color: "#ffffff", fontSize: 22, margin: 0, fontWeight: 700 }}
            >
              {isQuickQuote
                ? "⚡ Nuevo presupuesto rápido"
                : "📩 Nuevo mensaje de contacto"}
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.8)", margin: "8px 0 0", fontSize: 14 }}>
              Solteva Elevación — Web
            </Text>
          </Section>

          {/* Highlight row */}
          <Section
            style={{
              backgroundColor: ACCENT,
              padding: "16px 32px",
              textAlign: "center",
            }}
          >
            <Text style={{ color: "#1a1a1a", margin: 0, fontWeight: 700, fontSize: 20 }}>
              📞{" "}
              <Link href={`tel:${phone}`} style={{ color: "#1a1a1a", textDecoration: "none" }}>
                {phone}
              </Link>
            </Text>
          </Section>

          {/* Data table */}
          <Section style={{ backgroundColor: "#ffffff", padding: "24px 32px" }}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
                    <td
                      style={{
                        padding: "10px 12px",
                        fontWeight: 600,
                        fontSize: 13,
                        color: PRIMARY,
                        width: "40%",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        fontSize: 13,
                        color: "#374151",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* CTA */}
          <Section
            style={{
              backgroundColor: "#f0f9ff",
              padding: "20px 32px",
              borderTop: `3px solid ${PRIMARY}`,
            }}
          >
            <Text style={{ margin: 0, fontSize: 13, color: "#374151", textAlign: "center" }}>
              ✅ Contacta en menos de 24 horas · Visita gratuita sin compromiso
            </Text>
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
            <Text style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>
              Este email fue generado automáticamente por el formulario web de Solteva Elevación.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
