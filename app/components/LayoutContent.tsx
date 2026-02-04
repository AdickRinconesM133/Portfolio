'use client';

import { useMenu } from "@/app/context/MenuContext";
import type { ReactNode } from "react";

export const LayoutContent = ({ children }: { children: ReactNode }) => {
    const { isMenuOpen } = useMenu();

    return (
        <div className={isMenuOpen ? 'invisible pointer-events-none' : ''}>
            {children}
        </div>
    );
};
