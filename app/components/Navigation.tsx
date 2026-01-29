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
        <div className={`fixed w-[86.04dvw] margin-center margin-top z-100 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-[10dvh]'}`}>
            <div className='flex justify-between items-center'>
                <Link href="/">
                    <p>CODE BY ADICK</p>
                </Link>
                <ul className='flex gap-[12.97dvw]'>
                    <li>WORK</li>
                    <li>ABOUT</li>
                    <li>CONTACT ME</li>
                </ul>
            </div>
        </div>
    )
}
