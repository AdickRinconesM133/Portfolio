import { Card } from "./card";
import Image from "next/image";
import Link from "next/link";

export const Contact = () => {
    return (
        <div id="contact" className="flex w-full h-dvh overflow-hidden margin-top">
            <Card>
                <div className="ml-[10.63dvw] mr-[30dvw]">
                    <h2 className="mt-[4dvh] text-[8rem]!">GOT A <span className="text-accent">PROJECT?</span></h2>
                    <p className="text-[0.8rem] mt-[4dvh]">TELL ME ABOUT YOUR VISION AND I'LL HELP YOU BRING IT TO LIFE.</p>
                    <div className="flex flex-wrap justify-start gap-x-[1.75dvw]">
                        <Link href="/contact">
                            <p className="mt-[4dvh] text-[0.8rem]! border border-accent rounded-full px-[0.8vw] py-[0.8vh] w-fit">GET IN TOUCH</p>
                        </Link>
                        <a href="https://linkedin.com/in/adickrincones/" target="_blank" rel="noopener noreferrer">
                            <p className="mt-[4dvh] text-[0.8rem]! border border-accent rounded-full px-[0.8vw] py-[0.8vh] w-fit">CONNECT ON LINKEDIN</p>
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-start gap-x-[1.75dvw] mt-[4dvh]">
                        <a href="https://linkedin.com/in/adickrincones/" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-foreground border">
                            <Image
                                className="w-[2.2dvw] h-[2.2dvw] brightness-1000"
                                src="/images/linkedin.svg"
                                alt="Linkedin"
                                width={20}
                                height={20}
                            />
                        </a>
                        <a href="https://instagram.com/kyddahh/" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-foreground border">
                            <Image
                                className="w-[2.2dvw] h-[2.2dvw] brightness-1000"
                                src="/images/instagram.svg"
                                alt="Instagram"
                                width={20}
                                height={20}
                            />
                        </a>
                        <a href="https://github.com/AdickRinconesM133" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-foreground border">
                            <Image
                                className="w-[2.2dvw] h-[2.2dvw] brightness-1000"
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
