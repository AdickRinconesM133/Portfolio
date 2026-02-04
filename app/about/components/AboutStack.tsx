import { Card } from "@/app/components/card";
import { ScrollCardReveal } from "@/app/components";

export const AboutStack = () => {
    const skillCategories = [
        {
            title: "BACKEND",
            skills: ["RUST", "GOLANG", "PYTHON"]
        },
        {
            title: "INFRASTRUCTURE",
            skills: ["CI/CD", "DOCKER", "AWS", "KUBERNETES"]
        },
        {
            title: "SPECIALITIES",
            skills: ["API DESIGN", "SYSTEM DESIGN", "AI & AUTOMATION", "PIPELINES"]
        },
        {
            title: "FRONTEND",
            skills: ["REACT.JS", "NEXT.JS", "TYPESCRIPT"]
        },
        {
            title: "DATABASE",
            skills: ["MYSQL", "MONGODB", "POSTGRESQL"]
        },
        {
            title: "TOOLS",
            skills: ["GIT", "GITHUB", "TRELLO", "FIGMA"]
        }
    ];

    return (
        <div className="flex w-full flex-col pb-[15dvh] lg:pb-[6dvh]">
            <div className="margin-top mr-4 ml-4 lg:ml-[3.33dvw] lg:mr-[3.23dvw]">
                <ScrollCardReveal>
                    <h2 className="text-right mt-2 mb-2 lg:mt-[4dvh] lg:mb-[4dvh]">TECH <span className="text-accent">STACK</span></h2>
                </ScrollCardReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[1.5dvw]">
                    {skillCategories.map((category, index) => (
                        <ScrollCardReveal key={index}>
                            <Card className="w-full lg:w-full lg:ml-0">
                                <div className="p-4 lg:p-[1.5dvw] flex flex-col h-full">
                                    <p className="text-[0.9rem] text-accent mb-[2dvh]">{category.title}</p>
                                    <div className="flex flex-wrap gap-2 lg:gap-[0.5dvw]">
                                        {category.skills.map((skill, skillIndex) => (
                                            <p
                                                key={skillIndex}
                                                className="text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 lg:px-[0.8vw] lg:py-[0.8vh] w-fit"
                                            >
                                                {skill}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </ScrollCardReveal>
                    ))}
                </div>
            </div>
        </div>
    )
}
