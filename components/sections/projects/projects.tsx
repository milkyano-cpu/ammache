"use client";

import Image from "next/image";

export interface ProjectCardData {
  id: number
  name: string
  images: string[]
  category: { name: string }
}

export default function Projects({ projects }: { projects?: ProjectCardData[] }) {
  const items = projects ?? []

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-white md:bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* TITLE */}
        <div className="text-left md:text-center space-y-4 pb-0 md:pb-10">
          <div className="flex justify-start md:justify-center items-center gap-3">
            <p className="typo-overline text-gray-800">
              OUR PROJECTS
            </p>
            <div className="w-10 h-[1px] bg-gray-400" />
          </div>

          <h2 className="typo-h2 text-black">
            Selected Developments
          </h2>

          <p className="typo-body-sm text-gray-800 max-w-xl md:mx-auto">
            Our encompasses projects with a cumulative construction
            value exceeding <span className="font-semibold">$700+</span> million.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >

              {/* IMAGE */}
              <Image
                src={item.images[0] || "/project1.png"}
                alt={item.name}
                width={400}
                height={500}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* DARK OVERLAY */}
              <div
                className="
                  absolute inset-0
                  bg-black/47 backdrop-blur-sm
                  opacity-0 group-hover:opacity-100
                  transition duration-300
                  flex flex-col items-center justify-center text-center px-4 gap-1
                "
              >
                {/* LOGO */}
                <Image
                  src="/logo-hover.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="mb-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300"
                />

                {/* TITLE */}
                <p className="typo-h6 text-white">
                  {item.name}
                </p>

                {/* TYPE */}
                <p className="typo-caption text-white/70">
                  {item.category.name}
                </p>
              </div>

              {/* VIEW DEVELOPMENT */}
              <div className="
                  absolute bottom-4 left-1/2 -translate-x-1/2
                  text-white typo-caption
                  opacity-0 group-hover:opacity-100
                  transition duration-300
                ">
                  View Development →
                </div>

            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center pt-6">
          <button className="px-8 py-3 rounded-full border-2 border-gray-300 typo-button hover:bg-black hover:text-white transition cursor-pointer">
            View All Projects
          </button>
        </div>

      </div>
    </section>
  );
}
