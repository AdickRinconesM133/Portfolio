import type { MetadataRoute } from "next";
import { works } from "@/app/data/works";

const BASE_URL = "https://adickrincones.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/work`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.7 },
  ];

  const workRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${BASE_URL}/work/${work.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes];
}
