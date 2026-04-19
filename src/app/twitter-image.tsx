import { ImageResponse } from "next/og";

export const alt = "9Ruby social card";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          padding: "48px 56px",
          background:
            "radial-gradient(circle at top left, #43101f 0%, #0b0b11 42%, #050507 100%)",
          color: "#f8f7f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 9999,
              background: "#8B6B3D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            9
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>9Ruby</div>
            <div style={{ fontSize: 16, color: "rgba(248,247,244,0.72)" }}>
              By IX Ruby
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            AI agents, websites, and automation.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(248,247,244,0.72)",
              maxWidth: 920,
            }}
          >
            Official home for 9Ruby, 9Ruby AI, IX Ruby Agency, Nine Builder,
            and the wider IX Ruby ecosystem.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 18,
            color: "rgba(248,247,244,0.74)",
          }}
        >
          <span>www.9ruby.com</span>
          <span>ai.9ruby.com</span>
          <span>/ecosystem</span>
        </div>
      </div>
    ),
    size,
  );
}
