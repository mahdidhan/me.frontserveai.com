import { architecture, type DiagramEdge } from "@/data/architecture";

const NODE_HEIGHT = 60;
const NODE_STAGGER = 110;
const EDGE_START = 700;
const EDGE_STAGGER = 140;
const EDGE_DRAW = 600;

function arrowhead(points: DiagramEdge["points"]) {
  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
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

/**
 * Hero figure. Server-rendered SVG; the draw-in animation is pure CSS
 * (see .diagram-* in globals.css) and is skipped under reduced motion.
 */
export function ArchitectureDiagram() {
  const { nodes, edges, title } = architecture;

  return (
    <svg
      viewBox="0 0 560 380"
      role="img"
      aria-labelledby="diagram-title diagram-desc"
      className="h-auto w-full min-w-[30rem]"
    >
      <title id="diagram-title">{title}</title>
      <desc id="diagram-desc">
        A Vue.js web app signs users in with Microsoft Entra ID and calls
        ASP.NET Core incident microservices over HTTPS. Microsoft Sentinel
        sends alerts to the services, which publish events to Azure Service
        Bus and read and write data in Azure Cosmos DB.
      </desc>

      {edges.map((edge, i) => {
        const delay = EDGE_START + i * EDGE_STAGGER;
        return (
          <g key={edge.label}>
            <polyline
              points={edge.points.map((p) => p.join(",")).join(" ")}
              pathLength={1}
              fill="none"
              strokeWidth={1.25}
              className="diagram-edge stroke-graphite"
              style={{ "--delay": `${delay}ms` } as React.CSSProperties}
            />
            <g
              className="diagram-label"
              style={
                { "--delay": `${delay + EDGE_DRAW - 150}ms` } as React.CSSProperties
              }
            >
              <path d={arrowhead(edge.points)} className="fill-graphite" />
              <text
                x={edge.labelAt[0]}
                y={edge.labelAt[1]}
                textAnchor={edge.labelAnchor ?? "middle"}
                fontSize={12}
                className="fill-graphite"
              >
                {edge.label}
              </text>
            </g>
          </g>
        );
      })}

      {nodes.map((node, i) => {
        const x = node.cx - node.width / 2;
        const y = node.cy - NODE_HEIGHT / 2;
        return (
          <g
            key={node.id}
            className="diagram-node"
            style={{ "--delay": `${i * NODE_STAGGER}ms` } as React.CSSProperties}
          >
            <rect
              x={x}
              y={y}
              width={node.width}
              height={NODE_HEIGHT}
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
              y={node.cy - 4}
              textAnchor="middle"
              fontSize={14}
              fontWeight={600}
              className={node.emphasis ? "fill-cobalt-ink" : "fill-ink"}
            >
              {node.label}
            </text>
            <text
              x={node.cx}
              y={node.cy + 15}
              textAnchor="middle"
              fontSize={12}
              className={
                node.emphasis ? "fill-cobalt-ink opacity-85" : "fill-graphite"
              }
            >
              {node.detail}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
