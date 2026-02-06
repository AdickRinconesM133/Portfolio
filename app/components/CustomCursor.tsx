'use client';

import gsap from "gsap";
import { useEffect, useRef } from "react";

const LERP = 0.15;
const DOT_SIZE = 10;
const DOT_SIZE_HOVER = 40;

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-hover]';

export const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const visible = useRef(false);

    useEffect(() => {
        const dot = dotRef.current;
        if (!dot) return;

        // Don't activate on touch devices
        const mq = window.matchMedia('(pointer: fine)');
        if (!mq.matches) return;

        // Hide system cursor
        document.documentElement.style.cursor = 'none';

        const handleMouseMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };

            if (!visible.current) {
                visible.current = true;
                pos.current = { x: e.clientX, y: e.clientY };
                gsap.set(dot, { x: e.clientX, y: e.clientY, opacity: 1 });
            }
        };

        const handleMouseLeave = () => {
            visible.current = false;
            gsap.to(dot, { opacity: 0, duration: 0.2 });
        };

        const handleMouseEnter = () => {
            visible.current = true;
            gsap.to(dot, { opacity: 1, duration: 0.2 });
        };

        // Hover detection via event delegation
        const handleOver = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest?.(INTERACTIVE_SELECTOR);
            if (el) {
                gsap.to(dot, {
                    width: DOT_SIZE_HOVER,
                    height: DOT_SIZE_HOVER,
                    opacity: 0.6,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        const handleOut = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest?.(INTERACTIVE_SELECTOR);
            if (el) {
                gsap.to(dot, {
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        // Lerp loop via GSAP ticker
        const tick = () => {
            if (!visible.current) return;
            pos.current.x += (target.current.x - pos.current.x) * LERP;
            pos.current.y += (target.current.y - pos.current.y) * LERP;
            gsap.set(dot, { x: pos.current.x, y: pos.current.y });
        };

        gsap.ticker.add(tick);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseover', handleOver);
        document.addEventListener('mouseout', handleOut);

        return () => {
            gsap.ticker.remove(tick);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleOver);
            document.removeEventListener('mouseout', handleOut);
            document.documentElement.style.cursor = '';
        };
    }, []);

    return (
        <div
            ref={dotRef}
            className="pointer-events-none fixed top-0 left-0 z-[300] rounded-full bg-accent opacity-0 mix-blend-difference"
            style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
            }}
        />
    );
};
