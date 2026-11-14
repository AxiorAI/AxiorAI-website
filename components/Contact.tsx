"use client";

import { useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./motion/Reveal";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry — ${form.name || "AxiorAI"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:axiorai.s@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="spread-invert relative overflow-hidden py-24 md:py-36">
      <div className="shell">
        <div className="flex items-center justify-between border-b border-line-invert pb-5">
          <span className="eyebrow text-bone/60">Contact</span>
          <span className="eyebrow text-bone/60">axiorai.s@gmail.com</span>
        </div>

        <div className="mt-14 grid gap-16 md:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <h2 className="font-display font-extrabold uppercase leading-[0.82] tracking-tightest text-bone display-clamp-lg">
                Let&apos;s build
                <br />
                something
                <br />
                <span className="font-serif font-normal italic lowercase text-accent">
                  intelligent.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <ContactItem
                  label="Email"
                  value="axiorai.s@gmail.com"
                  href="mailto:axiorai.s@gmail.com"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Field
                label="Your name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <div className="flex flex-col gap-2">
                <label className="eyebrow text-bone/60">
                  Tell us about the project
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="resize-none border-b border-line-invert bg-transparent py-3 text-lg text-bone outline-none transition-colors placeholder:text-smoke/60 focus:border-accent"
                  placeholder="What are you trying to build?"
                />
              </div>
              <div className="mt-2">
                <MagneticButton variant="invert">Send enquiry →</MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="font-display text-xl font-semibold text-bone transition-colors group-hover:text-accent">
      {value}
    </span>
  );
  return (
    <div className="group">
      <p className="eyebrow text-bone/60">{label}</p>
      <div className="mt-3">
        {href ? (
          <a href={href} className="link-underline">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="eyebrow text-bone/60">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-line-invert bg-transparent py-3 text-lg text-bone outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
