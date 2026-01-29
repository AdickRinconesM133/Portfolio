export interface Work {
    slug: string
    title: string
    title2: string
    number: string
    description: string
    techIcons: string[]
    techNames: string[]
    techDescription: string
    role: string
    period: string
    services: string[]
    images: string[]
    bgVideo: string
}

export const works: Work[] = [
    {
        slug: "vamos-app",
        title: "Vamos",
        title2: "App",
        number: "01",
        description: "VAMOS-APP is the company's flagship application, comprising a core user platform and a dedicated driver admin portal. This ongoing project focuses on continuous feature development and operational optimization. A key initiative involved integrating AI-powered support automation to enhance user experience and efficiency.",
        techIcons: ["/images/react.png", "/images/go.png", "/images/mysql.png"],
        techNames: ["REACT.JS", "GOLANG", "MYSQL"],
        techDescription: "Go, React, Python, MySQL, OpenAI API, CI/CD, Trello",
        role: "Full-Stack Developer",
        period: "2024-2025",
        images: ["@/app/public/images/vamos-app.png"],
        services: ["FULL-STACK DEVELOPMENT", "AI INTEGRATION", "DATABASE MANAGEMENT", "CI/CD", "AGILE METHODOLOGIES"],
        bgVideo: "/images/Backgrounds/bgVamos.png"
    },
    {
        slug: "sae",
        title: "SAE",
        title2: "",
        number: "02",
        description: "Development of robust enterprise solutions, including a scalable multi-tenant payroll system capable of handling multi-currency transactions. The role also expanded into event technology with a real-time ticketing platform. Beyond coding, the focus included leading the technical modernization of the department by implementing agile methodologies and version control standards.",
        techIcons: ["/images/react.png", "/images/node.png", "/images/mongo.png"],
        techNames: ["NEXT.JS", "NODE.JS", "MONGODB"],
        techDescription: "Next.js, Node.js, MongoDB, Git, ClickUp",
        role: "Full-Stack Developer",
        period: "2025",
        images: ["/images/sae.png"],
        services: ["FULL-STACK DEVELOPMENT", "END-TO-END SYSTEM", "FINTECH AUTOMATION", "WORKFLOW OPTIMIZATION", "TEAM TRAINING"],
        bgVideo: "/images/Backgrounds/bgSae.png"
    },
    {
        slug: "drip-gaming",
        title: "Drip",
        title2: "Gaming",
        number: "03",
        description: "Engineering core gameplay systems for high-fidelity gaming experiences across two distinct productions. Work included the optimization of an unannounced AAA title using the Lyra Framework and the architectural design of a modular weapon system for Dark Aviary, emphasizing realistic physics and scalable code.",
        techIcons: ["/images/c++.png", "/images/git.png", "/images/unreal.png"],
        techNames: ["C++", "GITHUB", "UNREAL ENGINE"],
        techDescription: "C++, Unreal Engine 5 (UE5), Lyra Starter Game Framework.",
        role: "Gameplay Programmer",
        period: "2023-2024",
        services: ["GAMEPLAY MECHANICS", "AI LOGIC", "MULTIPLAYER NETWORK", "PYSICS SIMULATION", "SYSTEM OPTIMIZATION"],
        images: ["/images/drip-gaming.png"],
        bgVideo: "/images/Backgrounds/bgDrip.png"
    }
]

export const getWorkBySlug = (slug: string) => {
    return works.find(work => work.slug === slug)
}

export const getNextWork = (slug: string) => {
    const index = works.findIndex(work => work.slug === slug)
    return works[index + 1] || works[0]
}
