import { WorkCard } from "@/app/components/card"

interface WorkNextProps {
    slug: string
    number: string
    title: string
    title2?: string
    hint?: string
    bgVideo?: string
    image: string[]
    techs: string[]
    techsShort?: string[]
}

export const WorkNext = ({ slug, number, title, title2, hint, bgVideo, image, techs, techsShort }: WorkNextProps) => {
    return (
        <div className="flex w-full flex-col pb-[15dvh] lg:pb-[6dvh]">
            <div className="margin-top margin-left margin-right">
                <h2 className="text-right mt-2 lg:mt-[4dvh]">UP <span className="text-accent">NEXT</span></h2>
            </div>
            <div className="margin-top flex flex-col px-4 lg:px-0 lg:ml-[3.33dvw] gap-[4dvw]">
                <WorkCard slug={slug} number={number} title={title} title2={title2} hint={hint} bgVideo={bgVideo} image={image} techs={techs} techsShort={techsShort} className="w-full lg:w-[93.34dvw] h-auto lg:h-[35dvh]" />
            </div>
        </div>
    )
}
