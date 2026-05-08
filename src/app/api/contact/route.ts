import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { render } from "@react-email/components";
import LeadEmail from "@/lib/email/templates/lead";
import ConfirmationEmail from "@/lib/email/templates/confirmation";

const contactSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(9).max(20),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().optional(),
  province: z.string().optional(),
  stairType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  howKnown: z.string().optional(),
  locale: z.enum(["es", "en"]).default("es"),
  type: z.enum(["contact", "quick-quote"]).default("contact"),
  honeypot: z.string().max(0).optional(),
});

async function sendEmail(
  resendKey: string,
  from: string,
  to: string | string[],
  subject: string,
  html: string
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    if (data.honeypot) {
      return NextResponse.json({ ok: true });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL_TO || "[email protected]";
    const from = process.env.CONTACT_EMAIL_FROM || "Solteva Web <[email protected]>";

    if (!resendKey) {
      console.log("No RESEND_API_KEY configured. Form data:", data);
      return NextResponse.json({ ok: true });
    }

    const leadSubject =
      data.type === "quick-quote"
        ? `[Presupuesto Rápido] ${data.phone} — ${data.province || "Sin provincia"}`
        : `[Contacto Web] ${data.name || "Sin nombre"} — ${data.phone}`;

    const leadHtml = await render(
      LeadEmail({
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        city: data.city,
        province: data.province,
        stairType: data.stairType,
        subject: data.subject,
        message: data.message,
        howKnown: data.howKnown,
        locale: data.locale,
        type: data.type,
      })
    );

    await sendEmail(resendKey, from, to, leadSubject, leadHtml);

    if (data.email) {
      const confirmSubject =
        data.locale === "es"
          ? "Hemos recibido tu solicitud — Solteva Elevación"
          : "We received your request — Solteva Elevación";

      const confirmHtml = await render(
        ConfirmationEmail({
          name: data.name,
          phone: data.phone,
          locale: data.locale,
        })
      );

      await sendEmail(resendKey, from, data.email, confirmSubject, confirmHtml);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.issues }, { status: 400 });
    }
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
