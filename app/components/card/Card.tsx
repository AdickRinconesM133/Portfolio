import { cn } from "@/app/lib/utils"

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div
            className={cn(
                "margin-left bg-background/40 rounded-[24px] flex flex-col justify-center",
                "w-[95%] h-auto md:w-[93.44dvw]",
                className
            )}
        >
            {children}
        </div>
    )
}
