import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = `${portfolio.name} — ${portfolio.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(
    join(process.cwd(), "public/profile.jpg"),
    "base64",
  );
  const photoSrc = `data:image/jpeg;base64,${photo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 96px",
          background:
            "radial-gradient(ellipse at top, rgba(139,92,246,0.25) 0%, #0a0a0f 60%)",
          backgroundColor: "#0a0a0f",
          color: "#f4f4f5",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#a78bfa",
            }}
          >
            Software Architect
          </div>
          <div style={{ marginTop: 20, fontSize: 80, fontWeight: 700, lineHeight: 1.05 }}>
            {portfolio.name}
          </div>
          <div style={{ marginTop: 20, fontSize: 32, color: "#d4d4d8" }}>
            {portfolio.title}
          </div>
          <div
            style={{
              marginTop: 32,
              width: 96,
              height: 6,
              borderRadius: 3,
              backgroundImage: "linear-gradient(to right, #8b5cf6, #22d3ee)",
            }}
          />
          <div style={{ marginTop: 32, fontSize: 24, color: "#71717a" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
        <img
          src={photoSrc}
          alt=""
          width={360}
          height={360}
          style={{
            borderRadius: 9999,
            objectFit: "cover",
            objectPosition: "top",
            border: "4px solid rgba(255,255,255,0.12)",
          }}
        />
      </div>
    ),
    size,
  );
}
