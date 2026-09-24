import "server-only";
import { prisma } from "@/lib/prisma"

export type ProjectSpec = { key: string; value: string };

export type CaseStudyProject = {
  slug: string;
  name: string;
  description: string | null; 
  images: string[];
  specifications: ProjectSpec[]; 
};

function cleanHtml(html: string | null): string | null {
  if (!html) return null;
  const cleaned = html
    .replace(/\s(style|align|class)="[^"]*"/gi, "")
    .replace(/<p>(\s|&nbsp;)*<\/p>/gi, "")
    .trim();
  return cleaned.length ? cleaned : null;
}

function parseSpecs(raw: unknown): ProjectSpec[] {
  let value = raw;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      key: String((item as { key?: unknown })?.key ?? "").trim(),
      value: String((item as { value?: unknown })?.value ?? "").trim(),
    }))
    .filter((spec) => spec.key && spec.value);
}

export async function getCaseStudyProjects(slugs: string[]): Promise<Map<string, CaseStudyProject>> {
  try {
    const rows = await prisma.project.findMany({
      where: { slug: { in: slugs } },
      select: { slug: true, name: true, description: true, images: true, specifications: true },
    });

    return new Map(
      rows.map((row) => [
        row.slug,
        {
          slug: row.slug,
          name: row.name,
          description: cleanHtml(row.description),
          images: (row.images ?? []).filter(Boolean),
          specifications: parseSpecs(row.specifications),
        },
      ]),
    );
  } catch (error) {
    console.error("[nidal-ammache] Gagal mengambil project dari database:", error);
    return new Map();
  }
}
