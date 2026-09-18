import Header from "@/components/layouts/header"
import FaqHero from "@/components/sections/faq/faq-hero"
import FaqSection from "@/components/sections/faq/faq-section"
import CTA from "@/components/sections/cta/cta"
import Footer from "@/components/layouts/footer"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ammachearchitects.com.au"

export const metadata: Metadata = {
  title: "FAQ | Ammache Architects",
  description:
    "Answers to the most common questions about working with Ammache Architects — our design process, project types, timelines, and how we guide clients from concept to completion in Melbourne.",
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    title: "FAQ | Ammache Architects",
    description:
      "Answers to the most common questions about working with Ammache Architects — our design process, project types, timelines, and how we guide clients from concept to completion.",
    url: `${siteUrl}/faq`,
    siteName: "Ammache Architects",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ammache Architects FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Ammache Architects",
    description:
      "Answers to the most common questions about working with Ammache Architects — our design process, project types, timelines, and how we guide clients from concept to completion.",
    images: [`${siteUrl}/og-image.png`],
  },
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