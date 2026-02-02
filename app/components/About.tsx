import Link from "next/link";
import { Card } from "./card";
import Image from "next/image";

export const About = () => {
    return (
        <div className="flex w-full lg:min-h-dvh h-auto overflow-hidden">
            <Card className="py-6 lg:py-[8dvh]">
                <div className="mx-4 md:ml-[10.63dvw] md:mr-[10dvw] xl:mr-[30dvw]">
                    <p className="text-accent text-[0.55rem] lg:text-xl">ABOUT ME</p>
                    <h2 className="mt-2 lg:mt-[4dvh]">ADICK <span className="text-accent">RINCONES</span></h2>
                    <p className="text-accent text-[0.55rem] lg:text-xl mt-2 lg:mt-[4dvh]">LET'S BUILD SOMETHING THAT MATTERS</p>
                    <p className="text-sm md:text-[0.8rem] mt-2 lg:mt-[4dvh]">Software Engineer specializing in Backend Development and Cloud Solutions. Focused on building robust, scalable systems that transform complex business needs into reliable, high-performance applications.</p>
                    <Link href="/about">
                        <p className="mt-2 lg:mt-[4dvh] text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] w-fit">LEARN MORE ABOUT ME</p>
                    </Link>
                    <div className="flex flex-wrap justify-start gap-x-3 md:gap-x-[1.75dvw] mt-2 lg:mt-[4dvh]">
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
        </div>
    )
}
