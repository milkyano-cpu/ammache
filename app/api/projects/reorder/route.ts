import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { categoryId, orderedIds } = body as { categoryId: number; orderedIds: number[] }

    if (!categoryId || !Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "categoryId and orderedIds are required" }, { status: 400 })
    }

    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.project.update({
          where: { id },
          data: { order: index },
        })
      )
    )

    revalidatePath("/admin/projects/order")
    revalidatePath("/projects")
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 })
  }
}
