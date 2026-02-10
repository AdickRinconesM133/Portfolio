'use client';

import { useEffect, useRef } from "react";
import { TechCard } from "@/app/components/card";
import { ScrollTextReveal } from "@/app/components";
import { useLoading } from "@/app/context/LoadingContext";
import { applyGroupProgress } from "@/app/lib/animation";
import { useScrollProgress, useEntryTimeline } from "@/app/hooks";

const RANGES = {
    title: [0.02, 0.12],
    techCards: [0.06, 0.20],
} as const;

interface WorkHeroProps {
    title: string
    title2?: string
    bgVideo: string
    techIcons: string[]
    techNames: string[]
}

export const WorkHero = ({ title, title2, bgVideo, techIcons, techNames }: WorkHeroProps) => {
    const { isLoading } = useLoading();
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const techCardsRef = useRef<HTMLDivElement>(null);

    const progresses = useScrollProgress(heroRef, RANGES, { divisor: 'element' });

    const entryRefs = [titleRef, techCardsRef];
    useEntryTimeline(entryRefs, isLoading);

    useEffect(() => {
        const techContainer = techCardsRef.current;
        if (!techContainer) return;
        const cards = Array.from(techContainer.children);
        applyGroupProgress(cards, progresses.techCards);
    }, [progresses.techCards]);

    return (
        <div ref={heroRef} className="relative flex w-full h-lvh items-center justify-center lg:justify-end overflow-visible">
            <div
                className="absolute top-0 left-0 w-full h-[110lvh] z-0"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent)',
                }}
            >
                {bgVideo && <img src={bgVideo} alt={title} className="absolute inset-0 w-full h-full brightness-50 object-cover" />}
                <div className="absolute inset-0 bg-[#00060A] opacity-60" />
            </div>
            <div className="mx-4 lg:mx-0 lg:mr-[10.63dvw] mt-0 lg:mt-[20lvh] z-1 flex flex-col items-center lg:items-end">
                <h1 ref={titleRef} className="opacity-0 text-center lg:text-right">
                    <ScrollTextReveal progress={progresses.title}>
                        {title}{title2 ? ` ${title2}` : ''}
                    </ScrollTextReveal>
                </h1>
                <div ref={techCardsRef} className="opacity-0 flex flex-wrap justify-center lg:justify-end gap-x-3 md:gap-x-[1.88dvw] mt-[3lvh]">
                    <TechCard image={techIcons[0]} title={techNames[0]} />
                    <TechCard image={techIcons[1]} title={techNames[1]} />
                    <TechCard image={techIcons[2]} title={techNames[2]} />
                </div>
            </div>
        </div>
    )
}
