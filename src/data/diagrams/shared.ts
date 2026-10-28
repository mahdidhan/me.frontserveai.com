/**
 * Shared shape for the architecture figures. Content (labels, notes) is
 * defined once per diagram; each layout only supplies geometry in its own
 * viewBox. Groups are dashed zones; nodes are positioned by their centre.
 *
 * - `wide`: used from the `sm` breakpoint up.
 * - `tall`: used on phones, so the figure fits without horizontal scroll.
 */

export type Point = [number, number];
export type LayoutName = "wide" | "tall";

export interface GroupContent {
  label: string;
}

export interface NodeContent {
  label: string;
  detail?: string;
  /** What it does, shown when the node is selected. Facts only. */
  note: string;
  /** Short category shown above the note. */
  kind: string;
  /** The one node drawn in the accent colour. */
  emphasis?: boolean;
}

export interface EdgeContent<N extends string = string> {
  label?: string;
  /** Node ids at the tail and head; drives the hover highlighting. */
  from: N[];
  to: N[];
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

type Box = { x: number; y: number; width: number; height: number };
type Placement = { cx: number; cy: number; width: number; height: number };
type Route = Omit<DiagramEdge, "id" | keyof EdgeContent>;

interface LayoutSpec<G, N, E> {
  viewBox: DiagramLayout["viewBox"];
  groups: [G, Box][];
  nodes: [N, Placement][];
  edges: [E, Route][];
}

/** Geometry for one layout, listed in draw-in order. */
export function layout<G extends string, N extends string, E extends string>(
  viewBox: DiagramLayout["viewBox"],
  groups: [G, Box][],
  nodes: [N, Placement][],
  edges: [E, Route][],
): LayoutSpec<G, N, E> {
  return { viewBox, groups, nodes, edges };
}

export interface TraceStep {
  edge: string;
  /** The node the step's text describes. */
  node: string;
  text: string;
}

/** Everything the client-side explorer needs; no geometry. */
export interface ExplorerData {
  /** e.g. "Fig. 1" */
  figure: string;
  /** Short name after the figure number, e.g. "FrontServe AI, simplified". */
  name: string;
  caption: string;
  /** Button label, e.g. "Trace an order". */
  traceLabel: string;
  nodes: Record<string, NodeContent>;
  neighbors: Record<string, string[]>;
  edgeEnds: Record<string, string[]>;
  trace: TraceStep[];
  /** Shown after the last step. */
  traceDone: TraceStep;
}

export interface Diagram {
  id: string;
  /** Accessible title and prose description of the whole figure. */
  title: string;
  description: string;
  layouts: Record<LayoutName, DiagramLayout>;
  explorer: ExplorerData;
}

interface DiagramSpec<G extends string, N extends string, E extends string> {
  id: string;
  title: string;
  description: string;
  figure: string;
  name: string;
  caption: string;
  traceLabel: string;
  groups: Record<G, GroupContent>;
  nodes: Record<N, NodeContent>;
  edges: Record<E, EdgeContent<N>>;
  layouts: Record<LayoutName, LayoutSpec<G, N, E>>;
  trace: { edge: E; node: N; text: string }[];
  traceDone: { edge: E; node: N; text: string };
}

/**
 * Join content with each layout's geometry, and derive the explorer's
 * adjacency. Throws at build time if a node is missing from a layout.
 */
export function defineDiagram<
  G extends string,
  N extends string,
  E extends string,
>(spec: DiagramSpec<G, N, E>): Diagram {
  const layouts = {} as Record<LayoutName, DiagramLayout>;
  for (const name of ["wide", "tall"] as const) {
    const geo = spec.layouts[name];
    const placed = new Set(geo.nodes.map(([id]) => id));
    const missing = (Object.keys(spec.nodes) as N[]).filter(
      (id) => !placed.has(id),
    );
    if (missing.length)
      throw new Error(
        `Diagram "${spec.id}", ${name} layout: no position for ${missing.join(", ")}`,
      );
    layouts[name] = {
      viewBox: geo.viewBox,
      groups: geo.groups.map(([id, box]) => ({
        id,
        ...spec.groups[id],
        ...box,
      })),
      nodes: geo.nodes.map(([id, place]) => ({
        id,
        ...spec.nodes[id],
        ...place,
      })),
      edges: geo.edges.map(([id, route]) => ({
        id,
        ...spec.edges[id],
        ...route,
      })),
    };
  }

  const neighbors: Record<string, Set<string>> = {};
  const link = (a: string, b: string) => (neighbors[a] ??= new Set()).add(b);
  for (const edge of Object.values(spec.edges) as EdgeContent<N>[]) {
    for (const a of edge.from)
      for (const b of edge.to) {
        link(a, b);
        link(b, a);
      }
  }

  return {
    id: spec.id,
    title: spec.title,
    description: spec.description,
    layouts,
    explorer: {
      figure: spec.figure,
      name: spec.name,
      caption: spec.caption,
      traceLabel: spec.traceLabel,
      nodes: spec.nodes,
      neighbors: Object.fromEntries(
        Object.entries(neighbors).map(([id, set]) => [id, [...set]]),
      ),
      edgeEnds: Object.fromEntries(
        (Object.entries(spec.edges) as [E, EdgeContent<N>][]).map(
          ([id, edge]) => [id, [...edge.from, ...edge.to]],
        ),
      ),
      trace: spec.trace,
      traceDone: spec.traceDone,
    },
  };
}
