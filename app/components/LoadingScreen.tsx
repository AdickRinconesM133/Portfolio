'use client';

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLoading } from "@/app/context/LoadingContext";

export const LoadingScreen = () => {
    const { isLoading, loadingComplete } = useLoading();
    const containerRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLParagraphElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const lineRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const curtain = curtainRef.current;
        const name = nameRef.current;
        const role = roleRef.current;
        const counter = counterRef.current;
        const line = lineRef.current;
        if (!container || !curtain || !name || !role || !counter || !line) return;

        const proxy = { value: 0 };

        const updateDisplay = () => {
            const val = Math.round(proxy.value);
            counter.textContent = String(val).padStart(3, '0');
        };

        // Entry animations
        const entryTl = gsap.timeline({ delay: 0.15 });
        entryTl
            .fromTo(name,
                { opacity: 0, y: 40, filter: 'blur(8px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
            )
            .fromTo(role,
                { opacity: 0, y: 20, filter: 'blur(4px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
                '-=0.5'
            )
            .fromTo(counter,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' },
                '-=0.3'
            )
            .fromTo(line,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' },
                '<'
            );

        // Counter animation in 3 phases
        const counterTl = gsap.timeline({ delay: 0.6 });

        counterTl
            .to(proxy, {
                value: 30,
                duration: 0.8,
                ease: 'power2.out',
                onUpdate: updateDisplay,
            })
            .to(proxy, {
                value: 70,
                duration: 1.2,
                ease: 'sine.inOut',
                onUpdate: updateDisplay,
            })
            .to(proxy, {
                value: 100,
                duration: 0.6,
                ease: 'power2.in',
                onUpdate: updateDisplay,
            });

        // Progress line grows with counter
        gsap.to(line, {
            scaleX: 1,
            duration: 2.6,
            delay: 0.6,
            ease: 'none',
        });

        // Exit animation after counter completes
        counterTl.call(() => {
            const exitTl = gsap.timeline({
                onComplete: loadingComplete,
            });

            exitTl
                // Fade out name, role, counter
                .to([name, role], {
                    opacity: 0,
                    y: -50,
                    filter: 'blur(10px)',
                    duration: 0.5,
                    stagger: 0.06,
                    ease: 'power2.inOut',
                    delay: 0.2,
                })
                .to([counter, line], {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.inOut',
                }, '-=0.3')
                // Curtain slides up
                .to(curtain, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power3.inOut',
                }, '-=0.1')
                .set(container, { display: 'none' });
        });

        return () => {
            entryTl.kill();
            counterTl.kill();
        };
    }, [loadingComplete]);

    if (!isLoading) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[200]">
            {/* Curtain layer */}
            <div ref={curtainRef} className="absolute inset-0 bg-background" />

            {/* Content layer */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                <h2 ref={nameRef} className="opacity-0">
                    ADICK <span className="text-accent">RINCONES</span>
                </h2>
                <p ref={roleRef} className="opacity-0 text-accent text-[0.55rem] lg:text-s tracking-wider mt-2 lg:mt-[1.5lvh]">
                    SOFTWARE ENGINEER
                </p>
            </div>

            {/* Counter — bottom right */}
            <div className="absolute bottom-8 right-8 md:bottom-[5lvh] md:right-[3.33dvw] z-10 flex flex-col items-end gap-2">
                <span ref={lineRef} className="block w-12 md:w-16 h-[1px] bg-accent origin-left scale-x-0" />
                <span ref={counterRef} className="opacity-0 font-neuemontreal text-[0.65rem] md:text-[0.8rem] tracking-widest tabular-nums">
                    000
                </span>
            </div>
        </div>
    );
};
