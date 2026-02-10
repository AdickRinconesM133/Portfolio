import type { Metadata } from "next"
import { Work } from "./components"

export const metadata: Metadata = {
    title: "Work",
    description:
        "Selected projects spanning ride-sharing platforms, microservices architecture, EdTech systems, and cross-platform mobile apps.",
    alternates: { canonical: "/work" },
}

export default function WorkPage() {
    return (
        <div>
            <Work />
        </div>
    )
}
