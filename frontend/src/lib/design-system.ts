/**
 * LearnFlow AI design system — programmatic tokens & class maps
 */

export const colors = {
  bg: "#030712",
  bgElevated: "#0a0f1a",
  fg: "#f4f4f5",
  fgMuted: "#a1a1aa",
  accent: "#6366f1",
  accentSecondary: "#8b5cf6",
} as const;

export const spacing = {
  sectionY: "py-24 sm:py-32",
  sectionX: "px-4 sm:px-6 lg:px-8",
  container: "mx-auto max-w-7xl",
  stackSm: "space-y-4",
  stackMd: "space-y-6",
  stackLg: "space-y-10",
} as const;

export const typography = {
  display:
    "text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[var(--lf-leading-tight)]",
  h1: "text-3xl font-bold tracking-tight sm:text-4xl",
  h2: "text-2xl font-bold sm:text-3xl",
  h3: "text-lg font-semibold",
  body: "text-base text-zinc-400 leading-relaxed",
  bodySm: "text-sm text-zinc-500 leading-relaxed",
  label: "text-xs font-medium uppercase tracking-widest text-violet-400",
  caption: "text-xs text-zinc-500",
} as const;

export const surfaces = {
  glass: "glass",
  panel: "glass rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/30",
  card: "glass glow-border rounded-2xl shadow-xl shadow-black/20",
  input:
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition focus:border-indigo-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
} as const;

export const buttons = {
  primary:
    "inline-flex items-center justify-center gap-2 font-medium bg-white text-zinc-950 hover:bg-zinc-100 shadow-[var(--lf-shadow-glow-white)]",
  secondary:
    "inline-flex items-center justify-center gap-2 font-medium glass text-white hover:bg-white/10 border-white/10",
  ghost:
    "inline-flex items-center justify-center gap-2 font-medium text-zinc-300 hover:text-white hover:bg-white/5",
} as const;
