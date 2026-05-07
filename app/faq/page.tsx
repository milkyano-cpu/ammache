import Header from "@/components/layouts/header"
import FaqHero from "@/components/sections/faq/faq-hero"
import FaqSection from "@/components/sections/faq/faq-section"
import CTA from "@/components/sections/cta/cta"
import Footer from "@/components/layouts/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently Asked Questions",
}

export default function FaqPage() {
  return (
    <main>
      <Header />
      <FaqHero />
      <div
        className="
          relative
          z-20
          -mt-10 md:-mt-12
          bg-white md:bg-white
          rounded-t-[20px] md:rounded-t-[30px]
          pt-12 md:pt-16
        "
      >
        <FaqSection />
        <CTA />
      </div>
      <Footer />
    </main>
  )
}
