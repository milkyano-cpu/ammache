"use client"

const StorySection = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] py-10 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* TITLE */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-black text-[22px] md:text-[25px] font-bold">
            Our Story
          </h2>
          <span className="block w-16 h-[2px] bg-black mt-2"></span>
        </div>

        {/* HEADLINE */}
        <h3 className="
          font-[var(--font-heading)]
          text-[28px] md:text-[42px]
          leading-[1.2]
          font-semibold
          mb-6 md:mb-10
        ">
          Built from a single room.
          <br />
          Now shaping Melbourne's skyline.
        </h3>

        {/* PARAGRAPHS */}
        <div className="
          text-gray-800
          text-[14px] md:text-[16px]
          leading-[1.8] 
          space-y-6
        ">

          <p>
            Founded in 1998 by <b>Nidal Ammache</b>, <b>Ammache Architects</b> began as a one-man practice in <b>Melbourne</b> with a singular conviction — that <b>architecture should be understood, not just designed.</b> That buildings should respond to the people who inhabit them, the communities that surround them, and the markets that sustain them.
          </p>

          <p>
            Over <b>27 years</b>, that conviction has shaped a practice unlike most. <b>Ammache</b> is a registered architectural firm comprising a carefully selected team of professionals, including registered architects and draftsmen, offering a comprehensive range of services from initial schematic design through to planning, compliance, and post-construction.
          </p>

          <p>
            What sets <b>Ammache</b> apart is not just the breadth of its portfolio — spanning residential, commercial, industrial, retail, medical, childcare, and NDIS sectors — but the depth of its relationships. Clients work directly with the principals. Every project is personal.
          </p>

          <p>
            Today, the firm has entered its second generation. Nidal's sons, <b>Amir</b> and <b>Adam</b>, have joined the practice he built. The result is a multigenerational studio that carries the same standards forward — with new energy, new ideas, and an unwavering commitment to the quality that made the firm's reputation.
          </p>

        </div>

      </div>
    </section>
  )
}

export default StorySection