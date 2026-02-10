'use client';

import { useTransition } from "@/app/context/TransitionContext";
import Link from "next/link";
import type { ReactNode } from "react";

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export const TransitionLink = ({ href, children, className, onClick }: TransitionLinkProps) => {
    const { navigateTo } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick?.();
        navigateTo(href);
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
};
