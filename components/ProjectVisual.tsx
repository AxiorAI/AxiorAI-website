// Flat risograph-style coded tile. Deterministic from `seed`. Uses only the
// editorial palette (paper / ink / accent) — no radial glows, one coded
// language shared across every project.

const PAPER = "#F2EFE7";
const INK = "#14130F";
const ACCENT = "#F03A17";

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function ProjectVisual({
  seed,
  label,
  index,
}: {
  seed: string;
  label: string;
  index?: string;
}) {
  const h = hash(seed);
  const variant = h % 4;
  const initials = seed
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Halftone dot field id (unique per seed to avoid collisions).
  const dotId = `dots-${h % 100000}`;

  const bg = variant === 1 ? ACCENT : variant === 2 ? INK : PAPER;
  const fg = variant === 1 ? PAPER : variant === 2 ? PAPER : INK;
  const pop = variant === 2 ? ACCENT : variant === 1 ? INK : ACCENT;

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${seed} — ${label}`}
    >
      <defs>
        <pattern id={dotId} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill={fg} opacity="0.22" />
        </pattern>
      </defs>

      <rect width="400" height="300" fill={bg} />

      {variant === 0 && (
        <>
          <rect x="0" y="0" width="400" height="300" fill={`url(#${dotId})`} />
          <circle cx="300" cy="90" r="70" fill={pop} />
          <rect x="24" y="200" width="150" height="14" fill={fg} />
        </>
      )}
      {variant === 1 && (
        <>
          <rect x="0" y="180" width="400" height="120" fill={`url(#${dotId})`} />
          <rect x="40" y="40" width="120" height="120" fill={fg} />
          <rect x="180" y="40" width="120" height="120" fill={pop} />
        </>
      )}
      {variant === 2 && (
        <>
          <rect x="0" y="0" width="400" height="300" fill={`url(#${dotId})`} />
          <path d="M0 300 L200 60 L400 300 Z" fill={pop} />
        </>
      )}
      {variant === 3 && (
        <>
          <circle cx="200" cy="150" r="110" fill={pop} />
          <rect x="0" y="0" width="400" height="300" fill={`url(#${dotId})`} />
        </>
      )}

      <text
        x="24"
        y="70"
        fill={fg}
        fontFamily="var(--font-display), sans-serif"
        fontSize="88"
        fontWeight="800"
        letterSpacing="-4"
      >
        {initials}
      </text>

      <text
        x="24"
        y="278"
        fill={fg}
        fontFamily="var(--font-mono), monospace"
        fontSize="13"
        letterSpacing="2"
        style={{ textTransform: "uppercase" }}
      >
        {label}
      </text>

      {index && (
        <text
          x="376"
          y="278"
          textAnchor="end"
          fill={fg}
          fontFamily="var(--font-mono), monospace"
          fontSize="13"
          letterSpacing="2"
        >
          {index}
        </text>
      )}
    </svg>
  );
}
