import { TechCard } from "@/app/components/card";

interface WorkHeroProps {
    title: string
    title2?: string
    bgVideo: string
    techIcons: string[]
    techNames: string[]
}

export const WorkHero = ({ title, title2, bgVideo, techIcons, techNames }: WorkHeroProps) => {
    return (
        <div className="flex w-full h-dvh justify-end">
            <img src={bgVideo} alt={title} className="absolute top-0 left-0 w-full h-dvh z-[-1] brightness-50" />
            <div className="absolute top-0 left-0 w-full h-dvh z-0 bg-[#00060A] opacity-60" />
            <div className="margin-right mt-[20dvh] md:mt-[32.5dvh] z-1">
                <h1 className="text-right">{title}{title2 && ` ${title2}`}</h1>
                <div className="flex flex-wrap justify-end gap-x-3 md:gap-x-[1.88dvw] mt-[3dvh]">
                    <TechCard image={techIcons[0]} title={techNames[0]} />
                    <TechCard image={techIcons[1]} title={techNames[1]} />
                    <TechCard image={techIcons[2]} title={techNames[2]} />
                </div>
            </div>
        </div>
    )
}