import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type Params = { params: Promise<{ id: string }> }

export async function PATCH(_req: Request, { params }: Params) {
  const { id } = await params
  const numId = parseInt(id)
  if (isNaN(numId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

  const existing = await prisma.newsletter.findUnique({ where: { id: numId } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const updated = await prisma.newsletter.update({
    where: { id: numId },
    data: {
      isActive: !existing.isActive,
      unsubscribedAt: existing.isActive ? new Date() : null,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params
  const numId = parseInt(id)
  if (isNaN(numId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

  const existing = await prisma.newsletter.findUnique({ where: { id: numId } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await prisma.newsletter.delete({ where: { id: numId } })

  return NextResponse.json({ success: true })
}
