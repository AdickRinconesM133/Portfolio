import { Card } from "./card";
import Image from "next/image";

export const Contact = () => {
    return (
        <div className="flex w-full h-dvh overflow-hidden">
            <Card>
                <div className="ml-[10.63dvw] mr-[30dvw]">
                    <h2 className="mt-[4dvh] text-[8rem]!">GOT A <span className="text-accent">PROJECT?</span></h2>
                    <p className="text-[0.8rem] mt-[4dvh]">TELL ME ABOUT YOUR VISION AND I'LL HELP YOU BRING IT TO LIFE.</p>
                    <div className="flex flex-wrap justify-start gap-x-[1.75dvw]">
                        <p className="mt-[4dvh] text-[0.8rem]! border border-accent rounded-full px-[0.8vw] py-[0.8vh] w-fit">GET IN TOUCH</p>
                        <p className="mt-[4dvh] text-[0.8rem]! border border-accent rounded-full px-[0.8vw] py-[0.8vh] w-fit">CONNECT ON LINKEDIN</p>
                    </div>
                    <div className="flex flex-wrap justify-start gap-x-[1.75dvw] mt-[4dvh]">
                        <button className="flex-center w-[4.1dvw] h-[4.1dvw] rounded-full border-foreground border">
                            <Image
                                className="w-[2.2dvw] h-[2.2dvw] brightness-1000"
                                src="/images/linkedin.svg"
                                alt="Linkedin"
                                width={20}
                                height={20}
                            />
                        </button>
                        <button className="flex-center w-[4.1dvw] h-[4.1dvw] rounded-full border-foreground border">
                            <Image
                                className="w-[2.2dvw] h-[2.2dvw] brightness-1000"
                                src="/images/instagram.svg"
                                alt="Instagram"
                                width={20}
                                height={20}
                            />
                        </button>
                        <button className="flex-center w-[4.1dvw] h-[4.1dvw] rounded-full border-foreground border">
                            <Image
                                className="w-[2.2dvw] h-[2.2dvw] brightness-1000"
                                src="/images/github.svg"
                                alt="Github"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
