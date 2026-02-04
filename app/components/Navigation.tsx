'use client';

import { useMenu } from "@/app/context/MenuContext";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TextReveal } from "./TextReveal";

type NavKey = 'work' | 'about' | 'contact';

interface NavLinkProps {
    href: string;
    children: string;
    isActive: boolean;
    isTextVisible: boolean;
    lineRef: (el: HTMLSpanElement | null) => void;
    revealDelay?: number;
}

const NavLink = ({ href, children, isActive, isTextVisible, lineRef, revealDelay = 0 }: NavLinkProps) => {
    return (
        <Link href={href}>
            <div className="flex flex-col items-center gap-[0.15dvh]">
                <p className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-foreground'}`}>
                    <TextReveal isVisible={isTextVisible} delay={revealDelay}>
                        {children}
                    </TextReveal>
                </p>
                <span
                    ref={lineRef}
                    className="block w-full h-[2px] bg-accent scale-x-0"
                />
            </div>
        </Link>
    );
};

interface MenuButtonProps {
    isVisible: boolean;
    isOpen: boolean;
    onClick: () => void;
    
    animated?: boolean;
    
    delay?: number;
}

const MENU_ICON_ANIMATION_DURATION = 0.35;
const MENU_TOGGLE_TOTAL_DURATION = MENU_ICON_ANIMATION_DURATION * 2 + 0.1; 

const MenuButton = ({ isVisible, isOpen, onClick, animated = true, delay = 0 }: MenuButtonProps) => {
    const hamburgerRef = useRef<HTMLSpanElement[]>([]);
    const closeRef = useRef<HTMLSpanElement[]>([]);
    const isFirstRender = useRef(true);
    const prevIsOpen = useRef(isOpen);
    const [isAnimating, setIsAnimating] = useState(false);

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
        setIsAnimating(true);

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
                onComplete: () => setIsAnimating(false),
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
                onComplete: () => setIsAnimating(false),
            });
        }

        prevIsOpen.current = isOpen;
    }, [isOpen, isVisible]);

    const handleClick = () => {
        if (isAnimating) return;
        onClick();
    };

    return (
        <button
            onClick={handleClick}
            className="relative flex justify-center items-center w-6 h-6 cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
        >
            {}
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

            {}
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


const SCROLL_THRESHOLD = 50;


const NAV_ANIMATION_DURATION = 0.6; 
const MENU_ANIMATION_DURATION = 0.5; 

export const Navigation = () => {
    const pathname = usePathname();
    const { isMenuOpen, toggleMenu } = useMenu();
    const [isAtTop, setIsAtTop] = useState(true);
    const prevActiveRef = useRef<NavKey | null>(null);
    const prevIsAtTopRef = useRef(true);
    const isFirstRender = useRef(true);

    const lineRefs = useRef<Record<NavKey, HTMLSpanElement | null>>({
        work: null,
        about: null,
        contact: null,
    });

    const getActiveKey = (): NavKey | null => {
        if (pathname === "/work" || pathname.startsWith("/work/")) return 'work';
        if (pathname === "/about") return 'about';
        if (pathname === "/contact") return 'contact';
        return null;
    };

    const activeKey = getActiveKey();

    
    useEffect(() => {
        const prevActive = prevActiveRef.current;
        const currentActive = activeKey;

        
        if (isFirstRender.current) {
            isFirstRender.current = false;
            if (currentActive) {
                const line = lineRefs.current[currentActive];
                if (line) {
                    gsap.set(line, { scaleX: 1, transformOrigin: "right" });
                }
            }
            prevActiveRef.current = currentActive;
            return;
        }

        if (prevActive === currentActive) return;

        const tl = gsap.timeline();

        
        if (prevActive) {
            const prevLine = lineRefs.current[prevActive];
            if (prevLine) {
                tl.to(prevLine, {
                    scaleX: 0,
                    transformOrigin: "left",
                    duration: 0.3,
                    ease: "power2.inOut",
                }, 0);
            }
        }

        
        if (currentActive) {
            const currentLine = lineRefs.current[currentActive];
            if (currentLine) {
                gsap.set(currentLine, { scaleX: 0, transformOrigin: "right" });

                tl.to(currentLine, {
                    scaleX: 1,
                    duration: 0.4,
                    ease: "power3.out",
                }, prevActive ? 0.2 : 0);
            }
        }

        prevActiveRef.current = currentActive;
    }, [activeKey]);

    
    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY <= SCROLL_THRESHOLD);
        };

        
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const refSetters = useRef({
        work: (el: HTMLSpanElement | null) => { lineRefs.current.work = el; },
        about: (el: HTMLSpanElement | null) => { lineRefs.current.about = el; },
        contact: (el: HTMLSpanElement | null) => { lineRefs.current.contact = el; },
    });

    const handleMenuToggle = () => {
        toggleMenu();
    };

    
    
    
    const navAppearDelay = isAtTop ? MENU_ANIMATION_DURATION : 0;
    const menuAppearDelay = !isAtTop ? NAV_ANIMATION_DURATION : 0;

    
    useEffect(() => {
        if (isFirstRender.current) return;
        if (prevIsAtTopRef.current === isAtTop) return;
        prevIsAtTopRef.current = isAtTop;

        const currentActive = activeKey;
        if (!currentActive) return;

        const line = lineRefs.current[currentActive];
        if (!line) return;

        gsap.killTweensOf(line, 'opacity');

        if (!isAtTop) {
            gsap.to(line, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.inOut',
            });
        } else {
            gsap.to(line, {
                opacity: 1,
                duration: 0.3,
                delay: navAppearDelay,
                ease: 'power3.out',
            });
        }
    }, [isAtTop, activeKey, navAppearDelay]);

    return (
        <>
            {}
            <div className={`hidden md:block fixed top-[8.06dvh] left-[3.33dvw] w-[86.04dvw] z-100 text-[0.55rem] lg:text-sm ${!isAtTop ? 'pointer-events-none' : ''}`}>
                <div className='flex justify-between items-center'>
                    <Link href="/">
                        <p>
                            <TextReveal isVisible={isAtTop} delay={navAppearDelay}>
                                CODE BY ADICK
                            </TextReveal>
                        </p>
                    </Link>
                    <ul className='flex gap-[8dvw] xl:gap-[12.97dvw]'>
                        <li>
                            <NavLink
                                href="/work"
                                isActive={activeKey === 'work'}
                                isTextVisible={isAtTop}
                                lineRef={refSetters.current.work}
                                revealDelay={navAppearDelay + 0.05}
                            >
                                WORK
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/about"
                                isActive={activeKey === 'about'}
                                isTextVisible={isAtTop}
                                lineRef={refSetters.current.about}
                                revealDelay={navAppearDelay + 0.1}
                            >
                                ABOUT
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/contact"
                                isActive={activeKey === 'contact'}
                                isTextVisible={isAtTop}
                                lineRef={refSetters.current.contact}
                                revealDelay={navAppearDelay + 0.15}
                            >
                                CONTACT ME
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {}
            <div className={`hidden md:block fixed top-[8.06dvh] right-[3.33dvw] z-100 ${isAtTop ? 'pointer-events-none' : ''}`}>
                <MenuButton isVisible={!isAtTop} isOpen={isMenuOpen} onClick={handleMenuToggle} delay={menuAppearDelay} />
            </div>

            {}
            <div className="md:hidden fixed top-[8.06dvh] right-4 z-100">
                <MenuButton isVisible={true} isOpen={isMenuOpen} onClick={handleMenuToggle} animated={false} />
            </div>

            {}
            {isMenuOpen && (
                <div className="fixed inset-0 z-99 p-2 md:p-[2dvw]">
                    <div className="w-full h-full rounded-[24px] bg-background/40 backdrop-blur-2xl" />
                </div>
            )}
        </>
    );
}
