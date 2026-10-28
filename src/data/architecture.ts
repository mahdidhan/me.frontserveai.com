/**
 * Simplified architecture of the Cyber Security Portal (see `projects` in
 * portfolio.ts), drawn as the hero figure. Coordinates are in the SVG's
 * 560 × 380 viewBox; nodes are 60px tall and positioned by their centre.
 */
export interface DiagramNode {
  id: string;
  label: string;
  detail: string;
  cx: number;
  cy: number;
  width: number;
  /** The one node drawn in the accent colour. */
  emphasis?: boolean;
}

export interface DiagramEdge {
  /** Polyline points; the arrowhead goes on the last one. */
  points: [number, number][];
  label: string;
  labelAt: [number, number];
  labelAnchor?: "start" | "middle" | "end";
}

export const architecture = {
  title: "Cyber Security Portal architecture",
  caption:
    "Figure 1. A simplified view of the Cyber Security Portal, an incident management platform I designed and led.",
  nodes: [
    {
      id: "services",
      label: "Incident services",
      detail: "ASP.NET Core microservices",
      cx: 280,
      cy: 190,
      width: 184,
      emphasis: true,
    },
    { id: "web", label: "Web app", detail: "Vue.js", cx: 280, cy: 50, width: 150 },
    {
      id: "sentinel",
      label: "Threat signals",
      detail: "Microsoft Sentinel",
      cx: 76,
      cy: 190,
      width: 150,
    },
    {
      id: "identity",
      label: "Identity",
      detail: "Microsoft Entra ID",
      cx: 484,
      cy: 50,
      width: 150,
    },
    {
      id: "bus",
      label: "Messaging",
      detail: "Azure Service Bus",
      cx: 280,
      cy: 330,
      width: 150,
    },
    {
      id: "data",
      label: "Data store",
      detail: "Azure Cosmos DB",
      cx: 484,
      cy: 330,
      width: 150,
    },
  ] satisfies DiagramNode[],
  edges: [
    {
      points: [
        [409, 50],
        [355, 50],
      ],
      label: "sign-in",
      labelAt: [382, 42],
    },
    {
      points: [
        [280, 80],
        [280, 160],
      ],
      label: "HTTPS",
      labelAt: [288, 124],
      labelAnchor: "start",
    },
    {
      points: [
        [151, 190],
        [188, 190],
      ],
      label: "alerts",
      labelAt: [169, 182],
    },
    {
      points: [
        [280, 220],
        [280, 300],
      ],
      label: "events",
      labelAt: [288, 264],
      labelAnchor: "start",
    },
    {
      points: [
        [372, 190],
        [484, 190],
        [484, 300],
      ],
      label: "read / write",
      labelAt: [428, 182],
    },
  ] satisfies DiagramEdge[],
};
