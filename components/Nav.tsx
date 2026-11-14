"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setCondensed(v > 40);
  });

  // Solid ink bar once scrolled; transparent ink-on-paper at the very top.
  const onDark = condensed;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
        condensed ? "bg-ink" : "bg-transparent"
      }`}
    >
      <nav className="shell flex items-center justify-between py-4">
        <a
          href="#top"
          className={`group font-display text-2xl font-extrabold tracking-tight md:text-3xl ${
            onDark ? "text-paper" : "text-ink"
          }`}
        >
          Axior
          <span className="text-accent transition-colors group-hover:text-accent/80">
            AI
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`link-underline font-mono text-[13px] font-semibold uppercase tracking-label transition-colors hover:text-accent ${
                  onDark ? "text-bone" : "text-ink"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={`hidden border-2 px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-label transition-colors md:inline-flex ${
            onDark
              ? "border-bone text-bone hover:bg-accent hover:border-accent hover:text-paper"
              : "border-ink text-ink hover:bg-ink hover:text-paper"
          }`}
        >
          Start a project
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="relative z-[110] flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 transition-transform duration-300 ${
              open ? "translate-y-[4px] rotate-45 bg-paper" : onDark ? "bg-paper" : "bg-ink"
            }`}
          />
          <span
            className={`h-0.5 w-6 transition-transform duration-300 ${
              open ? "-translate-y-[4px] -rotate-45 bg-paper" : onDark ? "bg-paper" : "bg-ink"
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-ink md:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {links.map((l, i) => (
                <li key={l.href} className="border-t border-line-invert">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-3xl font-extrabold uppercase text-paper transition-colors hover:text-accent"
                  >
                    {l.label}
                    <span className="font-mono text-xs text-smoke">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
