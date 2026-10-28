import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = `${portfolio.name} — ${portfolio.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og (satori) can't use variable fonts, so assets/fonts holds static,
// Latin-subset instances of Archivo (wdth 125 / wght 700 and wdth 100 / wght 400).
const fontPath = (file: string) => join(process.cwd(), "assets/fonts", file);

export default async function Image() {
  const [photo, expandedBold, regular] = await Promise.all([
    readFile(join(process.cwd(), "public/profile.jpg"), "base64"),
    readFile(fontPath("Archivo-ExpandedBold.ttf")),
    readFile(fontPath("Archivo-Regular.ttf")),
  ]);
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
          color: "#16202b",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Archivo Expanded",
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: -2,
            }}
          >
            {portfolio.name.split(" ").map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
          <div style={{ marginTop: 32, fontSize: 32, lineHeight: 1.25 }}>
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
          <div style={{ marginTop: 28, fontSize: 26, color: "#5b6672" }}>
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
    {
      ...size,
      fonts: [
        { name: "Archivo Expanded", data: expandedBold, weight: 700, style: "normal" },
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
