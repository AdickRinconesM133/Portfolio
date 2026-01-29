export const Footer = () => {
    return (
        <div className="flex flex-row justify-between items-center w-full h-[15dvh] overflow-hidden px-[13.96dvw]">
            <div className="text-[0.8rem]">
                <p>© 2026 ADICK RINCONES</p>
            </div>
            <div className="flex flex-row gap-[2dvw]">
                <img src="images/linkedin.svg" alt="Linkedin" className="w-[2dvw] h-[2dvw] brightness-1000" />
                <img src="images/instagram.svg" alt="Instagram" className="w-[2dvw] h-[2dvw] brightness-1000" />
                <img src="images/github.svg" alt="Github" className="w-[2dvw] h-[2dvw] brightness-1000" />
            </div>
        </div>
    )
}
