'use client'

import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* DESKTOP IMAGE */}
      <Image
        src="/hero-image.png"
        alt="Hero"
        fill
        priority
        className="object-cover hidden md:block"
      />

      {/* MOBILE IMAGE */}
      <Image
        src="/hero-image-mobile.png"
        alt="Hero Mobile"
        fill
        priority
        className="object-cover block md:hidden"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/10" />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-widest">
          AMMACHE
        </h1>
      </div>

    </section>
  )
}

export default Hero