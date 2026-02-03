import { cn } from "@/app/lib/utils"
import { TechCard } from "./TechCard"
import Link from "next/link";

interface WorkCardProps {
    slug: string;
    number: string
    title: string
    title2?: string
    hint?: string
    bgVideo?: string
    className?: string
    image: string[]
    techs?: string[]
    techsShort?: string[]
}

export const WorkCard = ({ slug, number, title, title2, hint, bgVideo, className, image, techs, techsShort }: WorkCardProps) => {
    const mobileTechs = techsShort || techs
    return (
        <Link href={`/work/${slug}`} className="group">
            <div
                className={cn(
                    "bg-background/40 rounded-[24px] flex items-center justify-start relative overflow-hidden",
                    "w-full h-auto lg:w-[93.44dvw]",
                    className
                )}
            >
                {bgVideo && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                        <img src={bgVideo} alt="" className="w-full h-full object-cover" />
                        <div
                            className="absolute inset-0 backdrop-blur-lg"
                            style={{ maskImage: 'linear-gradient(to right, black 0%, black 35%, transparent 30%)' }}
                        />
                        <div
                            className="absolute inset-0 backdrop-blur-lg"
                            style={{ maskImage: 'linear-gradient(to left, black 0%, black 35%, transparent 30%)' }}
                        />
                    </div>
                )}
                <div className="margin-left flex-1 flex items-center gap-3 md:gap-[3dvw] pr-4 md:pr-[3.33dvw] py-6 md:py-0 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-[3dvw] w-full md:w-[66%]">
                        <div className="flex items-center gap-3 md:gap-[3dvw]">
                            <div className="flex flex-col items-center gap-[0.15dvh]">
                                <p className="font-league-gothic text-accent text-2xl">
                                    {number}
                                </p>
                                <span className="block w-full h-[2px] bg-accent" />
                            </div>
                            <h2 className="text-[1.8rem]! md:text-[4rem]!">{title}{title2 && ` ${title2}`}</h2>
                        </div>
                        {/* Mobile TechCards */}
                        <div className="flex md:hidden items-center gap-3">
                            {/* Invisible spacer matching number width */}
                            <div className="flex flex-col items-center gap-[0.15dvh] invisible" aria-hidden="true">
                                <p className="font-league-gothic text-2xl">00</p>
                                <span className="block w-full h-[2px]" />
                            </div>
                            <div className="flex gap-2">
                                <TechCard image={image[0]} title={mobileTechs?.[0] || ""} size="sm" />
                                <TechCard image={image[1]} title={mobileTechs?.[1] || ""} size="sm" />
                                <TechCard image={image[2]} title={mobileTechs?.[2] || ""} size="sm" />
                            </div>
                        </div>
                    </div>
                    {hint && (
                        <div className="absolute-center hidden md:flex items-center gap-[0.6dvw] transition-opacity duration-500 group-hover:opacity-0">
                            <span className="flex items-center justify-center w-[2.2dvw] h-[2.2dvw] min-w-7 min-h-7 rounded-full border border-accent text-accent text-[0.9rem] font-bold leading-[0] pl-[0.2dvw]">!</span>
                            <p className="text-accent text-[0.7rem] uppercase tracking-wider">{hint}</p>
                        </div>
                    )}
                    <div className="hidden md:flex flex-1 items-center justify-between">
                        <div className="flex flex-col gap-[1dvw] items-start">
                            <div className="flex gap-[1dvw]">
                                <TechCard image={image[0]} title={techs?.[0] || ""} />
                                <TechCard image={image[1]} title={techs?.[1] || ""} />
                            </div>
                            <TechCard image={image[2]} title={techs?.[2] || ""} />
                        </div>
                        <div className="border-[1px] border-accent rounded-full w-[4dvw] h-[4dvw] min-w-10 min-h-10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-[0.1dvw] w-[1dvw] h-[1dvw] min-w-3 min-h-3 text-accent">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
