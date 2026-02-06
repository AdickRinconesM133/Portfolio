'use client';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMenu } from "@/app/context/MenuContext";
import { useLoading } from "@/app/context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const { isMenuOpen } = useMenu();
    const { isLoading } = useLoading();
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            lerp: 0.05,
            wheelMultiplier: 0.5,
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        if (isMenuOpen || isLoading) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [isMenuOpen, isLoading]);

    useEffect(() => {
        const lenis = lenisRef.current;
        if (!lenis) return;

        lenis.scrollTo(0, { immediate: true });

        const timeout = setTimeout(() => {
            lenis.resize();
            ScrollTrigger.refresh();
        }, 150);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return <>{children}</>;
};
