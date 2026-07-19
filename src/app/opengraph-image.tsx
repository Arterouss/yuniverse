import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Yuu — Senior Full Stack Web Developer & AI Engineer Aspirant";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#080A0F",
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(56, 189, 248, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 75%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top Badge & Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 24px",
              borderRadius: "9999px",
              backgroundColor: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              color: "#38BDF8",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span>✨ SENIOR FULL STACK DEVELOPER</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#94A3B8",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <span>4+ Years Experience</span>
            <span>•</span>
            <span style={{ color: "#38BDF8" }}>100% Remote Available</span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "24px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>YUU (BAYU ANGGARA)</span>
            <span
              style={{
                background: "linear-gradient(135deg, #38BDF8 0%, #06B6D4 50%, #3B82F6 100%)",
                backgroundClip: "text",
                color: "transparent",
                fontSize: 54,
                marginTop: "12px",
              }}
            >
              Building Digital Dimensions Where Art Meets Engineering
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#CBD5E1",
              maxWidth: "960px",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Next.js 16 • TypeScript • PHP Laravel • 3D Spatial Glass UI • AI Systems Architecture
          </div>
        </div>

        {/* Bottom Bar / URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 24,
              color: "#F8FAFC",
              fontWeight: 700,
            }}
          >
            <span>YUUUNIVERS</span>
            <span style={{ color: "#64748B" }}>|</span>
            <span style={{ color: "#38BDF8", fontSize: 20 }}>UNIBI Informatics • Yota Adiwidya Center</span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#38BDF8",
              fontWeight: 700,
            }}
          >
            yuuunivers.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
