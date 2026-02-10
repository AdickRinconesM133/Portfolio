import { TransitionLink } from "./TransitionLink";
import { TextReveal } from "./TextReveal";

interface NavLinkProps {
    href: string;
    children: string;
    isActive: boolean;
    isTextVisible: boolean;
    linkRef: (el: HTMLDivElement | null) => void;
    revealDelay?: number;
}

export const NavLink = ({ href, children, isActive, isTextVisible, linkRef, revealDelay = 0 }: NavLinkProps) => {
    return (
        <TransitionLink href={href}>
            <div ref={linkRef} className="flex flex-col items-center pb-[calc(0.15lvh+2px)]">
                <p className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-foreground'}`}>
                    <TextReveal isVisible={isTextVisible} delay={revealDelay}>
                        {children}
                    </TextReveal>
                </p>
            </div>
        </TransitionLink>
    );
};
