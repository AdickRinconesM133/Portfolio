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
        <div className="flex w-full">
            <div className="flex justify-center items-center margin-left h-dvh">
                <p className="font-league-gothic text-accent text-2xl">
                    {number}
                </p>
            </div>
            <div className="margin-top flex flex-col">
                <h2 className="mt-[4dvh] margin-left pb-[4dvh]">{title} <span className="text-accent">{title2}</span></h2>
                <div className="flex gap-x-[4dvw]">
                    <div className="flex flex-col gap-y-[4dvh]">
                        <Card className="w-[40dvw] h-[40dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent mb-[-3dvh]">ABOUT THE PROJECT</p>
                            <p className="margin-left mr-[3.33dvw] text-[0.8rem] mt-[4dvh]">{description}</p>
                        </Card>
                        <Card className="w-[40dvw] h-[20dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent mb-[-3dvh]">TECHNOLOGIES USED</p>
                            <p className="margin-left mr-[3.33dvw] text-[0.8rem] mt-[4dvh]">{techDescription}</p>
                        </Card>
                        <Card className="w-[40dvw] h-[15dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent mb-[-3dvh]">ROLE</p>
                            <p className="margin-left mr-[3.33dvw] text-[0.8rem] mt-[4dvh]">{role}</p>
                        </Card>
                    </div>
                    <div className="flex flex-col gap-y-[4dvh]">
                        <Card className="w-[37dvw] h-[15dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent mb-[-3dvh]">PERIOD</p>
                            <p className="margin-left mr-[3.33dvw] text-[0.8rem] mt-[4dvh]">{period}</p>
                        </Card>
                        <Card className="w-[37dvw] h-[50dvh]">
                            <p className="margin-left mr-[3.33dvw] text-[0.9rem] text-accent">SERVICES</p>
                            {services.map((service, index) => (
                                <p key={index} className="margin-left mr-[3.33dvw] mt-[2dvh] text-[0.8rem]! border border-accent rounded-full px-[0.8vw] py-[0.8vh] w-fit">{service}</p>
                            ))}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
