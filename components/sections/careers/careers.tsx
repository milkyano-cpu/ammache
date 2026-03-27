"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

/* ================= STAT COMPONENT ================= */
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
const CareersHero = () => {
  return (
   <section className="relative w-full h-[420px] sm:h-[480px] md:h-[600px] overflow-hidden">
      
      {/* DESKTOP IMAGE */}
      <Image
        src="/careers.png"
        alt="Hero"
        fill
        priority
        className="object-cover hidden md:block"
      />

      {/* MOBILE IMAGE */}
      <Image
        src="/careers.png"
        alt="Hero Mobile"
        fill
        priority
        className="object-cover object-[center_top] block md:hidden"
      />

      {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/80 md:bg-black/80" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">
      <div className="max-w-[90%] md:max-w-[1200px] mx-auto md:ml-30 w-full px-4 md:px-6 text-white">

          {/* BREADCRUMB */}
        <p className="text-xl md:text-2xl mb-4 text-white">
              <span className="opacity-80">Home / </span>
              <span className="font-bold text-white">Join Our Team</span>
          </p>

          {/* TITLE */}
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-[700px]">
            WINDOWS TO FUTURE.
          </h1>

          {/* DESCRIPTION */}
          <p className="text-s md:text-base text-white/80 max-w-[700px] leading-relaxed">
            We are a second-generation architecture practice with over{" "}
            <span className="font-semibold text-white">
              27 years of experience
            </span>{" "}
            and a{" "}
            <span className="font-semibold text-white">
              $700M+ portfolio
            </span>
            . We are{" "}
            <span className="font-semibold text-white">
              selective about who joins us
            </span>{" "}
            and that is precisely why you should want to.
          </p>

          {/* STATS */}
          <div className="flex flex-wrap gap-8 md:gap-14 mt-10">

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

            <Stat
              number={700}
              prefix="$"
              suffix="M+"
              label="Construction value"
            />

          </div>

        </div>
      </div>
    </section>
  )
}

export default CareersHero