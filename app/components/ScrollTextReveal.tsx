'use client';

import gsap from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

interface ScrollTextRevealProps {
    children: ReactNode;
    /** 0 = fully visible, 1 = fully hidden. Words hide left-to-right, appear right-to-left. */
    progress: number;
    /** Custom className for the wrapper */
    className?: string;
}

/**
 * ScrollTextReveal - Scroll-driven word-by-word reveal.
 * Unlike TextReveal (boolean toggle), this maps a continuous 0-1 progress
 * to per-word opacity/blur/y. Each word has its own sub-range.
 */
export const ScrollTextReveal = ({
    children,
    progress,
    className = '',
}: ScrollTextRevealProps) => {
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
        const wordElements = wordsRef.current.filter(Boolean);
        if (wordElements.length === 0) return;

        const count = wordElements.length;
        // Each word gets a portion of the 0-1 range with overlap for smoothness
        const wordRange = 1 / count;
        const overlap = wordRange * 0.5; // 50% overlap for smoother transitions

        wordElements.forEach((el, i) => {
            // Word i starts hiding at this progress and is fully hidden at end
            const start = i * wordRange;
            const end = Math.min(start + wordRange + overlap, 1);

            // Calculate per-word progress (0 = visible, 1 = hidden)
            let wordProgress: number;
            if (progress <= start) {
                wordProgress = 0;
            } else if (progress >= end) {
                wordProgress = 1;
            } else {
                wordProgress = (progress - start) / (end - start);
            }

            gsap.set(el, {
                opacity: 1 - wordProgress,
                y: -8 * wordProgress,
                filter: `blur(${4 * wordProgress}px)`,
            });
        });
    }, [progress]);

    return (
        <span className={className}>
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
