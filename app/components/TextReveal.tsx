'use client';

import gsap from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

interface TextRevealProps {
    children: ReactNode;
    isVisible: boolean;
    /** Duration per word in seconds. Default: 0.4 */
    duration?: number;
    /** Stagger delay between words in seconds. Default: 0.06 */
    stagger?: number;
    /** Initial delay before animation starts. Default: 0 */
    delay?: number;
    /** Custom className for the wrapper */
    className?: string;
}

/**
 * TextReveal component - Animates text visibility word by word.
 *
 * - isVisible=true → Words fade in from right to left
 * - isVisible=false → Words fade out from left to right
 */
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

    // Extract text content from children
    const getText = (node: ReactNode): string => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(getText).join('');
        if (node && typeof node === 'object' && 'props' in node) {
            return getText(node.props.children);
        }
        return '';
    };

    const text = getText(children);
    const words = text.split(' ').filter(Boolean);

    useEffect(() => {
        const wordElements = wordsRef.current.filter(Boolean);
        if (wordElements.length === 0) return;

        const visibleState = { opacity: 1, y: 0, filter: 'blur(0px)' };
        const hiddenState = { opacity: 0, y: -8, filter: 'blur(4px)' };

        if (isFirstRender.current) {
            isFirstRender.current = false;
            gsap.set(wordElements, isVisible ? visibleState : hiddenState);
            return;
        }

        // Kill any running animations on these elements before starting new ones
        wordElements.forEach(el => gsap.killTweensOf(el));

        if (isVisible) {
            gsap.to(wordElements, {
                ...visibleState,
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
                ...hiddenState,
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
