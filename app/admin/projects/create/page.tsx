import { prisma } from "@/lib/prisma"
import { ProjectForm } from "@/components/admin/project-form"

export default async function CreateProjectPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="space-y-6 mt-6">
      <div>
        <h1 className="text-xl font-bold">Create Project</h1>
        <p className="text-sm text-gray-500">Add a new project to your catalog</p>
      </div>

      <ProjectForm mode="create" categories={categories} />
    </div>
  )
}
