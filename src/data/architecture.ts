/**
 * Simplified architecture of CyberShield (see `experience` in portfolio.ts),
 * drawn as the hero figure. Coordinates are in the SVG's 680 × 530 viewBox.
 * Groups are dashed zones; nodes are positioned by their centre.
 */
export interface DiagramGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DiagramNode {
  id: string;
  label: string;
  detail?: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
  /** The one node drawn in the accent colour. */
  emphasis?: boolean;
}

export interface DiagramEdge {
  id: string;
  /** Polyline points; the arrowhead goes on the last one. */
  points: [number, number][];
  /** Draw an arrowhead at the start too. */
  bidirectional?: boolean;
  label?: string;
  labelAt?: [number, number];
  labelAnchor?: "start" | "middle" | "end";
}

const SIDE_NODE = { width: 136, height: 44 };
const PLATFORM_NODE = { width: 145, height: 36 };

const groups: DiagramGroup[] = [
  { id: "signals", label: "Signals", x: 10, y: 110, width: 160, height: 230 },
  {
    id: "cluster",
    label: "Kubernetes",
    x: 230,
    y: 110,
    width: 220,
    height: 230,
  },
  { id: "data", label: "Data", x: 510, y: 110, width: 160, height: 230 },
  {
    id: "platform",
    label: "Shared Azure services",
    x: 10,
    y: 448,
    width: 660,
    height: 72,
  },
];

const nodes: DiagramNode[] = [
  {
    id: "services",
    label: "CyberShield services",
    detail: "ASP.NET Core, gRPC, Helm",
    cx: 340,
    cy: 265,
    width: 180,
    height: 64,
    emphasis: true,
  },
  { id: "ingress", label: "NGINX ingress", cx: 340, cy: 168, width: 170, height: 40 },
  { id: "web", label: "Web app", detail: "Vue 3", cx: 340, cy: 45, width: 160, height: 50 },
  {
    id: "identity",
    label: "Single sign-on",
    detail: "Microsoft Entra ID",
    cx: 590,
    cy: 45,
    width: 160,
    height: 50,
  },
  { id: "sentinel", label: "Microsoft Sentinel", cx: 90, cy: 168, ...SIDE_NODE },
  { id: "defender", label: "Microsoft Defender", cx: 90, cy: 230, ...SIDE_NODE },
  {
    id: "mailboxes",
    label: "Support mailboxes",
    detail: "via Microsoft Graph",
    cx: 90,
    cy: 292,
    ...SIDE_NODE,
  },
  { id: "sql", label: "Azure SQL", cx: 590, cy: 168, ...SIDE_NODE },
  { id: "cosmos", label: "Cosmos DB", cx: 590, cy: 230, ...SIDE_NODE },
  { id: "graph", label: "Cosmos DB graph", cx: 590, cy: 292, ...SIDE_NODE },
  {
    id: "bus",
    label: "Azure Service Bus",
    detail: "RabbitMQ locally",
    cx: 340,
    cy: 395,
    width: 180,
    height: 50,
  },
  { id: "logic", label: "Logic Apps", cx: 90, cy: 395, width: 140, height: 50 },
  { id: "registry", label: "Container Registry", cx: 95, cy: 494, ...PLATFORM_NODE },
  { id: "vault", label: "Key Vault", cx: 255, cy: 494, ...PLATFORM_NODE },
  { id: "storage", label: "Storage account", cx: 415, cy: 494, ...PLATFORM_NODE },
  { id: "notify", label: "Notification Hubs", cx: 575, cy: 494, ...PLATFORM_NODE },
];

const edges: DiagramEdge[] = [
  {
    id: "sso",
    points: [
      [510, 45],
      [420, 45],
    ],
    label: "SSO",
    labelAt: [465, 37],
  },
  {
    id: "https",
    points: [
      [340, 70],
      [340, 148],
    ],
    label: "HTTPS",
    labelAt: [348, 100],
    labelAnchor: "start",
  },
  {
    id: "route",
    points: [
      [340, 188],
      [340, 233],
    ],
  },
  {
    id: "signals",
    points: [
      [170, 265],
      [250, 265],
    ],
    label: "alerts, tickets",
    labelAt: [210, 257],
  },
  {
    id: "data",
    points: [
      [430, 265],
      [510, 265],
    ],
    label: "read / write",
    labelAt: [470, 257],
  },
  {
    id: "events",
    points: [
      [340, 297],
      [340, 370],
    ],
    bidirectional: true,
    label: "integration events",
    labelAt: [348, 356],
    labelAnchor: "start",
  },
  {
    id: "messages",
    points: [
      [160, 395],
      [250, 395],
    ],
    label: "messages",
    labelAt: [205, 387],
  },
];

export const architecture = {
  title: "CyberShield architecture",
  description:
    "Users sign in to a Vue 3 web app with Microsoft Entra ID single sign-on. Requests go over HTTPS through an NGINX ingress into CyberShield's ASP.NET Core services, which run on Kubernetes with a Helm chart per service and talk to each other over gRPC. Microsoft Sentinel and Defender send alerts, and an email listener reads support mailboxes through Microsoft Graph to create tickets. The services read and write Azure SQL, Cosmos DB, and a Cosmos DB graph, and exchange integration events over Azure Service Bus (RabbitMQ when running locally). Logic Apps also send messages through Service Bus. Images are pushed to Azure Container Registry and pulled automatically; secrets live in Key Vault, files in a Storage account, and notifications go out through Notification Hubs.",
  caption:
    "Figure 1. CyberShield, simplified: the 24/7 platform for Microsoft Defender and Sentinel incidents and support tickets that I architect and lead.",
  viewBox: { width: 680, height: 530 },
  groups,
  nodes,
  edges,
};
