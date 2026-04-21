import { prisma } from "@/lib/prisma"
import HomeClient from "./home-client"

const MAX = 8

export default async function Home() {
  const featured = await prisma.project.findMany({
    where: { published: true, isHomepage: true },
    include: { category: { select: { id: true, name: true } } },
    orderBy: { homepageOrder: "asc" },
  })

  const remaining = MAX - featured.length
  const fillers =
    remaining > 0
      ? await prisma.project.findMany({
          where: {
            published: true,
            id: { notIn: featured.map((p) => p.id) },
          },
          include: { category: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
          take: remaining,
        })
      : []

  const projects = [...featured, ...fillers]

  const serialized = projects.map((p) => ({
    id: p.id,
    slug: p.slug, 
    name: p.name,
    images: p.images,
    category: { name: p.category.name },
  }))

  return <HomeClient projects={serialized} />
}
