"use client"

import Link from "next/link"

const JoinTeamCTA = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] py-20 md:py-30">

      <div className="max-w-[600px] md:max-w-[800px] mx-auto px-5 md:px-6 text-center">

        {/* TITLE */}
        <h2 className="
            text-[28px] leading-[1.2]
            md:text-4xl 
            font-semibold 
            mb-5 md:mb-6
            ">
          Interested in joining our team?
        </h2>

        {/* DESC */}
            <p className="
            text-gray-700 
            text-[14px] 
            md:text-[17px] 
            leading-relaxed 
            mb-10 md:mb-12
            ">
            Let’s embody your beautiful ideas together, simplify
            <br className="hidden md:block" />
            the way you visualize your next big things.
            </p>

        {/* BUTTON */}
        <Link
        href="/careers"
        className="
            inline-flex items-center justify-center
            px-7 py-3.5
            md:px-8 md:py-3
            rounded-full
            border-2 border-gray-300
            text-[14px] md:text-base font-medium
            transition-all duration-300
            hover:bg-black hover:text-white hover:border-black
            cursor-pointer
        "
        >
          Join Our Team
        </Link>

      </div>

    </section>
  )
}

export default JoinTeamCTA