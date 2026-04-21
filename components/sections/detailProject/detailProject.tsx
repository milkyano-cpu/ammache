"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { CategoryWithProjects } from "@/app/detailProject/detail-project-client"

/* ================= HERO IMAGE MAPPING ================= */
const heroImages: Record<string, string> = {
  residential: "/detail-project1.png",
  commercial: "/detail-project2.png",
  retail: "/detail-project3.png",
}

const reverseCategoryMap: Record<string, string> = {
  residential: "Residential Projects",
  commercial: "Commercial and Industrial Projects",
  retail: "Retail Projects",
}

/* ================= CATEGORY MAP ================= */
const categoryMap: Record<string, string> = {
  "Residential Projects": "residential",
  "Commercial and Industrial Projects": "commercial",
  "Retail Projects": "retail",
}

/* ================= STAT COMPONENT ================= */
const Stat = ({
  number,
  suffix = "",
  prefix = "",
  label,
  trigger,
}: {
  number: number
  suffix?: string
  prefix?: string
  label: string
  trigger: number
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const increment = number / (duration / 16)

    const counter = setInterval(() => {
      start += increment

      if (start >= number) {
        setCount(number)
        clearInterval(counter)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(counter)
  }, [trigger]) 

  return (
    <div className="text-center">
      <p className="typo-stat text-white">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="typo-caption text-white mt-2">
        {label}
      </p>
    </div>
  )
}

/* ================= HERO ================= */
const DetailProjectHero = ({
  activeTab,
  categories,
}: {
  activeTab: string
  categories: CategoryWithProjects[]
}) => {

  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const loop = () => {
      setTrigger((prev) => prev + 1)

      const delay = 10000 + Math.random() * 10000
      timeout = setTimeout(loop, delay)
    }

    loop()

    return () => clearTimeout(timeout)
  }, [])

  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [currentTab, setCurrentTab] = useState(activeTab)

  useEffect(() => {
    if (categoryParam) {
      const mapped = reverseCategoryMap[categoryParam]

      if (mapped) {
        setCurrentTab(mapped)
      }
    }
  }, [categoryParam])

  useEffect(() => {
    setCurrentTab(activeTab)
  }, [activeTab])

  /* 🔥 FALLBACK CATEGORY */
  const fallbackTab =
    categoryMap[categories[0]?.name] || "residential"

  /* 🔥 FINAL HERO SRC */
  const currentKey =
    categoryMap[currentTab] || currentTab

  const heroSrc =
      heroImages[currentKey] ||
      heroImages[fallbackTab] ||
      "/detail-project1.png"

  return (
    <section className="relative w-full h-[550px] md:h-[600px] overflow-hidden">

      {/* DESKTOP IMAGE */}
      <Image
        src={heroSrc}
        alt="Hero"
        fill
        priority
        className="object-cover hidden md:block"
      />

      {/* MOBILE IMAGE */}
      <Image
        src={heroSrc}
        alt="Hero Mobile"
        fill
        priority
        className="object-cover object-[center_top] block md:hidden"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/80 md:bg-black/80" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-start pt-24 md:items-center md:pt-0">
        <div className="max-w-[90%] md:max-w-[1200px] mx-auto md:ml-30 w-full px-4 md:px-6 text-white">

          {/* BREADCRUMB */}
          <p className="typo-body-lg mb-4 text-white flex gap-1 flex-wrap">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>

            <span className="opacity-80">/</span>

            <span className="font-bold text-white">
              Projects
            </span>
          </p>

          {/* TITLE */}
          <h1 className="typo-h1 max-w-[100%] md:max-w-[950px] mb-3">
            Spaces Designed Around People
          </h1>

          {/* DESCRIPTION */}
          <p className="typo-body text-white/80 max-w-[95%] md:max-w-[700px]">
            {/* View our extensive portofolio of{" "}
            <span className="font-semibold text-white">
              Ammache Architects Projects,
            </span>{" "}
            curated bellow. We are a leading firm in{" "}
            <span className="font-semibold text-white">
              Melbourne Architecture
            </span>
            . We Have{" "}
            <span className="font-semibold text-white">
              27 years experience
            </span>{" "}
            and utillise this in delivering the highest quality designs possible. */}
            Every project here was shaped by one question: how will the people inside actually experience this space?
          </p>

          {/* STATS */}
          <div className="
            mt-8
            flex justify-between items-center
            border-tpt-6
            md:flex-wrap md:justify-start md:items-start
            md:gap-14 md:mt-10 md:border-0 md:pt-0
          ">

          <Stat
            number={33}
            suffix="+"
            label="Years Designing for Real Life"
            trigger={trigger}
          />

          <Stat
            number={15}
            suffix="+"
            label="Industry Awards & Recognitions"
            trigger={trigger}
          />

          <Stat
            number={900}
            suffix="+"
            label="Project Built Around People"
            trigger={trigger}
          />

          <div className="hidden md:block">
            <Stat
              number={900}
              prefix="$"
              suffix="M+"
              label="Construction value"
              trigger={trigger}
            />
          </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default DetailProjectHero