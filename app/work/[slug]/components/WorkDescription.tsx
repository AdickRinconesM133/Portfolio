import { Card } from "@/app/components/card"

interface WorkDescriptionProps {
    slug: string
    number: string
    title: string
    title2?: string
    description: string
    techDescription: string
    role: string
    period: string
    services: string[]
    image: string[]
    techs: string[]
}

export const WorkDescription = ({ slug, number, title, title2, description, techDescription, role, period, services, image, techs }: WorkDescriptionProps) => {
    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className="flex justify-center items-center margin-left h-auto md:h-dvh">
                <div className="flex flex-col items-center gap-[0.15dvh]">
                    <p className="font-league-gothic text-accent text-2xl">
                        {number}
                    </p>
                    <span className="block w-full h-[2px] bg-accent" />
                </div>
            </div>
            <div className="margin-top flex flex-col">
                <h2 className="mt-2 lg:mt-[4dvh] margin-left pb-2 lg:pb-[4dvh]">{title} <span className="text-accent">{title2}</span></h2>
                <div className="flex flex-col md:flex-row gap-4 md:gap-x-[4dvw]">
                    <div className="flex flex-col gap-y-[4dvh]">
                        <Card className="w-full md:w-[40dvw] h-auto py-8 md:py-[4dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">ABOUT THE PROJECT</p>
                            <p className="margin-left mr-[3.33dvw] text-[0.8rem] mt-[2dvh]">{description}</p>
                        </Card>
                        <Card className="w-full md:w-[40dvw] h-auto py-8 md:py-[4dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">TECHNOLOGIES USED</p>
                            <p className="margin-left mr-[3.33dvw] text-[0.8rem] mt-[2dvh]">{techDescription}</p>
                        </Card>
                        <Card className="w-full md:w-[40dvw] h-auto py-8 md:py-[4dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">ROLE</p>
                            <p className="margin-left mr-[3.33dvw] text-[0.8rem] mt-[2dvh]">{role}</p>
                        </Card>
                    </div>
                    <div className="flex flex-col gap-y-[4dvh]">
                        <Card className="w-full md:w-[37dvw] h-auto py-8 md:py-[4dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">PERIOD</p>
                            <p className="margin-left mr-[3.33dvw] text-[0.8rem] mt-[2dvh]">{period}</p>
                        </Card>
                        <Card className="w-full md:w-[37dvw] h-auto py-8 md:py-[4dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">SERVICES</p>
                            {services.map((service, index) => (
                                <p key={index} className="margin-left mr-[3.33dvw] mt-[2dvh] text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] w-fit">{service}</p>
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
