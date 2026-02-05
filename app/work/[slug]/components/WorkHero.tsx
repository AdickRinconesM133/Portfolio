'use client';

import gsap from "gsap";
import { TechCard } from "@/app/components/card";
import { ScrollTextReveal } from "@/app/components";
import { useCallback, useEffect, useRef, useState } from "react";

const RANGES = {
    title: [0.02, 0.12],
    techCards: [0.06, 0.20],
} as const;

const toProgress = (scrollRatio: number, [start, end]: readonly [number, number]): number => {
    if (scrollRatio <= start) return 0;
    if (scrollRatio >= end) return 1;
    return (scrollRatio - start) / (end - start);
};

const applyGroupProgress = (elements: Element[], progress: number) => {
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
            y: -8 * p,
            filter: `blur(${4 * p}px)`,
        });
    });
};

interface WorkHeroProps {
    title: string
    title2?: string
    bgVideo: string
    techIcons: string[]
    techNames: string[]
}

export const WorkHero = ({ title, title2, bgVideo, techIcons, techNames }: WorkHeroProps) => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const techCardsRef = useRef<HTMLDivElement>(null);
    const [titleProgress, setTitleProgress] = useState(0);

    const update = useCallback(() => {
        const el = heroRef.current;
        if (!el) return;

        const heroHeight = el.offsetHeight;
        if (heroHeight === 0) return;

        const scrollRatio = window.scrollY / heroHeight;

        setTitleProgress(toProgress(scrollRatio, RANGES.title));

        const techContainer = techCardsRef.current;
        if (techContainer) {
            const cards = Array.from(techContainer.children);
            applyGroupProgress(cards, toProgress(scrollRatio, RANGES.techCards));
        }
    }, []);

    useEffect(() => {
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, [update]);

    useEffect(() => {
        const targets = [
            titleRef.current,
            techCardsRef.current,
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
        <div ref={heroRef} className="flex w-full h-[60dvh] lg:h-dvh! items-center justify-center lg:justify-end">
            <img src={bgVideo} alt={title} className="absolute top-0 left-0 w-full h-[60dvh] lg:h-dvh z-[-1] brightness-50 object-cover" />
            <div className="absolute top-0 left-0 w-full h-[60dvh] lg:h-dvh z-0 bg-[#00060A] opacity-60" />
            <div className="mx-4 lg:mx-0 lg:mr-[10.63dvw] mt-0 lg:mt-[20dvh] z-1 flex flex-col items-center lg:items-end">
                <h1 ref={titleRef} className="opacity-0 text-center lg:text-right">
                    <ScrollTextReveal progress={titleProgress}>
                        {title}{title2 ? ` ${title2}` : ''}
                    </ScrollTextReveal>
                </h1>
                <div ref={techCardsRef} className="opacity-0 flex flex-wrap justify-center lg:justify-end gap-x-3 md:gap-x-[1.88dvw] mt-[3dvh]">
                    <TechCard image={techIcons[0]} title={techNames[0]} />
                    <TechCard image={techIcons[1]} title={techNames[1]} />
                    <TechCard image={techIcons[2]} title={techNames[2]} />
                </div>
            </div>
        </div>
    )
}
