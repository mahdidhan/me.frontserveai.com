/**
 * Simplified architecture of CyberShield (see `experience` in portfolio.ts),
 * drawn as the hero figure. Content (labels) is defined once; each layout
 * only supplies geometry in its own viewBox. Groups are dashed zones; nodes
 * are positioned by their centre.
 *
 * - `wide`: 680 × 530, used from the `sm` breakpoint up.
 * - `tall`: 360 × 775, used on phones, so it fits without horizontal scroll.
 */

type Point = [number, number];

interface GroupContent {
  label: string;
}

interface NodeContent {
  label: string;
  detail?: string;
  /** The one node drawn in the accent colour. */
  emphasis?: boolean;
}

interface EdgeContent {
  label?: string;
  /** Draw an arrowhead at the start too. */
  bidirectional?: boolean;
}

export interface DiagramGroup extends GroupContent {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DiagramNode extends NodeContent {
  id: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
}

export interface DiagramEdge extends EdgeContent {
  id: string;
  /** Polyline points; the arrowhead goes on the last one. */
  points: Point[];
  labelAt?: Point;
  labelAnchor?: "start" | "middle" | "end";
}

export interface DiagramLayout {
  viewBox: { width: number; height: number };
  groups: DiagramGroup[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

const groupContent = {
  signals: { label: "Signals" },
  cluster: { label: "Kubernetes" },
  data: { label: "Data" },
  platform: { label: "Shared Azure services" },
} satisfies Record<string, GroupContent>;

const nodeContent = {
  services: {
    label: "CyberShield services",
    detail: "ASP.NET Core, gRPC, Helm",
    emphasis: true,
  },
  ingress: { label: "NGINX ingress" },
  web: { label: "Web app", detail: "Vue 3" },
  identity: { label: "Single sign-on", detail: "Microsoft Entra ID" },
  sentinel: { label: "Microsoft Sentinel" },
  defender: { label: "Microsoft Defender" },
  mailboxes: { label: "Support mailboxes", detail: "via Microsoft Graph" },
  sql: { label: "Azure SQL" },
  cosmos: { label: "Cosmos DB" },
  graph: { label: "Cosmos DB graph" },
  bus: { label: "Azure Service Bus", detail: "RabbitMQ locally" },
  logic: { label: "Logic Apps" },
  registry: { label: "Container Registry" },
  vault: { label: "Key Vault" },
  storage: { label: "Storage account" },
  notify: { label: "Notification Hubs" },
} satisfies Record<string, NodeContent>;

const edgeContent = {
  sso: { label: "SSO" },
  https: { label: "HTTPS" },
  route: {},
  signals: { label: "alerts, tickets" },
  data: { label: "read / write" },
  events: { label: "integration events", bidirectional: true },
  messages: { label: "messages" },
} satisfies Record<string, EdgeContent>;

type GroupId = keyof typeof groupContent;
type NodeId = keyof typeof nodeContent;
type EdgeId = keyof typeof edgeContent;

type Box = { x: number; y: number; width: number; height: number };
type Placement = { cx: number; cy: number; width: number; height: number };
type Route = Omit<DiagramEdge, "id" | keyof EdgeContent>;

/** Join geometry with content, in the given order (which is the draw-in order). */
function layout(
  viewBox: DiagramLayout["viewBox"],
  groups: [GroupId, Box][],
  nodes: [NodeId, Placement][],
  edges: [EdgeId, Route][],
): DiagramLayout {
  return {
    viewBox,
    groups: groups.map(([id, box]) => ({ id, ...groupContent[id], ...box })),
    nodes: nodes.map(([id, place]) => ({ id, ...nodeContent[id], ...place })),
    edges: edges.map(([id, route]) => ({ id, ...edgeContent[id], ...route })),
  };
}

const side = { width: 136, height: 44 };
const platformWide = { width: 145, height: 36 };

const wide = layout(
  { width: 680, height: 530 },
  [
    ["signals", { x: 10, y: 110, width: 160, height: 230 }],
    ["cluster", { x: 230, y: 110, width: 220, height: 230 }],
    ["data", { x: 510, y: 110, width: 160, height: 230 }],
    ["platform", { x: 10, y: 448, width: 660, height: 72 }],
  ],
  [
    ["services", { cx: 340, cy: 265, width: 180, height: 64 }],
    ["ingress", { cx: 340, cy: 168, width: 170, height: 40 }],
    ["web", { cx: 340, cy: 45, width: 160, height: 50 }],
    ["identity", { cx: 590, cy: 45, width: 160, height: 50 }],
    ["sentinel", { cx: 90, cy: 168, ...side }],
    ["defender", { cx: 90, cy: 230, ...side }],
    ["mailboxes", { cx: 90, cy: 292, ...side }],
    ["sql", { cx: 590, cy: 168, ...side }],
    ["cosmos", { cx: 590, cy: 230, ...side }],
    ["graph", { cx: 590, cy: 292, ...side }],
    ["bus", { cx: 340, cy: 395, width: 180, height: 50 }],
    ["logic", { cx: 90, cy: 395, width: 140, height: 50 }],
    ["registry", { cx: 95, cy: 494, ...platformWide }],
    ["vault", { cx: 255, cy: 494, ...platformWide }],
    ["storage", { cx: 415, cy: 494, ...platformWide }],
    ["notify", { cx: 575, cy: 494, ...platformWide }],
  ],
  [
    ["sso", { points: [[510, 45], [420, 45]], labelAt: [465, 37] }],
    ["https", { points: [[340, 70], [340, 148]], labelAt: [348, 100], labelAnchor: "start" }],
    ["route", { points: [[340, 188], [340, 233]] }],
    ["signals", { points: [[170, 265], [250, 265]], labelAt: [210, 257] }],
    ["data", { points: [[430, 265], [510, 265]], labelAt: [470, 257] }],
    ["events", { points: [[340, 297], [340, 370]], labelAt: [348, 356], labelAnchor: "start" }],
    ["messages", { points: [[160, 395], [250, 395]], labelAt: [205, 387] }],
  ],
);

const sideTall = { width: 140, height: 44 };
const platformTall = { width: 150, height: 34 };

const tall = layout(
  { width: 360, height: 775 },
  [
    ["cluster", { x: 10, y: 100, width: 340, height: 162 }],
    ["signals", { x: 10, y: 300, width: 160, height: 180 }],
    ["data", { x: 190, y: 300, width: 160, height: 180 }],
    ["platform", { x: 10, y: 640, width: 340, height: 124 }],
  ],
  [
    ["services", { cx: 180, cy: 220, width: 230, height: 56 }],
    ["ingress", { cx: 95, cy: 150, width: 150, height: 36 }],
    ["web", { cx: 85, cy: 45, width: 140, height: 46 }],
    ["identity", { cx: 270, cy: 45, width: 150, height: 46 }],
    ["sentinel", { cx: 90, cy: 347, ...sideTall }],
    ["defender", { cx: 90, cy: 397, ...sideTall }],
    ["mailboxes", { cx: 90, cy: 447, ...sideTall }],
    ["sql", { cx: 270, cy: 347, ...sideTall }],
    ["cosmos", { cx: 270, cy: 397, ...sideTall }],
    ["graph", { cx: 270, cy: 447, ...sideTall }],
    ["bus", { cx: 180, cy: 523, width: 200, height: 50 }],
    ["logic", { cx: 180, cy: 600, width: 140, height: 40 }],
    ["registry", { cx: 95, cy: 680, ...platformTall }],
    ["vault", { cx: 265, cy: 680, ...platformTall }],
    ["storage", { cx: 95, cy: 726, ...platformTall }],
    ["notify", { cx: 265, cy: 726, ...platformTall }],
  ],
  [
    ["sso", { points: [[195, 45], [155, 45]], labelAt: [175, 37] }],
    ["https", { points: [[140, 68], [140, 132]], labelAt: [148, 92], labelAnchor: "start" }],
    ["route", { points: [[140, 168], [140, 192]] }],
    ["signals", { points: [[90, 300], [90, 248]], labelAt: [96, 284], labelAnchor: "start" }],
    ["data", { points: [[270, 248], [270, 300]], labelAt: [276, 284], labelAnchor: "start" }],
    ["events", { points: [[180, 248], [180, 498]], labelAt: [186, 492], labelAnchor: "start" }],
    ["messages", { points: [[180, 580], [180, 548]], labelAt: [188, 568], labelAnchor: "start" }],
  ],
);

export const architecture = {
  title: "CyberShield architecture",
  description:
    "Users sign in to a Vue 3 web app with Microsoft Entra ID single sign-on. Requests go over HTTPS through an NGINX ingress into CyberShield's ASP.NET Core services, which run on Kubernetes with a Helm chart per service and talk to each other over gRPC. Microsoft Sentinel and Defender send alerts, and an email listener reads support mailboxes through Microsoft Graph to create tickets. The services read and write Azure SQL, Cosmos DB, and a Cosmos DB graph, and exchange integration events over Azure Service Bus (RabbitMQ when running locally). Logic Apps also send messages through Service Bus. Images are pushed to Azure Container Registry and pulled automatically; secrets live in Key Vault, files in a Storage account, and notifications go out through Notification Hubs.",
  caption:
    "Figure 1. CyberShield, simplified: the 24/7 platform for Microsoft Defender and Sentinel incidents and support tickets that I architect and lead.",
  layouts: { wide, tall },
};

export type LayoutName = keyof typeof architecture.layouts;
