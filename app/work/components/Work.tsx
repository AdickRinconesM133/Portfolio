'use client';

import gsap from "gsap";
import { WorkCard } from "@/app/components/card"
import { ScrollCardReveal } from "@/app/components"
import { works } from "@/app/data/works"
import { WorkHeader } from "./WorkHeader"
import { useLoading } from "@/app/context/LoadingContext"
import { useEffect, useRef } from "react"

const MOBILE_BREAKPOINT = 1024;

export const Work = () => {
    const { isLoading } = useLoading();
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (isLoading) return;

        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
        const entryCount = isMobile ? works.length : 1;
        const targets = cardsRef.current.slice(0, entryCount).filter(Boolean);

        if (targets.length === 0) return;

        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo(
            targets,
            { opacity: 0, y: 100, filter: 'blur(10px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            },
        );

        return () => { tl.kill(); };
    }, [isLoading]);

    return (
        <div id="work" className="flex w-full flex-col pb-[6lvh]">
            <WorkHeader />
            <div className="margin-top flex flex-col px-4 lg:px-0 lg:ml-[3.33dvw] gap-[4dvw]">
                {works.map((work, index) => {
                    const isFirst = index === 0;
                    const isLast = index === works.length - 1;

                    const card = (
                        <WorkCard
                            slug={work.slug}
                            number={work.number}
                            title={work.title}
                            title2={work.title2}
                            hint={work.hint}
                            bgVideo={work.bgVideo}
                            className="w-full lg:w-[93.34dvw] h-auto lg:h-[35lvh]"
                            image={work.techIcons}
                            techs={work.techNames}
                            techsShort={work.techNamesShort}
                        />
                    );

                    // First card: timeline entry on all viewports, no ScrollCardReveal
                    if (isFirst) {
                        return (
                            <div
                                key={work.slug}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="opacity-0"
                            >
                                {card}
                            </div>
                        );
                    }

                    // Remaining cards: timeline entry on mobile, ScrollCardReveal on desktop
                    return (
                        <div key={work.slug}>
                            {/* Mobile: animated via timeline */}
                            <div
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="opacity-0 lg:hidden"
                            >
                                {card}
                            </div>
                            {/* Desktop: animated via scroll */}
                            <ScrollCardReveal
                                className="hidden lg:block"
                                start={isLast ? "top 95%" : undefined}
                                end={isLast ? "top 80%" : undefined}
                            >
                                {card}
                            </ScrollCardReveal>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
