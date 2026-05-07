"use client"

import Image from "next/image"
import Link from "next/link"

const FounderSection = () => {
  return (
    <section className="bg-white md:bg-white py-16 md:py-28">

      <div className="max-w-300 mx-auto px-6">

        {/* TITLE */}
        <h2 className="typo-h3 mb-10 relative inline-block">
          Founders
          <span className="block w-16 h-0.5 bg-gray-400 mt-2"></span>
        </h2>

        {/* CARD */}
        <div className="
            relative
            bg-white
            text-black
            rounded-[30px]
            overflow-hidden
            p-6 md:p-10
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            ring-1 ring-black/5
          ">

          {/* ===== GRADIENT (BIAR TEXT KEBACA) ===== */}
          {/* <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent" /> */}

          {/* ===== CONTENT ===== */}
          <div className="
            relative z-10
            grid md:grid-cols-2
            gap-8 md:gap-14
            items-center
            max-md:grid-cols-1
            max-md:gap-6
          ">

            {/* IMAGE */}
            <div className="flex justify-center md:justify-start">
              <Image
              src="/team-founder.png"
              alt="Founder"
              width={420}
              height={520}
              className="
                rounded-[24px] object-cover
                max-md:w-full
              "
            />
            </div>

            {/* TEXT */}
            <div className="max-w-125 text-left">

                  {/* SHAPE (POSISI DI KANAN TEXT) */}
            <div
              className="
                hidden md:block
                absolute
                -right-20
                top-[75%]
                -translate-y-1/2
                pointer-events-none
                opacity-[0.1]
              "
            >
              <Image
                src="/logo-contact.png"
                alt="shape"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>

              {/* NAME */}
              <h3 className="typo-h2 mb-2">
                Nidal Ammache
              </h3>

              {/* ROLE */}
              <p className="typo-body-lg text-black mb-6">
                Founder
              </p>

              {/* DESC */}
              <p className="typo-body-sm text-black mb-8 leading-relaxed">
                Nidal has spent over three decades doing one thing: designing spaces that work for the people inside them.
                <br />
                <br />
                His approach has always been hands-on and personal. Every project is treated as if someone he knows will live in it, because often, they do.
              </p>

             {/* BUTTON */}
            <Link href="/team/nidal-ammache">
              <button className="
                px-6 py-3
                rounded-full
                border border-black
                typo-button
                hover:bg-black
                hover:text-white
                transition-all
                duration-300
                cursor-pointer
              ">
                Read More
              </button>
            </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default FounderSection
