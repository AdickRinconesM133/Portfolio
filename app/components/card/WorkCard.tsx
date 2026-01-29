import type { ReactNode } from "react"
import { TechCard } from "./TechCard"

interface WorkCardProps {
    number: string
    title: string
    width?: string
    height?: string
    image: string[]
    techs?: string[]
}

export const WorkCard = ({ number, title, width, height, image, techs }: WorkCardProps) => {
    return (
        <div
            className="bg-background/40 rounded-[24px] flex items-center justify-start"
            style={{ width: width || "93.44dvw", height: height || "93.44dvh" }}
        >
            <div className="margin-left flex-1 flex items-center gap-[3dvw] pr-[3.33dvw]">
                <div className="flex items-center gap-[3dvw] w-[66%]">
                    <p className="font-league-gothic text-accent text-2xl">
                        {number}
                    </p>
                    <h2 className="text-[5rem]!">{title}</h2>
                </div>
                <div className="flex flex-1 items-center justify-between">
                    <div className="flex flex-col gap-[1dvw] items-start">
                        <div className="flex gap-[1dvw]">
                            <TechCard image={image[0]} title={techs?.[0] || ""} width="23dvw" height="23dvh" />
                            <TechCard image={image[1]} title={techs?.[1] || ""} width="23dvw" height="23dvh" />
                        </div>
                        <TechCard image={image[2]} title={techs?.[2] || ""} width="23dvw" height="23dvh" />
                    </div>
                    <div className="border-[1px] border-accent rounded-full w-[4dvw] h-[4dvw] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-[0.1dvw] w-[1dvw] h-[1dvw] text-accent">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
