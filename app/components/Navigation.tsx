'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export const Navigation = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (lastScrollY <= window.scrollY) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`fixed top-[8.06dvh] left-[3.33dvw] w-[86.04dvw] z-100 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-[10dvh]'}`}>
            <div className='flex justify-between items-center'>
                <Link href="/">
                    <p>CODE BY ADICK</p>
                </Link>
                <ul className='flex gap-[12.97dvw]'>
                    <li>
                        <Link href="/work"><p>WORK</p></Link>
                    </li>
                    <li>
                        <Link href="/about"><p>ABOUT</p></Link>
                    </li>
                    <li>
                        <Link href="/contact"><p>CONTACT ME</p></Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
