import type { Metadata } from "next";
import { Hero, About, Work, Contact, Footer } from "./components";

export const metadata: Metadata = {
  title: "Adick Rincones — Software Engineer",
  description:
    "Software Engineer based in Buenos Aires, Argentina. Building scalable systems with Next.js, React, Rust, and Golang — from ride-sharing platforms to production-grade cloud systems.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}
