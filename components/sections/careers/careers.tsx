"use client"

import Image from "next/image"
import Link from "next/link"

/* ================= STAT COMPONENT ================= */
/* ================= HERO ================= */
const CareersHero = () => {
  return (
    <section className="relative w-full h-137.5 md:h-150 overflow-hidden">

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
        <div className="absolute inset-0 bg-black/20 md:bg-black/20" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-start pt-24 md:items-center md:pt-0">
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
              Join Our Team
            </span>

          </p>

          {/* TITLE */}
           <h1 className="typo-h1 max-w-full md:max-w-250 mb-3">
            Help Us Design Spaces People Actually Live In.
          </h1>

          {/* DESCRIPTION */}
          <p className="typo-body text-white/80 max-w-[95%] md:max-w-175">
            {/* We are a second-generation architecture practice with over{" "}
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
            and that is precisely why you should want to. */}
            {/* We're always looking for people who care about more than just how a building looks. If you believe architecture should work for the people inside it, we'd like to meet you. */}
          </p>

          {/* STATS */}
          {/* <div className="
            mt-8
            flex justify-between items-start
            px-1 gap-1
            -ml-6 md:ml-0
            md:flex-wrap md:justify-start md:items-start
            md:gap-14 md:mt-10 md:border-0 md:pt-0
          ">

            <Stat
              number={33}
              suffix="+"
              label="Years Designing for Real Life"
            />

            <Stat
              number={900}
              suffix="+"
              label="Projects Built Around People"
            />

            <Stat
              number={15}
              suffix="+"
              label="Industry Awards & Recognitions"
            />

            <Stat
              number={900}
              prefix="$"
              suffix="M+"
              label="Construction value"
            />

          </div> */}

        </div>
      </div>
    </section>
  )
}

export default CareersHero
