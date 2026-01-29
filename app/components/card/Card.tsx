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
                "w-[93.44dvw] h-[93.44dvh]",
                className
            )}
        >
            {children}
        </div>
    )
}
