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
        <div className="flex w-full h-[60dvh] lg:h-dvh! items-center justify-center lg:justify-end">
            <img src={bgVideo} alt={title} className="absolute top-0 left-0 w-full h-[60dvh] lg:h-dvh z-[-1] brightness-50 object-cover" />
            <div className="absolute top-0 left-0 w-full h-[60dvh] lg:h-dvh z-0 bg-[#00060A] opacity-60" />
            <div className="mx-4 lg:mx-0 lg:mr-[10.63dvw] mt-0 lg:mt-[20dvh] z-1 flex flex-col items-center lg:items-end">
                <h1 className="text-center lg:text-right">{title}{title2 && ` ${title2}`}</h1>
                <div className="flex flex-wrap justify-center lg:justify-end gap-x-3 md:gap-x-[1.88dvw] mt-[3dvh]">
                    <TechCard image={techIcons[0]} title={techNames[0]} />
                    <TechCard image={techIcons[1]} title={techNames[1]} />
                    <TechCard image={techIcons[2]} title={techNames[2]} />
                </div>
            </div>
        </div>
    )
}