interface TechCardProps {
    image: string
    title: string
}

export const TechCard = ({ image, title }: TechCardProps) => {
    return (
        <div className="flex flex-row items-center justify-center gap-[0.5dvw] border-[1px] border-accent rounded-full px-[0.8dvw] py-[0.8dvh]">
            <img src={image} alt={title} className="w-[1.2dvw] h-[1.2dvw] min-w-4 min-h-4" />
            <p className="text-md text-accent">{title}</p>
        </div>
    )
}
