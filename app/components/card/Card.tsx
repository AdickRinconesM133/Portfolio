import { cn } from "@/app/lib/utils"

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div
            className={cn(
                "ml-auto mr-auto lg:ml-[3.33dvw] lg:mr-0 bg-background/40 rounded-[24px] flex flex-col justify-center",
                "w-[calc(100%-2rem)] h-auto lg:w-[93.44dvw]",
                className
            )}
        >
            {children}
        </div>
    )
}
