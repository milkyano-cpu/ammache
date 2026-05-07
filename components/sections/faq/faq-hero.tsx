"use client"

import Image from "next/image"
import Link from "next/link"

const FaqHero = () => {
  return (
    <section className="relative w-full h-137.5 md:h-150 overflow-hidden">

      <Image
        src="/hero-faq.png"
        alt="Hero"
        fill
        priority
        className="object-cover object-[center_top] md:object-center"
      />

      <div className="absolute inset-0 bg-black/20 md:bg-black/20" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">

        <p className="typo-body-lg mb-4 flex gap-1 flex-wrap justify-center">
          <Link href="/" className="text-white/70 hover:underline transition">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-semibold">FAQ</span>
        </p>

        <h1 className="typo-h1">FAQ&#39;s</h1>

      </div>

    </section>
  )
}

export default FaqHero
