import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"
import { notFound } from "next/navigation"
import { getProjectBySlug, getRelatedProjects } from "@/lib/services/project-service"
import { generateProductMetadata, generateProductJsonLd } from "@/lib/utils/seo"
// import ProjectDetailContent from "@/components/sections/detailProject/projectDetailContent"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProjectBySlug(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return generateProductMetadata(product)
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params
  const product = await getProjectBySlug(slug)

  if (!product || !product.published) return notFound()

  const jsonLd = generateProductJsonLd(product)
  const relatedProducts = await getRelatedProjects(product.id, product.categoryId, 4)

  return (
    <main className="bg-[#F7F9FC] min-h-screen pb-20 md:pb-20">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* <ProjectDetailContent
        product={product}
        relatedProducts={relatedProducts}
        breadcrumbBase={{ href: "/product", label: "Product" }}
        detailBasePath="/product"
      /> */}

      {/* FOOTER */}
      <div className="mt-16 md:mt-24">
        <Footer />
      </div>
    </main>
  )
}
