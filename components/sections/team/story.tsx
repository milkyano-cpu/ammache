"use client"

const StorySection = () => {
  return (
    <section className="bg-white md:bg-white py-10 md:py-20">
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
          font-[var(--font-sans)]
          text-[28px] md:text-[42px]
          leading-[1.2]
          font-semibold
          mb-6 md:mb-10
        ">
          Built from a single belief. That architecture 
          <br />
          should be felt, not just seen.
        </h3>

        {/* PARAGRAPHS */}
        <div className="
          text-gray-800
          text-[14px] md:text-[16px]
          leading-[1.8] 
          space-y-6
        ">

          <p>
            Founded in 1998 by <b>Nidal Ammache</b>, <b>Ammache Architects</b> began with a single conviction: that buildings should respond to the people who inhabit them.
          </p>

          <p>
            Over <b>33 years</b>, that belief has shaped everything. Today, <b>Ammache</b> s a registered firm of architects, designers, and coordinators who work directly with clients across every stage, from first sketch to final handover.
          </p>

          <p>
            What sets us apart isn't the scale of our portfolio. It's the depth of our relationships. Every project is personal. Every client works directly with the principals.
          </p>

          <p>
            Today, the practice has entered its second generation. <b>Nidal's sons,</b> <b>Amir</b> and <b>Adam</b>, carry the same standards forward with new energy and an unwavering commitment to the quality that built this firm's reputation.
          </p>

        </div>

      </div>
    </section>
  )
}

export default StorySection