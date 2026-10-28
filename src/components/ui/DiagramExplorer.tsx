"use client";

import type { ExplorerData } from "@/data/diagrams";
import { ChevronLeft, ChevronRight, Route } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PULSE_MS = 650;
const STEP_MS = 900;

interface Highlight {
  nodes: string[];
  edges: string[];
  selected: string;
}

function highlightFor(data: ExplorerData, node: string): Highlight {
  return {
    nodes: [node, ...(data.neighbors[node] ?? [])],
    edges: Object.keys(data.edgeEnds).filter((edge) =>
      data.edgeEnds[edge].includes(node),
    ),
    selected: node,
  };
}

/** The diagram currently on screen (wide or tall). */
function visibleSvg(board: HTMLElement) {
  return [...board.querySelectorAll("svg")].find(
    (svg) => svg.getClientRects().length > 0,
  );
}

/** Move a dot along one edge of the visible diagram. */
function pulse(board: HTMLElement, edge: string) {
  return new Promise<void>((resolve) => {
    const svg = visibleSvg(board);
    const line = svg?.querySelector<SVGPolylineElement>(
      `[data-edge="${edge}"] polyline`,
    );
    if (!svg || !line) return resolve();

    const points = [...line.points].map((p) => [p.x, p.y] as const);
    const lengths = points
      .slice(1)
      .map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]));
    const total = lengths.reduce((a, b) => a + b, 0);

    const dot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    dot.setAttribute("r", "5");
    dot.setAttribute("class", "fill-cobalt");
    svg.append(dot);

    const start = performance.now();
    const step = (now: number) => {
      let travelled = Math.min(1, (now - start) / PULSE_MS) * total;
      let i = 0;
      while (i < lengths.length - 1 && travelled > lengths[i]) {
        travelled -= lengths[i];
        i++;
      }
      const k = lengths[i] ? travelled / lengths[i] : 1;
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      dot.setAttribute("cx", String(x1 + (x2 - x1) * k));
      dot.setAttribute("cy", String(y1 + (y2 - y1) * k));
      if (now - start < PULSE_MS) requestAnimationFrame(step);
      else {
        dot.remove();
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Makes the server-rendered ArchitectureDiagram explorable: hover or tap a
 * node to see what it does and what it touches, step through nodes with the
 * arrow buttons, or trace one path through the system.
 */
export function DiagramExplorer({
  data,
  children,
}: {
  data: ExplorerData;
  children: React.ReactNode;
}) {
  const traceSteps = data.trace;
  const nodeOrder = Object.keys(data.nodes);
  const boardRef = useRef<HTMLDivElement>(null);
  const tracing = useRef(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  /** Index into traceSteps, traceSteps.length for the final message, or null. */
  const [traceStep, setTraceStep] = useState<number | null>(null);

  const trace =
    traceStep === null ? null : (traceSteps[traceStep] ?? data.traceDone);
  const focusNode = trace ? null : (hovered ?? selected);

  let highlight: Highlight | null = null;
  if (trace) {
    highlight = {
      nodes: data.edgeEnds[trace.edge],
      edges: [trace.edge],
      selected: trace.node,
    };
  } else if (focusNode) {
    highlight = highlightFor(data, focusNode);
  }

  // Mark the SVG elements. The SVG is server-rendered, so this is done on
  // the DOM rather than by re-rendering it.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    board.querySelectorAll<SVGElement>("[data-node]").forEach((el) => {
      const id = el.dataset.node!;
      el.toggleAttribute("data-hot", !!highlight?.nodes.includes(id));
      el.toggleAttribute("data-selected", highlight?.selected === id);
    });
    board.querySelectorAll<SVGElement>("[data-edge]").forEach((el) => {
      el.toggleAttribute(
        "data-hot",
        !!highlight?.edges.includes(el.dataset.edge!),
      );
    });
  });

  useEffect(
    () => () => {
      tracing.current = false;
    },
    [],
  );

  const nodeAt = (target: EventTarget) =>
    (target as Element).closest<SVGElement>("[data-node]")?.dataset.node ??
    null;

  const step = (delta: number) => {
    const current = selected ?? hovered;
    const i = current ? nodeOrder.indexOf(current) : -1;
    const next =
      i === -1 && delta < 0
        ? nodeOrder.length - 1
        : (i + delta + nodeOrder.length) % nodeOrder.length;
    setSelected(nodeOrder[next]);
  };

  const runTrace = async () => {
    const board = boardRef.current;
    if (!board || tracing.current) return;
    tracing.current = true;
    setSelected(null);
    setHovered(null);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    for (let i = 0; i < traceSteps.length; i++) {
      if (!tracing.current) return;
      setTraceStep(i);
      await (reduce ? wait(STEP_MS) : pulse(board, traceSteps[i].edge));
    }
    if (!tracing.current) return;
    setTraceStep(traceSteps.length);
    await wait(2400);
    if (!tracing.current) return;
    setTraceStep(null);
    tracing.current = false;
  };

  const shownNode = trace?.node ?? focusNode;
  const node = shownNode ? data.nodes[shownNode] : null;
  const neighbours = focusNode
    ? (data.neighbors[focusNode] ?? []).map((id) => data.nodes[id].label)
    : [];

  return (
    <figure className="min-w-0">
      <div className="dot-grid rounded-lg border border-rule bg-paper-raised px-3 py-4 sm:px-5 sm:py-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-graphite">
          <span>
            <span className="font-semibold text-ink">{data.figure}</span>{" "}
            {data.name}
          </span>
          <button
            type="button"
            onClick={runTrace}
            disabled={traceStep !== null}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-rule bg-paper-raised px-3 text-sm text-ink transition-colors duration-150 hover:border-ink disabled:opacity-60"
          >
            <Route className="h-3.5 w-3.5" aria-hidden />
            {data.traceLabel}
          </button>
        </div>
        <div
          ref={boardRef}
          className="diagram-explorer"
          data-focus={highlight ? "" : undefined}
          onPointerOver={(e) => {
            if (e.pointerType === "mouse") setHovered(nodeAt(e.target));
          }}
          onPointerLeave={() => setHovered(null)}
          onClick={(e) => {
            const id = nodeAt(e.target);
            setSelected((current) => (id === current ? null : id));
          }}
        >
          {children}
        </div>
      </div>

      <div className="mt-3 grid min-h-[7.5rem] grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-md border border-l-2 border-rule border-l-cobalt bg-paper-raised px-4 py-3">
        <div aria-live="polite">
          {trace ? (
            <>
              <p className="text-sm text-graphite">
                Trace, step {Math.min(traceStep! + 1, traceSteps.length)} of{" "}
                {traceSteps.length}
              </p>
              <p className="font-semibold">{node?.label}</p>
              <p className="text-sm text-graphite">{trace.text}</p>
            </>
          ) : node ? (
            <>
              <p className="text-sm text-graphite">{node.kind}</p>
              <p className="font-semibold">
                {node.label}
                {node.detail && (
                  <span className="font-normal text-graphite">
                    , {node.detail}
                  </span>
                )}
              </p>
              <p className="text-sm text-graphite">
                {node.note}
                {neighbours.length > 0 &&
                  ` Connects to ${neighbours.join(", ")}.`}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-graphite">Explore</p>
              <p className="font-semibold">Select any part of the system</p>
              <p className="text-sm text-graphite">
                Hover over or tap a box, or use the arrows, to see what each
                part does and what it connects to.
              </p>
            </>
          )}
        </div>
        <div className="flex items-start gap-1">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous part of the system"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-rule transition-colors duration-150 hover:border-ink"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next part of the system"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-rule transition-colors duration-150 hover:border-ink"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
      <figcaption className="mt-3 max-w-[60ch] text-sm text-graphite">
        {data.caption}
      </figcaption>
    </figure>
  );
}
