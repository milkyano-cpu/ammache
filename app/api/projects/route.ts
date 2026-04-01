import { NextRequest, NextResponse } from "next/server"
import { getProjects, createProject } from "@/lib/services/project-service"
import { createProjectSchema } from "@/lib/validation/project"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const page = Number(searchParams.get("page")) || 1
  const pageSize = Number(searchParams.get("pageSize")) || 10
  const search = searchParams.get("search") || undefined
  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined
  const published = searchParams.get("published")
    ? searchParams.get("published") === "true"
    : undefined
  const projectType = searchParams.get("projectType") || undefined

  const result = await getProjects({ page, pageSize, search, categoryId, published, projectType })
  return NextResponse.json(result)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = createProjectSchema.safeParse(body)
    if (!parsed.success) {
      const details: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path.join(".")
        if (!details[field]) details[field] = []
        details[field].push(issue.message)
      }
      return NextResponse.json({ error: "Validation failed", details }, { status: 400 })
    }

    const project = await createProject(parsed.data)
    return NextResponse.json(project)
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
