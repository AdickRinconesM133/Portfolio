'use client';

import gsap from "gsap";
import { isValidElement, useEffect, useRef, type ReactNode } from "react";

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

    
    const getText = (node: ReactNode): string => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(getText).join('');
        if (isValidElement<{ children?: ReactNode }>(node)) {
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
