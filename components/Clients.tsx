"use client";

import { withBase } from "@/lib/basePath";

// Client logos carried from real engagements + text marks for the rest.
const logos = [
  { src: "/clients/mitkat.png", alt: "MitKat" },
  { src: "/clients/lynoraai.png", alt: "Lynora AI" },
  { src: "/clients/marinepals.png", alt: "Marine Pals" },
  { src: "/clients/svce.png", alt: "SVCE" },
  { src: "/clients/kripaya.svg", alt: "Kripaya" },
];

const wordmarks = [
  "Vaan Megam",
  "Sensurair",
  "OnCofocus",
  "Astrikos",
  "Music Temple",
  "Playful Python",
  "Swayatt",
];

export function Clients() {
  const items = [...logos, ...wordmarks.map((w) => ({ text: w }))];
  const loop = [...items, ...items];

  return (
    <section className="relative overflow-hidden bg-paper py-16">
      <div className="shell mb-10 flex items-center justify-between border-b border-line pb-5">
        <p className="eyebrow">Trusted by teams shipping real products</p>
        <p className="eyebrow hidden md:block">Partners / Clients</p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />

        <div className="flex w-max animate-marquee items-center gap-16">
          {loop.map((item, i) => (
            <div
              key={i}
              className="flex h-12 shrink-0 items-center opacity-60 transition-opacity hover:opacity-100"
            >
              {"src" in item ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={withBase(item.src)}
                  alt={item.alt}
                  className="max-h-9 w-auto object-contain opacity-80 [filter:grayscale(1)_contrast(0)_brightness(0)]"
                />
              ) : (
                <span className="whitespace-nowrap font-display text-3xl font-semibold text-ink">
                  {item.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
