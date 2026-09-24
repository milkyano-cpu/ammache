import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ammachearchitects.com.au";

export const revalidate = 3600;

const STATIC_PAGES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/nidal-ammache", changeFrequency: "monthly", priority: 0.9 },
  { path: "/detailProject", changeFrequency: "weekly", priority: 0.9 },
  { path: "/team", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/vip", changeFrequency: "yearly", priority: 0.5 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.5 },
];

async function getProjectEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const projects = await prisma.project.findMany({
      select: { slug: true },
    });

    return projects
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${SITE_URL}/detailProject/${encodeURIComponent(p.slug)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error("[sitemap] Gagal mengambil project dari database:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const projectEntries = await getProjectEntries();

  return [...staticEntries, ...projectEntries];
}
