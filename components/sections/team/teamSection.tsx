"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

const teamData = [
  {
    name: "Amir Ammache",
    role: "Director",
    image: "/team1.png",
  },
  {
    name: "Adam Ammache",
    role: "Project Coordinator",
    image: "/team2.png",
  },
  {
    name: "Eddie Takavoli",
    role: "Lead Architect",
    image: "/team3.png",
  },
  {
    name: "Olivia",
    role: "Business Development",
    image: "/team4.png",
  },
  {
    name: "Lolyta",
    role: "Architect",
    image: "/team5.png",
  },
  {
    name: "Lara",
    role: "Architect",
    image: "/team6.png",
  },
]

const TeamSection = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] py-20 md:py-28">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* TITLE */}
       <h2 className="typo-h3 mb-10 md:mb-16 relative inline-block">
          Meet Our Team
          <span className="block w-20 h-[2px] bg-gray-400 mt-2"></span>
        </h2>

        {/* GRID */}
       <div className="
          grid 
          grid-cols-2 
          md:grid-cols-3 
          gap-y-10 md:gap-y-14 
          gap-x-4 md:gap-x-8
        ">

          {teamData.map((item, i) => (
            <div key={i} className="text-center group">

              {/* IMAGE WRAPPER */}
              <div className="
                  relative 
                  w-[140px] h-[140px] 
                  md:w-[170px] md:h-[170px] 
                  mx-auto
                ">

                {/* IMAGE */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-full"
                />

                {/* ARROW BUTTON */}
                <button
                  className="
                    absolute bottom-1.5 right-1.5
                    md:bottom-2 md:right-2
                    w-8 h-8 md:w-9 md:h-9
                    rounded-full
                    bg-white flex items-center justify-center
                    shadow-md
                    cursor-pointer
                    transition-all duration-300
                    hover:scale-110 hover:bg-black hover:text-white
                  "
                >
                  <ArrowRight size={16} />
                </button>

              </div>

              {/* NAME */}
              <h3 className="mt-4 md:mt-6 typo-h6">
                {item.name}
              </h3>

              {/* ROLE */}
              <p className="typo-caption text-gray-600 mt-1">
                {item.role}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default TeamSection