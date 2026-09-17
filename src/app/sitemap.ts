import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hemantbaghel.netlify.app";
  return [
    { url: base, lastModified: new Date() },
    ...projects.map((p) => ({
      url: `${base}/work/${p.id}`,
      lastModified: new Date(),
    })),
  ];
}
