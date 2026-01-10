import React from "react"

interface CardProps {
    children: React.ReactNode;
    width?: string;
    height?: string;
}

export const Card = ({ children, width, height }: CardProps) => {
    return (
        <div
            className="margin-left bg-background/40 rounded-[24px] flex flex-col justify-center"
            style={{ width: width || "93.44dvw", height: height || "93.44dvh" }}
        >
            {children}
        </div>
    )
}
