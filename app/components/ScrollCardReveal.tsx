'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useEffect, useRef } from 'react';
import { CARD_ENTRY, SCROLL_OUT } from '@/app/lib/animation';


gsap.registerPlugin(ScrollTrigger);

interface ScrollCardRevealProps {
    children: ReactNode;
    className?: string;
    start?: string;
    end?: string;
    leaveStart?: string;
    leaveEnd?: string;
}

export const ScrollCardReveal = ({ children, className = '', start = 'top 90%', end = 'top 60%', leaveStart, leaveEnd }: ScrollCardRevealProps) => {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                CARD_ENTRY.from,
                {
                    ...CARD_ENTRY.to,
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

            if (leaveStart && leaveEnd) {
                gsap.fromTo(el,
                    SCROLL_OUT.visible,
                    {
                        ...SCROLL_OUT.hidden,
                        duration: 1,
                        immediateRender: false,
                        scrollTrigger: {
                            trigger: el,
                            start: leaveStart,
                            end: leaveEnd,
                            scrub: 1,
                        }
                    }
                );
            }
        }, elRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={elRef} className={className}>
            {children}
        </div>
    );
};
