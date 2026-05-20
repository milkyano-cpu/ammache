import { prisma } from "@/lib/prisma"
import ProjectOrderClient from "./project-order-client"

export const dynamic = "force-dynamic"

export default async function ProjectOrderPage() {
  const [categories, projects] = await Promise.all([
    prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    }),
    prisma.project.findMany({
      include: { category: { select: { id: true, name: true } } },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    }),
  ])

  const serializedProjects = projects.map((p) => ({
    id: p.id,
    name: p.name,
    images: p.images,
    order: p.order,
    categoryId: p.categoryId,
    category: p.category,
  }))

  return <ProjectOrderClient categories={categories} initialProjects={serializedProjects} />
}
