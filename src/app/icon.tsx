import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "linear-gradient(135deg, #080A0F 0%, #111827 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#38BDF8",
          fontWeight: 900,
          borderRadius: "8px",
          border: "2px solid #38BDF8",
          boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
        }}
      >
        Y
      </div>
    ),
    {
      ...size,
    }
  );
}
