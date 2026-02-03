import Image from "next/image";

export const Hero = () => {
    return (
        <div className="flex w-full h-dvh overflow-hidden items-center justify-center lg:items-start lg:justify-end">
            <div className="px-4 lg:px-0 lg:mt-[27.87dvh] lg:mr-[10.63dvw]">
                <p className=" text-accent text-[0.55rem] lg:text-s text-right mb-1 lg:mb-[2.2dvh]">BUILDING THE FUTURE COMMIT BY COMMIT </p>
                <h1 className=" text-right text-[6rem]! md:text-[9rem]! lg:text-[13dvw]!">SOFTWARE</h1>
                <h3 className=" text-right font-bold! font-neuemontreal! tracking-wider mt-[0.5dvh]">ENGINEER</h3>
                <ul className="flex flex-wrap mt-2 mb-3 lg:mt-[4dvh] lg:mb-[5dvh] justify-end gap-x-3 md:gap-x-[1.88dvw]">
                    <li className=" text-accent text-[0.55rem] lg:text-s text-right">NEXT.JS</li>
                    <li className=" text-accent text-[0.55rem] lg:text-s text-right">RUST</li>
                    <li className=" text-accent text-[0.55rem] lg:text-s text-right">PYTHON</li>
                    <li className=" text-accent text-[0.55rem] lg:text-s text-right">GOLANG</li>
                    <li className=" text-accent text-[0.55rem] lg:text-s text-right">AWS</li>
                    <li className="hidden md:list-item text-accent text-[0.55rem] lg:text-s text-right">KUBERNETES</li>
                    <li className="hidden md:list-item text-accent text-[0.55rem] lg:text-s text-right">DOCKER</li>
                </ul>
                <div className="flex flex-wrap justify-end gap-x-3 md:gap-x-[1.75dvw]">
                    <a href="https://linkedin.com/in/adickrincones/" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4"
                            src="/images/linkedin.svg"
                            alt="Linkedin"
                            width={20}
                            height={20}
                        />
                    </a>
                    <a href="https://instagram.com/kyddahh/" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4"
                            src="/images/instagram.svg"
                            alt="Instagram"
                            width={20}
                            height={20}
                        />
                    </a>
                    <a href="https://github.com/AdickRinconesM133" target="_blank" rel="noopener noreferrer" className="flex-center w-[4.1dvw] h-[4.1dvw] min-w-8 min-h-8 rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw] min-w-4 min-h-4"
                            src="/images/github.svg"
                            alt="Github"
                            width={20}
                            height={20}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}
