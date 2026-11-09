import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Archivo, JetBrains_Mono } from "next/font/google";
import { withBase } from "@/lib/basePath";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AxiorAI — Intelligent Systems, Delivered.",
  description:
    "AxiorAI is an applied-AI lab building adaptable, future-ready systems — from agentic architectures and fine-tuned LLMs to cloud, web, and sensor intelligence.",
  metadataBase: new URL("https://axiorai.com"),
  openGraph: {
    title: "AxiorAI — Intelligent Systems, Delivered.",
    description:
      "Applied-AI lab building agentic systems, fine-tuned LLMs, and future-ready software.",
    type: "website",
    siteName: "AxiorAI",
  },
  icons: {
    icon: withBase("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
