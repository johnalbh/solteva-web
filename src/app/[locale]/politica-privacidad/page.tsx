import { getTranslations } from "next-intl/server";
import { generateSEOMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateSEOMeta({
    title:
      locale === "es"
        ? "Política de Privacidad — Solteva Elevación"
        : "Privacy Policy — Solteva Elevación",
    description:
      locale === "es"
        ? "Política de protección de datos y privacidad de Solteva Elevación S.L."
        : "Privacy and data protection policy of Solteva Elevación S.L.",
    locale,
    path: "/politica-privacidad",
  });
}

export default async function PoliticaPrivacidadPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground mb-10">{t("lastUpdated")}</p>

        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-[var(--primary)]">
          {locale === "es" ? <PrivacyES /> : <PrivacyEN />}
        </div>
      </div>
    </div>
  );
}

function PrivacyES() {
  return (
    <>
      <h2>1. Responsable del tratamiento</h2>
      <p>
        <strong>SOLTEVA ELEVACIÓN S.L.</strong> (en adelante, &quot;Solteva&quot;), con domicilio
        social en Calle La Gitanilla 17, Nave 14, 29004 Málaga, y correo electrónico de contacto{" "}
        <a href="mailto:info@soltevaelevacion.com">info@soltevaelevacion.com</a>.
      </p>

      <h2>2. Datos que recabamos</h2>
      <p>
        A través de nuestros formularios de contacto recabamos: nombre, teléfono, correo
        electrónico, localidad, provincia y el contenido del mensaje. La finalidad es atender
        tu consulta y enviarte un presupuesto sin compromiso.
      </p>

      <h2>3. Base jurídica del tratamiento</h2>
      <p>
        El tratamiento se basa en el <strong>consentimiento</strong> del interesado (art. 6.1.a
        RGPD), otorgado al marcar la casilla de aceptación del formulario.
      </p>

      <h2>4. Conservación de los datos</h2>
      <p>
        Conservamos tus datos durante el tiempo necesario para gestionar tu consulta y, una vez
        resuelta, hasta que retires el consentimiento o hasta el plazo máximo legal aplicable.
      </p>

      <h2>5. Destinatarios</h2>
      <p>
        Tus datos no se ceden a terceros salvo obligación legal. Utilizamos el servicio Resend
        (procesador de email) bajo acuerdo de encargado del tratamiento conforme al RGPD.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer en cualquier momento los derechos de acceso, rectificación, supresión,
        portabilidad, limitación y oposición escribiendo a{" "}
        <a href="mailto:info@soltevaelevacion.com">info@soltevaelevacion.com</a>.
        También puedes reclamar ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          www.aepd.es
        </a>
        ).
      </p>

      <h2>7. Cookies</h2>
      <p>
        Este sitio web no usa cookies de terceros ni seguimiento sin tu consentimiento. Solo se
        utilizan cookies técnicas necesarias para el funcionamiento del sitio.
      </p>
    </>
  );
}

function PrivacyEN() {
  return (
    <>
      <h2>1. Data Controller</h2>
      <p>
        <strong>SOLTEVA ELEVACIÓN S.L.</strong> (&quot;Solteva&quot;), registered at Calle La Gitanilla 17,
        Nave 14, 29004 Málaga, Spain. Contact email:{" "}
        <a href="mailto:info@soltevaelevacion.com">info@soltevaelevacion.com</a>.
      </p>

      <h2>2. Data We Collect</h2>
      <p>
        Through our contact forms we collect: name, phone number, email address, city, province
        and message content. The purpose is to respond to your enquiry and provide a no-obligation
        quote.
      </p>

      <h2>3. Legal Basis</h2>
      <p>
        Processing is based on the <strong>consent</strong> of the data subject (Art. 6.1.a GDPR),
        given by ticking the acceptance box in the form.
      </p>

      <h2>4. Retention Period</h2>
      <p>
        We retain your data for as long as necessary to handle your enquiry and, once resolved,
        until you withdraw consent or the maximum applicable legal period.
      </p>

      <h2>5. Recipients</h2>
      <p>
        Your data is not shared with third parties unless required by law. We use the Resend email
        service (processor) under a data processing agreement compliant with GDPR.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You may exercise your rights of access, rectification, erasure, portability, restriction
        and objection at any time by writing to{" "}
        <a href="mailto:info@soltevaelevacion.com">info@soltevaelevacion.com</a>. You may also
        lodge a complaint with your national supervisory authority.
      </p>

      <h2>7. Cookies</h2>
      <p>
        This website does not use third-party cookies or tracking without your consent. Only
        strictly necessary technical cookies are used.
      </p>
    </>
  );
}
