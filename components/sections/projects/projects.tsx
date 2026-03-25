"use client";

import Image from "next/image";

const projects = [
  "/project1.png",
  "/project2.png",
  "/project3.png",
  "/project4.png",
  "/project5.png",
  "/project6.png",
  "/project7.png",
  "/project8.png",
];

export default function Projects() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* TITLE */}
        <div className="text-left md:text-center space-y-4 pb-0 md:pb-10">
          <div className="flex justify-start md:justify-center items-center gap-3">
            <p className="text-s tracking-widest text-gray-800">
              OUR PROJECTS
            </p>
            <div className="w-10 h-[1px] bg-gray-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            Selected Developments
          </h2>

          <p className="text-gray-800 text-sm max-w-xl md:mx-auto">
            Our encompasses projects with a cumulative construction
            value exceeding <span className="font-semibold">$700+</span> million.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
            {projects.map((src, index) => (
                <div
                key={index}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                >
                {/* IMAGE */}
                <Image
                    src={src}
                    alt={`Project ${index + 1}`}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* GLASS OVERLAY */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    
                    {/* LOGO CENTER */}
                    <Image
                    src="/logo-hover.png"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300"
                    />
                </div>

                {/* BOTTOM WHITE BAR */}
                <div className="absolute bottom-0 left-0 w-full h-14 bg-white flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out">
                <p className="text-sm text-gray-800 flex items-center gap-2">
                    View Development
                    <span>→</span>
                </p>
                </div>
                </div>
            ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center pt-6">
          <button className="px-8 py-3 rounded-full border-2 border-gray-300 text-sm hover:bg-black hover:text-white transition cursor-pointer">
            View All Projects
          </button>
        </div>

      </div>
    </section>
  );
}