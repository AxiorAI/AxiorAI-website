"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/projects";
import { selectDomain } from "@/lib/domainFilter";

const domains = categories.filter((c) => c !== "All");

function Row({ reverse = false, outlined = false }: { reverse?: boolean; outlined?: boolean }) {
  const loop = [...domains, ...domains];
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className={`flex w-max items-center gap-10 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } hover:[animation-play-state:paused]`}
      >
        {loop.map((d, i) => (
          <span key={i} className="flex items-center gap-10">
            <button
              type="button"
              onClick={() => selectDomain(d)}
              title={`See ${d} projects`}
              className={`group/domain cursor-pointer whitespace-nowrap font-display text-[clamp(2.5rem,7vw,6rem)] font-extrabold uppercase leading-none tracking-tightest transition-colors duration-300 ${
                (i + (outlined ? 1 : 0)) % 2 === 0
                  ? "text-ink hover:text-accent"
                  : "text-ink/15 hover:text-accent"
              }`}
            >
              {d}
            </button>
            <span className="inline-block animate-spin-slow text-[clamp(1.5rem,3vw,2.5rem)] text-accent">
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Domains() {
  return (
    <section id="domains" className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div className="shell mb-10 flex items-end justify-between border-b border-line pb-5">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Domains we&apos;ve shipped in
        </motion.p>
        <p className="eyebrow hidden md:block">({String(domains.length).padStart(2, "0")}) Industries</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="-rotate-2"
      >
        <Row />
      </motion.div>
    </section>
  );
}
