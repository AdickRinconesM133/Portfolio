import { WorkCard } from "@/app/components/card"
import { ScrollCardReveal } from "@/app/components"
import { works } from "@/app/data/works"
import { WorkHeader } from "./WorkHeader"

export const Work = () => {
    return (
        <div id="work" className="flex w-full flex-col pb-[6dvh]">
            <WorkHeader />
            <div className="margin-top flex flex-col px-4 lg:px-0 lg:ml-[3.33dvw] gap-[4dvw]">
                {works.map((work, index) => {
                    const isFirst = index === 0;
                    const isLast = index === works.length - 1;

                    return (
                        <ScrollCardReveal
                            key={work.slug}
                            start={isFirst ? "top 98%" : isLast ? "top 95%" : undefined}
                            end={isFirst ? "top 70%" : isLast ? "top 80%" : undefined}
                        >
                            <WorkCard
                                slug={work.slug}
                                number={work.number}
                                title={work.title}
                                title2={work.title2}
                                hint={work.hint}
                                bgVideo={work.bgVideo}
                                className="w-full lg:w-[93.34dvw] h-auto lg:h-[35dvh]"
                                image={work.techIcons}
                                techs={work.techNames}
                                techsShort={work.techNamesShort}
                            />
                        </ScrollCardReveal>
                    );
                })}
            </div>
        </div>
    )
}
