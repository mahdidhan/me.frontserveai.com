# me.mandn.shop

Personal portfolio website for **Mahdi Hamed** — Software Architect & Cloud Solutions Engineer.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide React. Optimized for deployment on [Vercel](https://vercel.com) via GitHub.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx            # Single-page portfolio (all sections)
│   ├── globals.css         # Tailwind + dark theme CSS variables
│   ├── loading.tsx         # Route loading skeleton
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # SEO sitemap
│   └── robots.ts           # Crawler rules
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, About, Skills, Experience, etc.
│   └── ui/                 # Reusable Button, Badge, Card, etc.
├── data/
│   ├── portfolio.ts        # All portfolio content (from CV)
│   └── site.ts             # Site config, SEO, social links
├── lib/
│   └── utils.ts            # cn() utility (clsx + tailwind-merge)
└── types/
    └── portfolio.ts        # TypeScript interfaces
public/
├── profile.png             # Profile headshot
└── Mahdi-Hamed-Resume.pdf  # Downloadable resume
```

## Updating Content

All portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). Edit this file to update experience, projects, skills, and contact information.

Site-wide settings (URL, SEO, navigation) are in [`src/data/site.ts`](src/data/site.ts).

## Deploy to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy**
5. Add custom domain `me.mandn.shop` in Project Settings → Domains

No environment variables are required for this static portfolio.

## License

Private — All rights reserved.
