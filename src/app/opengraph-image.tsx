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
          // Mirrors the "drafting film" tokens in globals.css (next/og can't read CSS vars).
          backgroundColor: "#f3f5f4",
          backgroundImage: "radial-gradient(#c9d0d5 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          color: "#16202b",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>
            {portfolio.name}
          </div>
          <div style={{ marginTop: 20, fontSize: 34, color: "#16202b" }}>
            {portfolio.title}
          </div>
          <div
            style={{
              marginTop: 32,
              width: 96,
              height: 6,
              backgroundColor: "#1f4fd1",
            }}
          />
          <div style={{ marginTop: 32, fontSize: 26, color: "#5b6672" }}>
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
            borderRadius: 12,
            objectFit: "cover",
            objectPosition: "top",
            border: "2px solid #16202b",
          }}
        />
      </div>
    ),
    size,
  );
}
