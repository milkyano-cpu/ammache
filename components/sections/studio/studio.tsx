"use client";

import Image from "next/image";
import { useState } from "react";

export default function Studio() {
  const images = [
    "/studio-image.png",
    "/studio-image2.png",
    "/studio-image3.png",
    "/studio-image4.png",
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white md:bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* LEFT IMAGE CAROUSEL */}
        <div className="relative w-full">

          {/* IMAGE */}
          <Image
            src={images[current]}
            alt="Studio"
            width={700}
            height={500}
            className="w-full h-auto rounded-2xl md:rounded-3xl object-cover transition-all duration-500"
          />

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60"
          >
            ←
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60"
          >
            →
          </button>

          {/* DOT INDICATOR */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  current === index ? "w-6 bg-black" : "w-2 bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-4 md:space-y-6">

          <div className="flex items-center gap-3">
            <p className="typo-overline">OUR STUDIO</p>
            <div className="w-10 h-[1px] bg-gray-400" />
          </div>

          <h2 className="typo-h2 text-black md:px-0">
            <span className="whitespace-nowrap">
              Built on Collaboration.
            </span>
            <br />
            Driven by Purpose.
          </h2>

          <p className="typo-body-lg text-gray-900 max-w-md text-justify">
            Beyond the studio, we've spent decades building relationships with the people who shape the built environment architects, developers, builders, and designers who care about more than just construction.
            <br /><br />
            We share knowledge, challenge ideas, and raise the standard of what architecture can do for people.
            <br /><br />
            Because the best spaces aren't built alone they're built with the right people around the table.
          </p>

        </div>

      </div>
    </section>
  );
}