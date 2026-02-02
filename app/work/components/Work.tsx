import { WorkCard } from "@/app/components/card"
import { works } from "@/app/data/works"

export const Work = () => {
    return (
        <div id="work" className="flex w-full flex-col pb-[6dvh]">
            <div className="mt-24 md:mt-[18.06dvh] margin-left margin-right">
                <p className="text-accent text-[0.55rem] lg:text-xl text-right">WORK</p>
                <h2 className="text-right mt-2 lg:mt-[4dvh]">PROJECT <span className="text-accent">HIGHLIGHT</span></h2>
                <p className="text-accent text-[0.55rem] lg:text-xl text-right mt-2 lg:mt-[4dvh]">THESE ARE A SELECTION OF MY WORK</p>
            </div>
            <div className="margin-top margin-left flex flex-col gap-[4dvw]">
                {works.map((work) => (
                    <WorkCard
                        key={work.slug}
                        slug={work.slug}
                        number={work.number}
                        title={work.title}
                        title2={work.title2}
                        hint={work.hint}
                        bgVideo={work.bgVideo}
                        className="w-[93.34dvw] h-auto lg:h-[35dvh]"
                        image={work.techIcons}
                        techs={work.techNames}
                    />
                ))}
            </div>
        </div>
    )
}
