import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/shared/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://solteva.com"),
  title: "Solteva Elevación — Sillas Salvaescaleras, Elevadores y Plataformas",
  description:
    "Líderes en España en sillas salvaescaleras, plataformas, elevadores verticales y grúas de piscina. +15 años de experiencia. Visita gratuita en 24h.",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
