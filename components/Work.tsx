"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { categories, projects, type Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./motion/Reveal";

export function Work() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative bg-paper py-24 md:py-36">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 border-b-2 border-ink pb-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Selected Work / (03)</p>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tightest text-ink">
              Many projects.
              <br />
              One <span className="text-accent">standard</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-smoke">
              A cross-section of what we&apos;ve shipped — from 5G assistants to
              maritime onboarding and air-quality forecasting.
            </p>
          </Reveal>
        </div>

        {/* Filter row */}
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-mono text-[11px] uppercase tracking-label transition-colors ${
                  active === cat
                    ? "text-accent"
                    : "text-smoke hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Editorial index table */}
        <motion.div
          layout
          className="mt-10"
          onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.button
                layout
                key={p.title}
                onClick={() => setSelected(p)}
                onMouseEnter={() => setHovered(p)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-line py-5 text-left md:grid-cols-[4rem_1.4fr_1fr_5rem] md:gap-8 md:py-7"
              >
                <span className="font-mono text-xs text-smoke transition-colors group-hover:text-accent md:text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent md:text-4xl">
                  {p.title}
                </h3>
                <span className="hidden font-mono text-[11px] uppercase tracking-label text-smoke md:block">
                  {p.category}
                </span>
                <span className="text-right font-mono text-[11px] text-smoke md:text-sm">
                  {p.year}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cursor-following coded preview (desktop only) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ left: cursor.x + 28, top: cursor.y - 110 }}
            className="pointer-events-none fixed z-[80] hidden aspect-[4/3] w-72 overflow-hidden border-2 border-ink lg:block"
          >
            <ProjectVisual seed={hovered.title} label={hovered.category} />
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center p-0 md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid max-h-[92svh] w-full max-w-4xl overflow-hidden border-2 border-ink bg-paper md:grid-cols-2"
          >
            <div className="relative hidden min-h-[280px] border-r-2 border-ink md:block">
              <ProjectVisual seed={project.title} label={project.category} />
            </div>

            <div className="flex flex-col overflow-y-auto p-8 md:p-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="eyebrow">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-ink">
                    {project.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-accent hover:border-accent hover:text-paper"
                >
                  ✕
                </button>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-ink/80">
                {project.desc}
              </p>

              <div className="mt-8">
                <p className="eyebrow">Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="border border-ink px-3 py-1.5 font-mono text-[11px] text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 self-start font-mono text-[12px] uppercase tracking-label text-accent transition-colors hover:text-ink"
                >
                  Visit project ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
