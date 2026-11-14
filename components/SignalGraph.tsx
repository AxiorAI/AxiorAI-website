"use client";

import { motion } from "framer-motion";

// A quiet, fine-line network diagram: inputs → reasoning → action, with
// accent signals travelling along the edges. Replaces the old spin badge.

const W = 420;
const H = 300;
const COLS = [40, 210, 380];
const layers = [
  [50, 115, 185, 250], // inputs
  [80, 150, 220], // reasoning
  [150], // action
];

type Node = { x: number; y: number; layer: number; i: number };
const nodes: Node[] = layers.flatMap((ys, layer) =>
  ys.map((y, i) => ({ x: COLS[layer], y, layer, i }))
);

const edges: [Node, Node][] = [];
for (const a of nodes) {
  for (const b of nodes) {
    if (b.layer === a.layer + 1) edges.push([a, b]);
  }
}

// Each signal runs input → hidden → output as one continuous path.
const routes = [
  [0, 0],
  [1, 1],
  [2, 1],
  [3, 2],
  [1, 0],
  [2, 2],
].map(([inI, hidI], k) => {
  const a = nodes.find((n) => n.layer === 0 && n.i === inI)!;
  const b = nodes.find((n) => n.layer === 1 && n.i === hidI)!;
  const c = nodes.find((n) => n.layer === 2)!;
  return { d: `M${a.x} ${a.y} L${b.x} ${b.y} L${c.x} ${c.y}`, delay: k * 0.55 };
});

const labels = ["Signal", "Reason", "Act"];

export function SignalGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-6 right-0 hidden w-[22rem] md:block lg:w-[26rem]"
      aria-hidden
    >
      <div className="mb-3 flex items-center justify-between border-b border-line pb-2 font-mono text-[10px] uppercase tracking-label text-smoke">
        <span>Fig. 01 — Agentic loop</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse bg-accent" />
          Live
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
        {/* edges draw in */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#14130F"
            strokeOpacity={0.16}
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.9 + i * 0.03, ease: "easeInOut" }}
          />
        ))}

        {/* travelling signals */}
        {routes.map((r, i) => (
          <g key={i}>
            <circle r={3} fill="#F03A17">
              <animateMotion
                dur="3.3s"
                begin={`${1.8 + r.delay}s`}
                repeatCount="indefinite"
                path={r.d}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.45 0 0.55 1"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.85;1"
                dur="3.3s"
                begin={`${1.8 + r.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* nodes */}
        {nodes.map((n, i) => {
          const out = n.layer === 2;
          const s = out ? 16 : 9;
          return (
            <motion.rect
              key={i}
              x={n.x - s / 2}
              y={n.y - s / 2}
              width={s}
              height={s}
              fill={out ? "#F03A17" : "#F2EFE7"}
              stroke="#14130F"
              strokeWidth={out ? 0 : 1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              transition={{ duration: 0.5, delay: 0.8 + n.layer * 0.25 + n.i * 0.06 }}
            />
          );
        })}

        {/* output halo */}
        <rect x={COLS[2] - 8} y={150 - 8} width={16} height={16} fill="none" stroke="#F03A17" strokeWidth={1}>
          <animate attributeName="x" values={`${COLS[2] - 8};${COLS[2] - 20}`} dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="y" values="142;130" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="width" values="16;40" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="height" values="16;40" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite" />
        </rect>
      </svg>

      <div className="mt-2 grid grid-cols-3 font-mono text-[10px] uppercase tracking-label text-ink">
        {labels.map((l, i) => (
          <span key={l} className={i === 0 ? "text-left" : i === 1 ? "text-center" : "text-right"}>
            <span className="text-smoke">0{i + 1} </span>
            {l}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
