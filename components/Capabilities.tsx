"use client";

import { motion } from "framer-motion";
import { aiPillars, generalServices } from "@/data/services";
import { Reveal } from "./motion/Reveal";

export function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-paper py-24 md:py-36">
      <div className="shell">
        <div className="flex items-end justify-between border-b border-line pb-5">
          <span className="eyebrow">Capabilities / (02)</span>
          <span className="eyebrow hidden md:block">Five practice areas</span>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tightest text-ink">
              An AI core,
              <br />
              <span className="text-accent">full-stack</span> built.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-smoke md:pb-4">
              Five practice areas define how we think about intelligence. The
              rest is how we get it into production.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t-2 border-ink">
          {aiPillars.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <PillarRow index={s.index} title={s.title} tagline={s.tagline} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16">
            <p className="eyebrow">Also delivered</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {generalServices.map((g) => (
                <span
                  key={g}
                  className="font-display text-xl font-medium text-ink/70 transition-colors hover:text-accent md:text-2xl"
                >
                  {g}
                </span>
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
    <motion.div
      className="group grid grid-cols-[auto_1fr] items-center gap-5 border-b border-line py-6 md:grid-cols-[7rem_1.3fr_1fr] md:gap-8 md:py-7"
      whileHover={{ x: 12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="font-mono text-3xl font-light text-smoke transition-colors group-hover:text-accent md:text-5xl">
        {index}
      </span>
      <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink transition-colors group-hover:text-accent md:text-5xl">
        {title}
      </h3>
      <p className="col-span-2 text-sm leading-relaxed text-smoke md:col-span-1 md:pl-6">
        {tagline}
      </p>
    </motion.div>
  );
}
