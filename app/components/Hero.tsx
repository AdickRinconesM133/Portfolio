import Image from "next/image";

export const Hero = () => {
    return (
        <div className="flex w-full h-dvh overflow-hidden justify-end">
            <div className=" mt-[27.87dvh] margin-right">
                <p className=" text-accent text-s text-right mb-[2.2dvh]">BUILDING THE FUTURE COMMIT BY COMMIT </p>
                <h1 className=" text-right mb-[-1.5dvh]">SOFTWARE</h1>
                <h2 className=" text-right font-bold! font-neuemontreal! tracking-wider">ENGINEER</h2>
                <ul className="flex flex-wrap mt-[4dvh] mb-[5dvh] justify-end gap-x-[1.88dvw]">
                    <li className=" text-accent text-s text-right">NEXT.JS</li>
                    <li className=" text-accent text-s text-right">RUST</li>
                    <li className=" text-accent text-s text-right">PYTHON</li>
                    <li className=" text-accent text-s text-right">GOLANG</li>
                    <li className=" text-accent text-s text-right">AWS</li>
                    <li className=" text-accent text-s text-right">KUBERNETES</li>
                    <li className=" text-accent text-s text-right">DOCKER</li>
                </ul>
                <div className="flex flex-wrap justify-end gap-x-[3.5dvw]">
                    <button className="flex-center w-[4.1dvw] h-[4.1dvw] rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw]"
                            src="/images/linkedin.svg"
                            alt="Linkedin"
                            width={20}
                            height={20}
                        />
                    </button>
                    <button className="flex-center w-[4.1dvw] h-[4.1dvw] rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw]"
                            src="/images/instagram.svg"
                            alt="Instagram"
                            width={20}
                            height={20}
                        />
                    </button>
                    <button className="flex-center w-[4.1dvw] h-[4.1dvw] rounded-full border-accent border">
                        <Image
                            className="w-[2.2dvw] h-[2.2dvw]"
                            src="/images/github.svg"
                            alt="Github"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
