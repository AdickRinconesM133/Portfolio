import { Card } from "@/app/components/card";

export const AboutHero = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="mt-24 md:mt-[18.06dvh] ml-4 md:ml-[10.63dvw] margin-right">
                <p className="text-accent text-[0.55rem] lg:text-xl">ABOUT ME</p>
                <h2 className="mt-2 lg:mt-[4dvh]">ADICK <span className="text-accent">RINCONES</span></h2>
                <p className="text-accent text-[0.55rem] lg:text-xl mt-2 lg:mt-[4dvh]">LET'S BUILD SOMETHING THAT MATTERS</p>
            </div>
            <div className="ml-4 md:ml-[6.67dvw] margin-right mt-2 lg:mt-[4dvh]">
                <Card className="w-full h-auto md:w-[45dvw] py-8 md:py-[4dvh]">
                    <p className="text-[0.8rem] margin-left mr-[3.33dvw]">Hi, I'm Adick - a Software Engineer specializing in Backend Development & Cloud Solutions!</p>
                    <p className="text-[0.8rem] mt-[4dvh] margin-left mr-[3.33dvw]">Full Stack Developer with 5+ years in Rust and React Native. Microservices, cross-platform applications, and systems for millions of users. Experience with event-driven architecture, Docker, and distributed observability.</p>
                </Card>
            </div>
        </div>
    );
}