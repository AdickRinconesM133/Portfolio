"use client";

import { useEffect, useState, type RefObject } from "react";
import { toProgress } from "@/app/lib/animation";

const DIVISOR = {
  ELEMENT: "element",
  VIEWPORT: "viewport",
} as const;

type Divisor = (typeof DIVISOR)[keyof typeof DIVISOR];

interface UseScrollProgressOptions {
  divisor: Divisor;
}

export function useScrollProgress<
  T extends Record<string, readonly [number, number]>,
>(
  ref: RefObject<HTMLElement | null>,
  ranges: T,
  options: UseScrollProgressOptions,
): { [K in keyof T]: number } {
  type Progresses = { [K in keyof T]: number };

  const initial = () => {
    const result = {} as Progresses;
    for (const key in ranges) {
      (result as Record<string, number>)[key] = 0;
    }
    return result;
  };

  const [progresses, setProgresses] = useState<Progresses>(initial);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;

      const divisor =
        options.divisor === DIVISOR.ELEMENT
          ? el.offsetHeight
          : window.innerHeight;

      if (divisor === 0) return;

      const scrollRatio = window.scrollY / divisor;

      const next = {} as Progresses;
      for (const key in ranges) {
        (next as Record<string, number>)[key] = toProgress(
          scrollRatio,
          ranges[key],
        );
      }

      setProgresses(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ref, ranges, options.divisor]);

  return progresses;
}
