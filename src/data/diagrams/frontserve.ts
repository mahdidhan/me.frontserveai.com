/**
 * FrontServe AI, simplified: the hero figure. Built from Mahdi's description
 * of the product; keep notes factual. The order engine is the focal node
 * because the core design choice is that code, not the model, sets every
 * price, total and stock check.
 */
import {
  defineDiagram,
  layout,
  type EdgeContent,
  type GroupContent,
  type NodeContent,
} from "./shared";

const groupContent = {
  voice: { label: "Voice" },
  conversation: { label: "Conversation" },
  data: { label: "Store data" },
  platform: { label: "Quality and hosting" },
} satisfies Record<string, GroupContent>;

const nodeContent = {
  engine: {
    label: "Order engine",
    detail: "prices, totals, stock",
    emphasis: true,
    kind: "Source of truth",
    note: "Plain code builds the order from the store's own menu, stock and prices. It sets every price, total and stock check; the model never does.",
  },
  customer: {
    label: "Customer",
    detail: "at the counter",
    kind: "Person",
    note: "Orders out loud in Arabic, English or a mix of both.",
  },
  kiosk: {
    label: "Kiosk",
    detail: "Next.js, en / ar",
    kind: "Front end",
    note: "The bilingual kiosk and website, built with Next.js, TypeScript and Tailwind and hosted on Vercel.",
  },
  owner: {
    label: "Store owner",
    detail: "menu and rules",
    kind: "Person",
    note: "Sets the menu, prices and stock, and the rules the assistant uses for suggestions.",
  },
  stt: {
    label: "Speech-to-text",
    detail: "pluggable providers",
    kind: "Voice",
    note: "Pluggable providers such as Whisper, OpenAI, Groq and Azure, chosen through a bake-off on real Jordanian Arabic recordings.",
  },
  tts: {
    label: "Text-to-speech",
    detail: "pluggable voices",
    kind: "Voice",
    note: "Pluggable voices such as ElevenLabs, Azure and local Piper voices, chosen through the same bake-off.",
  },
  understand: {
    label: "Understand",
    detail: "model call 1",
    kind: "Model",
    note: "The first model call works out what the customer wants. Code drives the conversation from there.",
  },
  reply: {
    label: "Reply",
    detail: "model call 2",
    kind: "Model",
    note: "The second model call phrases the reply. It makes one suggestion at a time, based on the owner's rules, and reads the order back before confirming.",
  },
  models: {
    label: "Model profile",
    detail: "Claude, GPT or Qwen",
    kind: "Model",
    note: "Chosen per store by named profiles: Claude Haiku 5.5 by default, gpt-5-mini as fallback, or a local Qwen3 8B through Ollama or vLLM.",
  },
  search: {
    label: "Menu search",
    detail: "hybrid, RRF",
    kind: "Retrieval",
    note: "Hybrid retrieval: pgvector similarity plus pg_trgm trigram search, merged with reciprocal rank fusion. If embeddings are unavailable it falls back to trigram-only search.",
  },
  postgres: {
    label: "PostgreSQL",
    detail: "Neon, pgvector, pg_trgm",
    kind: "Data",
    note: "Menu, stock, prices and orders on Neon Postgres, through async SQLAlchemy 2 with Alembic migrations.",
  },
  rules: {
    label: "Owner's rules",
    detail: "suggestions",
    kind: "Data",
    note: "The owner's rules for what to suggest, applied one suggestion at a time.",
  },
  embeddings: {
    label: "Embeddings",
    detail: "bge-m3, Cloudflare",
    kind: "Retrieval",
    note: "bge-m3 embeddings for menu search, served from Cloudflare.",
  },
  evals: {
    label: "YAML eval suite",
    kind: "Quality",
    note: "Conversation scenarios written in YAML and replayed against the live model.",
  },
  tests: {
    label: "pytest, strict mypy",
    kind: "Quality",
    note: "Unit tests with pytest, and mypy in strict mode across the Python code.",
  },
  fly: {
    label: "Fly.io API",
    kind: "Hosting",
    note: "The FastAPI service runs on Fly.io.",
  },
  vercel: {
    label: "Vercel web app",
    kind: "Hosting",
    note: "The bilingual website and kiosk demo run on Vercel.",
  },
} satisfies Record<string, NodeContent>;

const edgeContent = {
  speaks: { label: "speaks", from: ["customer"], to: ["kiosk"] },
  audio: {
    label: "audio",
    bidirectional: true,
    from: ["kiosk"],
    to: ["stt", "tts"],
  },
  transcript: { label: "transcript", from: ["stt"], to: ["understand"] },
  intent: { from: ["understand"], to: ["engine"] },
  draft: { from: ["engine"], to: ["reply"] },
  spoken: { label: "reply text", from: ["reply"], to: ["tts"] },
  llm: {
    label: "model calls",
    from: ["models"],
    to: ["understand", "reply"],
  },
  data: {
    label: "read / write",
    from: ["engine"],
    to: ["search", "postgres", "rules"],
  },
  setup: { label: "menu, rules", from: ["owner"], to: ["postgres", "rules"] },
  vectors: { label: "vectors", from: ["embeddings"], to: ["search"] },
} satisfies Record<string, EdgeContent<NodeId>>;

type GroupId = keyof typeof groupContent;
type NodeId = keyof typeof nodeContent;
type EdgeId = keyof typeof edgeContent;

const person = { width: 150, height: 50 };
const side = { width: 136, height: 44 };
const platformWide = { width: 145, height: 36 };

const wide = layout<GroupId, NodeId, EdgeId>(
  { width: 680, height: 530 },
  [
    ["voice", { x: 10, y: 110, width: 160, height: 230 }],
    ["conversation", { x: 230, y: 110, width: 220, height: 230 }],
    ["data", { x: 510, y: 110, width: 160, height: 230 }],
    ["platform", { x: 10, y: 448, width: 660, height: 72 }],
  ],
  [
    ["engine", { cx: 340, cy: 230, width: 180, height: 56 }],
    ["customer", { cx: 90, cy: 45, ...person }],
    ["kiosk", { cx: 340, cy: 45, width: 160, height: 50 }],
    ["owner", { cx: 590, cy: 45, ...person }],
    ["stt", { cx: 90, cy: 160, ...side }],
    ["tts", { cx: 90, cy: 300, ...side }],
    ["understand", { cx: 340, cy: 160, width: 170, height: 40 }],
    ["reply", { cx: 340, cy: 300, width: 170, height: 40 }],
    ["search", { cx: 590, cy: 168, ...side }],
    ["postgres", { cx: 590, cy: 230, ...side }],
    ["rules", { cx: 590, cy: 292, ...side }],
    ["models", { cx: 340, cy: 395, width: 200, height: 50 }],
    ["embeddings", { cx: 590, cy: 395, width: 150, height: 50 }],
    ["evals", { cx: 95, cy: 494, ...platformWide }],
    ["tests", { cx: 255, cy: 494, ...platformWide }],
    ["fly", { cx: 415, cy: 494, ...platformWide }],
    ["vercel", { cx: 575, cy: 494, ...platformWide }],
  ],
  [
    [
      "speaks",
      {
        points: [
          [165, 45],
          [260, 45],
        ],
        labelAt: [212, 37],
      },
    ],
    [
      "audio",
      {
        points: [
          [300, 70],
          [300, 90],
          [90, 90],
          [90, 138],
        ],
        labelAt: [195, 84],
      },
    ],
    [
      "transcript",
      {
        points: [
          [158, 160],
          [255, 160],
        ],
        labelAt: [206, 152],
      },
    ],
    [
      "intent",
      {
        points: [
          [340, 180],
          [340, 202],
        ],
      },
    ],
    [
      "draft",
      {
        points: [
          [340, 258],
          [340, 280],
        ],
      },
    ],
    [
      "spoken",
      {
        points: [
          [255, 300],
          [158, 300],
        ],
        labelAt: [206, 292],
      },
    ],
    [
      "llm",
      {
        points: [
          [340, 370],
          [340, 320],
        ],
        labelAt: [348, 352],
        labelAnchor: "start",
      },
    ],
    [
      "data",
      {
        points: [
          [430, 230],
          [510, 230],
        ],
        labelAt: [470, 222],
      },
    ],
    [
      "setup",
      {
        points: [
          [590, 70],
          [590, 110],
        ],
        labelAt: [598, 94],
        labelAnchor: "start",
      },
    ],
    [
      "vectors",
      {
        points: [
          [590, 370],
          [590, 340],
        ],
        labelAt: [598, 359],
        labelAnchor: "start",
      },
    ],
  ],
);

const platformTall = { width: 150, height: 34 };
const dataTall = { width: 200, height: 40 };

const tall = layout<GroupId, NodeId, EdgeId>(
  { width: 360, height: 892 },
  [
    ["voice", { x: 10, y: 92, width: 340, height: 76 }],
    ["conversation", { x: 10, y: 190, width: 340, height: 210 }],
    ["data", { x: 10, y: 490, width: 340, height: 180 }],
    ["platform", { x: 10, y: 755, width: 340, height: 127 }],
  ],
  [
    ["engine", { cx: 180, cy: 295, width: 230, height: 52 }],
    ["customer", { cx: 75, cy: 45, width: 130, height: 46 }],
    ["kiosk", { cx: 275, cy: 45, width: 140, height: 46 }],
    ["stt", { cx: 110, cy: 133, width: 150, height: 34 }],
    ["tts", { cx: 265, cy: 133, width: 150, height: 34 }],
    ["understand", { cx: 180, cy: 230, width: 200, height: 36 }],
    ["reply", { cx: 180, cy: 360, width: 200, height: 36 }],
    ["models", { cx: 115, cy: 440, width: 140, height: 44 }],
    ["owner", { cx: 270, cy: 440, width: 140, height: 44 }],
    ["search", { cx: 180, cy: 530, ...dataTall }],
    ["postgres", { cx: 180, cy: 580, ...dataTall }],
    ["rules", { cx: 180, cy: 630, ...dataTall }],
    ["embeddings", { cx: 95, cy: 715, width: 150, height: 40 }],
    ["evals", { cx: 95, cy: 797, ...platformTall }],
    ["tests", { cx: 265, cy: 797, ...platformTall }],
    ["fly", { cx: 95, cy: 842, ...platformTall }],
    ["vercel", { cx: 265, cy: 842, ...platformTall }],
  ],
  [
    [
      "speaks",
      {
        points: [
          [140, 45],
          [205, 45],
        ],
        labelAt: [172, 37],
      },
    ],
    [
      "audio",
      {
        points: [
          [230, 68],
          [230, 80],
          [110, 80],
          [110, 116],
        ],
        labelAt: [162, 75],
      },
    ],
    [
      "transcript",
      {
        points: [
          [110, 150],
          [110, 212],
        ],
        labelAt: [116, 184],
        labelAnchor: "start",
      },
    ],
    [
      "intent",
      {
        points: [
          [180, 248],
          [180, 269],
        ],
      },
    ],
    [
      "draft",
      {
        points: [
          [180, 321],
          [180, 342],
        ],
      },
    ],
    [
      "spoken",
      {
        points: [
          [280, 360],
          [332, 360],
          [332, 150],
        ],
        labelAt: [326, 262],
        labelAnchor: "end",
      },
    ],
    [
      "llm",
      {
        points: [
          [115, 418],
          [115, 378],
        ],
        labelAt: [121, 402],
        labelAnchor: "start",
      },
    ],
    [
      "data",
      {
        points: [
          [65, 295],
          [25, 295],
          [25, 490],
        ],
        labelAt: [31, 480],
        labelAnchor: "start",
      },
    ],
    [
      "setup",
      {
        points: [
          [270, 462],
          [270, 490],
        ],
        labelAt: [276, 480],
        labelAnchor: "start",
      },
    ],
    [
      "vectors",
      {
        points: [
          [95, 695],
          [95, 670],
        ],
      },
    ],
  ],
);

export const frontserve = defineDiagram({
  id: "frontserve",
  title: "FrontServe AI architecture",
  description:
    "A customer speaks an order at the counter, in Arabic, English or both. The bilingual Next.js kiosk sends the audio to a pluggable speech-to-text provider, and the transcript goes to a FastAPI service on Fly.io. One model call works out what the customer wants; the order engine, which is plain code, builds the order from the store's own menu, stock and prices in PostgreSQL on Neon, using hybrid menu search (pgvector with bge-m3 embeddings from Cloudflare plus pg_trgm trigram search, merged with reciprocal rank fusion). A second model call phrases the reply, with at most one suggestion based on the owner's rules, and text-to-speech reads it back. Each store picks a model profile: Claude Haiku 5.5 by default, gpt-5-mini as fallback, or a local Qwen3 8B. Quality is checked with a YAML eval suite replayed against the live model, pytest and strict mypy.",
  figure: "Fig. 1",
  name: "FrontServe AI, simplified",
  caption:
    "FrontServe AI, the AI order-taker I'm building for counters in Jordan. The model understands the customer; code sets every price.",
  traceLabel: "Trace an order",
  groups: groupContent,
  nodes: nodeContent,
  edges: edgeContent,
  layouts: { wide, tall },
  trace: [
    {
      edge: "speaks",
      node: "customer",
      text: "A customer orders out loud, in Arabic, English or both.",
    },
    {
      edge: "audio",
      node: "stt",
      text: "The kiosk sends the audio to speech-to-text.",
    },
    {
      edge: "transcript",
      node: "understand",
      text: "The first model call works out what the customer wants.",
    },
    {
      edge: "intent",
      node: "engine",
      text: "The order engine builds the order. Code, not the model, sets every price, total and stock check.",
    },
    {
      edge: "data",
      node: "search",
      text: "Hybrid menu search finds the items in the store's own menu.",
    },
    {
      edge: "draft",
      node: "reply",
      text: "The second model call phrases the reply, with at most one suggestion from the owner's rules.",
    },
    {
      edge: "spoken",
      node: "tts",
      text: "Text-to-speech reads the order back before confirming.",
    },
  ],
  traceDone: {
    edge: "spoken",
    node: "engine",
    text: "Order confirmed. Two model calls, and every number came from code.",
  },
});
