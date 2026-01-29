import { AboutHero, AboutStack } from "./components";
import { Contact, Footer } from "@/app/components";

export default function AboutPage() {
    return (
        <div className="w-full">
            <AboutHero />
            <AboutStack />
            <Contact />
            <Footer />
        </div>
    );
}