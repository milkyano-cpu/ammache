"use client"

import { useState } from "react"
import Header from "@/components/layouts/header"
import ProjectHero from "@/components/sections/detailProject/detailProject"
import ListProject from "@/components/sections/detailProject/listProject"
import CTA from "@/components/sections/cta/cta"
import Footer from "@/components/layouts/footer"

export default function About() {
  const [activeTab, setActiveTab] = useState("Residential Projects")

  return (
    <main>
      <Header />

      <ProjectHero activeTab={activeTab} />

      <ListProject
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <CTA />
      <Footer />
    </main>
  )
}