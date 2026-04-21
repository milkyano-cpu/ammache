import { prisma } from "@/lib/prisma"
import HomepageProjectsClient from "./homepage-projects-client"

export default async function HomepageProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { category: { select: { name: true } } },
    orderBy: [{ isHomepage: "desc" }, { homepageOrder: "asc" }, { createdAt: "desc" }],
  })

  const serialized = projects.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    images: p.images,
    isHomepage: p.isHomepage,
    homepageOrder: p.homepageOrder,
    category: { name: p.category.name },
  }))

  return <HomepageProjectsClient initialProjects={serialized} />
}
