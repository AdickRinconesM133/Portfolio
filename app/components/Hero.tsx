'use client';

import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTextReveal } from "./ScrollTextReveal";


const RANGES = {
    subtitle: [0.02, 0.2],   
    title:    [0.08, 0.18],   
    role:     [0.14, 0.24],   
    techList: [0.18, 0.5],    
    icons:    [0.24, 0.5],    
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

export const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const techListRef = useRef<HTMLUListElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);

    const [progresses, setProgresses] = useState({
        subtitle: 0,
        title: 0,
        role: 0,
        techList: 0,
        icons: 0,
    });

    const update = useCallback(() => {
        const el = heroRef.current;
        if (!el) return;

        const heroHeight = el.offsetHeight;
        if (heroHeight === 0) return;

        const scrollRatio = window.scrollY / heroHeight;

        setProgresses({
            subtitle: toProgress(scrollRatio, RANGES.subtitle),
            title: toProgress(scrollRatio, RANGES.title),
            role: toProgress(scrollRatio, RANGES.role),
            techList: toProgress(scrollRatio, RANGES.techList),
            icons: toProgress(scrollRatio, RANGES.icons),
        });
    }, []);

    useEffect(() => {
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, [update]);

    
    useEffect(() => {
        const list = techListRef.current;
        if (!list) return;
        const items = Array.from(list.querySelectorAll('li'));
        applyGroupProgress(items, progresses.techList);
    }, [progresses.techList]);

    
    useEffect(() => {
        const icons = iconsRef.current;
        if (!icons) return;
        const links = Array.from(icons.querySelectorAll('a'));
        applyGroupProgress(links, progresses.icons);
    }, [progresses.icons]);

    return (
        <div ref={heroRef} className="flex w-full h-dvh overflow-hidden items-center justify-center lg:items-start lg:justify-end">
            <div className="px-4 lg:px-0 lg:mt-[27.87dvh] lg:mr-[10.63dvw]">
                <p className="text-accent text-[0.55rem] lg:text-s text-right mb-1 lg:mb-[2.2dvh]">
                    <ScrollTextReveal progress={progresses.subtitle}>
                        BUILDING THE FUTURE COMMIT BY COMMIT
                    </ScrollTextReveal>
                </p>
                <h1 className="text-right text-[6rem]! md:text-[9rem]! lg:text-[13dvw]!">
                    <ScrollTextReveal progress={progresses.title}>
                        SOFTWARE
                    </ScrollTextReveal>
                </h1>
                <h3 className="text-right font-bold! font-neuemontreal! tracking-wider mt-[0.5dvh]">
                    <ScrollTextReveal progress={progresses.role}>
                        ENGINEER
                    </ScrollTextReveal>
                </h3>
                <ul ref={techListRef} className="flex flex-wrap mt-2 mb-3 lg:mt-[4dvh] lg:mb-[5dvh] justify-end gap-x-3 md:gap-x-[1.88dvw]">
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">NEXT.JS</li>
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">RUST</li>
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">PYTHON</li>
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">GOLANG</li>
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">AWS</li>
                    <li className="hidden md:list-item text-accent text-[0.55rem] lg:text-s text-right">KUBERNETES</li>
                    <li className="hidden md:list-item text-accent text-[0.55rem] lg:text-s text-right">DOCKER</li>
                </ul>
                <div ref={iconsRef} className="flex flex-wrap justify-end gap-x-3 md:gap-x-[1.75dvw]">
                    <a href="https://linkedin.com/in/adickrincones/" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4"
                            src="/images/linkedin.svg"
                            alt="Linkedin"
                            width={20}
                            height={20}
                        />
                    </a>
                    <a href="https://instagram.com/kyddahh/" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4"
                            src="/images/instagram.svg"
                            alt="Instagram"
                            width={20}
                            height={20}
                        />
                    </a>
                    <a href="https://github.com/AdickRinconesM133" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4"
                            src="/images/github.svg"
                            alt="Github"
                            width={20}
                            height={20}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}
