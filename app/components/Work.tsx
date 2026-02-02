import Link from "next/link"
import { WorkCard } from "./card"
import { works } from "@/app/data/works"

export const Work = () => {
    return (
        <div id="work" className="flex w-full flex-col pb-[6dvh]">
            <div className="margin-top margin-left margin-right">
                <p className="text-accent text-xl text-right">WORK</p>
                <h2 className="text-right mt-[4dvh]">PROJECT <span className="text-accent">HIGHLIGHT</span></h2>
                <p className="text-accent text-xl text-right mt-[4dvh]">THESE ARE A SELECTION OF MY WORK</p>
            </div>
            <div className="margin-top margin-left flex flex-col gap-[2dvw]">
                {works.slice(0, 2).map((work) => (
                    <WorkCard
                        key={work.slug}
                        slug={work.slug}
                        number={work.number}
                        title={work.title}
                        title2={work.title2}
                        hint={work.hint}
                        bgVideo={work.bgVideo}
                        className="w-[93.34dvw] h-[25dvh] md:h-[35dvh]"
                        image={work.techIcons}
                        techs={work.techNames}
                    />
                ))}
                <Link
                    href="/work"
                    className="border border-accent rounded-full px-6 py-3 md:px-[3dvw] md:py-[1.5dvh] text-accent text-xl tracking-wider self-center transition-colors duration-300 hover:bg-accent hover:text-background"
                >
                    EXPLORE ALL PROJECTS
                </Link>
            </div>
        </div>
    )
}
