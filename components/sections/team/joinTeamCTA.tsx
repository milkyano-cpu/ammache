"use client"

import Link from "next/link"

const JoinTeamCTA = () => {
  return (
    <section className="bg-white md:bg-white py-20 md:py-30">

      <div className="max-w-[600px] md:max-w-[850px] mx-auto px-5 md:px-6 text-center">

        {/* TITLE */}
        <h2 className="typo-h2 mb-5 md:mb-6">
          Help Us Design Spaces People Actually Live In.
        </h2>

        {/* DESC */}
            <p className="typo-body text-gray-700 mb-10 md:mb-12">
            If you care about more than just how things look,
            <br className="hidden md:block" />
            you’ll fit right in.
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
            typo-button
            transition-all duration-300
            hover:bg-black hover:text-white hover:border-black
            cursor-pointer
        "
        >
          Explore Opportunities
        </Link>

      </div>

    </section>
  )
}

export default JoinTeamCTA