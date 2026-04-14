"use client";

import { useEffect, useState } from "react";
import Link from "next/link"

function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function Stats() {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-white md:bg-[#f5f5f5]  text-center">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* TITLE */}
        <h2 className="typo-h2 text-gray-900">
          Designing Architecture That Works for People, 
          <br className="hidden md:block" />
          Not Just on Paper.
        </h2>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div>
            <p className="typo-stat text-black">
              <Counter end={27} />
            </p>
            <p className="typo-caption text-black mt-2">
              Years Designing for Real Life
            </p>
          </div>

          <div>
            <p className="typo-stat text-black">
              <Counter end={900} />+
            </p>
            <p className="typo-caption text-black mt-2">
              Projects Built Around People
            </p>
          </div>

          <div>
            <p className="typo-stat text-black">
              <Counter end={15} />+
            </p>
            <p className="typo-caption text-black mt-2">
              Industry Awards & Recognition
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300" />

        {/* BUTTON */}
        <Link
          href="/detailProject"
          className="
            px-8 py-3
            rounded-full
            border-2 border-gray-300
            typo-button
            hover:bg-black hover:text-white
            transition
            cursor-pointer
            inline-block
          "
        >
          See Our Work
        </Link>

      </div>
    </section>
  );
}