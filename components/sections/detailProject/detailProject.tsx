"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

/* ================= STAT COMPONENT ================= */

const heroImages: Record<string, string> = {
    "Residential Projects": "/detail-project1.png",
    "Commercial and Industrial Projects": "/detail-project2.png",
    "Retail Projects": "/detail-project3.png",
}


const Stat = ({
  number,
  suffix = "",
  prefix = "",
  label,
}: {
  number: number
  suffix?: string
  prefix?: string
  label: string
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
  }, [number])

  return (
    <div className="text-center">
    <p className="text-3xl md:text-5xl font-semibold text-white">
        {prefix}
        {count}
        {suffix}
    </p>
    <p className="text-xs md:text-sm text-white mt-2">
        {label}
    </p>
    </div>
  )
}

/* ================= HERO ================= */
const DetailProjectHero = ({ activeTab }: { activeTab: string }) => {
  return (
    <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
      
      {/* DESKTOP IMAGE */}
      <Image
        src={heroImages[activeTab]}
        alt="Hero"
        fill
        priority
        className="object-cover hidden md:block"
      />

      {/* MOBILE IMAGE */}
      <Image
        src={heroImages[activeTab]}
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
          <p className="text-xl md:text-2xl mb-4 text-white">
              <span className="opacity-80">Home / </span>
              <span className="font-bold text-white">Projects</span>
          </p>

          {/* TITLE */}
           <h1 className="
              text-[30px] leading-[1.15]
              md:text-5xl lg:text-6xl
              font-semibold
              max-w-[90%] md:max-w-[700px]
              mb-3
            ">
            Ammache Projects
          </h1>

          {/* DESCRIPTION */}
          <p className="
            Text-[13px]
            md:text-base
            text-white/80
            max-w-[95%] md:max-w-[700px]
            leading-relaxed
            ">
            View our extensive portofolio of{" "}
            <span className="font-semibold text-white">
              Ammache Architects Projects
            </span>{" "}
            , curated bellow. We are a leading firm in{" "}
            <span className="font-semibold text-white">
              Melbourne Architecture
            </span>
            . We Have{" "}
            <span className="font-semibold text-white">
              27 years experience
            </span>{" "}
            and utillise this in delivering the highest quality designs possible.
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
              number={27}
              suffix="+"
              label="Years of Experience"
            />

            <Stat
              number={900}
              suffix="+"
              label="Completed Projects"
            />

            <Stat
              number={15}
              suffix="+"
              label="Industry Awards & Recognitions"
            />
            
            <div className="hidden md:block">
            <Stat
                number={700}
                prefix="$"
                suffix="M+"
                label="Construction value"
            />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default DetailProjectHero