import Link from "next/link";
import { Card } from "./card";
import { ScrollCardReveal } from "./ScrollCardReveal";
import Image from "next/image";

export const About = () => {
    return (
        <div className="flex w-full lg:min-h-lvh h-auto overflow-hidden pb-[15lvh] lg:pb-0">
            <ScrollCardReveal className="w-full">
                <Card className="py-6 lg:py-[8lvh]">
                    <div className="mx-4 md:ml-[10.63dvw] md:mr-[10dvw] xl:mr-[30dvw]">
                        <p className="text-accent text-[0.55rem] lg:text-xl">ABOUT ME</p>
                        <h2 className="mt-2 lg:mt-[4lvh]">ADICK <span className="text-accent">RINCONES</span></h2>
                        <p className="text-accent text-[0.55rem] lg:text-xl mt-2 lg:mt-[4lvh]">LET'S BUILD SOMETHING THAT MATTERS</p>
                        <p className="text-[0.65rem] md:text-[0.8rem] mt-4 lg:mt-[4lvh]">Software Engineer with 5+ years building scalable systems with Next.js, React, and Rust. Specialized in modern frontend architecture, event-driven microservices, and production-grade backend systems.</p>
                        <Link href="/about">
                            <p className="mt-4 lg:mt-[4lvh] text-[0.65rem] md:text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] w-fit">LEARN MORE ABOUT ME</p>
                        </Link>
                        <div className="flex flex-wrap justify-start gap-x-3 md:gap-x-[1.75dvw] mt-4 lg:mt-[4lvh]">
                            <a href="https://linkedin.com/in/adickrincones/" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-foreground border">
                                <Image
                                    className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4 brightness-1000"
                                    src="/images/linkedin.svg"
                                    alt="Linkedin"
                                    width={20}
                                    height={20}
                                />
                            </a>
                            <a href="https://instagram.com/kyddahh/" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-foreground border">
                                <Image
                                    className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4 brightness-1000"
                                    src="/images/instagram.svg"
                                    alt="Instagram"
                                    width={20}
                                    height={20}
                                />
                            </a>
                            <a href="https://github.com/AdickRinconesM133" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-foreground border">
                                <Image
                                    className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4 brightness-1000"
                                    src="/images/github.svg"
                                    alt="Github"
                                    width={20}
                                    height={20}
                                />
                            </a>
                        </div>
                    </div>
                </Card>
            </ScrollCardReveal>
        </div>
    )
}
