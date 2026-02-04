'use client';

import { useMenu } from "@/app/context/MenuContext";
import Lenis from "lenis";
import { useEffect } from "react";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const { isMenuOpen } = useMenu();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            lerp: 0.05,
            wheelMultiplier: 0.5,
            smoothWheel: true,
        });

        if (isMenuOpen) {
            lenis.stop();
        }

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, [isMenuOpen]);

    return <>{children}</>;
};
