import { NextResponse } from "next/server"
import { getProjectById, updateProject, deleteProject } from "@/lib/services/project-service"
import { updateProjectSchema } from "@/lib/validation/project"
import { deleteFileFromMinio } from "@/lib/api/minio"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params
  const id = parseInt(idParam)

  if (!idParam || isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    const project = await getProjectById(id)
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    console.error("GET PROJECT ERROR:", error)
    return NextResponse.json({ error: "Failed to get project" }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params
  const id = parseInt(idParam)

  if (!idParam || isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    const existing = await getProjectById(id)
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const body = await req.json()
    const parsed = updateProjectSchema.safeParse(body)

    if (!parsed.success) {
      const details: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path.join(".")
        if (!details[field]) details[field] = []
        details[field].push(issue.message)
      }
      return NextResponse.json({ error: "Validation failed", details }, { status: 400 })
    }

    const project = await updateProject(id, parsed.data)
    return NextResponse.json(project)
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await context.params
  const id = parseInt(idParam)

  if (!idParam || isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    const existing = await getProjectById(id)
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Clean up images from MinIO
    for (const imageUrl of existing.images) {
      if (imageUrl.startsWith("http")) {
        try {
          await deleteFileFromMinio(imageUrl)
        } catch {
          // Continue even if image deletion fails
        }
      }
    }

    await deleteProject(id)

    return NextResponse.json({ success: true, message: "Project deleted successfully" })
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
