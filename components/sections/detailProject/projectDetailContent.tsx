"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ProjectDetailContentProps {
  project: any
  nextProject?: {
    id: number
    slug: string
    name?: string
  } | null
}

/* ================= ANIMATED STAT ================= */
const AnimatedStat = ({
  value,
  label,
}: {
  value: string
  label: string
}) => {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const num = parseInt(value.replace(/[^0-9]/g, ""))
    if (isNaN(num)) return

    let start = 0
    const duration = 1000
    const increment = num / (duration / 16)

    const counter = setInterval(() => {
      start += increment
      if (start >= num) {
        setDisplay(value)
        clearInterval(counter)
      } else {
        setDisplay(Math.floor(start).toLocaleString())
      }
    }, 16)

    return () => clearInterval(counter)
  }, [value])

  return (
    <div className="text-center">
      <p className="text-xl md:text-5xl font-bold text-white">
        {display}
      </p>
      <p className="text-[10px] md:text-base text-white/70 mt-1 md:mt-2">
        {label}
      </p>
    </div>
  )
}

export default function ProjectDetailContent({ project, nextProject }: ProjectDetailContentProps) {
  const router = useRouter()

  const specs = project.specifications || []
  const scopes = project.scopeStatus || project.scope_status || []

  const getSpec = (key: string) =>
    specs.find((s: any) => s.key === key)?.value || "-"

  const constructionCost = getSpec("Construction Cost")
  const storeys = getSpec("Storeys")
  const area = getSpec("Net Lettable Area")

  /* ================= IMAGE SLIDER ================= */
  const images = Array.isArray(project.images) ? project.images : []
  const [currentIndex, setCurrentIndex] = useState(0)

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

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">

        <Image
          src={images[0]}
          alt={project.name}
          fill
          priority
          className="object-cover hidden md:block"
        />

        <div className="absolute inset-0 bg-black/80" />

        <div className="absolute inset-0 flex items-start pt-24 md:items-center md:pt-0">
          <div className="max-w-[90%] md:max-w-[1200px] mx-auto md:ml-30 w-full px-4 md:px-6 text-white">

            <p className="typo-body-lg mb-4 text-white">
              Home / Projects / {project.categoryName} /{" "}
              <span className="text-white font-bold">
                {project.name}
              </span>
            </p>

            <h1 className="typo-h1 max-w-[700px] mb-3">
              {project.name}
            </h1>

            <p className="typo-caption uppercase text-white/70 mb-2">
              {project.categoryName}
            </p>

            <div className="mt-8 flex flex-wrap gap-10 md:gap-14">
              <AnimatedStat value={constructionCost} label="Construction Cost" />
              <AnimatedStat value={storeys} label="Storeys" />
              <AnimatedStat value={area} label="Net Lettable Area" />
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section
        id="about"
        className="relative z-20 -mt-14 md:-mt-16 bg-white md:bg-[#f5f5f5] rounded-t-[25px] md:rounded-t-[32px] pt-16 md:pt-20 pb-20"
      >
        <div className="max-w-[1200px] mx-auto px-6">

          <h2 className="typo-h5 mb-10 font-bold">
            PROJECT OVERVIEW
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* ================= LEFT (SLIDER) ================= */}
            <div>

              <div className="relative w-full h-[500px] md:h-[650px]">

               <Image
    src={images[currentIndex]}
    alt={project.name}
    fill
    className="object-cover rounded-2xl transition-all duration-500"
  />


                {images.length > 1 && (
                  <>
                    {/* LEFT */}
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition cursor-pointer"
                    >
                      ←
                    </button>

                    {/* RIGHT */}
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition cursor-pointer"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* DOT INDICATOR */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((_: any, i: number) => (
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
                  {specs.map((s: any, i: number) => (
                    <div key={i} className="flex justify-between border-b-2 pb-4 text-sm">
                      <span>{s.key}</span>
                      <span className="font-medium text-right">{s.value}</span>
                    </div>
                  ))}
                </div>

                <h2 className="typo-h4 font-bold border-b-2 pb-4 mb-6">
                  SCOPE & STATUS
                </h2>

                <div className="space-y-4">
                  {scopes.map((s: any, i: number) => (
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
    </>
  )
}