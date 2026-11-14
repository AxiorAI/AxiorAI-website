"use client";

import { withBase } from "@/lib/basePath";

// Client logos carried from real engagements + text marks for the rest.
// `gray`: logos on a solid background — greyscale instead of a black
// silhouette, which would flatten them into a box.
const logos: { src: string; alt: string; gray?: boolean }[] = [
  { src: "/clients/mitkat.png", alt: "MitKat" },
  { src: "/clients/lynoraai.png", alt: "Lynora AI", gray: true },
  { src: "/clients/natyaai.png", alt: "Natya AI" },
  { src: "/clients/vaanmegam.svg", alt: "Vaan Megam" },
  { src: "/clients/marinepals.png", alt: "Marine Pals", gray: true },
  { src: "/clients/sensurair.png", alt: "Sensurair" },
  { src: "/clients/oncofocus.png", alt: "Oncofocus" },
  { src: "/clients/svce.png", alt: "SVCE" },
  { src: "/clients/astrikos.png", alt: "Astrikos" },
  { src: "/clients/kripaya.svg", alt: "Kripaya" },
  { src: "/clients/musictemple.png", alt: "Music Temple" },
  { src: "/clients/kidling.png", alt: "Kidling" },
  { src: "/clients/swayatt.png", alt: "Swayatt" },
];

// Clients without a usable logo yet — shown as text.
const wordmarks = ["Silverstripes"];

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
                  className={`max-h-10 max-w-[180px] w-auto object-contain opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100 hover:[filter:none] ${
                    item.gray
                      ? "[filter:grayscale(1)]"
                      : "[filter:grayscale(1)_contrast(0)_brightness(0)]"
                  }`}
                />
              ) : (
                <span className="whitespace-nowrap font-display text-3xl font-semibold text-ink transition-colors hover:text-accent">
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
