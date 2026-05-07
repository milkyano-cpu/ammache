"use client"

import Header from "@/components/layouts/header"
import ProjectHero from "@/components/sections/detailProject/detailProject"
import ListProject from "@/components/sections/detailProject/listProject"
import CTA from "@/components/sections/cta/cta"
import Footer from "@/components/layouts/footer"

export interface CategoryWithProjects {
    id: number
    name: string
    projects: {
        id: number
        slug: string
        name: string
        images: string[]
        shortDescription: string | null
        categoryName: string
        specifications?: { key: string; value: string }[]
    }[]
}

export default function DetailProjectClient({categories}: { categories: CategoryWithProjects[] }) {
  return (
    <main>
      <Header />
      <ProjectHero categories={categories} />
      <div className="
        relative
        z-20
        -mt-10 md:-mt-6
        bg-white md:bg-white
        rounded-t-[20px] md:rounded-t-[30px]
        pt-12 md:pt-16">
          <ListProject categories={categories} />
          <CTA />
      </div>
      <Footer />
    </main>
  )
}
