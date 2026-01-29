export const Footer = () => {
    return (
        <div className="flex flex-row justify-between items-center w-full h-[15dvh] overflow-hidden px-[13.96dvw]">
            <div className="text-[0.8rem]">
                <p>© 2026 ADICK RINCONES</p>
            </div>
            <div className="flex flex-row gap-[2dvw]">
                <a href="https://linkedin.com/in/adickrincones/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/linkedin.svg" alt="Linkedin" className="w-[2dvw] h-[2dvw] brightness-1000" />
                </a>
                <a href="https://instagram.com/kyddahh/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/instagram.svg" alt="Instagram" className="w-[2dvw] h-[2dvw] brightness-1000" />
                </a>
                <a href="https://github.com/AdickRinconesM133" target="_blank" rel="noopener noreferrer">
                    <img src="/images/github.svg" alt="Github" className="w-[2dvw] h-[2dvw] brightness-1000" />
                </a>
            </div>
        </div>
    )
}
