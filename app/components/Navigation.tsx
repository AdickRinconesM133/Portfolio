'use client';

import { useMenu } from "@/app/context/MenuContext";
import { useLoading } from "@/app/context/LoadingContext";
import { useHoverLine } from "@/app/hooks/useHoverLine";
import { useMenuAnimation } from "@/app/hooks/useMenuAnimation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TextReveal } from "./TextReveal";
import { NavLink } from "./NavLink";
import { MenuButton } from "./MenuButton";
import { TransitionLink } from "./TransitionLink";

type NavKey = 'work' | 'about' | 'contact';

const SCROLL_THRESHOLD = 50;
const NAV_ANIMATION_DURATION = 0.6;
const MENU_ANIMATION_DURATION = 0.5;

export const Navigation = () => {
    const pathname = usePathname();
    const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
    const { isLoading } = useLoading();
    const [isAtTop, setIsAtTop] = useState(true);

    const getActiveKey = (): NavKey | null => {
        if (pathname === "/work" || pathname.startsWith("/work/")) return 'work';
        if (pathname === "/about") return 'about';
        if (pathname === "/contact") return 'contact';
        return null;
    };

    const activeKey = getActiveKey();
    const navAppearDelay = isAtTop ? MENU_ANIMATION_DURATION : 0;
    const menuAppearDelay = !isAtTop ? NAV_ANIMATION_DURATION : 0;

    const { setHoveredKey, navListRef, hoverLineRef, linkRefSetters } = useHoverLine({
        activeKey,
        isAtTop,
        navAppearDelay,
    });

    const { menuContainerRef, menuCardRef, menuLinksRef } = useMenuAnimation(isMenuOpen);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY <= SCROLL_THRESHOLD);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMenuOpen) closeMenu();
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen, closeMenu]);

    const menuLinks = [
        { href: '/', label: 'HOME', isActive: pathname === '/' },
        { href: '/work', label: 'WORK', isActive: activeKey === 'work' },
        { href: '/about', label: 'ABOUT', isActive: activeKey === 'about' },
        { href: '/contact', label: 'CONTACT', isActive: activeKey === 'contact' },
    ];

    return (
        <>
            <div inert={!isAtTop || undefined} className={`hidden md:block fixed top-[8.06lvh] left-[3.33dvw] w-[86.04dvw] z-100 text-[0.55rem] lg:text-sm ${!isAtTop ? 'pointer-events-none' : ''}`}>
                <div className='flex justify-between items-center'>
                    <TransitionLink href="/">
                        <p>
                            <TextReveal isVisible={isAtTop && !isLoading} delay={navAppearDelay}>
                                CODE BY ADICK
                            </TextReveal>
                        </p>
                    </TransitionLink>
                    <ul ref={navListRef} className='relative flex gap-[8dvw] xl:gap-[12.97dvw]' onMouseLeave={() => setHoveredKey(null)}>
                        <li onMouseEnter={() => setHoveredKey('work')}>
                            <NavLink href="/work" isActive={activeKey === 'work'} isTextVisible={isAtTop && !isLoading} linkRef={linkRefSetters.work} revealDelay={navAppearDelay + 0.05}>
                                WORK
                            </NavLink>
                        </li>
                        <li onMouseEnter={() => setHoveredKey('about')}>
                            <NavLink href="/about" isActive={activeKey === 'about'} isTextVisible={isAtTop && !isLoading} linkRef={linkRefSetters.about} revealDelay={navAppearDelay + 0.1}>
                                ABOUT
                            </NavLink>
                        </li>
                        <li onMouseEnter={() => setHoveredKey('contact')}>
                            <NavLink href="/contact" isActive={activeKey === 'contact'} isTextVisible={isAtTop && !isLoading} linkRef={linkRefSetters.contact} revealDelay={navAppearDelay + 0.15}>
                                CONTACT ME
                            </NavLink>
                        </li>
                        <span ref={hoverLineRef} className="absolute bottom-0 h-[2px] bg-accent scale-x-0" />
                    </ul>
                </div>
            </div>

            <div inert={isAtTop || undefined} className={`hidden md:block fixed top-[8.06lvh] right-[3.33dvw] z-100 ${isAtTop ? 'pointer-events-none' : ''}`}>
                <MenuButton isVisible={!isAtTop} isOpen={isMenuOpen} onClick={toggleMenu} delay={menuAppearDelay} />
            </div>

            <div inert={isLoading || undefined} className={`md:hidden fixed top-[8.06lvh] right-4 z-100 transition-opacity duration-300 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <MenuButton isVisible={true} isOpen={isMenuOpen} onClick={toggleMenu} animated={false} />
            </div>

            <div ref={menuContainerRef} inert={!isMenuOpen || undefined} className="invisible fixed inset-0 z-99 p-2 md:p-[2dvw]">
                <div ref={menuCardRef} className="w-full h-full rounded-[24px] bg-background/40 backdrop-blur-2xl flex-center overflow-hidden">
                    <nav className="flex flex-col items-center gap-[4lvh]">
                        {menuLinks.map((item, i) => (
                            <div key={item.href} ref={el => { if (el) menuLinksRef.current[i] = el; }} className="group">
                                <TransitionLink href={item.href} onClick={closeMenu}>
                                    <div className="flex flex-col items-center gap-[0.15lvh]">
                                        <p className={`text-xl md:text-2xl uppercase tracking-widest transition-colors duration-300 ${item.isActive ? 'text-accent' : 'text-foreground'}`}>
                                            {item.label}
                                        </p>
                                        <span className="hidden md:block w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                                    </div>
                                </TransitionLink>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
