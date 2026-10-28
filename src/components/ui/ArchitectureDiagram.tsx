import {
  architecture,
  type DiagramEdge,
  type LayoutName,
} from "@/data/architecture";
import { cn } from "@/lib/utils";

const GROUP_STAGGER = 80;
const NODE_START = 250;
const NODE_STAGGER = 55;
const EDGE_STAGGER = 120;
const EDGE_DRAW = 600;

type Point = [number, number];

function arrowhead([x1, y1]: Point, [x2, y2]: Point) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 7;
  const spread = Math.PI / 7;
  const a = [
    x2 - size * Math.cos(angle - spread),
    y2 - size * Math.sin(angle - spread),
  ];
  const b = [
    x2 - size * Math.cos(angle + spread),
    y2 - size * Math.sin(angle + spread),
  ];
  return `M${x2},${y2} L${a[0]},${a[1]} L${b[0]},${b[1]} Z`;
}

function arrowheads(edge: DiagramEdge) {
  const p = edge.points;
  const heads = [arrowhead(p[p.length - 2], p[p.length - 1])];
  if (edge.bidirectional) heads.push(arrowhead(p[1], p[0]));
  return heads;
}

function delayStyle(ms: number) {
  return { "--delay": `${ms}ms` } as React.CSSProperties;
}

/**
 * Hero figure. Server-rendered SVG; the draw-in animation is pure CSS
 * (see .diagram-* in globals.css) and is skipped under reduced motion.
 */
export function ArchitectureDiagram({
  layout,
  className,
}: {
  layout: LayoutName;
  className?: string;
}) {
  const { title, description } = architecture;
  const { groups, nodes, edges, viewBox } = architecture.layouts[layout];
  const edgeStart = NODE_START + nodes.length * NODE_STAGGER + 150;
  const titleId = `diagram-${layout}-title`;
  const descId = `diagram-${layout}-desc`;

  return (
    <svg
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={cn("h-auto w-full", className)}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{description}</desc>

      {groups.map((group, i) => (
        <g key={group.id} className="diagram-node" style={delayStyle(i * GROUP_STAGGER)}>
          <rect
            x={group.x}
            y={group.y}
            width={group.width}
            height={group.height}
            rx={8}
            fill="none"
            strokeWidth={1}
            strokeDasharray="4 4"
            className="stroke-graphite/60"
          />
          <text
            x={group.x + 10}
            y={group.y + 18}
            fontSize={12}
            fontWeight={600}
            className="fill-graphite"
          >
            {group.label}
          </text>
        </g>
      ))}

      {edges.map((edge, i) => {
        const delay = edgeStart + i * EDGE_STAGGER;
        return (
          <g key={edge.id}>
            <polyline
              points={edge.points.map((p) => p.join(",")).join(" ")}
              pathLength={1}
              fill="none"
              strokeWidth={1.25}
              className="diagram-edge stroke-graphite"
              style={delayStyle(delay)}
            />
            <g className="diagram-label" style={delayStyle(delay + EDGE_DRAW - 150)}>
              {arrowheads(edge).map((d) => (
                <path key={d} d={d} className="fill-graphite" />
              ))}
              {edge.label && edge.labelAt && (
                <text
                  x={edge.labelAt[0]}
                  y={edge.labelAt[1]}
                  textAnchor={edge.labelAnchor ?? "middle"}
                  fontSize={12}
                  strokeWidth={4}
                  paintOrder="stroke"
                  className="fill-graphite stroke-paper"
                >
                  {edge.label}
                </text>
              )}
            </g>
          </g>
        );
      })}

      {nodes.map((node, i) => {
        const x = node.cx - node.width / 2;
        const y = node.cy - node.height / 2;
        return (
          <g
            key={node.id}
            className="diagram-node"
            style={delayStyle(NODE_START + i * NODE_STAGGER)}
          >
            <rect
              x={x}
              y={y}
              width={node.width}
              height={node.height}
              rx={6}
              strokeWidth={1.25}
              className={
                node.emphasis
                  ? "fill-cobalt stroke-cobalt"
                  : "fill-paper-raised stroke-ink"
              }
            />
            <text
              x={node.cx}
              y={node.detail ? node.cy - 3 : node.cy + 4.5}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              className={node.emphasis ? "fill-cobalt-ink" : "fill-ink"}
            >
              {node.label}
            </text>
            {node.detail && (
              <text
                x={node.cx}
                y={node.cy + 14}
                textAnchor="middle"
                fontSize={11.5}
                className={
                  node.emphasis ? "fill-cobalt-ink opacity-85" : "fill-graphite"
                }
              >
                {node.detail}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
