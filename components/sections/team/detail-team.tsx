"use client"

import Image from "next/image"
import Link from "next/link"

interface Props {
  data: {
    name: string
    role: string
    image: string
    description: string[]
  }
  prev?: {
    name: string
    role: string
  } | null
  next?: {
    name: string
    role: string
  } | null
  prevSlug?: string | null
  nextSlug?: string | null
}


export default function DetailTeam({
  data,
  prev,
  next,
  prevSlug,
  nextSlug,
}: Props) {
  return (
    <>
      {/* HERO */}
      <section className="w-full bg-black text-white py-25 md:py-30">
        <div className="max-w-[1200px] mx-auto px-6">
        <p className="typo-body-lg mb-4 flex gap-1 flex-wrap">

        <Link
          href="/"
          className="text-white/60 hover:text-white hover:underline transition"
        >
          Home
        </Link>

        <span className="text-white/40">/</span>

        <Link
          href="/team"
          className="text-white/60 hover:text-white hover:underline transition"
        >
          Team
        </Link>

        <span className="text-white/40">/</span>

        <span className="text-white font-semibold">
          {data.role}
        </span>

      </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            {data.role}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section id="about" 
            className="
              relative 
              z-20
              -mt-14 md:-mt-16
              bg-white md:bg-[#f5f5f5]
              rounded-t-[24px] md:rounded-t-[32px]
              pt-16 md:pt-20
              pb-20
            "
          >
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          
          {/* IMAGE */}
          <div className="flex justify-center">
            <Image
              src={data.image}
              alt={data.name}
              width={600}
              height={800}
              className="w-[90%] h-auto rounded-2xl object-contain"
              priority
            />
          </div>

          {/* TEXT */}
          <div className="pt-4">

            {/* ROLE */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-[0.2em] font-bold text-black uppercase">
                {data.role}
              </span>
              <div className="hidden md:block w-10 h-px bg-gray-400" />
            </div>

            {/* NAME */}
            <h2 className="text-[42px] md:text-[52px] leading-tight font-semibold text-black mb-6">
              {data.name}.
            </h2>

            {/* LINE */}
            <div className="h-px bg-gray-300 mb-8" />

            {/* DESCRIPTION */}
            <div className="text-black space-y-5 text-[15px] leading-relaxed">
                {data.description.map((text, i) => (
                    <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
            </div>

          </div>
        </div>
      </section>
    <section className="bg-[#f7f7f7] md:bg-[#edecec] py-16 md:border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">

          {/* PREVIOUS */}
          {prev ? (
            <Link
              href={`/team/${prevSlug}`}
              className="group transition-all duration-300"
            >
              <p className="text-xs tracking-[0.2em] text-gray-500 mb-2">
                PREVIOUS —
              </p>

              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-semibold group-hover:opacity-70 transition">
                  ← {prev.name.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {prev.role}
              </p>
            </Link>
          ) : <div />}

          {/* NEXT */}
          {next ? (
            <Link
              href={`/team/${nextSlug}`}
              className="group text-right transition-all duration-300"
            >
              <p className="text-xs tracking-[0.2em] text-black mb-2">
                NEXT —
              </p>

              <div className="flex items-center gap-2 justify-end">
                <span className="text-xl md:text-2xl font-semibold group-hover:opacity-70 transition">
                  {next.name.toUpperCase()} →
                </span>
              </div>

              <p className="text-sm text-black mt-1">
                {next.role}
              </p>
            </Link>
          ) : <div />}

        </div>
      </section>
    </>
  )
}