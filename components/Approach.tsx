"use client";

import { Reveal } from "./motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Frame",
    body: "We start with the business problem, not the model. Scope, constraints, data reality, and the metric that actually matters.",
  },
  {
    n: "02",
    title: "Prototype",
    body: "Fast, honest prototypes. We de-risk the hardest part first — retrieval quality, model behaviour, or integration — before building around it.",
  },
  {
    n: "03",
    title: "Engineer",
    body: "Production-grade systems: evaluation harnesses, observability, permissions, and the plumbing that keeps intelligence reliable at scale.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "We ship into your stack and hand over cleanly — documented, monitored, and ready to grow with the business.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="relative bg-paper py-24 md:py-36">
      <div className="shell">
        <div className="flex items-end justify-between border-b border-line pb-5">
          <span className="eyebrow">How we work / (04)</span>
          <span className="eyebrow hidden md:block">Idea → Production</span>
        </div>

        <Reveal>
          <h2 className="mt-12 max-w-4xl font-display text-[clamp(2.25rem,7vw,6rem)] font-extrabold uppercase leading-[0.85] tracking-tightest text-ink">
            A deliberate path from idea to production.
          </h2>
        </Reveal>

        <div className="mt-20 flex flex-col">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="group relative grid grid-cols-1 items-start gap-4 border-t-2 border-ink py-8 md:grid-cols-[1fr_1.4fr] md:gap-10 md:py-10">
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-none tracking-tightest text-ink/[0.12] transition-colors duration-500 group-hover:text-accent/25">
                    {s.n}
                  </span>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-accent md:text-5xl">
                    {s.title}
                  </h3>
                </div>
                <p className="max-w-xl text-base leading-relaxed text-smoke md:pt-6">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
