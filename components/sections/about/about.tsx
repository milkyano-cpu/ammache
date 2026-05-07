import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="w-full py-20 px-6 md:px-12 lg:px-20 bg-white md:bg-white ">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* TOP TITLE */}
          <div className="
            flex flex-col items-center text-center md:text-left md:items-start md:flex-row md:justify-between gap-6 pb-10
            -mt-15 sm:-mt-12 md:-mt-10 lg:-mt-15
          ">
          <div>
            <h2 className="typo-h2 text-black">
              Spaces That Shape The Future Of Living.
            </h2>
            <p className="typo-body-sm text-gray-800 mt-2">
              For over three decades, Ammache has shaped refined residential and mixed-use developments across Melbourne through architecture grounded in human behaviour, timeless design, and enduring value.
            </p>
          </div>

          {/* FIX BUTTON SIZE */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
          <Link
            href="/detailProject"
            className="
              w-45
              px-5 py-2.5
              rounded-full
              border-2 border-gray-400
              typo-button
              text-center
              hover:bg-black hover:text-white
              transition
              cursor-pointer
              inline-block
            "
          >
            See Our Work
          </Link>

          <Link
              href="/contact"
              className="
                w-55
                px-8 py-3.5
                rounded-full
                bg-black text-white
                typo-button
                text-center
                hover:opacity-80
                transition
                cursor-pointer
                inline-block
              "
            >
            Book a Concept Review
          </Link>
          </div>
        </div>

        {/* WHITE CARD */}
        <div className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-[0_0_30px_rgba(0,0,0,0.08)]
          relative">

          <Image
            src="/background-card-1.png"
            alt="background-card-1"
            className="absolute z-0"
            fill
          />

          <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:py-8 lg:ps-12 lg:pe-4 mx-4">

            {/* LEFT CONTENT */}
            <div className="flex flex-col lg:w-3/5">

              <div className="space-y-5 md:space-y-4 py-8">

                {/* IMAGE — mobile + tablet only, above ABOUT US */}
                <div className="block lg:hidden relative w-full aspect-5/7 rounded-2xl overflow-hidden mb-4">
                  <Image src="/home-about-us.png" alt="About Image" fill className="object-cover" />
                </div>

                {/* ABOUT US + LINE */}
                <div className="flex items-center gap-3">
                  <p className="typo-overline text-black">
                    ABOUT US
                  </p>
                  <div className="w-10 h-px bg-black opacity-60"></div>
                </div>

                <h3 className="typo-h2">
                  33+ Years Crafting Spaces
                  <br className="hidden md:block" />
                  That Work In The Real World
                </h3>

                <p className="typo-body-sm text-black">
                  Founded through a shared passion for architecture and shaped across generations, Ammache has spent more than three decades creating spaces that feel considered, timeless, and deeply connected to the people who use them.
                </p>

                <p className="typo-body-sm text-black mt-4">
                  Our philosophy is grounded in one belief — great architecture should elevate everyday living while standing the test of time.
                </p>

                <p className="typo-body-sm text-black mt-6">
                  Through thoughtful design, collaboration, and enduring craftsmanship, we continue to shape projects that contribute meaningfully to Melbourne’s evolving urban landscape.
                </p>

              </div>

              <div className="mt-auto  pb-8">
                <Link
                  href="/team"
                  className="
                  px-8 py-3.5
                  border border-black
                  rounded-full
                  typo-button
                  hover:bg-white hover:text-black 
                  bg-black text-white
                  transition
                  cursor-pointer
                  inline-block">
                  Read Our Story
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE — desktop only */}
            <div className="hidden lg:flex justify-end">
              <div className="relative w-full rounded-2xl overflow-hidden">
                <Image
                  src="/home-about-us.png"
                  alt="About Image"
                  height={500}
                  width={500}
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
