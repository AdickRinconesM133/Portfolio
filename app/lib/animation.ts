import gsap from "gsap";
import { isValidElement, type ReactNode } from "react";

// ── Scroll helpers ──────────────────────────────────────────────────

export const toProgress = (
  scrollRatio: number,
  [start, end]: readonly [number, number],
): number => {
  if (scrollRatio <= start) return 0;
  if (scrollRatio >= end) return 1;
  return (scrollRatio - start) / (end - start);
};

export const applyGroupProgress = (elements: Element[], progress: number) => {
  const count = elements.length;
  if (count === 0) return;

  const wordRange = 1 / count;
  const overlap = wordRange * 0.3;

  elements.forEach((el, i) => {
    const start = i * wordRange;
    const end = Math.min(start + wordRange + overlap, 1);

    let p: number;
    if (progress <= start) p = 0;
    else if (progress >= end) p = 1;
    else p = (progress - start) / (end - start);

    gsap.set(el, {
      opacity: 1 - p,
      y: SCROLL_OUT.y * p,
      filter: `blur(${SCROLL_OUT.blur * p}px)`,
    });
  });
};

// ── Text extraction ─────────────────────────────────────────────────

export const getText = (node: ReactNode): string => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getText(node.props.children);
  }
  return "";
};

// ── Animation presets ───────────────────────────────────────────────

export const SCROLL_OUT = {
  y: -8,
  blur: 4,

  get hidden() {
    return { opacity: 0, y: this.y, filter: `blur(${this.blur}px)` };
  },
  get visible() {
    return { opacity: 1, y: 0, filter: "blur(0px)" };
  },
} as const;

export const HERO_ENTRY = {
  y: 30,
  blur: 6,
  duration: 0.8,
  stagger: 0.12,
  delay: 0.3,
  ease: "power3.out",

  get from() {
    return { opacity: 0, y: this.y, filter: `blur(${this.blur}px)` };
  },
  get to() {
    return {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: this.duration,
      stagger: this.stagger,
      ease: this.ease,
    };
  },
} as const;

export const CARD_ENTRY = {
  y: 100,
  blur: 10,

  get from() {
    return { opacity: 0, y: this.y, filter: `blur(${this.blur}px)` };
  },
  get to() {
    return { opacity: 1, y: 0, filter: "blur(0px)" };
  },
} as const;
