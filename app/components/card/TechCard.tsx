interface TechCardProps {
    image: string
    title: string
    size?: "sm" | "md"
}

export const TechCard = ({ image, title, size = "md" }: TechCardProps) => {
    return (
        <div className={`flex flex-row items-center justify-center border-[1px] border-accent rounded-full ${
            size === "sm"
                ? "gap-1 px-2 py-0.5"
                : "gap-1 md:gap-[0.5dvw] px-2 py-1 md:px-[0.8dvw] md:py-[0.8lvh]"
        }`}>
            <img
                src={image}
                alt={title}
                className={size === "sm" ? "w-3 h-3" : "w-[1.2dvw] h-[1.2dvw] min-w-3 min-h-3"}
            />
            <p className={`text-accent ${size === "sm" ? "text-[0.65rem]" : "text-md"}`}>
                {title}
            </p>
        </div>
    )
}
