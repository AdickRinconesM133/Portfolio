'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerTextProps {
    children: ReactNode;
    className?: string;
}

/**
 * ScrollTriggerText - Animates text word-by-word on scroll using GSAP ScrollTrigger.
 * Similar to ScrollTextReveal but self-contained with its own trigger.
 */
export const ScrollTriggerText = ({
    children,
    className = '',
}: ScrollTriggerTextProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);

    const getText = (node: ReactNode): string => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(getText).join('');
        if (node && typeof node === 'object' && 'props' in node) {
            return getText((node as any).props.children);
        }
        return '';
    };

    const text = getText(children);
    const words = text.split(' ').filter(Boolean);

    useEffect(() => {
        const el = containerRef.current;
        const wordElements = wordsRef.current.filter(Boolean);
        if (!el || wordElements.length === 0) return;

        const ctx = gsap.context(() => {
            // Initial state
            gsap.set(wordElements, {
                opacity: 0,
                y: -8,
                filter: 'blur(4px)'
            });

            gsap.to(wordElements, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
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
