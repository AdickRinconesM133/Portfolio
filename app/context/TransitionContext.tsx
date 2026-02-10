"use client";

import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const TRANSITION_DURATION = 0.5;

const PAGE_NAMES: Record<string, string> = {
  "/": "HOME",
  "/work": "WORK",
  "/about": "ABOUT",
  "/contact": "CONTACT",
};

const getPageName = (href: string): string => {
  if (PAGE_NAMES[href]) return PAGE_NAMES[href];
  if (href.startsWith("/work/")) {
    const slug = href.replace("/work/", "").replace(/-/g, " ");
    return slug.toUpperCase();
  }
  return "";
};

interface TransitionContextValue {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const isTransitioning = useRef(false);
  const hasNavigated = useRef(false);
  const [destinationName, setDestinationName] = useState("");

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay) return;
    gsap.set(overlay, { yPercent: 100 });
    if (text) gsap.set(text, { opacity: 0, y: 30 });
  }, []);

  useEffect(() => {
    if (!hasNavigated.current) return;
    hasNavigated.current = false;

    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay) {
      isTransitioning.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { yPercent: 100 });
        if (text) gsap.set(text, { opacity: 0, y: 30 });
        isTransitioning.current = false;
      },
    });

    if (text) {
      tl.to(text, { opacity: 0, y: -20, duration: 0.25, ease: "power2.in" });
    }
    tl.to(
      overlay,
      {
        yPercent: -100,
        duration: TRANSITION_DURATION,
        ease: "power3.inOut",
      },
      text ? "-=0.1" : 0,
    );
  }, [pathname]);

  const navigateTo = (href: string) => {
    if (href === pathname || isTransitioning.current) return;
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay) {
      router.push(href);
      return;
    }

    isTransitioning.current = true;
    hasNavigated.current = true;
    setDestinationName(getPageName(href));

    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href);
      },
    });

    tl.fromTo(
      overlay,
      { yPercent: 100 },
      { yPercent: 0, duration: TRANSITION_DURATION, ease: "power3.inOut" },
    );

    if (text) {
      tl.fromTo(
        text,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        "-=0.15",
      );
    }
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[150] bg-background pointer-events-none flex-center"
      >
        <h2 ref={textRef} className="opacity-0">
          {destinationName}
        </h2>
      </div>
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};
