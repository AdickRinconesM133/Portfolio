'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactNode, useEffect, useRef } from 'react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ScrollCardRevealProps {
    children: ReactNode;
    className?: string;
}

export const ScrollCardReveal = ({ children, className = '' }: ScrollCardRevealProps) => {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        // Clean up previous animations/triggers if any
        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    y: 100,
                    filter: 'blur(10px)',
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%", // Start when top of element hits 90% of viewport
                        end: "top 60%",   // Full visible when top of element hits 60% of viewport
                        scrub: 1,         // Smooth scrubbing
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, elRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={elRef} className={className}>
            {children}
        </div>
    );
};
