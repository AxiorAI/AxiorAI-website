"use client";

import { Reveal } from "./motion/Reveal";

export function Manifesto() {
  return (
    <section id="lab" className="spread-invert relative overflow-hidden py-24 md:py-36">
      <div className="shell">
        <div className="flex items-center justify-between border-b border-line-invert pb-5">
          <span className="eyebrow text-bone/60">The Lab</span>
          <span className="eyebrow text-bone/60">(01)</span>
        </div>

        <Reveal>
          <h2 className="mt-14 max-w-[18ch] font-serif text-[clamp(2.25rem,7vw,6.5rem)] font-normal leading-[0.98] tracking-tightest text-bone">
            Intelligence should be engineered, not improvised — software that
            drives <span className="text-accent">real value</span>, not novelty.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-line-invert pt-10 md:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <p className="font-mono text-[11px] uppercase leading-relaxed tracking-label text-smoke">
              AxiorAI / Belief
              <br />
              Designed with intent
              <br />
              Shipped with rigor
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-lg leading-relaxed text-bone/70 md:text-xl">
              We specialise in AI — machine learning, deep learning, retrieval,
              fine-tuned LLMs, and agentic systems — but we ship the whole stack
              around it: cloud, web, mobile, security, and sensor intelligence.
              Robust, scalable, and built to grow with you.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Oversized bleed numeral for editorial weight */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 bottom-0 select-none font-display text-[28vw] font-extrabold leading-none text-bone/[0.04]"
      >
        AI
      </span>
    </section>
  );
}
