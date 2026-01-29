import { Card } from "@/app/components/card";

export const AboutHero = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="mt-[18.06dvh] ml-[10.63dvw] margin-right">
                <p className="text-accent text-xl">ABOUT ME</p>
                <h2 className="mt-[4dvh]">ADICK <span className="text-accent">RINCONES</span></h2>
                <p className="text-accent text-xl mt-[4dvh]">LET'S BUILD SOMETHING THAT MATTERS</p>
            </div>
            <div className="ml-[6.67dvw] margin-right mt-[4dvh]">
                <Card width="45dvw" height="35dvh">
                    <p className="text-[0.8rem] margin-left mr-[3.33dvw]">Hi, I'm Adick - a Software Engineer specializing in Backend Development & Cloud Solutions!</p>
                    <p className="text-[0.8rem] mt-[4dvh] margin-left mr-[3.33dvw]">Full Stack Developer with 5+ years in Rust and React Native. Microservices, cross-platform applications, and systems for millions of users. Experience with event-driven architecture, Docker, and distributed observability.</p>
                </Card>
            </div>
        </div>
    );
}