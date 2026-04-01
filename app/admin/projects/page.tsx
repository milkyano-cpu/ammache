import { prisma } from "@/lib/prisma"
import ProjectClient from "./project-page"

export const dynamic = "force-dynamic"

export default async function Page() {
  const projects = await prisma.project.findMany({
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return <ProjectClient initialData={JSON.parse(JSON.stringify(projects))} />
}
