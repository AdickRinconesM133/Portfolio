'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 100%",
                        toggleActions: "play none none none",
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={footerRef} className="flex flex-row justify-between items-center w-full h-[15dvh] overflow-hidden px-4 md:px-[13.96dvw]">
            <div className="text-[0.8rem]">
                <p>© 2026 ADICK RINCONES</p>
            </div>
            <div className="flex flex-row gap-3 md:gap-[2dvw]">
                <a href="https://linkedin.com/in/adickrincones/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/linkedin.svg" alt="Linkedin" className="w-[2dvw] h-[2dvw] min-w-5 min-h-5 brightness-1000" />
                </a>
                <a href="https://instagram.com/kyddahh/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/instagram.svg" alt="Instagram" className="w-[2dvw] h-[2dvw] min-w-5 min-h-5 brightness-1000" />
                </a>
                <a href="https://github.com/AdickRinconesM133" target="_blank" rel="noopener noreferrer">
                    <img src="/images/github.svg" alt="Github" className="w-[2dvw] h-[2dvw] min-w-5 min-h-5 brightness-1000" />
                </a>
            </div>
        </div>
    )
}
