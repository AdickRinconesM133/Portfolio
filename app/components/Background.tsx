import Image from "next/image";

export const Background = () => {
    return (
        <div className="fixed bg-black w-full h-lvh z-[-1] overflow-hidden">
            <div className="absolute top-[30lvh] md:top-[55lvh] w-full h-lvh flex flex-col justify-center blur-[120px]">
                <div className="absolute w-full h-lvh">
                    <Image
                        className="w-full h-lvh"
                        src="/images/vector_b.webp"
                        alt="Vectorb"
                        width={1920}
                        height={1080}
                    />
                </div>
                <div className="absolute w-full h-[50lvh] top-[30lvh]">
                    <Image
                        className="w-full h-[50lvh]"
                        src="/images/vector_f.webp"
                        alt="Vectorf"
                        width={1920}
                        height={1080}
                    />
                </div>
            </div>
            <div className="absolute bg-secondary rounded-full blur-[280px] w-[40dvw] md:w-[20dvw] h-[40dvw] md:h-[20dvw] top-[15lvh] left-[7dvw]"></div>
            <div className="absolute bg-secondary rounded-full blur-[280px] w-[40dvw] md:w-[20dvw] h-[40dvw] md:h-[20dvw] top-[50lvh] right-[15dvw]"></div>
        </div>
    )
}
