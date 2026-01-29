import { notFound } from "next/navigation";
import { getWorkBySlug, works, getNextWork } from "@/app/data/works";
import { WorkHero, WorkGallery, WorkDescription } from "./components";
import { Contact } from "@/app/components";
import { Footer } from "@/app/components";
import { WorkNext } from "./components";

interface WorkPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkPage({ params }: WorkPageProps) {
    const { slug } = await params;
    const work = getWorkBySlug(slug);

    if (!work) {
        notFound();
    }

    const nextWork = getNextWork(slug);

    return (
        <div>
            <WorkHero title={work.title} title2={work.title2} bgVideo={work.bgVideo} techIcons={work.techIcons} techNames={work.techNames} />
            <WorkDescription slug={work.slug} number={work.number} title={work.title} title2={work.title2} description={work.description} techDescription={work.techDescription} role={work.role} period={work.period} services={work.services} image={work.techIcons} techs={work.techNames} />
            <WorkGallery slug={work.slug} />
            <WorkNext slug={nextWork.slug} number={nextWork.number} title={nextWork.title} title2={nextWork.title2} image={nextWork.techIcons} techs={nextWork.techNames} />
            <Contact />
            <Footer />
        </div>
    )

}
