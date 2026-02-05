'use client';

import gsap from "gsap";
import { ScrollTextReveal } from "@/app/components";
import { useCallback, useEffect, useRef, useState } from "react";

const RANGES = {
    label: [0.02, 0.15],
    title: [0.06, 0.14],
    subtitle: [0.10, 0.30],
} as const;

const toProgress = (scrollRatio: number, [start, end]: readonly [number, number]): number => {
    if (scrollRatio <= start) return 0;
    if (scrollRatio >= end) return 1;
    return (scrollRatio - start) / (end - start);
};

export const WorkHeader = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
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

    useEffect(() => {
        const targets = [
            labelRef.current,
            titleRef.current,
            subtitleRef.current,
        ].filter(Boolean);

        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo(
            targets,
            { opacity: 0, y: 30, filter: 'blur(6px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
            },
        );

        return () => { tl.kill(); };
    }, []);

    return (
        <div ref={headerRef} className="mt-24 md:mt-[18.06lvh] margin-left margin-right">
            <p ref={labelRef} className="opacity-0 text-accent text-[0.55rem] lg:text-xl text-right">
                <ScrollTextReveal progress={progresses.label}>WORK</ScrollTextReveal>
            </p>
            <h2 ref={titleRef} className="opacity-0 text-right mt-2 lg:mt-[4lvh]">
                <ScrollTextReveal progress={progresses.title}>PROJECT</ScrollTextReveal>{' '}
                <ScrollTextReveal progress={progresses.title} className="text-accent">HIGHLIGHT</ScrollTextReveal>
            </h2>
            <p ref={subtitleRef} className="opacity-0 text-accent text-[0.55rem] lg:text-xl text-right mt-2 lg:mt-[4lvh]">
                <ScrollTextReveal progress={progresses.subtitle}>THESE ARE A SELECTION OF MY WORK</ScrollTextReveal>
            </p>
        </div>
    );
};
