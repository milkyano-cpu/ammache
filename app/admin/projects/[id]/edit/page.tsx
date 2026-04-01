import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/services/project-service"
import { ProjectForm } from "@/components/admin/project-form"
import type { Specification } from "@/lib/types/project"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
  const { id: idParam } = await params
  const id = parseInt(idParam)

  if (isNaN(id)) return notFound()

  const project = await getProjectById(id)
  if (!project) return notFound()

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h1 className="text-xl font-bold">Edit Project</h1>
        <p className="text-sm text-gray-500">Update project details</p>
      </div>

      <ProjectForm
        mode="edit"
        categories={categories}
        initialData={{
          id: project.id,
          name: project.name,
          slug: project.slug,
          shortDescription: project.shortDescription,
          description: project.description,
          images: project.images,
          specifications: (project.specifications as unknown as Specification[]) || [],
          scopeStatus: (project.scopeStatus as unknown as Specification[]) || [],
          projectType: project.projectType,
          categoryId: project.categoryId,
          published: project.published,
          metaTitle: project.metaTitle,
          metaDescription: project.metaDescription,
        }}
      />
    </div>
  )
}
