'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { getText, SCROLL_OUT } from "@/app/lib/animation";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerTextProps {
    children: ReactNode;
    className?: string;
}


export const ScrollTriggerText = ({
    children,
    className = '',
}: ScrollTriggerTextProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);

    const text = getText(children);
    const words = text.split(' ').filter(Boolean);

    useEffect(() => {
        const el = containerRef.current;
        const wordElements = wordsRef.current.filter(Boolean);
        if (!el || wordElements.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.set(wordElements, SCROLL_OUT.hidden);

            gsap.to(wordElements, {
                ...SCROLL_OUT.visible,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    end: "bottom 65%",
                    scrub: 1,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <span ref={containerRef} className={`${className} inline-block`}>
            {words.map((word, index) => (
                <span
                    key={index}
                    ref={(el) => {
                        if (el) wordsRef.current[index] = el;
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {word}
                    {index < words.length - 1 && '\u00A0'}
                </span>
            ))}
        </span>
    );
};
