'use client';

import { Card } from "@/app/components/card";
import { ScrollCardReveal, ScrollTextReveal } from "@/app/components";
import { useCallback, useEffect, useRef, useState } from "react";

const RANGES = {
    label:    [0.02, 0.15],
    name:     [0.06, 0.14],
    tagline:  [0.10, 0.30],
} as const;

const toProgress = (scrollRatio: number, [start, end]: readonly [number, number]): number => {
    if (scrollRatio <= start) return 0;
    if (scrollRatio >= end) return 1;
    return (scrollRatio - start) / (end - start);
};

export const AboutHero = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [progresses, setProgresses] = useState({
        label: 0,
        name: 0,
        tagline: 0,
    });

    const update = useCallback(() => {
        const el = headerRef.current;
        if (!el) return;

        const viewportHeight = window.innerHeight;
        if (viewportHeight === 0) return;

        const scrollRatio = window.scrollY / viewportHeight;

        setProgresses({
            label: toProgress(scrollRatio, RANGES.label),
            name: toProgress(scrollRatio, RANGES.name),
            tagline: toProgress(scrollRatio, RANGES.tagline),
        });
    }, []);

    useEffect(() => {
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, [update]);

    return (
        <div className="flex flex-col w-full pb-[15dvh] lg:pb-0">
            <div ref={headerRef} className="mt-24 md:mt-[18.06dvh] ml-4 md:ml-[10.63dvw] margin-right">
                <p className="text-accent text-[0.55rem] lg:text-xl">
                    <ScrollTextReveal progress={progresses.label}>ABOUT ME</ScrollTextReveal>
                </p>
                <h2 className="mt-2 lg:mt-[4dvh]">
                    <ScrollTextReveal progress={progresses.name}>ADICK</ScrollTextReveal>{' '}
                    <ScrollTextReveal progress={progresses.name} className="text-accent">RINCONES</ScrollTextReveal>
                </h2>
                <p className="text-accent text-[0.55rem] lg:text-xl mt-2 lg:mt-[4dvh]">
                    <ScrollTextReveal progress={progresses.tagline}>LET'S BUILD SOMETHING THAT MATTERS</ScrollTextReveal>
                </p>
            </div>
            <div className="ml-4 md:ml-[6.67dvw] margin-right mt-2 lg:mt-[4dvh]">
                <ScrollCardReveal start="top 98%" end="top 70%">
                    <Card className="w-full h-auto lg:w-[50dvw] py-8 md:py-[4dvh]">
                        <p className="text-[0.65rem] md:text-[0.8rem] margin-left mr-[3.33dvw]">Hi, I'm Adick - a Software Engineer specializing in Backend Development & Cloud Solutions!</p>
                        <p className="text-[0.65rem] md:text-[0.8rem] mt-[4dvh] margin-left mr-[3.33dvw]">Full Stack Developer with 5+ years in Rust and React Native. Microservices, cross-platform applications, and systems for millions of users. Experience with event-driven architecture, Docker, and distributed observability.</p>
                    </Card>
                </ScrollCardReveal>
            </div>
        </div>
    );
}
