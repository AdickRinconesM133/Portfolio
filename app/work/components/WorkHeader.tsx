'use client';

import { ScrollTextReveal } from "@/app/components";
import { useCallback, useEffect, useRef, useState } from "react";

const RANGES = {
    label:    [0.02, 0.15],
    title:    [0.06, 0.14],
    subtitle: [0.10, 0.30],
} as const;

const toProgress = (scrollRatio: number, [start, end]: readonly [number, number]): number => {
    if (scrollRatio <= start) return 0;
    if (scrollRatio >= end) return 1;
    return (scrollRatio - start) / (end - start);
};

export const WorkHeader = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [progresses, setProgresses] = useState({
        label: 0,
        title: 0,
        subtitle: 0,
    });

    const update = useCallback(() => {
        const el = headerRef.current;
        if (!el) return;

        const viewportHeight = window.innerHeight;
        if (viewportHeight === 0) return;

        const scrollRatio = window.scrollY / viewportHeight;

        setProgresses({
            label: toProgress(scrollRatio, RANGES.label),
            title: toProgress(scrollRatio, RANGES.title),
            subtitle: toProgress(scrollRatio, RANGES.subtitle),
        });
    }, []);

    useEffect(() => {
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, [update]);

    return (
        <div ref={headerRef} className="mt-24 md:mt-[18.06dvh] margin-left margin-right">
            <p className="text-accent text-[0.55rem] lg:text-xl text-right">
                <ScrollTextReveal progress={progresses.label}>WORK</ScrollTextReveal>
            </p>
            <h2 className="text-right mt-2 lg:mt-[4dvh]">
                <ScrollTextReveal progress={progresses.title}>PROJECT</ScrollTextReveal>{' '}
                <ScrollTextReveal progress={progresses.title} className="text-accent">HIGHLIGHT</ScrollTextReveal>
            </h2>
            <p className="text-accent text-[0.55rem] lg:text-xl text-right mt-2 lg:mt-[4dvh]">
                <ScrollTextReveal progress={progresses.subtitle}>THESE ARE A SELECTION OF MY WORK</ScrollTextReveal>
            </p>
        </div>
    );
};
