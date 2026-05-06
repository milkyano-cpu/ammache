"use client";

import {useEffect, useState} from "react";

function Counter({
  end,
  duration = 2000,
  trigger,
}: {
  end: number;
  duration?: number;
  trigger: number;
}) {
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
  }, [duration, end, trigger]);

  return <span>{count}</span>;
}

export default function Stats() {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {

    let timeout: NodeJS.Timeout;

    const loop = () => {

      setTrigger((prev) => prev + 1); // 🔥 semua counter jalan barengan

      const delay = 10000 + Math.random() * 10000;

      timeout = setTimeout(loop, delay);

    };

    loop();

    return () => clearTimeout(timeout);

  }, []);
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 bg-white md:bg-white  text-center">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* TITLE */}
        <h2 className="typo-h2 text-gray-900">
          Architecture Built Around How People Actually Live.
        </h2>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <p className="typo-stat text-black">
              <Counter end={33} trigger={trigger} />+
            </p>
            <p className="typo-caption text-black mt-2">
              Years Designing Spaces
              <span><br/>for Real World</span>
            </p>
          </div>

          <div>
            <p className="typo-stat text-black">
              <Counter end={900} trigger={trigger} />+
            </p>
            <p className="typo-caption text-black mt-2">
              Projects Built
              <span><br/>Around People</span>
            </p>
          </div>

          <div>
            <p className="typo-stat text-black">
              <Counter end={15} trigger={trigger} />+
            </p>
            <p className="typo-caption text-black mt-2">
              Industry Awards &
              <span><br/>Recognition</span>
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300" />
      </div>
    </section>
  );
}
