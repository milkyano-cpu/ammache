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
  }, [number, trigger])
  return (
    <div className="text-center w-1/3 md:w-auto">
      <p className="typo-stat text-white">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="typo-caption text-white/80 mt-1">
        {label}
      </p>
    </div>
  )
}

/* ================= HERO ================= */
const TeamHero = () => {
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
  return (
   <section className="relative w-full h-137.5 md:h-150 overflow-hidden">

      {/* DESKTOP IMAGE */}
      <Image
        src="/team-hero-image.png"
        alt="Hero"
        fill
        priority
        className="object-cover hidden md:block"
      />

      {/* MOBILE IMAGE */}
      <Image
        src="/team-hero-image-mobile.png"
        alt="Hero Mobile"
        fill
        priority
        className="object-cover object-[center_60%] block md:hidden"
      />

      {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/30" />

      {/* CONTENT */}
      <div id="about" className="absolute inset-0 flex items-start pt-24 md:items-center md:pt-0">
        <div className="max-w-[90%] md:max-w-300 mx-auto md:ml-30 w-full px-4 md:px-6 text-white">

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
              Team
            </span>

          </p>

          {/* TITLE */}
           <h1 className="typo-h1 max-w-[90%] md:max-w-175 mb-3">
            The Team Behind Ammache
          </h1>

          {/* DESCRIPTION */}
          <p className="typo-body text-white/80 max-w-[95%] md:max-w-175">
            Every space we design starts with the people in this room, and the people who will one day live, work, and grow inside the spaces we create.
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
              label="Years Designing Spaces for Real World"
              trigger={trigger}
            />

            <Stat
              number={900}
              suffix="+"
              label="Projects Built Around People"
              trigger={trigger}
            />

            <Stat
              number={15}
              suffix="+"
              label="Industry Awards & Recognitions"
              trigger={trigger}
            />

          </div>

        </div>
      </div>
    </section>
  )
}

export default TeamHero
