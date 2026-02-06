'use client';

import { useRef } from "react";
import { ScrollTextReveal } from "@/app/components";
import { useLoading } from "@/app/context/LoadingContext";
import { useScrollProgress, useEntryTimeline } from "@/app/hooks";

const RANGES = {
    label: [0.02, 0.15],
    title: [0.06, 0.14],
    subtitle: [0.10, 0.30],
} as const;

export const WorkHeader = () => {
    const { isLoading } = useLoading();
    const headerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    const progresses = useScrollProgress(headerRef, RANGES, { divisor: 'viewport' });

    const entryRefs = [labelRef, titleRef, subtitleRef];
    useEntryTimeline(entryRefs, isLoading);

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
