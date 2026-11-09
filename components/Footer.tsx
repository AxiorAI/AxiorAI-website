const columns = [
  {
    heading: "Navigate",
    items: [
      { label: "Work", href: "#work" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Approach", href: "#approach" },
      { label: "Lab", href: "#lab" },
    ],
  },
  {
    heading: "Connect",
    items: [
      { label: "axiorai.s@gmail.com", href: "mailto:axiorai.s@gmail.com" },
      { label: "LinkedIn", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-paper">
      {/* Oversized wordmark band */}
      <div className="shell border-t-2 border-ink pt-10">
        <a
          href="#top"
          className="font-display text-[clamp(3rem,14vw,12rem)] font-extrabold leading-none tracking-tightest text-ink"
        >
          Axior
          <span className="text-accent">AI</span>
        </a>
      </div>

      <div className="shell grid gap-12 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <p className="max-w-xs text-sm leading-relaxed text-smoke">
          An applied-AI lab building adaptable, future-ready systems for
          businesses ready to move.
        </p>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="eyebrow">{col.heading}</p>
            <ul className="mt-5 space-y-3">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-underline text-sm text-ink/80 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="shell flex flex-col gap-2 border-t-2 border-ink py-6 text-xs text-smoke md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} AxiorAI. All rights reserved.</p>
        <p className="font-mono uppercase tracking-label">Innovation Delivered.</p>
      </div>
    </footer>
  );
}
