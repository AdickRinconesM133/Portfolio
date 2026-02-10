"use client";

import gsap from "gsap";
import { useEffect, useRef, type RefObject } from "react";
import { HERO_ENTRY } from "@/app/lib/animation";

export function useEntryTimeline(
  refs: RefObject<HTMLElement | null>[],
  isLoading: boolean,
): void {
  const refsRef = useRef(refs);

  useEffect(() => {
    refsRef.current = refs;
  });

  useEffect(() => {
    if (isLoading) return;

    const targets = refsRef.current.map((r) => r.current).filter(Boolean);
    if (targets.length === 0) return;

    const tl = gsap.timeline({ delay: HERO_ENTRY.delay });
    tl.fromTo(targets, HERO_ENTRY.from, HERO_ENTRY.to);

    return () => {
      tl.kill();
    };
  }, [isLoading]);
}
