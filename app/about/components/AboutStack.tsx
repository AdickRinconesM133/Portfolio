import { Card } from "@/app/components/card";
import { ScrollCardReveal } from "@/app/components";

export const AboutStack = () => {
  const skillCategories = [
    {
      title: "FRONTEND",
      skills: ["REACT", "NEXT.JS", "TYPESCRIPT", "REACT NATIVE", "EXPO"],
    },
    {
      title: "BACKEND",
      skills: ["RUST", "NODE.JS", "GOLANG"],
    },
    {
      title: "DATABASE",
      skills: ["MONGODB", "POSTGRESQL", "MYSQL"],
    },
    {
      title: "CLOUD & DEVOPS",
      skills: ["DOCKER", "AWS", "CI/CD", "GNU/LINUX"],
    },
    {
      title: "SPECIALITIES",
      skills: ["MICROSERVICES", "EVENT-DRIVEN ARCHITECTURE", "SYSTEM DESIGN", "API DESIGN"],
    },
    {
      title: "TOOLS",
      skills: ["GIT", "FIREBASE", "OPENTELEMETRY", "GRAFANA"],
    },
  ];

  return (
    <div className="flex w-full flex-col pb-[15lvh] lg:pb-[6lvh]">
      <div className="margin-top mr-4 ml-4 lg:ml-[3.33dvw] lg:mr-[3.23dvw]">
        <ScrollCardReveal>
          <h2 className="text-right mt-2 mb-2 lg:mt-[4lvh] lg:mb-[4lvh]">
            TECH <span className="text-accent">STACK</span>
          </h2>
        </ScrollCardReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[1.5dvw]">
          {skillCategories.map((category, index) => (
            <ScrollCardReveal
              key={index}
              start="top 98%"
              end="top 85%"
            >
              <Card className="w-full lg:w-full lg:ml-0">
                <div className="p-4 lg:p-[1.5dvw] flex flex-col h-full">
                  <p className="text-[0.9rem] text-accent mb-[2lvh]">
                    {category.title}
                  </p>
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
  );
};
