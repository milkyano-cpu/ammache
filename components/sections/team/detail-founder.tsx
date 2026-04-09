"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"

/* ================= STAT ================= */
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
    <div>
      <p className="text-2xl md:text-3xl font-bold text-black">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  )
}

/* ================= HERO ================= */
const Hero = () => {
  return (
    <section className="w-full bg-black text-white py-25 md:py-30">
      <div className="max-w-[1200px] mx-auto px-6">
      <p className="typo-body-lg mb-4 flex gap-1 flex-wrap">

        <Link
          href="/"
          className="text-white/70 hover:underline transition"
        >
          Home
        </Link>

        <span className="text-white/40">/</span>

        <Link
          href="/team"
          className="text-white/70 hover:underline transition"
        >
          Team
        </Link>

        <span className="text-white/40">/</span>

        <span className="text-white font-semibold">
          Founder
        </span>

      </p>

        <h1 className="text-4xl md:text-5xl font-bold">Founder</h1>
      </div>
    </section>
  )
}

/* ================= CONTENT ================= */
const FounderContent = () => {
  return (
    <section id="about"  className="bg-white md:bg-[#f5f5f5] py-20">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        
        {/* IMAGE */}
          <div>
            <div className="relative w-full flex justify-center">
              <Image
                src="/detail-founder.png"
                alt="Founder"
                width={600}
                height={800}
                className="w-[90%] md:w-[90%] h-auto rounded-2xl object-contain"
                priority
              />
            </div>
          </div>

        {/* TEXT */}
        <div className="pt-4">
          
          {/* LABEL */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs tracking-[0.2em] text-black font-bold">
              FOUNDER
            </span>
            <div className="hidden md:block w-10 h-px bg-gray-400" />
          </div>

          {/* TITLE */}
          <h2 className="text-[42px] md:text-[52px] leading-tight font-semibold text-black mb-6">
            Nidal Ammache.
          </h2>

          {/* LINE */}
          <div className="h-px bg-gray-300 mb-8" />

          {/* STATS */}
          <div className="flex gap-12 mb-8">
            <Stat number={27} suffix="+" label="Years Experience" />
            <Stat number={700} prefix="$" suffix="M+" label="Delivered" />
            <Stat number={6} label="Sectors" />
          </div>

          {/* LINE */}
          <div className="h-px bg-gray-300 mb-8" />

          {/* DESC */}
          <div className="text-gray-700 space-y-5 text-[15px] leading-relaxed">
            <p>
              <strong className="text-black">Nidal</strong> possesses over three decades of extensive
              experience in architectural and building technology, successfully delivering
              projects to clients. He consistently maintains a hands-on approach, ensuring a
              high level of responsibility to his clients, while adeptly overcoming a diverse
              range of project issues.
            </p>

            <p>
              <strong className="text-black">Nidal’s</strong> negotiation skills are unparalleled,
              demonstrated by his ability to secure victories such as the successful reversal of a
              council decision to the utmost satisfaction of a key client. Additionally, he has
              attained approvals for numerous developments through preliminary discussions prior
              to the formal submission of plans, ensuring minimal surprises for all stakeholders involved.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ================= QUOTE ================= */
const FounderQuote = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] pt-5 pb-0">
      <div className="max-w-[1100px] mx-auto px-6 relative">

        {/* QUOTE ICON */}
        <Image
          src="/logo-founder.png"
          alt="quote"
          width={110}
          height={110}
          className="
            absolute
            left-2 md:left-0
            top-[-25px] md:top-[-35px]
            pointer-events-none
            select-none
          "
        />

        {/* CONTENT */}
        <div className="flex items-start gap-8 relative">

          {/* LINE */}
          <div className="w-[4px] md:w-[2px] bg-black mt-2 h-[200px] md:h-[60px]" />

          {/* TEXT */}
          <p className="text-black text-[22px] md:text-[26px] leading-[1.6] max-w-[900px]">
            "Architecture is not about producing something symmetrical or exciting.
            It is an understanding of people — that is the measure of a building's worth."
          </p>

        </div>
      </div>
    </section>
  )
}

/* ================= AWARDS ================= */
const FounderAwards = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] pt-20 pb-0">
      <div className="max-w-[1000px] mx-auto px-6">

        {/* TOP */}
        <div className="grid md:grid-cols-3 text-center">

          <AwardItem
            title="Best Full-Service Architecture & Sustainable Design Firm"
            subtitle="Melbourne — Industry Recognition Award"
          />

          <AwardItem
            title="A' Design Award — The Hub Tourism Project"
            subtitle="International Design Award"
            withBorder
          />

          <AwardItem
            title="Most Inspiring Architects Shaping the Future 2025"
            subtitle="The Empire Magazine"
            withBorder
          />

        </div>


        {/* BOTTOM */}
        <div className="grid md:grid-cols-2 text-center max-w-[700px] mx-auto relative">

          {/* CENTER LINE */}
          <div className="hidden md:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-px bg-gray-300" />

          <AwardItem
            title="Founder — Australia-Lebanon Chamber of Commerce"
            subtitle="Community & Trade Leadership"
          />

          <AwardItem
            title="Registered Architect, Victoria"
            subtitle="Architectural Registration Board of Victoria"
          />

        </div>
      </div>
    </section>
  )
}

/* ITEM */
const AwardItem = ({
  title,
  subtitle,
  withBorder = false,
}: {
  title: string
  subtitle: string
  withBorder?: boolean
}) => {
  return (
    <div
      className={`
        px-6 py-8
        flex flex-col items-center justify-center text-center
        border-t border-gray-300
        last:border-b
        md:border-t-0 md:last:border-b-0
        ${withBorder ? "md:border-l border-gray-300" : ""}
      `}
    >
      <h3 className="font-semibold text-black text-[15px] md:text-[16px] leading-snug max-w-[260px]">
        {title}
      </h3>

      <p className="text-[13px] md:text-[14px] text-black mt-3">
        {subtitle}
      </p>
    </div>
  )
}

/* ================= MAIN ================= */
export default function DetailFounder() {
  return (
    <>
      <Hero />
      <div
          className="
            relative 
            z-20 
            -mt-14 md:-mt-16
            bg-white md:bg-[#f5f5f5]
            rounded-t-[24px] md:rounded-t-[32px]
            pt-16 md:pt-20
          "
        >
      <FounderContent />
      <FounderQuote />
      <FounderAwards />
      </div>
    </>
  )
}