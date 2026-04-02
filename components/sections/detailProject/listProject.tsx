"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { CategoryWithProjects } from "@/app/detailProject/detail-project-client"

/* ================= COUNT ANIMATION ================= */
const AnimatedCount = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0

    const counter = setInterval(() => {
      start += (value - start) * 0.15 // smooth easing
      if (start >= value - 0.5) {
        setCount(value)
        clearInterval(counter)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(counter)
  }, [value])

  return <>{count}</>
}

/* ================= COMPONENT ================= */
const DetailProjectsSection = ({
    activeTab,
    setActiveTab,
    categories,
    }: {
    activeTab: string
    setActiveTab: (value: string) => void
    categories: CategoryWithProjects[]
    }) => {

    const [open, setOpen] = useState(false)

  const tabs = categories.map((cat) => ({
    label: cat.name,
    count: cat.projects.length,
  }))

  const activeCategory = categories.find((cat) => cat.name === activeTab)
  const projects = activeCategory?.projects ?? []

  return (
    <section className="bg-white md:bg-[#f5f5f5] py-16 md:py-24">

      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* ================= TABS ================= */}
        <div className="hidden md:flex justify-center gap-12 text-lg mb-10 border-b border-gray-300 pb-4">

          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`
                relative pb-2 cursor-pointer transition
                ${activeTab === tab.label
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"}
              `}
            >
              {tab.label}

              {/* ANIMATED COUNT */}
              <span className="text-gold ml-2 font-semibold">
                <AnimatedCount value={tab.count} />
              </span>

              {activeTab === tab.label && (
                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-black" />
              )}
            </button>
          ))}

        </div>

        {/* ================= MOBILE DROPDOWN ================= */}
        <div className="md:hidden mb-6 relative">

        {/* BUTTON */}
        <button
            onClick={() => setOpen(!open)}
            className="w-full border border-gold rounded-lg px-4 py-3 text-sm flex justify-between items-center"
        >
            <span>{activeTab}</span>
            <span className="text-gold font-semibold ml-2">
            {tabs.find(t => t.label === activeTab)?.count}
            </span>
        </button>

        {/* DROPDOWN LIST */}
        {open && (
            <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">

            {tabs.map((tab) => (
                <div
                key={tab.label}
                onClick={() => {
                    setActiveTab(tab.label)
                    setOpen(false)
                }}
                className="px-4 py-3 flex justify-between items-center text-sm hover:bg-gray-100 cursor-pointer"
                >
                <span>{tab.label}</span>
                <span className="text-gold font-semibold">
                    {tab.count}
                </span>
                </div>
            ))}

            </div>
        )}

        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

          {projects.map((item) => (
            <Link key={item.id} href={`/detailProject/${item.slug}`}>
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >

              {/* IMAGE */}
              <Image
                src={item.images[0] || "/project1.png"}
                alt={item.name}
                width={400}
                height={500}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* HOVER OVERLAY (LEBIH GELAP) */}
              <div className="
                absolute inset-0
                bg-black/45 backdrop-blur-sm
                opacity-0 group-hover:opacity-100
                transition duration-300
                flex flex-col items-center justify-center text-center px-4
              ">
                <Image
                  src="/logo-hover.png"
                  alt="logo"
                  width={50}
                  height={50}
                  className="mb-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition"
                />

                <p className="typo-h6 text-white">
                  {item.name}
                </p>

                <p className="typo-fine text-white/80 mt-1">
                  {item.categoryName}
                </p>
              </div>

              {/* VIEW DEVELOPMENT */}
              <div className="
                absolute bottom-4 left-1/2 -translate-x-1/2
                text-white typo-caption
                opacity-0 group-hover:opacity-100
                transition duration-300
              ">
                <span className="inline-flex items-center">
                  <span>View Development</span>
                  <span className="ml-2">❯</span>
                </span>
              </div>

            </div>
            </Link>
          ))}

        </div>

        {/* ================= BUTTON ================= */}
        <div className="flex justify-center mt-20">
          <button className="
            px-11 py-3
            rounded-full
            border-2 border-gray-300
            typo-button
            hover:bg-black hover:text-white
            transition
            cursor-pointer
          ">
            View More
          </button>
        </div>

      </div>
    </section>
  )
}

export default DetailProjectsSection
