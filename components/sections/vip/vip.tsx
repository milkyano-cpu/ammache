"use client"

import Image from "next/image"
import Link from "next/link"

const VipHero = () => {
  return (
     <section className="relative w-full h-112.5 sm:h-120 md:h-150 overflow-hidden">

      <Image
        src="/vip-image.png"
    alt="VIP Hero"
        fill
        priority
        className="object-cover object-bottom md:object-center"
      />

      {/* OVERLAY (BIAR GELAP & KONTRAS) */}
     <div className="absolute inset-0 bg-black/20 md:bg-black/25" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">

        {/* BREADCRUMB */}
        <p className="typo-body-lg mb-4 flex gap-1 flex-wrap">

          <Link
            href="/"
            className="text-white/70 hover:underline transition"
          >
            Home
          </Link>

          <span className="text-white/40">/</span>

          <span className="text-white font-semibold">
            Ammache VIP
          </span>

        </p>

        {/* TITLE */}
          <Image
            src="/ammache-vip.png"
            alt="Ammache VIP"
            width={400}
            height={120}
            className="mb-6 w-65 md:w-100 h-auto"
          />

        {/* DESCRIPTION */}
        <p className="typo-body text-white/80 max-w-[700px]">
          Get first access to new developments, design insights, and exclusive opportunities
          from a firm with over <span className="font-semibold text-white">$900 million</span> in delivered projects. Before they go public.
        </p>

      </div>

    </section>
  )
}

export default VipHero
