'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTextReveal } from "./ScrollTextReveal";
import { useLoading } from "@/app/context/LoadingContext";
import { applyGroupProgress } from "@/app/lib/animation";
import { useScrollProgress, useEntryTimeline } from "@/app/hooks";


const RANGES = {
    subtitle: [0.02, 0.2],
    title: [0.08, 0.18],
    role: [0.14, 0.24],
    techList: [0.18, 0.5],
    icons: [0.24, 0.5],
} as const;


export const Hero = () => {
    const { isLoading } = useLoading();
    const heroRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLHeadingElement>(null);
    const techListRef = useRef<HTMLUListElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);

    const progresses = useScrollProgress(heroRef, RANGES, { divisor: 'element' });

    const entryRefs = [subtitleRef, titleRef, roleRef, techListRef, iconsRef];
    useEntryTimeline(entryRefs, isLoading);


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
        <div ref={heroRef} className="flex w-full h-lvh overflow-hidden items-center justify-center lg:items-start lg:justify-end">
            <div className="px-4 lg:px-0 lg:mt-[27.87lvh] lg:mr-[10.63dvw]">
                <p ref={subtitleRef} className="opacity-0 text-accent text-[0.55rem] lg:text-s text-center lg:text-right mb-1 lg:mb-[2.2lvh]">
                    <ScrollTextReveal progress={progresses.subtitle}>
                        BUILDING THE FUTURE COMMIT BY COMMIT
                    </ScrollTextReveal>
                </p>
                <h1 ref={titleRef} className="opacity-0 text-center lg:text-right text-[6rem]! md:text-[9rem]! lg:text-[13dvw]!">
                    <ScrollTextReveal progress={progresses.title}>
                        SOFTWARE
                    </ScrollTextReveal>
                </h1>
                <h3 ref={roleRef} className="opacity-0 text-center lg:text-right font-bold! font-neuemontreal! tracking-wider mt-[0.5lvh]">
                    <ScrollTextReveal progress={progresses.role}>
                        ENGINEER
                    </ScrollTextReveal>
                </h3>
                <ul ref={techListRef} className="opacity-0 flex flex-wrap mt-2 mb-3 lg:mt-[4lvh] lg:mb-[5lvh] justify-center lg:justify-end gap-x-3 md:gap-x-[1.88dvw]">
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">NEXT.JS</li>
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">RUST</li>
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">PYTHON</li>
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">GOLANG</li>
                    <li className="text-accent text-[0.55rem] lg:text-s text-right">AWS</li>
                    <li className="hidden md:list-item text-accent text-[0.55rem] lg:text-s text-right">KUBERNETES</li>
                    <li className="hidden md:list-item text-accent text-[0.55rem] lg:text-s text-right">DOCKER</li>
                </ul>
                <div ref={iconsRef} className="opacity-0 flex flex-wrap justify-center lg:justify-end gap-x-3 md:gap-x-[1.75dvw]">
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
