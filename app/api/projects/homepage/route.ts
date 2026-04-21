import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { orderedIds } = body as { orderedIds: number[] }

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "orderedIds must be an array" }, { status: 400 })
    }

    await prisma.$transaction([
      prisma.project.updateMany({
        where: { isHomepage: true },
        data: { isHomepage: false, homepageOrder: null },
      }),
      ...orderedIds.map((id, index) =>
        prisma.project.update({
          where: { id },
          data: { isHomepage: true, homepageOrder: index },
        })
      ),
    ])

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update homepage projects" }, { status: 500 })
  }
}
