import { cn } from "@/app/lib/utils"
import { TechCard } from "./TechCard"
import Link from "next/link";

interface WorkCardProps {
    slug: string;
    number: string
    title: string
    title2?: string
    className?: string
    image: string[]
    techs?: string[]
}

export const WorkCard = ({ slug, number, title, title2, className, image, techs }: WorkCardProps) => {
    return (
        <Link href={`/work/${slug}`}>
            <div
                className={cn(
                    "bg-background/40 rounded-[24px] flex items-center justify-start",
                    "w-[93.44dvw] h-[93.44dvh]",
                    className
                )}
            >
                <div className="margin-left flex-1 flex items-center gap-[3dvw] pr-[3.33dvw]">
                    <div className="flex items-center gap-[3dvw] w-[66%]">
                        <p className="font-league-gothic text-accent text-2xl">
                            {number}
                        </p>
                        <h2 className="text-[5rem]!">{title}{title2 && ` ${title2}`}</h2>
                    </div>
                    <div className="flex flex-1 items-center justify-between">
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
