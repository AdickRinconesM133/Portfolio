'use client';

import gsap from "gsap";
import { useEffect, useRef, type ReactNode } from "react";
import { getText, SCROLL_OUT } from "@/app/lib/animation";

interface TextRevealProps {
    children: ReactNode;
    isVisible: boolean;

    duration?: number;

    stagger?: number;

    delay?: number;

    className?: string;
}


export const TextReveal = ({
    children,
    isVisible,
    duration = 0.4,
    stagger = 0.06,
    delay = 0,
    className = '',
}: TextRevealProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);
    const isFirstRender = useRef(true);

    const text = getText(children);
    const words = text.split(' ').filter(Boolean);

    useEffect(() => {
        const wordElements = wordsRef.current.filter(Boolean);
        if (wordElements.length === 0) return;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            gsap.set(wordElements, isVisible ? SCROLL_OUT.visible : SCROLL_OUT.hidden);
            return;
        }


        wordElements.forEach(el => gsap.killTweensOf(el));

        if (isVisible) {
            gsap.to(wordElements, {
                ...SCROLL_OUT.visible,
                duration,
                delay,
                stagger: {
                    each: stagger,
                    from: 'end',
                },
                ease: 'power3.out',
            });
        } else {
            gsap.to(wordElements, {
                ...SCROLL_OUT.hidden,
                duration,
                stagger: {
                    each: stagger,
                    from: 'start',
                },
                ease: 'power2.inOut',
            });
        }
    }, [isVisible, duration, stagger, delay]);

    return (
        <span ref={containerRef} className={className}>
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
