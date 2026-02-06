'use client';

import { useMenu } from "@/app/context/MenuContext";
import { useLoading } from "@/app/context/LoadingContext";
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
    linkRef: (el: HTMLDivElement | null) => void;
    revealDelay?: number;
}

const NavLink = ({ href, children, isActive, isTextVisible, linkRef, revealDelay = 0 }: NavLinkProps) => {
    return (
        <Link href={href}>
            <div ref={linkRef} className="flex flex-col items-center pb-[calc(0.15lvh+2px)]">
                <p className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-foreground'}`}>
                    <TextReveal isVisible={isTextVisible} delay={revealDelay}>
                        {children}
                    </TextReveal>
                </p>
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

    const handleClick = () => {
        onClick();
    };

    return (
        <button
            onClick={handleClick}
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


const SCROLL_THRESHOLD = 50;


const NAV_ANIMATION_DURATION = 0.6;
const MENU_ANIMATION_DURATION = 0.5;

export const Navigation = () => {
    const pathname = usePathname();
    const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
    const { isLoading } = useLoading();
    const [isAtTop, setIsAtTop] = useState(true);
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

    const menuContainerRef = useRef<HTMLDivElement>(null);
    const menuCardRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLDivElement[]>([]);
    const menuInitRef = useRef(false);

    const getActiveKey = (): NavKey | null => {
        if (pathname === "/work" || pathname.startsWith("/work/")) return 'work';
        if (pathname === "/about") return 'about';
        if (pathname === "/contact") return 'contact';
        return null;
    };

    const activeKey = getActiveKey();



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

    const linkRefSetters = useRef({
        work: (el: HTMLDivElement | null) => { linkRefs.current.work = el; },
        about: (el: HTMLDivElement | null) => { linkRefs.current.about = el; },
        contact: (el: HTMLDivElement | null) => { linkRefs.current.contact = el; },
    });

    const handleMenuToggle = () => {
        toggleMenu();
    };




    const navAppearDelay = isAtTop ? MENU_ANIMATION_DURATION : 0;
    const menuAppearDelay = !isAtTop ? NAV_ANIMATION_DURATION : 0;

    useEffect(() => {
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

    useEffect(() => {
        const container = menuContainerRef.current;
        const card = menuCardRef.current;
        if (!container || !card) return;

        const links = menuLinksRef.current.filter(Boolean);

        if (!menuInitRef.current) {
            menuInitRef.current = true;
            gsap.set(container, { visibility: 'hidden', pointerEvents: 'none' });
            gsap.set(card, { opacity: 0, y: 100, filter: 'blur(10px)' });
            gsap.set(links, { opacity: 0, y: 60, filter: 'blur(10px)' });
            if (!isMenuOpen) return;
        }

        gsap.killTweensOf(card);
        gsap.killTweensOf(links);

        if (isMenuOpen) {
            gsap.set(container, { visibility: 'visible', pointerEvents: 'auto' });
            gsap.fromTo(card,
                { opacity: 0, y: 100, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
            );
            gsap.fromTo(links,
                { opacity: 0, y: 60, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.15 }
            );
        } else {
            gsap.fromTo(links,
                { opacity: 1, y: 0, filter: 'blur(0px)' },
                { opacity: 0, y: 60, filter: 'blur(10px)', duration: 0.4, ease: 'power2.inOut', stagger: { each: 0.05, from: 'end' } }
            );
            gsap.fromTo(card,
                { opacity: 1, y: 0, filter: 'blur(0px)' },
                {
                    opacity: 0, y: 100, filter: 'blur(10px)', duration: 0.6, delay: 0.15, ease: 'power2.inOut',
                    onComplete: () => {
                        gsap.set(container, { visibility: 'hidden', pointerEvents: 'none' });
                    },
                }
            );
        }
    }, [isMenuOpen]);

    const menuLinks = [
        { href: '/', label: 'HOME', isActive: pathname === '/' },
        { href: '/work', label: 'WORK', isActive: activeKey === 'work' },
        { href: '/about', label: 'ABOUT', isActive: activeKey === 'about' },
        { href: '/contact', label: 'CONTACT', isActive: activeKey === 'contact' },
    ];

    return (
        <>
            { }
            <div className={`hidden md:block fixed top-[8.06lvh] left-[3.33dvw] w-[86.04dvw] z-100 text-[0.55rem] lg:text-sm ${!isAtTop ? 'pointer-events-none' : ''}`}>
                <div className='flex justify-between items-center'>
                    <Link href="/">
                        <p>
                            <TextReveal isVisible={isAtTop && !isLoading} delay={navAppearDelay}>
                                CODE BY ADICK
                            </TextReveal>
                        </p>
                    </Link>
                    <ul ref={navListRef} className='relative flex gap-[8dvw] xl:gap-[12.97dvw]' onMouseLeave={() => setHoveredKey(null)}>
                        <li onMouseEnter={() => setHoveredKey('work')}>
                            <NavLink
                                href="/work"
                                isActive={activeKey === 'work'}
                                isTextVisible={isAtTop && !isLoading}
                                linkRef={linkRefSetters.current.work}
                                revealDelay={navAppearDelay + 0.05}
                            >
                                WORK
                            </NavLink>
                        </li>
                        <li onMouseEnter={() => setHoveredKey('about')}>
                            <NavLink
                                href="/about"
                                isActive={activeKey === 'about'}
                                isTextVisible={isAtTop && !isLoading}
                                linkRef={linkRefSetters.current.about}
                                revealDelay={navAppearDelay + 0.1}
                            >
                                ABOUT
                            </NavLink>
                        </li>
                        <li onMouseEnter={() => setHoveredKey('contact')}>
                            <NavLink
                                href="/contact"
                                isActive={activeKey === 'contact'}
                                isTextVisible={isAtTop && !isLoading}
                                linkRef={linkRefSetters.current.contact}
                                revealDelay={navAppearDelay + 0.15}
                            >
                                CONTACT ME
                            </NavLink>
                        </li>
                        <span
                            ref={hoverLineRef}
                            className="absolute bottom-0 h-[2px] bg-accent scale-x-0"
                        />
                    </ul>
                </div>
            </div>

            { }
            <div className={`hidden md:block fixed top-[8.06lvh] right-[3.33dvw] z-100 ${isAtTop ? 'pointer-events-none' : ''}`}>
                <MenuButton isVisible={!isAtTop} isOpen={isMenuOpen} onClick={handleMenuToggle} delay={menuAppearDelay} />
            </div>

            { }
            <div className={`md:hidden fixed top-[8.06lvh] right-4 z-100 transition-opacity duration-300 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <MenuButton isVisible={true} isOpen={isMenuOpen} onClick={handleMenuToggle} animated={false} />
            </div>

            { }
            <div ref={menuContainerRef} className="invisible fixed inset-0 z-99 p-2 md:p-[2dvw]">
                <div ref={menuCardRef} className="w-full h-full rounded-[24px] bg-background/40 backdrop-blur-2xl flex-center overflow-hidden">
                    <nav className="flex flex-col items-center gap-[4lvh]">
                        {menuLinks.map((item, i) => (
                            <div key={item.href} ref={el => { if (el) menuLinksRef.current[i] = el; }} className="group">
                                <Link href={item.href} onClick={closeMenu}>
                                    <div className="flex flex-col items-center gap-[0.15lvh]">
                                        <p className={`text-xl md:text-2xl uppercase tracking-widest transition-colors duration-300 ${item.isActive ? 'text-accent' : 'text-foreground'}`}>
                                            {item.label}
                                        </p>
                                        <span className="hidden md:block w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
