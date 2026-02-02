interface TechCardProps {
    image: string
    title: string
}

export const TechCard = ({ image, title }: TechCardProps) => {
    return (
        <div className="flex flex-row items-center justify-center gap-1 md:gap-[0.5dvw] border-[1px] border-accent rounded-full px-2 py-1 md:px-[0.8dvw] md:py-[0.8dvh]">
            <img src={image} alt={title} className="w-[1.2dvw] h-[1.2dvw] min-w-3 min-h-3" />
            <p className="text-md text-accent">{title}</p>
        </div>
    )
}
