import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import CTA from "@/components/sections/cta/cta"

import DetailFounder from "@/components/sections/team/detail-founder"
import DetailTeam from "@/components/sections/team/detail-team"

import { teamData, teamOrder } from "@/lib/team/team-data"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function TeamDetailPage({ params }: Props) {
  const { slug } = await params   // 🔥 WAJIB pakai await

  const data = teamData[slug]

  console.log("slug:", slug)       // debug
  console.log("data:", data)

  if (!data) return <div>Not Found</div>

  const currentIndex = teamOrder.indexOf(slug)

  const prevSlug = teamOrder[currentIndex - 1] || null
  const nextSlug = teamOrder[currentIndex + 1] || null

  const prev = prevSlug ? teamData[prevSlug] : null
  const next = nextSlug ? teamData[nextSlug] : null

  return (
    <main className="bg-[#F7F9FC] min-h-screen">
      <Header />

      {data.type === "founder" ? (
        <DetailFounder />
      ) : (
        <DetailTeam
          data={data}
          prev={prev}
          next={next}
          prevSlug={prevSlug}
          nextSlug={nextSlug}
        />
      )}

      <CTA />
      <Footer />
    </main>
  )
}