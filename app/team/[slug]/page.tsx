import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import CTA from "@/components/sections/cta/cta"
import JoinTeamCTA from "@/components/sections/team/joinTeamCTA"
import DetailFounder from "@/components/sections/team/detail-founder"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function TeamFounderDetail({ params }: Props) {
  // const { slug } = await params
  // const data = await fetchFounderBySlug(slug)

  return (
    <main className="bg-[#F7F9FC] min-h-screen">
      <Header />

      <DetailFounder />

      {/* CTA DESKTOP */}
      <div className="hidden md:block">
        <CTA />
      </div>

      {/* CTA MOBILE */}
      <div className="block md:hidden">
        <JoinTeamCTA />
      </div>

      <div className="mt-16 md:mt-24">
        <Footer />
      </div>
    </main>
  )
}
