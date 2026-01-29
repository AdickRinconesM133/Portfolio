import type { ReactNode } from "react"

interface TechCardProps {
    image: string
    title: string
    width?: string
    height?: string
}

export const TechCard = ({ image, title, width, height }: TechCardProps) => {
    return (
        <div className="flex flex-row items-center justify-center gap-[0.5dvw] border-[1px] border-accent rounded-full px-[0.8dvw] py-[0.8dvh]">
            <img src={image} alt={title} width={width} height={height} />
            <p className="text-md text-accent">{title}</p>
        </div>
    )
}
