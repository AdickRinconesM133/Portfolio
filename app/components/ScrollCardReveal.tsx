'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactNode, useEffect, useRef } from 'react';


gsap.registerPlugin(ScrollTrigger);

interface ScrollCardRevealProps {
    children: ReactNode;
    className?: string;
    
    start?: string;
    
    end?: string;
}

export const ScrollCardReveal = ({ children, className = '', start = 'top 90%', end = 'top 60%' }: ScrollCardRevealProps) => {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        
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
                        start,
                        end,
                        scrub: 1,
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
