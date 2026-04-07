"use client"

import Image from "next/image"

const VipHero = () => {
  return (
     <section className="relative w-full h-[450px] sm:h-[480px] md:h-[600px] overflow-hidden">

      {/* IMAGE */}
      <Image
        src="/vip-image.png"
        alt="VIP Hero"
        fill
        priority
        className="object-cover"
      />

    {/* MOBILE IMAGE */}
    <Image
        src="/vip-image-mobile.png"
        alt="Hero Mobile"
        fill
        priority
        className="object-cover object-[center_top] block md:hidden"
    />

      {/* OVERLAY (BIAR GELAP & KONTRAS) */}
     <div className="absolute inset-0 bg-black/70 md:bg-black/75" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">

        {/* BREADCRUMB */}
        <p className="typo-body-lg mb-4 text-white">
              <span className="opacity-80">Home / </span>
              <span className="font-bold text-white">Ammache VIP </span>
        </p>

        {/* TITLE */}
        <h1 className="typo-display mb-6">
          AMMACHE VIP
        </h1>

        {/* DESCRIPTION */}
        <p className="typo-body text-white/80 max-w-[700px]">
          Get first access to new developments, design insights, and exclusive opportunities
          from a firm with over <span className="font-semibold text-white">$700 million</span> in delivered projects — before they go public.
        </p>

      </div>

    </section>
  )
}

export default VipHero