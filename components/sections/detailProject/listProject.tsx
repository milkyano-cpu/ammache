"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

/* ================= COUNT ANIMATION ================= */
const AnimatedCount = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 800

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

/* ================= DATA ================= */
const allProjects: Record<string, { image: string; title: string; location: string; type: string }[]> = {
  "Residential Projects": [
    { image: "/project1.png", title: "Project Name", location: "Location", type: "APARTEMENT BUILDING" },
    { image: "/project2.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project3.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project4.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project5.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project6.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project7.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project8.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project9.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project10.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project11.png", title: "Project Name", location: "Location", type: "Residential" },
    { image: "/project12.png", title: "Project Name", location: "Location", type: "Residential" },
  ],
  "Commercial and Industrial Projects": [
    { image: "/project3.png", title: "Project Name", location: "Location", type: "Commercial" },
    { image: "/project4.png", title: "Project Name", location: "Location", type: "Industrial" },
  ],
  "Retail Projects": [
    { image: "/project6.png", title: "Project Name", location: "Location", type: "Retail" },
  ],
}

/* ================= COMPONENT ================= */
const DetailProjectsSection = ({
    activeTab,
    setActiveTab,
    }: {
    activeTab: string
    setActiveTab: (value: string) => void
    }) => {

    const [open, setOpen] = useState(false)

  const tabs = Object.keys(allProjects).map((key) => ({
    label: key,
    count: allProjects[key].length,
  }))

  const projects = allProjects[activeTab]

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
              <span className="text-yellow-500 ml-2 font-semibold">
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
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm flex justify-between items-center"
        >
            <span>{activeTab}</span>
            <span className="text-yellow-500 font-semibold ml-2">
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
                <span className="text-yellow-500 font-semibold">
                    {tab.count}
                </span>
                </div>
            ))}

            </div>
        )}

        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

          {projects.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >

              {/* IMAGE */}
              <Image
                src={item.image}
                alt="project"
                width={400}
                height={500}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* HOVER OVERLAY (LEBIH GELAP) */}
              <div className="
                absolute inset-0
                bg-black/60 backdrop-blur-md
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

                <p className="text-white text-sm font-semibold">
                  {item.title}
                </p>

                <p className="text-white/80 text-xs mt-1">
                  {item.type}
                </p>
              </div>

              {/* VIEW DEVELOPMENT */}
              <div className="
                absolute bottom-4 left-1/2 -translate-x-1/2
                text-white text-sm
                opacity-0 group-hover:opacity-100
                transition duration-300
              ">
                View Development →
              </div>

            </div>
          ))}

        </div>

        {/* ================= BUTTON ================= */}
        <div className="flex justify-center mt-20">
          <button className="
            px-11 py-3 
            rounded-full 
            border-2 border-gray-300 
            text-sm 
            hover:bg-black hover:text-white 
            transition 
            cursor-pointer
          ">
            View More →
          </button>
        </div>

      </div>
    </section>
  )
}

export default DetailProjectsSection