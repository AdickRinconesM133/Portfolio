import { Card } from "@/app/components/card";
import { ScrollCardReveal } from "@/app/components";

interface WorkDescriptionProps {
  slug: string;
  number: string;
  title: string;
  title2?: string;
  description: string;
  contribution: string;
  techDescription: string;
  role: string;
  period: string;
  services: string[];
  image: string[];
  techs: string[];
}

export const WorkDescription = ({
  slug,
  number,
  title,
  title2,
  description,
  contribution,
  techDescription,
  role,
  period,
  services,
  image,
  techs,
}: WorkDescriptionProps) => {
  return (
    <div className="flex flex-col md:flex-row w-full pb-[15lvh] lg:pb-0">
      <div className="flex justify-center items-center margin-left h-auto md:h-lvh">
        <div className="flex flex-col items-center gap-[0.15lvh] pt-[3lvh]!">
          <p className="font-league-gothic text-accent text-2xl">{number}</p>
          <span className="block w-full h-[2px] bg-accent" />
        </div>
      </div>
      <div className="margin-top flex flex-col">
        <ScrollCardReveal>
          <h2 className="mt-2 lg:mt-[4lvh] margin-left pb-[4lvh] text-center lg:text-left">
            {title} <span className="text-accent">{title2}</span>
          </h2>
        </ScrollCardReveal>
        <div className="flex flex-col md:flex-row gap-4 md:gap-x-[4dvw]">
          <div className="flex flex-col gap-y-[4lvh]">
            <ScrollCardReveal>
              <Card className="w-[93.44dvw] lg:w-[40.5dvw]! h-auto py-8 md:py-[4lvh]">
                <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">
                  ABOUT THE PROJECT
                </p>
                <p className="margin-left mr-[3.33dvw] text-[0.65rem] md:text-[0.8rem] mt-[2lvh]">
                  {description}
                </p>
              </Card>
            </ScrollCardReveal>
            <ScrollCardReveal>
              <Card className="w-[93.44dvw] lg:w-[40.5dvw]! h-auto py-8 md:py-[4lvh]">
                <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">
                  MY CONTRIBUTION
                </p>
                <p className="margin-left mr-[3.33dvw] text-[0.65rem] md:text-[0.8rem] mt-[2lvh]">
                  {contribution}
                </p>
              </Card>
            </ScrollCardReveal>
            <ScrollCardReveal>
              <Card className="w-[93.44dvw] lg:w-[40.5dvw]! h-auto py-8 md:py-[4lvh]">
                <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">
                  TECHNOLOGIES USED
                </p>
                <p className="margin-left mr-[3.33dvw] text-[0.65rem] md:text-[0.8rem] mt-[2lvh]">
                  {techDescription}
                </p>
              </Card>
            </ScrollCardReveal>
            <ScrollCardReveal>
              <Card className="w-[93.44dvw] lg:w-[40.5dvw]! h-auto py-8 md:py-[4lvh]">
                <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">
                  ROLE
                </p>
                <p className="margin-left mr-[3.33dvw] text-[0.65rem] md:text-[0.8rem] mt-[2lvh]">
                  {role}
                </p>
              </Card>
            </ScrollCardReveal>
          </div>
          <div className="flex flex-col gap-y-[4lvh] pt-[2lvh] lg:pt-0">
            <ScrollCardReveal>
              <Card className="w-[93.44dvw] lg:w-[40.5dvw]! h-auto py-8 md:py-[4lvh]">
                <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">
                  PERIOD
                </p>
                <p className="margin-left mr-[3.33dvw] text-[0.65rem] md:text-[0.8rem] mt-[2lvh]">
                  {period}
                </p>
              </Card>
            </ScrollCardReveal>
            <ScrollCardReveal>
              <Card className="w-[93.44dvw] lg:w-[40.5dvw]! h-auto py-8 md:py-[4lvh]">
                <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">
                  SERVICES
                </p>
                {services.map((service, index) => (
                  <p
                    key={index}
                    className="margin-left mr-[3.33dvw] mt-[2lvh] text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] w-fit"
                  >
                    {service}
                  </p>
                ))}
              </Card>
            </ScrollCardReveal>
          </div>
        </div>
      </div>
    </div>
  );
};
