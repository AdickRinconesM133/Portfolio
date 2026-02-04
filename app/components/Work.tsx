import Link from "next/link"
import { WorkCard } from "./card"
import { works } from "@/app/data/works"
import { ScrollCardReveal } from "./ScrollCardReveal"
import { ScrollTriggerText } from "./ScrollTriggerText"

export const Work = () => {
    return (
        <div id="work" className="flex w-full flex-col pb-[15dvh] lg:pb-[6dvh]">
            <div className="margin-top margin-left margin-right">
                <ScrollTriggerText className="text-accent text-[0.55rem] lg:text-xl text-right w-full">WORK</ScrollTriggerText>
                <h2 className="text-right mt-2 lg:mt-[4dvh] flex justify-end">
                    <ScrollTriggerText>
                        PROJECT <span className="text-accent">HIGHLIGHT</span>
                    </ScrollTriggerText>
                </h2>
                <ScrollTriggerText className="text-accent text-[0.55rem] lg:text-xl text-right mt-2 lg:mt-[4dvh] w-full">THESE ARE A SELECTION OF MY WORK</ScrollTriggerText>
            </div>
            <div className="margin-top flex flex-col px-4 lg:px-0 lg:ml-[3.33dvw] gap-[2dvw]">
                {works.slice(0, 2).map((work) => (
                    <ScrollCardReveal key={work.slug} className="w-full">
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
                ))}
                <ScrollCardReveal className="self-center">
                    <Link
                        href="/work"
                        className="border border-accent rounded-full px-6 py-3 md:px-[3dvw] md:py-[1.5dvh] text-accent text-[0.55rem] lg:text-xl tracking-wider transition-colors duration-300 hover:bg-accent hover:text-background"
                    >
                        EXPLORE ALL PROJECTS
                    </Link>
                </ScrollCardReveal>
            </div>
        </div>
    )
}
