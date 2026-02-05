import { WorkCard } from "@/app/components/card"
import { ScrollCardReveal } from "@/app/components"

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
        <div className="flex w-full flex-col pb-[15lvh] lg:pb-[6lvh]">
            <ScrollCardReveal className="margin-top margin-left margin-right">
                <h2 className="text-right mt-2 lg:mt-[4lvh]">UP <span className="text-accent">NEXT</span></h2>
            </ScrollCardReveal>
            <div className="margin-top flex flex-col px-4 lg:px-0 lg:ml-[3.33dvw] gap-[4dvw]">
                <ScrollCardReveal>
                    <WorkCard slug={slug} number={number} title={title} title2={title2} hint={hint} bgVideo={bgVideo} image={image} techs={techs} techsShort={techsShort} className="w-full lg:w-[93.34dvw] h-auto lg:h-[35lvh]" />
                </ScrollCardReveal>
            </div>
        </div>
    )
}
