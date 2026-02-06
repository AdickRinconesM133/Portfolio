'use client';

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const Background = () => {
    const circle1Ref = useRef<HTMLDivElement>(null);
    const circle2Ref = useRef<HTMLDivElement>(null);
    const vectorBRef = useRef<HTMLDivElement>(null);
    const vectorFRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const c1 = circle1Ref.current;
        const c2 = circle2Ref.current;
        const vb = vectorBRef.current;
        const vf = vectorFRef.current;
        if (!c1 || !c2 || !vb || !vf) return;

        const tl1 = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
        tl1.to(c1, { x: 60, y: -40, scale: 1.18, duration: 6 })
            .to(c1, { x: -45, y: 50, scale: 0.85, duration: 7 })
            .to(c1, { x: 30, y: -25, scale: 1.1, duration: 5 });

        const tl2 = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
        tl2.to(c2, { x: -50, y: 45, scale: 0.84, duration: 7 })
            .to(c2, { x: 40, y: -55, scale: 1.16, duration: 5.5 })
            .to(c2, { x: -30, y: 20, scale: 1.06, duration: 6.5 });

        const tlVb = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
        tlVb.to(vb, { y: -45, scale: 1.12, duration: 8 })
            .to(vb, { y: 35, scale: 0.9, duration: 9 })
            .to(vb, { y: -20, scale: 1.06, duration: 7 });

        const tlVf = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
        tlVf.to(vf, { y: 40, scale: 0.88, duration: 7.5 })
            .to(vf, { y: -35, scale: 1.14, duration: 8.5 })
            .to(vf, { y: 20, scale: 1.05, duration: 6 });

        return () => {
            tl1.kill();
            tl2.kill();
            tlVb.kill();
            tlVf.kill();
        };
    }, []);

    return (
        <div className="fixed bg-black w-full h-lvh z-[-1] overflow-hidden">
            <div className="absolute top-[30lvh] md:top-[55lvh] w-full h-lvh flex flex-col justify-center blur-[120px]">
                <div ref={vectorBRef} className="absolute w-full h-lvh">
                    <Image
                        className="w-full h-lvh"
                        src="/images/vector_b.webp"
                        alt="Vectorb"
                        width={1920}
                        height={1080}
                    />
                </div>
                <div ref={vectorFRef} className="absolute w-full h-[50lvh] top-[30lvh]">
                    <Image
                        className="w-full h-[50lvh]"
                        src="/images/vector_f.webp"
                        alt="Vectorf"
                        width={1920}
                        height={1080}
                    />
                </div>
            </div>
            <div ref={circle1Ref} className="absolute bg-secondary rounded-full blur-[280px] w-[40dvw] md:w-[20dvw] h-[40dvw] md:h-[20dvw] top-[15lvh] left-[7dvw]"></div>
            <div ref={circle2Ref} className="absolute bg-secondary rounded-full blur-[280px] w-[40dvw] md:w-[20dvw] h-[40dvw] md:h-[20dvw] top-[50lvh] right-[15dvw]"></div>
        </div>
    )
}
