"use client"

import Image from "next/image"
import Link from "next/link"
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
const CareersHero = () => {
  return (
    <section className="relative w-full h-[550px] md:h-[600px] overflow-hidden">
      
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
      <div className="absolute inset-0 flex items-start pt-24 md:items-center md:pt-0">
        <div className="max-w-[90%] md:max-w-[1200px] mx-auto md:ml-30 w-full px-4 md:px-6 text-white">

          {/* BREADCRUMB */}
          <p className="typo-body-lg mb-4 flex gap-1 flex-wrap">

            <Link
              href="/"
              className="text-white/70 hover:underline transition"
            >
              Home
            </Link>

            <span className="text-white/40">/</span>

            <span className="text-white font-semibold">
              Join Our Team
            </span>

          </p>

          {/* TITLE */}
           <h1 className="typo-h1 max-w-[90%] md:max-w-[700px] mb-3">
            WINDOWS TO FUTURE.
          </h1>

          {/* DESCRIPTION */}
          <p className="typo-body text-white/80 max-w-[95%] md:max-w-[700px]">
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

          </div>

        </div>
      </div>
    </section>
  )
}

export default CareersHero