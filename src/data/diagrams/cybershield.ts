/**
 * CyberShield (see `experience` in portfolio.ts), simplified. Shown in the
 * CyberShield case file. Content was confirmed by Mahdi; keep notes factual.
 */
import {
  defineDiagram,
  layout,
  type EdgeContent,
  type GroupContent,
  type NodeContent,
} from "./shared";

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
    kind: "Core",
    note: "ASP.NET Core microservices that talk over gRPC, deployed to Kubernetes with a Helm chart each. I refactored the services, the database layer and the charts.",
  },
  ingress: {
    label: "NGINX ingress",
    kind: "Edge",
    note: "An NGINX ingress takes HTTPS traffic from the web app and routes it to the services inside the cluster.",
  },
  web: {
    label: "Web app",
    detail: "Vue 3",
    kind: "Front end",
    note: "CyberShield front-end v3, which I delivered in Vue 3 and TypeScript. It is where 100 internal users work incidents and tickets.",
  },
  identity: {
    label: "Single sign-on",
    detail: "Microsoft Entra ID",
    kind: "Identity",
    note: "Single sign-on through Microsoft Entra ID, used to reach the web app.",
  },
  sentinel: {
    label: "Microsoft Sentinel",
    kind: "Signal",
    note: "Microsoft Sentinel incidents arrive as alerts, in real time, around the clock.",
  },
  defender: {
    label: "Microsoft Defender",
    kind: "Signal",
    note: "Microsoft Defender incidents for 40 customer tenants arrive alongside the Sentinel feed.",
  },
  mailboxes: {
    label: "Support mailboxes",
    detail: "via Microsoft Graph",
    kind: "Signal",
    note: "An email listener reads support mailboxes through Microsoft Graph and turns them into tickets, stored in Cosmos DB.",
  },
  sql: {
    label: "Azure SQL",
    kind: "Data",
    note: "Azure SQL holds the platform's relational data.",
  },
  cosmos: {
    label: "Cosmos DB",
    kind: "Data",
    note: "Cosmos DB stores the ingested support mail and tickets.",
  },
  graph: {
    label: "Cosmos DB graph",
    kind: "Data",
    note: "Incident entities are written to a Cosmos DB graph, so related incidents can be connected.",
  },
  bus: {
    label: "Azure Service Bus",
    detail: "RabbitMQ locally",
    kind: "Messaging",
    note: "Services exchange integration events over Azure Service Bus. RabbitMQ stands in for it locally.",
  },
  logic: {
    label: "Logic Apps",
    kind: "Workflow",
    note: "Logic Apps send messages through Service Bus.",
  },
  registry: {
    label: "Container Registry",
    kind: "Shared",
    note: "Images are pushed to Azure Container Registry and pulled automatically on deploy.",
  },
  vault: {
    label: "Key Vault",
    kind: "Shared",
    note: "Key Vault holds the platform's secrets.",
  },
  storage: {
    label: "Storage account",
    kind: "Shared",
    note: "A Storage account holds files.",
  },
  notify: {
    label: "Notification Hubs",
    kind: "Shared",
    note: "Notifications go out through Notification Hubs.",
  },
} satisfies Record<string, NodeContent>;

const edgeContent = {
  sso: { label: "SSO", from: ["identity"], to: ["web"] },
  https: { label: "HTTPS", from: ["web"], to: ["ingress"] },
  route: { from: ["ingress"], to: ["services"] },
  signals: {
    label: "alerts, tickets",
    from: ["sentinel", "defender", "mailboxes"],
    to: ["services"],
  },
  data: {
    label: "read / write",
    from: ["services"],
    to: ["sql", "cosmos", "graph"],
  },
  events: {
    label: "integration events",
    bidirectional: true,
    from: ["services"],
    to: ["bus"],
  },
  messages: { label: "messages", from: ["logic"], to: ["bus"] },
} satisfies Record<string, EdgeContent<NodeId>>;

type GroupId = keyof typeof groupContent;
type NodeId = keyof typeof nodeContent;
type EdgeId = keyof typeof edgeContent;

const side = { width: 136, height: 44 };
const platformWide = { width: 145, height: 36 };

const wide = layout<GroupId, NodeId, EdgeId>(
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
    [
      "sso",
      {
        points: [
          [510, 45],
          [420, 45],
        ],
        labelAt: [465, 37],
      },
    ],
    [
      "https",
      {
        points: [
          [340, 70],
          [340, 148],
        ],
        labelAt: [348, 100],
        labelAnchor: "start",
      },
    ],
    [
      "route",
      {
        points: [
          [340, 188],
          [340, 233],
        ],
      },
    ],
    [
      "signals",
      {
        points: [
          [170, 265],
          [250, 265],
        ],
        labelAt: [210, 257],
      },
    ],
    [
      "data",
      {
        points: [
          [430, 265],
          [510, 265],
        ],
        labelAt: [470, 257],
      },
    ],
    [
      "events",
      {
        points: [
          [340, 297],
          [340, 370],
        ],
        labelAt: [348, 356],
        labelAnchor: "start",
      },
    ],
    [
      "messages",
      {
        points: [
          [160, 395],
          [250, 395],
        ],
        labelAt: [205, 387],
      },
    ],
  ],
);

const sideTall = { width: 140, height: 44 };
const platformTall = { width: 150, height: 34 };

const tall = layout<GroupId, NodeId, EdgeId>(
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
    [
      "sso",
      {
        points: [
          [195, 45],
          [155, 45],
        ],
        labelAt: [175, 37],
      },
    ],
    [
      "https",
      {
        points: [
          [140, 68],
          [140, 132],
        ],
        labelAt: [148, 92],
        labelAnchor: "start",
      },
    ],
    [
      "route",
      {
        points: [
          [140, 168],
          [140, 192],
        ],
      },
    ],
    [
      "signals",
      {
        points: [
          [90, 300],
          [90, 248],
        ],
        labelAt: [96, 284],
        labelAnchor: "start",
      },
    ],
    [
      "data",
      {
        points: [
          [270, 248],
          [270, 300],
        ],
        labelAt: [276, 284],
        labelAnchor: "start",
      },
    ],
    [
      "events",
      {
        points: [
          [180, 248],
          [180, 498],
        ],
        labelAt: [186, 492],
        labelAnchor: "start",
      },
    ],
    [
      "messages",
      {
        points: [
          [180, 580],
          [180, 548],
        ],
        labelAt: [188, 568],
        labelAnchor: "start",
      },
    ],
  ],
);

export const cybershield = defineDiagram({
  id: "cybershield",
  title: "CyberShield architecture",
  description:
    "Users sign in to a Vue 3 web app with Microsoft Entra ID single sign-on. Requests go over HTTPS through an NGINX ingress into CyberShield's ASP.NET Core services, which run on Kubernetes with a Helm chart per service and talk to each other over gRPC. Microsoft Sentinel and Defender send alerts, and an email listener reads support mailboxes through Microsoft Graph to create tickets. The services read and write Azure SQL, Cosmos DB, and a Cosmos DB graph, and exchange integration events over Azure Service Bus (RabbitMQ when running locally). Logic Apps also send messages through Service Bus. Images are pushed to Azure Container Registry and pulled automatically; secrets live in Key Vault, files in a Storage account, and notifications go out through Notification Hubs.",
  figure: "Fig. 3",
  name: "CyberShield, simplified",
  caption:
    "The 24/7 platform for Microsoft Defender and Sentinel incidents and support tickets that I architect and lead at Wizard AI.",
  traceLabel: "Trace a request",
  groups: groupContent,
  nodes: nodeContent,
  edges: edgeContent,
  layouts: { wide, tall },
  trace: [
    {
      edge: "sso",
      node: "identity",
      text: "The user signs in with Entra ID single sign-on.",
    },
    {
      edge: "https",
      node: "web",
      text: "The Vue 3 web app calls the API over HTTPS.",
    },
    {
      edge: "route",
      node: "ingress",
      text: "The NGINX ingress routes the call into the cluster.",
    },
    {
      edge: "events",
      node: "services",
      text: "The services handle it and publish an integration event to Service Bus.",
    },
  ],
  traceDone: {
    edge: "events",
    node: "bus",
    text: "The event lands on Service Bus, where other services pick it up. That is one request, end to end.",
  },
});
