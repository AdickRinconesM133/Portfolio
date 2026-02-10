import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type NavKey = 'work' | 'about' | 'contact';

interface UseHoverLineOptions {
    activeKey: NavKey | null;
    isAtTop: boolean;
    navAppearDelay: number;
}

export const useHoverLine = ({ activeKey, isAtTop, navAppearDelay }: UseHoverLineOptions) => {
    const [hoveredKey, setHoveredKey] = useState<NavKey | null>(null);

    const linkRefs = useRef<Record<NavKey, HTMLDivElement | null>>({
        work: null,
        about: null,
        contact: null,
    });
    const navListRef = useRef<HTMLUListElement>(null);
    const hoverLineRef = useRef<HTMLSpanElement>(null);
    const lineVisibleRef = useRef(false);
    const isFirstLineRender = useRef(true);
    const prevIsAtTopForLine = useRef(true);

    const linkRefSetters = {
        work: (el: HTMLDivElement | null) => { linkRefs.current.work = el; },
        about: (el: HTMLDivElement | null) => { linkRefs.current.about = el; },
        contact: (el: HTMLDivElement | null) => { linkRefs.current.contact = el; },
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (!isAtTop) setHoveredKey(null);
    }, [isAtTop]);

    useEffect(() => {
        const line = hoverLineRef.current;
        const list = navListRef.current;
        if (!line || !list) return;

        const navJustAppeared = !prevIsAtTopForLine.current && isAtTop;
        prevIsAtTopForLine.current = isAtTop;

        gsap.killTweensOf(line);

        const targetKey = (navJustAppeared ? null : hoveredKey) ?? activeKey;

        if (!isAtTop || !targetKey) {
            if (lineVisibleRef.current) {
                lineVisibleRef.current = false;
                gsap.to(line, {
                    scaleX: 0,
                    transformOrigin: 'left',
                    duration: 0.3,
                    ease: 'power2.inOut',
                });
            }
            return;
        }

        const targetEl = linkRefs.current[targetKey];
        if (!targetEl) return;

        const listRect = list.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const left = targetRect.left - listRect.left;
        const width = targetRect.width;

        if (isFirstLineRender.current && activeKey) {
            isFirstLineRender.current = false;
            gsap.set(line, { left, width, scaleX: 1 });
            lineVisibleRef.current = true;
            return;
        }
        isFirstLineRender.current = false;

        const wasVisible = lineVisibleRef.current;
        lineVisibleRef.current = true;

        if (!wasVisible) {
            const currentScaleX = parseFloat(String(gsap.getProperty(line, 'scaleX')));
            if (currentScaleX < 0.01) {
                gsap.set(line, { left, width, transformOrigin: 'right' });
            }
        }

        gsap.to(line, {
            left,
            width,
            scaleX: 1,
            duration: 0.4,
            delay: (!wasVisible && navJustAppeared) ? navAppearDelay + 0.15 : 0,
            ease: 'power3.out',
        });
    }, [hoveredKey, activeKey, isAtTop, navAppearDelay]);

    return {
        hoveredKey,
        setHoveredKey,
        navListRef,
        hoverLineRef,
        linkRefSetters,
    };
};
