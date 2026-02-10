'use client';

import gsap from "gsap";
import { useEffect, useRef } from "react";

const MENU_ICON_ANIMATION_DURATION = 0.35;

interface MenuButtonProps {
    isVisible: boolean;
    isOpen: boolean;
    onClick: () => void;
    animated?: boolean;
    delay?: number;
}

export const MenuButton = ({ isVisible, isOpen, onClick, animated = true, delay = 0 }: MenuButtonProps) => {
    const hamburgerRef = useRef<HTMLSpanElement[]>([]);
    const closeRef = useRef<HTMLSpanElement[]>([]);
    const isFirstRender = useRef(true);
    const prevIsOpen = useRef(isOpen);

    const killAllTweens = () => {
        const hamburgerLines = hamburgerRef.current.filter(Boolean);
        const closeLines = closeRef.current.filter(Boolean);
        hamburgerLines.forEach(el => gsap.killTweensOf(el));
        closeLines.forEach(el => gsap.killTweensOf(el));
    };

    useEffect(() => {
        const hamburgerLines = hamburgerRef.current.filter(Boolean);
        const closeLines = closeRef.current.filter(Boolean);
        if (hamburgerLines.length === 0) return;

        const visibleState = { opacity: 1, y: 0, filter: 'blur(0px)' };
        const hiddenState = { opacity: 0, y: -8, filter: 'blur(4px)' };

        if (isFirstRender.current) {
            isFirstRender.current = false;
            gsap.set(hamburgerLines, isVisible && !isOpen ? visibleState : hiddenState);
            gsap.set(closeLines, isVisible && isOpen ? visibleState : hiddenState);
            return;
        }

        if (!animated) return;

        killAllTweens();

        if (isVisible) {
            if (isOpen) {
                gsap.to(closeLines, {
                    ...visibleState,
                    duration: 0.4,
                    delay,
                    stagger: { each: 0.06, from: 'end' },
                    ease: 'power3.out',
                });
            } else {
                gsap.to(hamburgerLines, {
                    ...visibleState,
                    duration: 0.4,
                    delay,
                    stagger: { each: 0.06, from: 'end' },
                    ease: 'power3.out',
                });
            }
        } else {
            gsap.to(hamburgerLines, {
                ...hiddenState,
                duration: 0.4,
                stagger: { each: 0.06, from: 'start' },
                ease: 'power2.inOut',
            });
            gsap.to(closeLines, {
                ...hiddenState,
                duration: 0.4,
                stagger: { each: 0.06, from: 'start' },
                ease: 'power2.inOut',
            });
        }
    }, [isVisible, animated, delay, isOpen]);

    useEffect(() => {
        if (isFirstRender.current) return;
        if (prevIsOpen.current === isOpen) return;
        if (!isVisible) return;

        const hamburgerLines = hamburgerRef.current.filter(Boolean);
        const closeLines = closeRef.current.filter(Boolean);

        const visibleState = { opacity: 1, y: 0, filter: 'blur(0px)' };
        const hiddenState = { opacity: 0, y: -8, filter: 'blur(4px)' };

        killAllTweens();

        if (isOpen) {
            gsap.to(hamburgerLines, {
                ...hiddenState,
                duration: MENU_ICON_ANIMATION_DURATION,
                stagger: { each: 0.04, from: 'start' },
                ease: 'power2.inOut',
            });
            gsap.to(closeLines, {
                ...visibleState,
                duration: MENU_ICON_ANIMATION_DURATION,
                delay: MENU_ICON_ANIMATION_DURATION,
                stagger: { each: 0.04, from: 'end' },
                ease: 'power3.out',
            });
        } else {
            gsap.to(closeLines, {
                ...hiddenState,
                duration: MENU_ICON_ANIMATION_DURATION,
                stagger: { each: 0.04, from: 'start' },
                ease: 'power2.inOut',
            });
            gsap.to(hamburgerLines, {
                ...visibleState,
                duration: MENU_ICON_ANIMATION_DURATION,
                delay: MENU_ICON_ANIMATION_DURATION,
                stagger: { each: 0.04, from: 'end' },
                ease: 'power3.out',
            });
        }

        prevIsOpen.current = isOpen;
    }, [isOpen, isVisible]);

    return (
        <button
            onClick={onClick}
            className="relative flex justify-center items-center w-6 h-6 cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            { }
            <div className="absolute flex flex-col justify-center items-end gap-[5px]">
                <span
                    ref={(el) => { if (el) hamburgerRef.current[0] = el; }}
                    className="block w-6 h-[2px] bg-foreground"
                />
                <span
                    ref={(el) => { if (el) hamburgerRef.current[1] = el; }}
                    className="block w-6 h-[2px] bg-foreground"
                />
                <span
                    ref={(el) => { if (el) hamburgerRef.current[2] = el; }}
                    className="block w-6 h-[2px] bg-foreground"
                />
            </div>

            { }
            <div className="absolute flex justify-center items-center">
                <span
                    ref={(el) => { if (el) closeRef.current[0] = el; }}
                    className="absolute block w-6 h-[2px] bg-foreground rotate-45 opacity-0"
                />
                <span
                    ref={(el) => { if (el) closeRef.current[1] = el; }}
                    className="absolute block w-6 h-[2px] bg-foreground -rotate-45 opacity-0"
                />
            </div>
        </button>
    );
};
