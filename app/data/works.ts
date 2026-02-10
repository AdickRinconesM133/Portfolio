export interface GalleryItem {
    type: 'image' | 'video'
    url: string
}

export interface Work {
    slug: string
    title: string
    title2: string
    number: string
    description: string
    contribution: string
    techIcons: string[]
    techNames: string[]
    techNamesShort?: string[]
    techDescription: string
    role: string
    period: string
    services: string[]
    hint: string
    bgVideo: string
}

export const works: Work[] = [
    {
        slug: "rigolo-app",
        title: "Rigolo",
        title2: "App",
        number: "01",
        description: "Rigolo App is a US-based software company that builds custom administrative platforms for clients operating at scale. The current flagship project is a management system for large-scale pet vaccination campaigns across the United States, handling scheduling, logistics, and real-time operational tracking.",
        contribution: "Architected the microservices backend in Rust with Actix-Web using hexagonal architecture and event-driven communication via NATS JetStream. Built cross-platform applications with React Native and Expo Router, implemented distributed observability with OpenTelemetry and Grafana, and deployed containerized infrastructure with Docker and automated CI/CD. Mentored by a senior Apple engineer on production-grade architecture and system design patterns.",
        techIcons: ["/images/react.png", "/images/rust.png", "/images/docker.png"],
        techNames: ["REACT NATIVE", "RUST", "DOCKER"],
        techNamesShort: ["RN", "RUST", "DOCKER"],
        techDescription: "Rust, Actix-Web, React Native, Expo, TypeScript, NATS JetStream, Docker, Firebase, OpenTelemetry, Grafana",
        role: "Full-Stack Developer",
        period: "2020-PRESENT",
        services: ["MICROSERVICES ARCHITECTURE", "CROSS-PLATFORM DEVELOPMENT", "EVENT-DRIVEN SYSTEMS", "OBSERVABILITY", "CI/CD"],
        hint: "Production-grade microservices platform",
        bgVideo: "/images/Backgrounds/bgRigolo.png"
    },
    {
        slug: "vamos-app",
        title: "Vamos",
        title2: "App",
        number: "02",
        description: "Vamos App is a ride-sharing platform operating across 3 cities in Venezuela, serving 100K+ active users and coordinating 1,000+ drivers. The platform includes a core passenger application, a dedicated driver app, and administrative tools for fleet and operations management.",
        contribution: "Led the complete platform migration from Basic4Android to React Native with Expo and a Rust backend. Built an admin portal with Golang, integrated an OpenAI-powered chatbot for customer support, developed a spa management system, and maintained high-availability production infrastructure with monitoring, automated backups, and CI/CD pipelines.",
        techIcons: ["/images/react.png", "/images/rust.png", "/images/mysql.png"],
        techNames: ["REACT NATIVE", "RUST", "MYSQL"],
        techNamesShort: ["RN", "RUST", "MYSQL"],
        techDescription: "React Native, Expo, Rust, Golang, MySQL, OpenAI API, CI/CD",
        role: "Full-Stack Developer",
        period: "2024-2025",
        services: ["FULL-STACK DEVELOPMENT", "PLATFORM MIGRATION", "AI INTEGRATION", "DATABASE MANAGEMENT", "CI/CD"],
        hint: "Ride-sharing platform for 100K+ users",
        bgVideo: "/images/Backgrounds/bgVamos.png"
    },
    {
        slug: "drip-gaming",
        title: "Drip",
        title2: "Gaming",
        number: "03",
        description: "An AAA-scale first and third-person shooter built in Unreal Engine 5, blending fast-paced combat mechanics inspired by Titanfall with high-fidelity visuals. The project was developed under the supervision of a Senior Technical Game Designer currently working on Tomb Raider. Discontinued before launch due to company restructuring.",
        contribution: "Overhauled enemy AI behavior trees to enhance ability utilization across combat encounters. Developed a modular weapon framework in C++ with realistic physics simulation, reducing asset creation time by 40%. Integrated Epic Online Services for multiplayer supporting up to 10 concurrent players, customized the Lyra framework, and implemented Niagara Particle Systems for visual effects.",
        techIcons: ["/images/c++.png", "/images/git.png", "/images/unreal.png"],
        techNames: ["C++", "GITHUB", "UNREAL ENGINE"],
        techNamesShort: ["C++", "GITHUB", "UE"],
        techDescription: "C++, Unreal Engine 5 (UE5), Lyra Starter Game Framework, Niagara Particle Systems, Epic Online Services",
        role: "Gameplay Programmer",
        period: "2023",
        services: ["GAMEPLAY MECHANICS", "AI LOGIC", "MULTIPLAYER NETWORK", "PHYSICS SIMULATION", "SYSTEM OPTIMIZATION"],
        hint: "AAA gameplay systems",
        bgVideo: "/images/Backgrounds/bgDrip.png"
    },
    {
        slug: "sae",
        title: "SAE",
        title2: "",
        number: "04",
        description: "SAE AsistEscolar is a Venezuelan EdTech company with over 20 years of operation, providing school management solutions to 800+ educational institutions nationwide — including public, private, and parochial schools. Their platform handles grades, payments, communication, and compliance with the Ministry of Education.",
        contribution: "Built a scalable multi-tenant payroll system with multi-currency support, automating payments for 500+ employees with role-based access control. Developed a real-time ticketing platform with QR code validation and analytics. Led the technical modernization of the department by implementing agile methodologies and version control standards.",
        techIcons: ["/images/react.png", "/images/node.png", "/images/mongo.png"],
        techNames: ["NEXT.JS", "NODE.JS", "MONGODB"],
        techDescription: "Next.js, Node.js, MongoDB, Git, ClickUp",
        role: "Full-Stack Developer",
        period: "2023-2024",
        services: ["FULL-STACK DEVELOPMENT", "END-TO-END SYSTEM", "FINTECH AUTOMATION", "WORKFLOW OPTIMIZATION", "TEAM TRAINING"],
        hint: "EdTech platform for 800+ institutions",
        bgVideo: "/images/Backgrounds/bgSae.png"
    }
]

export const getWorkBySlug = (slug: string) => {
    return works.find(work => work.slug === slug)
}

export const getNextWork = (slug: string) => {
    const index = works.findIndex(work => work.slug === slug)
    return works[index + 1] || works[0]
}
