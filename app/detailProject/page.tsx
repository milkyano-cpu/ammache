export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import DetailProjectClient from "./detail-project-client"

export default async function DetailProjectPage() {
  const categories = await prisma.category.findMany({
    include: {
      projects: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  const serialized = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    projects: cat.projects.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      images: p.images,
      shortDescription: p.shortDescription,
      categoryName: cat.name,
      specifications: (p.specifications as unknown as { key: string; value: string }[]) || []
    })),
  }))

  return <DetailProjectClient categories={serialized} />
}
