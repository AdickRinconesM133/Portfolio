import type { Metadata } from "next";
import { Footer } from "../components";
import { ContactHero } from "./components";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Adick Rincones. Available for freelance projects, full-time positions, and technical consulting.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
    return (
        <div>
            <ContactHero />
            <Footer />
        </div>
    );
}