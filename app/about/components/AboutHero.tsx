'use client';

import { useRef } from "react";
import { Card } from "@/app/components/card";
import { ScrollCardReveal, ScrollTextReveal } from "@/app/components";
import { useLoading } from "@/app/context/LoadingContext";
import { useScrollProgress, useEntryTimeline } from "@/app/hooks";

const RANGES = {
    label: [0.02, 0.15],
    name: [0.06, 0.14],
    tagline: [0.10, 0.30],
} as const;

export const AboutHero = () => {
    const { isLoading } = useLoading();
    const headerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const cardSectionRef = useRef<HTMLDivElement>(null);

    const progresses = useScrollProgress(headerRef, RANGES, { divisor: 'viewport' });

    const entryRefs = [labelRef, nameRef, taglineRef, cardSectionRef];
    useEntryTimeline(entryRefs, isLoading);

    return (
        <div className="flex flex-col w-full pb-[15lvh] lg:pb-0">
            <div ref={headerRef} className="mt-24 md:mt-[18.06lvh] ml-4 md:ml-[10.63dvw] margin-right">
                <p ref={labelRef} className="opacity-0 text-accent text-[0.55rem] lg:text-xl">
                    <ScrollTextReveal progress={progresses.label}>ABOUT ME</ScrollTextReveal>
                </p>
                <h2 ref={nameRef} className="opacity-0 mt-2 lg:mt-[4lvh]">
                    <ScrollTextReveal progress={progresses.name}>ADICK</ScrollTextReveal>{' '}
                    <ScrollTextReveal progress={progresses.name} className="text-accent">RINCONES</ScrollTextReveal>
                </h2>
                <p ref={taglineRef} className="opacity-0 text-accent text-[0.55rem] lg:text-xl mt-2 lg:mt-[4lvh]">
                    <ScrollTextReveal progress={progresses.tagline}>BASED IN LARA, VENEZUELA</ScrollTextReveal>
                </p>
            </div>
            <div ref={cardSectionRef} className="opacity-0 ml-4 md:ml-[6.67dvw] margin-right mt-2 lg:mt-[4lvh]">
                <ScrollCardReveal start="top 98%" end="top 85%">
                    <Card className="w-full h-auto lg:w-[50dvw] py-8 md:py-[4lvh]">
                        <p className="text-[0.65rem] md:text-[0.8rem] margin-left mr-[3.33dvw]">Hi, I&apos;m Adick - a Software Engineer building scalable systems across mobile, backend, and cloud!</p>
                        <p className="text-[0.65rem] md:text-[0.8rem] mt-[4lvh] margin-left mr-[3.33dvw]">5+ years of experience with Next.js, React, Rust, and Golang. From ride-sharing platforms serving 100K+ users to production-grade cloud systems, I build systems designed for real-world scale. Mentored by a senior Apple engineer on production-grade architecture and system design patterns.</p>
                    </Card>
                </ScrollCardReveal>
            </div>
        </div>
    );
}
