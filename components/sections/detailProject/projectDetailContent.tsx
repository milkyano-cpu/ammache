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
    <div>
      <p className="typo-stat text-white">{display}</p>
      <p className="typo-caption text-white/70 mt-2">{label}</p>
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

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">

        <Image
          src={project.images?.[0]}
          alt={project.name}
          fill
          priority
          className="object-cover hidden md:block"
        />

        <div className="absolute inset-0 bg-black/80" />

        <div className="absolute inset-0 flex items-start pt-24 md:items-center md:pt-0">
          <div className="max-w-[90%] md:max-w-[1200px] mx-auto md:ml-30 w-full px-4 md:px-6 text-white">

            {/* BREADCRUMB */}
            <p className="typo-body-lg mb-4 text-white">
              Home / Projects / {project.categoryName} /{" "}
              <span className="text-white font-bold">
                {project.name}
              </span>
            </p>

            {/* TITLE */}
            <h1 className="typo-h1 max-w-[700px] mb-3">
              {project.name}
            </h1>

            {/* CATEGORY */}
            <p className="typo-caption uppercase text-white/70 mb-2">
              {project.categoryName}
            </p>

            {/* STATS */}
            <div className="mt-8 flex flex-wrap gap-10 md:gap-14">
              <AnimatedStat value={constructionCost} label="Construction Cost" />
              <AnimatedStat value={storeys} label="Storeys" />
              <AnimatedStat value={area} label="Net Lettable Area" />
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="bg-[#f5f5f5] py-20">
        <div className="max-w-[1200px] mx-auto px-6">

          <h2 className="typo-h5 mb-10 font-bold">
            PROJECT OVERVIEW
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* LEFT */}
            <div>
              <Image
                src={project.images?.[0]}
                alt={project.name}
                width={700}
                height={700}
                className="rounded-2xl w-full"
              />

              {project.images?.length > 1 && (
                <div className="flex gap-4 mt-6 overflow-x-auto">
                  {project.images.map((img: string, i: number) => (
                    <div
                      key={i}
                      className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 hover:opacity-80 transition cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-between h-full">

              <div>
                <h2 className="typo-h4 mb-4 font-bold">
                  PROJECT SPECIFICATIONS
                </h2>

                <div className="space-y-4 mb-10">
                  {specs.map((s: any, i: number) => (
                    <div key={i} className="flex justify-between border-b-2 pb-4 text-sm">
                      <span className="text-black">{s.key}</span>
                      <span className="font-medium text-right">{s.value}</span>
                    </div>
                  ))}
                </div>

                <h2 className="typo-h4 mb-4 font-bold">
                  SCOPE & STATUS
                </h2>

                <div className="space-y-4">
                  {scopes.map((s: any, i: number) => (
                    <div key={i} className="flex justify-between border-b-2 pb-4 text-sm">
                      <span className="text-black">{s.key}</span>
                      <span className="font-medium text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ NEXT PROJECT BUTTON */}
                <div className="mt-12 flex justify-end">
                  <button
                    onClick={() => {
                      if (nextProject?.slug) {
                        router.push(`/detailProject/${nextProject.slug}`)
                      }
                    }}
                    className="
                      px-6 py-3
                      rounded-full
                      border border-gray-300
                      typo-button
                      hover:bg-black hover:text-white
                      transition
                      cursor-pointer
                    "
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