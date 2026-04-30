"use client";

import Link from "next/link"

export default function CTA() {
  return (
    <section className="w-full py-28 px-6 md:px-12 lg:px-20 bg-white md:bg-white  text-center">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* TITLE */}
        <h2 className="typo-h2 text-black">
          Have a Site or Project in Mind?
        </h2>

        {/* DESCRIPTION */}
        <p className="typo-body text-gray-800">
          Let's talk about how it can become a
          <br />
          place people genuinely want to be in.
        </p>

        {/* BUTTON */}
        <div className="pt-4">
        <Link
            href="/contact"
            className="
              px-10 py-3
              rounded-full
              border-2 border-gray-300
              typo-button
              hover:bg-black hover:text-white
              transition
              cursor-pointer
              inline-block
            "
          >
            Book a Concept Review
          </Link>
        </div>

      </div>
    </section>
  );
}