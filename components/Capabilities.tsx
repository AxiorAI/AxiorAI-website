"use client";

import { motion } from "framer-motion";
import { aiPillars, generalServices } from "@/data/services";
import { Reveal } from "./motion/Reveal";

export function Capabilities() {
  return (
    <section id="capabilities" className="spread-invert relative overflow-hidden py-24 md:py-36">
      <div className="shell">
        <div className="flex items-end justify-between border-b border-line-invert pb-5">
          <span className="eyebrow text-bone/60">Capabilities</span>
          <span className="eyebrow hidden text-bone/60 md:block">Five practice areas</span>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tightest text-bone">
              An AI core,
              <br />
              <span className="bg-[linear-gradient(90deg,#F03A17,#FF9A6B,#F03A17)] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">full-stack</span> built.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone/60 md:pb-4">
              Five practice areas define how we think about intelligence. The
              rest is how we get it into production.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t-2 border-bone">
          {aiPillars.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <PillarRow index={s.index} title={s.title} tagline={s.tagline} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16">
            <p className="eyebrow text-bone/60">Also delivered</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {generalServices.map((g, i) => (
                <motion.span
                  key={g}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="cursor-default border border-line-invert px-4 py-2 font-display text-lg font-medium text-bone/80 transition-colors hover:border-accent hover:bg-accent hover:text-paper md:text-xl"
                >
                  {g}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PillarRow({
  index,
  title,
  tagline,
}: {
  index: string;
  title: string;
  tagline: string;
}) {
  return (
    <div className="group relative overflow-hidden border-b border-line-invert">
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
      <div className="relative grid grid-cols-[auto_1fr] items-center gap-5 px-2 py-6 transition-transform duration-500 group-hover:translate-x-3 md:grid-cols-[7rem_1.3fr_1fr] md:gap-8 md:py-7">
        <span className="font-mono text-3xl font-light text-smoke transition-colors group-hover:text-paper md:text-5xl">
          {index}
        </span>
        <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-bone transition-colors group-hover:text-ink md:text-5xl">
          {title}
        </h3>
        <p className="col-span-2 flex items-center justify-between gap-4 text-sm leading-relaxed text-bone/60 transition-colors group-hover:text-ink md:col-span-1 md:pl-6">
          {tagline}
          <span className="hidden -translate-x-4 text-2xl opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:inline">
            →
          </span>
        </p>
      </div>
    </div>
  );
}
