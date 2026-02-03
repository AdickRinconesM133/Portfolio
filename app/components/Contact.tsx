import { Card } from "./card";
import Image from "next/image";
import Link from "next/link";

export const Contact = () => {
    return (
        <div id="contact" className="flex w-full overflow-hidden margin-top pb-[6dvh]">
            <Card className="py-6 lg:py-[8dvh]">
                <div className="ml-4 mr-4 md:ml-[10.63dvw] md:mr-[30dvw]">
                    <p className="text-foreground text-[0.55rem] lg:text-xl">CONTACT</p>
                    <h2 className="mt-2 lg:mt-[4dvh] text-[3rem]! md:text-[8rem]!">GOT A <span className="text-accent">PROJECT?</span></h2>
                    <p className="text-[0.65rem] md:text-[0.8rem] mt-4 lg:mt-[4dvh]">TELL ME ABOUT YOUR VISION AND I'LL HELP YOU BRING IT TO LIFE.</p>
                    <div className="flex flex-wrap justify-start gap-3 md:gap-x-[1.75dvw] mt-4 lg:mt-[4dvh]">
                        <Link href="/contact">
                            <p className="text-[0.65rem] md:text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] w-fit">GET IN TOUCH</p>
                        </Link>
                        <a href="https://linkedin.com/in/adickrincones/" target="_blank" rel="noopener noreferrer">
                            <p className="text-[0.65rem] md:text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] w-fit">CONNECT ON LINKEDIN</p>
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-start gap-x-3 md:gap-x-[1.75dvw] mt-4 lg:mt-[4dvh]">
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
