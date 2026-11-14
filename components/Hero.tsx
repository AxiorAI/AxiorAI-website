"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { categories } from "@/data/projects";
import { MagneticButton } from "./MagneticButton";
import { NeuralField } from "./NeuralField";

const domains = categories.filter((c) => c !== "All");
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-bone">
      <NeuralField />

      {/* legibility: darken behind the copy, warm glow bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_50%,rgba(20,19,15,0.92)_0%,rgba(20,19,15,0.55)_45%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[38rem] w-[38rem] rounded-full bg-accent/20 blur-[140px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="shell relative flex min-h-[100svh] flex-col justify-between pb-10 pt-36">
        <div className="max-w-4xl">
          <h1 className="font-display text-[clamp(2.4rem,5.2vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tightest">
            <Line delay={0.15}>
              <span className="block">Intelligent</span>
            </Line>
            <Line delay={0.25}>
              <span className="block text-accent">systems,</span>
            </Line>
            <Line delay={0.35}>
              <span className="block font-serif font-normal italic lowercase">delivered.</span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-bone/70 md:text-xl"
          >
            We design and ship production-grade AI — agents, fine-tuned LLMs,
            retrieval and computer vision — for teams that refuse to guess.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#work" variant="invert">
              Explore the work →
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost-invert">
              Start a project
            </MagneticButton>
          </motion.div>
        </div>

        {/* bottom rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 flex flex-col gap-6 border-t border-line-invert pt-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
            <Proof value="Dozens" label="Projects shipped" />
            <Proof value={String(domains.length)} label="Industries" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-label text-bone/50">Shipping in</p>
              <DomainCycler />
            </div>
          </div>
          <a
            href="#domains"
            className="group hidden items-center gap-3 font-mono text-[11px] uppercase tracking-label text-bone/60 transition-colors hover:text-bone sm:flex"
          >
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-bone/20">
              <motion.span
                className="absolute left-0 top-0 block h-4 w-px bg-accent"
                animate={{ y: [-16, 40] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Proof({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-extrabold leading-none tracking-tight text-bone md:text-4xl">
        {value}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-label text-bone/50">{label}</p>
    </div>
  );
}

function DomainCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % domains.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative mt-2 block h-[2.1rem] min-w-[14rem] [clip-path:inset(0_-100vw)]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={domains[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="absolute left-0 top-0 inline-block whitespace-nowrap bg-accent px-3 py-1 font-display text-lg font-extrabold tracking-tight text-paper md:text-xl"
        >
          {domains[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}
