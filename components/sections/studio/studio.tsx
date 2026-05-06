"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";

const studioImages = [
    "/studio-image.png",
    "/studio-image2.png",
    "/studio-image3.png",
    "/studio-image4.png",
]

export default function Studio() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white md:bg-white ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-24 items-center">

        <Slider
          items={studioImages}
          renderItem={(src, i) => (
            <div
              key={i}
              className="relative w-full aspect-square bg-gray-200 rounded-2xl md:rounded-3xl overflow-hidden">
                <Image
                    src={src}
                    alt="Studio"
                    fill
                    className="object-cover transition-opacity duration-500"
                />
            </div>
          )}
        />

          {/* RIGHT CONTENT */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
                <p className="typo-overline">OUR STUDIO</p>
                <div className="w-10 h-px bg-gray-400" />
            </div>

              <h2 className="typo-h2 text-black md:px-0">
                <span className="whitespace-nowrap">
                    Built on Collaboration.
                </span>
                <br />
                Driven by Purpose.
              </h2>

              <p className="typo-body-lg text-gray-900 max-w-md text-justify">
                {"Beyond the studio, we've spent decades building relationships with the people who shape the built environment architects, developers, builders, and designers who care about more than just construction."}
                <br /><br />
                {"We share knowledge, challenge ideas, and raise the standard of what architecture can do for people."}
                <br /><br />
                {"Because the best spaces aren't built alone they're built with the right people around the table."}
              </p>
          </div>
      </div>
    </section>
  )
}
