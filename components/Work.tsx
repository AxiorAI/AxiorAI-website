"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DOMAIN_FILTER_EVENT } from "@/lib/domainFilter";
import { categories, projects, type Project } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";
import { Reveal } from "./motion/Reveal";

export function Work() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Domain clicks elsewhere on the page (e.g. the Domains stripe) set the filter.
  useEffect(() => {
    function onFilter(e: Event) {
      const domain = (e as CustomEvent<string>).detail;
      if (categories.includes(domain)) setActive(domain);
    }
    window.addEventListener(DOMAIN_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(DOMAIN_FILTER_EVENT, onFilter);
  }, []);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative bg-paper py-24 md:py-36">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 border-b-2 border-ink pb-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Selected Work</p>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tightest text-ink">
              Ideas in.
              <br />
              <span className="text-accent">Impact</span> out.
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
        <div id="work-filter" className="mt-10 scroll-mt-28">
          <div className="mb-5 flex items-center gap-4">
            <span className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-label text-ink">
              <span className="inline-block animate-spin-slow text-accent">✳</span>
              Filter by domain
            </span>
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[12px] uppercase tracking-label text-smoke">
              Showing{" "}
              <motion.span
                key={filtered.length}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-block font-semibold text-accent"
              >
                {String(filtered.length).padStart(2, "0")}
              </motion.span>{" "}
              / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {categories.map((cat, i) => {
              const isActive = active === cat;
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActive(cat)}
                  initial={{ opacity: 0, y: 18, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden border-2 px-4 py-2.5 font-display text-base font-bold uppercase tracking-tight transition-colors duration-300 md:px-5 md:py-3 md:text-lg ${
                    isActive
                      ? "border-accent text-paper"
                      : "border-ink text-ink hover:text-paper"
                  }`}
                >
                  {/* hover fill sweeps up from the bottom */}
                  {!isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="work-filter-pill"
                      className="absolute inset-0 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-start gap-1.5">
                    {cat}
                    <sup
                      className={`font-mono text-[10px] font-medium ${
                        isActive ? "text-paper/80" : "text-accent group-hover:text-paper/70"
                      }`}
                    >
                      {String(count).padStart(2, "0")}
                    </sup>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

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
            style={{
              left: cursor.x + 28,
              // keep the 288×216 card inside the viewport
              top: Math.max(
                12,
                Math.min(
                  cursor.y - 110,
                  (typeof window !== "undefined" ? window.innerHeight : 900) - 228
                )
              ),
            }}
            className="pointer-events-none fixed z-[80] hidden aspect-[4/3] w-72 overflow-hidden border-2 border-ink lg:block"
          >
            <ProjectMedia project={hovered} />
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
              <ProjectMedia project={project} />
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
