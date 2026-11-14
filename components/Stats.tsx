"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  display?: string; // static text overrides the count-up (keeps counts vague)
};

const stats: Stat[] = [
  { value: 0, suffix: "", label: "Projects delivered", display: "Dozens" },
  { value: 14, suffix: "", label: "Industries served" },
  { value: 12, suffix: "+", label: "Collaborators" },
  { value: 6, suffix: "", label: "Dedicated engineers" },
];

export function Stats() {
  return (
    <section className="spread-invert relative py-24 md:py-32">
      <div className="shell">
        <div className="flex items-center justify-between border-b border-line-invert pb-5">
          <span className="eyebrow text-bone/60">By the numbers</span>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2">
          {stats.map((s, i) => (
            <Counter key={s.label} index={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  label,
  display,
  index,
}: Stat & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView && !display) {
      const controls = animate(count, value, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [inView, value, count, display]);

  return (
    <div
      ref={ref}
      className={`flex items-baseline justify-between gap-6 border-b border-line-invert py-8 md:py-10 ${
        index % 2 === 1 ? "md:border-l md:border-line-invert md:pl-10" : ""
      }`}
    >
      <p className="max-w-[10rem] font-mono text-[11px] uppercase leading-relaxed tracking-label text-smoke">
        {label}
      </p>
      <div className="flex items-baseline font-display text-[clamp(3.5rem,11vw,9rem)] font-extrabold leading-none tracking-tightest text-bone">
        {display ? (
          <span>{display}</span>
        ) : (
          <>
            <motion.span>{rounded}</motion.span>
            <span className="text-accent">{suffix}</span>
          </>
        )}
      </div>
    </div>
  );
}
