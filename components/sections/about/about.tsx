import Image from "next/image";

export default function About() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-white md:bg-[#f5f5f5] ">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* TOP TITLE */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start md:flex-row md:justify-between gap-6 pb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              Innovative Architecture Built on Experience.
            </h2>
            <p className="text-gray-800 mt-2 text-s">
              From concept design to planning, compliance, and post-construction support.
            </p>
          </div>

          {/* FIX BUTTON SIZE */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <button className="w-[170px] px-5 py-2.5 rounded-full border-2 border-gray-400 text-sm text-center hover:bg-black hover:text-white transition cursor-pointer">
              View Our Projects
            </button>

            <button className="w-[170px] px-5 py-2.5 rounded-full bg-black text-white text-sm text-center hover:opacity-80 transition cursor-pointer">
              Enquire
            </button>
          </div>
        </div>

        {/* BLACK CARD */}
        <div className="bg-black rounded-3xl overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-10 items-center p-6 md:p-16">

            {/* LEFT CONTENT */}
            <div className="text-white space-y-5 md:space-y-6 relative order-2 md:order-1">

              {/* ABOUT US + LINE */}
              <div className="flex items-center gap-3">
                <p className="text-s tracking-widest text-white">
                  ABOUT US
                </p>
                <div className="w-10 h-[1px] bg-white opacity-60"></div>
              </div>

              <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                Experience in Every Detail.
                <br />
                Design in Every Structure.
              </h3>

              <p className="text-gray-200 text-s leading-relaxed">
                Founded in 1998 in Melbourne, Australia, Ammache Architects is a
                registered architectural firm comprising a carefully selected team
                of professionals, including registered architects and draftsmen.
                The studio offers a comprehensive range of architectural services,
                from initial schematic design through planning, compliance, and
                post-construction support.
              </p>

              <p className="text-gray-200 text-s leading-relaxed">
                Ammache Architects combines innovative design with a strong
                understanding of environmental, client, and business requirements.
                This approach results in buildings defined by beauty, quality, and
                functionality while remaining sustainable within the competitive
                property market.
              </p>

              {/* BIGGER BUTTON */}
              <button className="mt-4 px-8 py-3.5 border border-white rounded-full text-sm hover:bg-white hover:text-black transition cursor-pointer">
                Read Our Story
              </button>

              {/* SHAPE */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(120deg,#ffffff22_25%,transparent_25%)] pointer-events-none" />
            </div>

              {/* IMAGE */}
              <div className="w-full flex justify-center order-1 md:order-2">
                <div className="relative w-full max-w-md">

                  {/* DESKTOP */}
                  <Image
                    src="/about-image.png"
                    alt="About Image"
                    width={500}
                    height={600}
                    className="hidden md:block rounded-2xl object-contain w-full h-auto"
                  />

                  {/* MOBILE */}
                  <Image
                    src="/about-image-mobile.png"
                    alt="About Image Mobile"
                    width={500}
                    height={600}
                    className="block md:hidden rounded-2xl object-cover w-full h-auto"
                  />

                </div>
              </div>

          </div>
        </div>

      </div>
    </section>
  );
}