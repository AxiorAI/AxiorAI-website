"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

const ticker = [
  "Agentic architectures",
  "Fine-tuned LLMs",
  "Retrieval systems",
  "Cloud + web",
  "Sensor intelligence",
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-paper">
      <div className="shell flex min-h-[100svh] flex-col justify-between pt-28 pb-0">
        {/* Top metadata row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-start justify-between border-b border-line pb-5"
        >
          <span className="eyebrow">Applied-AI Lab</span>
          <span className="eyebrow hidden text-right sm:block">
            Est. 2026
            <br />
            Remote · India / EU
          </span>
          <span className="eyebrow text-right">N13.08 / E80.27</span>
        </motion.div>

        {/* Giant grid-breaking headline */}
        <div className="relative flex-1 py-10">
          <p className="absolute right-0 top-10 hidden max-w-[15rem] text-right font-mono text-[11px] leading-relaxed text-smoke md:block">
            [ Vol. 01 ] — We design and ship production-grade intelligence for
            teams that refuse to guess.
          </p>

          <h1 className="font-display font-extrabold uppercase text-ink display-clamp">
            <Line delay={0.05}>
              <span className="-ml-[0.04em] block whitespace-nowrap">
                Intelligent
              </span>
            </Line>
            <Line delay={0.15}>
              <span className="block text-accent">systems,</span>
            </Line>
            <Line delay={0.25}>
              <span className="block font-serif font-normal italic lowercase tracking-tightest">
                delivered.
              </span>
            </Line>
          </h1>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton href="#work">Explore the work</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Start a project
            </MagneticButton>
          </div>
          <p className="max-w-sm font-mono text-[11px] leading-relaxed text-smoke">
            Dozens of shipped projects across telecom, healthcare, marine,
            manufacturing, and fintech.
          </p>
        </motion.div>

        {/* Kinetic marquee strip */}
        <div className="relative mt-8 overflow-hidden border-y-2 border-ink py-3">
          <div className="flex w-max animate-marquee items-center gap-6">
            {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-6 font-mono text-[12px] uppercase tracking-label text-ink"
              >
                {t}
                <span className="text-accent">✳</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
