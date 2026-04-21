import { prisma } from "@/lib/prisma"
import NewsletterClient from "./newsletter-client"

export const dynamic = "force-dynamic"

export default async function NewsletterPage() {
  const [subscribers, total, activeCount] = await Promise.all([
    prisma.newsletter.findMany({
      orderBy: { subscribedAt: "desc" },
      take: 20,
    }),
    prisma.newsletter.count(),
    prisma.newsletter.count({ where: { isActive: true } }),
  ])

  return (
    <NewsletterClient
      initialData={JSON.parse(JSON.stringify(subscribers))}
      totalCount={total}
      activeCount={activeCount}
    />
  )
}
