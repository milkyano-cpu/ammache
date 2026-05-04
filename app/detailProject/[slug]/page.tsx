import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import CTA from "@/components/sections/cta/cta"
import { notFound } from "next/navigation"
import { getProjectBySlug, getNextProject } from "@/lib/services/project-service"
import ProjectDetailContent from "@/components/sections/detailProject/projectDetailContent"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params

  console.log("SLUG:", slug)

  if (!slug) {
    console.log("❌ SLUG KOSONG")
    return notFound()
  }

  const project = await getProjectBySlug(slug)

  console.log("PROJECT:", project)

  if (!project || !project.published) return notFound()

  const nextProject = await getNextProject(
    project.id,
    project.categoryId
  )

  return (
    <main className="bg-[#F7F9FC] min-h-screen">
      <Header />

      <ProjectDetailContent 
        project={project}
        nextProject={nextProject}
      />

      <CTA />
      <Footer />
    </main>
  )
}