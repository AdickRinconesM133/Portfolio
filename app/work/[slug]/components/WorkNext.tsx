import { WorkCard } from "@/app/components/card"

interface WorkNextProps {
    slug: string
    number: string
    title: string
    title2?: string
    image: string[]
    techs: string[]
}

export const WorkNext = ({ slug, number, title, title2, image, techs }: WorkNextProps) => {
    return (
        <div className="flex w-full flex-col pb-[6dvh]">
            <div className="margin-top margin-left margin-right">
                <h2 className="text-right mt-[4dvh]">UP <span className="text-accent">NEXT</span></h2>
            </div>
            <div className="margin-top margin-left flex flex-col gap-[4dvw]">
                <WorkCard slug={slug} number={number} title={title} title2={title2} image={image} techs={techs} className="w-[93.34dvw] h-[35dvh]" />
            </div>
        </div>
    )
}
