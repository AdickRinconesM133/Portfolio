import Image from "next/image";

export const Background = () => {
    return (
        <div className="fixed bg-black w-full h-dvh z-[-1] overflow-hidden">
            <div className="absolute top-[55dvh] w-full h-dvh flex flex-col justify-center blur-[120px]">
                <div className="absolute w-full h-dvh">
                    <Image
                        className="w-full h-dvh"
                        src="/images/vector_b.webp"
                        alt="Vectorb"
                        width={1920}
                        height={1080}
                    />
                </div>
                <div className="absolute w-full h-[50dvh] top-[30dvh]">
                    <Image
                        className="w-full h-[50dvh]"
                        src="/images/vector_f.webp"
                        alt="Vectorf"
                        width={1920}
                        height={1080}
                    />
                </div>
            </div>
            <div className="absolute bg-secondary rounded-full blur-[280px] w-[20dvw] h-[20dvw] top-[15dvh] left-[7dvw]"></div>
            <div className="absolute bg-secondary rounded-full blur-[280px] w-[20dvw] h-[20dvw] top-[50dvh] right-[15dvw]"></div>
        </div>
    )
}
