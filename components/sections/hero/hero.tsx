'use client'

import Image from 'next/image'

const Hero = () => {
  return (
      <section className="relative w-full h-[700px] sm:h-[500px] md:h-[820px] overflow-hidden">
      
      {/* ✅ DESKTOP VIDEO */}
      <video
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      />


      {/* ✅ MOBILE VIDEO */}
      <video
        src="/hero-video-mobile.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover block md:hidden"
      />

      {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/10 md:bg-black/10" />

      {/* CONTENT */}
      {/* <div className="relative z-10 flex items-center justify-center h-full">
      <Image
          src="/ammache-hero.png"
          alt="Ammache"
          width={320}
          height={100}
          className="hero-logo w-[200px] sm:w-[260px] md:w-[320px] lg:w-[400px] h-auto object-contain"
          priority
        />
      </div> */}

    </section>
  )
}

export default Hero