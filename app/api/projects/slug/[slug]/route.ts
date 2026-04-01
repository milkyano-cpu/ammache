import { NextResponse } from "next/server"
import { getProjectBySlug } from "@/lib/services/project-service"

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  try {
    const project = await getProjectBySlug(slug)

    if (!project || !project.published) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("GET PROJECT BY SLUG ERROR:", error)
    return NextResponse.json({ error: "Failed to get project" }, { status: 500 })
  }
}
