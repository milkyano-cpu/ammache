import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { projects: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error)
    return NextResponse.json({ error: "Failed to get categories" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name } = body

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name: name.trim() },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
