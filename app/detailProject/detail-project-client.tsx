"use client"

import { useState } from "react"
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
  }[]
}

export default function DetailProjectClient({
  categories,
}: {
  categories: CategoryWithProjects[]
}) {
  const [activeTab, setActiveTab] = useState(
    categories[0]?.name ?? "Residential Projects"
  )

  return (
    <main>
      <Header />

      <ProjectHero activeTab={activeTab} categories={categories} />

      <ListProject
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        categories={categories}
      />

      <CTA />
      <Footer />
    </main>
  )
}
