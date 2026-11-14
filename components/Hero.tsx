"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { categories } from "@/data/projects";
import { MagneticButton } from "./MagneticButton";
import { SignalGraph } from "./SignalGraph";

const domains = categories.filter((c) => c !== "All");

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-paper">
      <div className="shell flex min-h-[100svh] flex-col justify-between pt-28 pb-12">
        {/* Top metadata row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-start justify-between border-b border-line pb-5"
        >
          <span className="eyebrow">Applied-AI Lab</span>
          <span className="eyebrow flex items-center gap-2 text-right">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Innovation Delivered
          </span>
        </motion.div>

        {/* Giant grid-breaking headline */}
        <div className="relative flex-1 py-10">
          <SignalGraph />
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
          <div className="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-label text-smoke">
            Dozens of shipped projects in
            <DomainCycler />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function DomainCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % domains.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative mt-2 block h-[2.4rem] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={domains[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 inline-block bg-accent px-3 py-1 font-display text-2xl font-extrabold normal-case tracking-tight text-paper"
        >
          {domains[i]}
        </motion.span>
      </AnimatePresence>
    </span>
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
