export type Service = {
  index: string;
  title: string;
  tagline: string;
};

// Primary AI practice — the core of what AxiorAI builds.
export const aiPillars: Service[] = [
  {
    index: "01",
    title: "Machine Learning",
    tagline: "Smarter decisions powered by real-world predictive data.",
  },
  {
    index: "02",
    title: "Deep Learning Neural Nets",
    tagline: "Neural networks that learn and evolve like humans.",
  },
  {
    index: "03",
    title: "Retrieval-Augmented Generation",
    tagline: "AI that retrieves and generates answers with precision.",
  },
  {
    index: "04",
    title: "Fine-Tuning LLMs",
    tagline: "Domain-tuned LLMs and AI apps. Precise. Scalable. Smart.",
  },
  {
    index: "05",
    title: "Agentic Architecture",
    tagline: "Autonomous AI that plans, reasons, and executes.",
  },
];

// Everything else we deliver — full-stack engineering around the AI core.
export const generalServices: string[] = [
  "Web Development",
  "App Development",
  "Cloud Solutions",
  "Cyber Security",
  "Automation",
  "Sensor Data Processing",
  "IT Management",
  "Consulting",
];
