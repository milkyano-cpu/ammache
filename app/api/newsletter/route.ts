import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page = Number(searchParams.get("page")) || 1
  const pageSize = Number(searchParams.get("pageSize")) || 20
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || "all"

  const where: Record<string, unknown> = {}

  if (search) {
    where.email = { contains: search, mode: "insensitive" }
  }

  if (status === "active") where.isActive = true
  if (status === "inactive") where.isActive = false

  const [subscribers, total] = await Promise.all([
    prisma.newsletter.findMany({
      where,
      orderBy: { subscribedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.newsletter.count({ where }),
  ])

  return NextResponse.json({
    subscribers,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  })
}
