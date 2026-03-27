"use client"

import Image from "next/image"

const FounderSection = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] py-16 md:py-28">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 relative inline-block">
          Founders
          <span className="block w-16 h-[2px] bg-gray-400 mt-2"></span>
        </h2>

        {/* CARD */}
        <div className="relative bg-black text-white rounded-[30px] overflow-hidden p-6 md:p-10">

          {/* ===== GRADIENT (BIAR TEXT KEBACA) ===== */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent" />

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
            <div className="max-w-[500px] text-left">

                  {/* SHAPE (POSISI DI KANAN TEXT) */}
               <div className="hidden md:block absolute right-[-300px] top-1/2 -translate-y-1/2 pointer-events-none">
                    <Image
                    src="/logo-contact.png"
                    alt="shape"
                    width={850}
                    height={850}
                    />
                </div>

              {/* NAME */}
              <h3 className="text-2xl md:text-4xl font-semibold mb-2">
                Nidal Ammache
              </h3>

              {/* ROLE */}
              <p className="text-lg md:text-xl text-white mb-6">
                Founder
              </p>

              {/* DESC */}
              <p className="text-sm md:text-[15px] text-white leading-relaxed mb-8">
                Nidal possesses over three decades of extensive experience in architectural
                and building technology, successfully delivering projects to clients. He
                consistently maintains a hands-on approach, ensuring a high level of responsibility
                to his clients, while adeptly overcoming a diverse range of project issues.
              </p>

              {/* BUTTON */}
              <button className="
                px-6 py-3 
                rounded-full 
                border border-white/40 
                text-sm 
                hover:bg-white 
                hover:text-black 
                transition-all 
                duration-300 
                cursor-pointer
              ">
                Read More
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default FounderSection