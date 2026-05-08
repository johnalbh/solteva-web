import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Solteva Elevación — Sillas Salvaescaleras";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F4C81",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo / brand name */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          Solteva Elevación
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            marginBottom: 40,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Sillas Salvaescaleras · Plataformas · Elevadores Verticales
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: 120,
            height: 6,
            background: "#F59E0B",
            borderRadius: 3,
            marginBottom: 40,
          }}
        />

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["+15 años", "Visita gratis 24h", "CE · ISO", "900 100 133"].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 40,
                  padding: "10px 22px",
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {badge}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
