import gsap from "gsap";
import { useEffect, useRef } from "react";

export const useMenuAnimation = (isMenuOpen: boolean) => {
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const menuCardRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLDivElement[]>([]);
    const menuInitRef = useRef(false);

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

    return { menuContainerRef, menuCardRef, menuLinksRef };
};
