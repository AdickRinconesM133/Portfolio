import type { Metadata } from "next";
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

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
    const { slug } = await params;
    const work = getWorkBySlug(slug);

    if (!work) return {};

    const projectName = `${work.title} ${work.title2}`.trim();

    return {
        title: projectName,
        description: work.description,
        alternates: { canonical: `/work/${slug}` },
        openGraph: {
            title: `${projectName} | Adick Rincones`,
            description: work.description,
        },
        twitter: {
            title: `${projectName} | Adick Rincones`,
            description: work.description,
        },
    };
}

export default async function WorkPage({ params }: WorkPageProps) {
    const { slug } = await params;
    const work = getWorkBySlug(slug);

    if (!work) {
        notFound();
    }

    const nextWork = getNextWork(slug);

    const projectName = `${work.title} ${work.title2}`.trim();

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: projectName,
            description: work.description,
            url: `https://adickrincones.com/work/${work.slug}`,
            creator: {
                "@type": "Person",
                name: "Adick Rincones",
                url: "https://adickrincones.com",
            },
            keywords: work.techDescription,
            dateCreated: work.period,
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://adickrincones.com" },
                { "@type": "ListItem", position: 2, name: "Work", item: "https://adickrincones.com/work" },
                { "@type": "ListItem", position: 3, name: projectName, item: `https://adickrincones.com/work/${work.slug}` },
            ],
        },
    ];

    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WorkHero title={work.title} title2={work.title2} bgVideo={work.bgVideo} techIcons={work.techIcons} techNames={work.techNames} />
            <WorkDescription slug={work.slug} number={work.number} title={work.title} title2={work.title2} description={work.description} contribution={work.contribution} techDescription={work.techDescription} role={work.role} period={work.period} services={work.services} image={work.techIcons} techs={work.techNames} />
            <WorkGallery slug={work.slug} />
            <WorkNext slug={nextWork.slug} number={nextWork.number} title={nextWork.title} title2={nextWork.title2} hint={nextWork.hint} bgVideo={nextWork.bgVideo} image={nextWork.techIcons} techs={nextWork.techNames} techsShort={nextWork.techNamesShort} />
            <Contact />
            <Footer />
        </div>
    )

}
