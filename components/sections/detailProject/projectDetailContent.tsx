"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { dataLayer } from "@/lib/gtm/data-layer"

interface ProjectDetailContentProps {
  project: {
    id: number;
    name: string;
    categoryName: string;
    slug: string;
    specifications: any;
    scopeStatus: any;
    images: string[];
  }
  nextProject?: {
    id: number
    slug: string
    name?: string
  } | null
}

function getSpecValue(specs: unknown, key: string) {
  if (!specs) return null
  let parsed = specs
  if (typeof specs === "string") {
    try {
      parsed = JSON.parse(specs)
    } catch {
      return null
    }
  }
  if (!Array.isArray(parsed)) return null
  const found = parsed.find(
    (s) => s.key?.trim().toLowerCase() === key.toLowerCase()
  )
  return found?.value || null
}

export default function ProjectDetailContent({ project, nextProject }: ProjectDetailContentProps) {
  const router = useRouter()

  useEffect(() => {
    dataLayer.viewProject({
      project_id: project.id,
      project_name: project.name,
      project_category: project.categoryName || "",
      project_slug: project.slug || "",
    })
  }, [project.categoryName, project.id, project.name, project.slug])

  const specs = project.specifications || []


  /* ================= IMAGE SLIDER ================= */
  const images = Array.isArray(project.images) ? project.images : []
  const [currentIndex, setCurrentIndex] = useState(0)

  const [isOpen, setIsOpen] = useState(false)

  const nextImage = () => {
    if (images.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (images.length === 0) return
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const categoryMap: Record<string, string> = {
    "Residential Projects": "residential",
    "Commercial and Industrial Projects": "commercial",
    "Retail Projects": "retail",
  }

  const projectNameSpec = getSpecValue(project.specifications, "Project")

  const areaSpec =
    getSpecValue(project.specifications, "Set Area") ||
    getSpecValue(project.specifications, "Area")

  const frontageSpec =
  getSpecValue(project.specifications, "Net Lettable Area") ||
  getSpecValue(project.specifications, "Frontage")

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative w-full h-130 md:h-150 overflow-hidden">

        <Image
          src={images[0]}
          alt={project.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">

          <p className="
            typo-body-lg
            mb-4
            flex flex-wrap justify-center gap-1
            max-w-75 md:max-w-none
            mx-auto
            leading-relaxed
          ">

            <Link href="/" className="text-white hover:underline transition">
              Home
            </Link>

            <span className="text-white/40">/</span>

            <Link href="/detailProject" className="text-white hover:underline transition">
              Projects
            </Link>

            <span className="text-white/40">/</span>

            <Link
              href={`/detailProject?category=${categoryMap[project.categoryName]}`}
              className="text-white hover:underline transition"
            >
              {project.categoryName}
            </Link>

            <span className="text-white/40">/</span>

            <span className="text-white font-semibold">
              {project.name}
            </span>

          </p>

            <h1 className="
              typo-h1
              mb-3
              md:whitespace-nowrap
              max-w-full md:max-w-none
            ">
              {project.name}
            </h1>

            <p className="typo-caption uppercase text-white/70 mb-2">
              {getSpecValue(project.specifications, "Project") || project.categoryName}
            </p>
          </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section
        id="about"
        className="relative z-20 -mt-14 md:-mt-16 bg-white md:bg-white rounded-t-[25px] md:rounded-t-[32px] pt-16 md:pt-20 pb-20"
      >
        <div className="max-w-300 mx-auto px-6">

          {/* ================= QUICK STATS ================= */}
          <div className="bg-white md:bg-white rounded-2xl py-10 px-6 md:px-10 mb-16">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

              {/* PROJECT */}
              <div className="flex flex-col items-center">
                <Image
                  src="/project-icon.png"
                  alt="Project"
                  width={40}
                  height={40}
                  className="mb-4"
                />
                <p className="text-sm font-semibold tracking-wide">PROJECT</p>
                <p className="text-xs text-gray-600 mt-2">
                  {projectNameSpec || "-"}
                </p>
              </div>

              {/* AREA */}
              <div className="flex flex-col items-center">
                <Image
                  src="/area-icon.png"
                  alt="Area"
                  width={40}
                  height={40}
                  className="mb-4"
                />
                <p className="text-sm font-semibold tracking-wide">AREA</p>
                <p className="text-xs text-gray-600 mt-2">
                  {areaSpec || "-"}
                </p>
              </div>

              {/* FRONTAGE */}
              <div className="flex flex-col items-center">
                <Image
                  src="/frontage-icon.png"
                  alt="Frontage"
                  width={40}
                  height={40}
                  className="mb-4"
                />
                <p className="text-sm font-semibold tracking-wide">FRONTAGE</p>
                <p className="text-xs text-gray-600 mt-2">
                  {frontageSpec || "-"}
                </p>
              </div>

            </div>
          </div>

          <h2 className="typo-h5 mb-10 font-bold">
            PROJECT OVERVIEW
          </h2>

          <div className="grid md:grid-cols-[2fr_1fr] gap-16 items-start">

            {/* ================= LEFT (SLIDER) ================= */}
            <div>

              <div
                className="relative w-full h-125 md:h-175 group cursor-pointer"
                onClick={() => setIsOpen(true)}
              >

                <Image
                  src={images[currentIndex]}
                  alt={project.name}
                  fill
                  className="object-cover rounded-2xl transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                />

                {images.length > 1 && (
                  <>
                   {/* LEFT */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition cursor-pointer"
                    >
                      ←
                    </button>

                    {/* RIGHT */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition cursor-pointer"
                    >
                      →
                    </button>
                  </>
                )}

                {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="bg-black/60 text-white text-sm px-4 py-2 rounded-full">
                    View Image
                  </span>
                </div> */}

              </div>

              {/* DOT INDICATOR */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((_: unknown, i: number) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === currentIndex
                          ? "w-6 bg-black"
                          : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}

            </div>

            {/* ================= RIGHT ================= */}
            <div className="flex flex-col justify-between h-full">

              <div>
                <h2 className="typo-h4 font-bold border-b-2 pb-4 mb-6">
                  PROJECT SPECIFICATIONS
                </h2>

                <div className="space-y-4 mb-10">
                  {specs.map((s: {key: string, value: string}, i: number) => (
                    <div key={i} className="flex justify-between border-b-2 pb-4 text-sm">
                      <span>{s.key}</span>
                      <span className="font-medium text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NEXT PROJECT */}
              <div className="mt-12 flex justify-center md:justify-end">
                <button
                  onClick={() => {
                    if (nextProject?.slug) {
                      router.push(`/detailProject/${nextProject.slug}`)
                    }
                  }}
                  className="px-6 py-3 rounded-full border border-gray-300 typo-button hover:bg-black hover:text-white transition cursor-pointer"
                >
                  Next Project →
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-po"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt="Zoom Image"
              width={1400}
              height={900}
              className="w-full h-auto rounded-xl"
            />

            {/* CLOSE */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
            >
              ✕
            </button>

            {/* LEFT */}
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full cursor-pointer"
              >
                ←
              </button>
            )}

            {/* RIGHT */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full cursor-pointer"
              >
                →
              </button>
            )}

            {/* COUNTER */}
            <div className="absolute top-4 left-4 text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>

          </div>
        </div>
      )}

    </>
  )
}
