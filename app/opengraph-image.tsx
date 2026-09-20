import { ImageResponse } from "next/og";

import { hero, site } from "./_content/site";

export const alt = "Charlie — student developer in Denmark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D0F12",
          color: "#EDEFF2",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 24, height: 1, background: "#4A505A" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8C929C",
            }}
          >
            {site.role} · {site.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              maxWidth: 900,
            }}
          >
            {hero.headline}
          </div>
          <div style={{ display: "flex", height: 1, background: "#383D44" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 24,
              color: "#8C929C",
              letterSpacing: "0.04em",
            }}
          >
            <span>charlieva.dev</span>
            <span>typescript · next.js · supabase · postgres</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
