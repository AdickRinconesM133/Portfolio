import type { Metadata } from "next";
import { AboutHero, AboutStack } from "./components";
import { Contact, Footer } from "@/app/components";

export const metadata: Metadata = {
  title: "About",
  description:
    "5+ years of experience with Next.js, React, Rust, and Golang. From ride-sharing platforms serving 100K+ users to production-grade cloud systems.",
  alternates: { canonical: "/about" },
};

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