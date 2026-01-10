import { Card } from "./card";
import Image from "next/image";

export const About = () => {
    return (
        <div className="flex w-full h-dvh overflow-hidden">
            <Card>
                <div className="ml-[10.63dvw] mr-[30dvw]">
                    <p className="text-accent text-xl">ABOUT ME</p>
                    <h2 className="mt-[4dvh]">ADICK <span className="text-accent">RINCONES</span></h2>
                    <p className="text-accent text-xl mt-[4dvh]">LET'S BUILD SOMETHING THAT MATTERS</p>
                    <p className="text-[1.1rem] mt-[4dvh]">Software Engineer specializing in Backend Development and Cloud Solutions. Focused on building robust, scalable systems that transform complex business needs into reliable, high-performance applications.</p>
                    <p className="mt-[4dvh] text-xl border border-accent rounded-full px-[0.6dvw] py-[0.6dvh] w-fit">LEARN MORE ABOUT ME</p>
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
