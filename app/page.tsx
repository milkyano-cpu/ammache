import { prisma } from "@/lib/prisma"
import HomeClient from "./home-client"

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { category: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: 8,
  })

  const serialized = projects.map((p) => ({
    id: p.id,
    slug: p.slug, 
    name: p.name,
    images: p.images,
    category: { name: p.category.name },
  }))

  return <HomeClient projects={serialized} />
}
