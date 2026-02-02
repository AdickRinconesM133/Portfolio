import { Card } from "@/app/components/card";

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
        <div className="flex w-full flex-col pb-[6dvh]">
            <div className="margin-top margin-left margin-right">
                <h2 className="text-right mt-2 mb-2 lg:mt-[4dvh] lg:mb-[4dvh]">TECH <span className="text-accent">STACK</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[2dvw]">
                    {skillCategories.map((category, index) => (
                        <Card
                            key={index}
                            className="w-full h-auto"
                        >
                            <div className="p-4 md:p-[2dvw] flex flex-col h-full">
                                <p className="text-[0.9rem] text-accent mb-[2dvh]">{category.title}</p>
                                <div className="flex flex-wrap gap-2 md:gap-[0.5dvw]">
                                    {category.skills.map((skill, skillIndex) => (
                                        <p
                                            key={skillIndex}
                                            className="text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] w-fit"
                                        >
                                            {skill}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
