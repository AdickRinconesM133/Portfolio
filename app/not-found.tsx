'use client';

import { TransitionLink } from "./components/TransitionLink";

export default function NotFound() {
    return (
        <div className="flex-center flex-col h-lvh pt-[10lvh] gap-[4lvh] text-center px-4">
            <p className="text-accent text-[0.55rem] lg:text-xl">404 — PAGE NOT FOUND</p>
            <h2>WRONG<br /><span className="text-accent">TURN</span></h2>
            <p className="text-[0.65rem] md:text-[0.8rem] max-w-[40ch]">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <TransitionLink href="/">
                <p className="text-[0.65rem] md:text-[0.8rem] border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] transition-colors duration-300 hover:bg-accent hover:text-background">
                    BACK TO HOME
                </p>
            </TransitionLink>
        </div>
    );
}
