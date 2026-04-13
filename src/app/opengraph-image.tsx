import { ImageResponse } from "next/og";

export const alt = "9Ruby by IX Ruby";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background:
            "radial-gradient(circle at top left, #3c0d1b 0%, #0b0b11 45%, #050507 100%)",
          color: "#f8f7f4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              background: "#C41A3B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            9
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>9Ruby</div>
            <div style={{ fontSize: 18, color: "rgba(248,247,244,0.7)" }}>
              By IX Ruby
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            AI agents, websites, and automation.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(248,247,244,0.72)",
              maxWidth: 860,
            }}
          >
            Build with 9Ruby AI, voice systems, design tools, and the IX Ruby
            product ecosystem.
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
          <span>home.9ruby.com</span>
        </div>
      </div>
    ),
    size,
  );
}
