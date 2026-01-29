import { WorkCard } from "./card"

export const Work = () => {
    return (
        <div className="flex w-full flex-col pb-[17dvh]">
            <div className="margin-top margin-left margin-right">
                <p className="text-accent text-xl text-right">WORK</p>
                <h2 className="text-right mt-[4dvh]">PROJECT <span className="text-accent">HIGHLIGHT</span></h2>
                <p className="text-accent text-xl text-right mt-[4dvh]">THESE ARE A SELECTION OF MY WORK</p>
            </div>
            <div className="margin-top margin-left flex flex-col gap-[4dvw]">
                <WorkCard number="01" title="VAMOS APP" width="93.34dvw" height="35dvh" image={["/images/react.png", "/images/go.png", "/images/mysql.png"]} techs={["REACT.JS", "GOLANG", "MYSQL"]} />
                <WorkCard number="02" title="SAE" width="93.34dvw" height="35dvh" image={["/images/react.png", "/images/node.png", "/images/mongo.png"]} techs={["NEXT.JS", "NODE.JS", "MONGODB"]} />
                <WorkCard number="03" title="DRIP GAMING" width="93.34dvw" height="35dvh" image={["/images/c++.png", "/images/git.png", "/images/unreal.png"]} techs={["C++", "GITHUB", "UNREAL ENGINE"]} />
            </div>
        </div>
    )
}
