"use client";

import { useEffect, useRef } from "react";

// Full-bleed animated network for the dark hero: drifting nodes that link up
// when close, red signals travelling along links, and a cursor that pulls
// nearby nodes in. Pauses off-screen; static frame for reduced motion.

type P = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { a: number; b: number; t: number; speed: number };

const LINK = 150; // px — max link distance
const MOUSE_R = 190;

export function NeuralField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let pts: P[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = true;
    let lastSpawn = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(150, Math.round((w * h) / 9500));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.8,
      }));
      pulses = [];
    }

    function spawnPulse() {
      for (let tries = 0; tries < 20; tries++) {
        const a = Math.floor(Math.random() * pts.length);
        let best = -1, bd = LINK;
        for (let j = 0; j < pts.length; j++) {
          if (j === a) continue;
          const d = Math.hypot(pts[a].x - pts[j].x, pts[a].y - pts[j].y);
          if (d < bd && d > 40) { bd = d; best = j; }
        }
        if (best >= 0) { pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.012 }); return; }
      }
    }

    function frame(now: number) {
      ctx.clearRect(0, 0, w, h);

      // move
      if (!reduce) {
        for (const p of pts) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_R && d > 1) { p.vx += (dx / d) * 0.012; p.vy += (dy / d) * 0.012; }
          p.vx *= 0.995; p.vy *= 0.995;
          const sp = Math.hypot(p.vx, p.vy);
          if (sp < 0.12) { p.vx += (Math.random() - 0.5) * 0.04; p.vy += (Math.random() - 0.5) * 0.04; }
          if (sp > 0.9) { p.vx *= 0.9; p.vy *= 0.9; }
          p.x += p.vx; p.y += p.vy;
          if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
        }
      }

      // links
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(237,234,227,${(1 - d / LINK) * 0.24})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // cursor links in accent
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE_R) {
          ctx.strokeStyle = `rgba(240,58,23,${(1 - dm / MOUSE_R) * 0.55})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }

      // nodes
      for (const p of pts) {
        ctx.fillStyle = "rgba(237,234,227,0.7)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }

      // pulses
      if (!reduce) {
        if (now - lastSpawn > 320 && pulses.length < 14) { spawnPulse(); lastSpawn = now; }
        pulses = pulses.filter((q) => q.t <= 1);
        for (const q of pulses) {
          q.t += q.speed;
          const a = pts[q.a], b = pts[q.b];
          const x = a.x + (b.x - a.x) * q.t, y = a.y + (b.y - a.y) * q.t;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
          g.addColorStop(0, "rgba(240,58,23,0.9)");
          g.addColorStop(1, "rgba(240,58,23,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#F03A17";
          ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
        }
      }

      if (running && !reduce) raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }

    resize();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting;
      if (vis && !running) { running = true; raf = requestAnimationFrame(frame); }
      if (!vis) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(canvas);
    const host = canvas.parentElement!;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />;
}
