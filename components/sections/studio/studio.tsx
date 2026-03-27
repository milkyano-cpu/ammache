import Image from "next/image";

export default function Studio() {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white md:bg-[#f5f5f5] ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="w-full">
          <Image
            src="/studio-image.png" 
            alt="Studio"
            width={700}
            height={500}
            className="w-full h-auto rounded-2xl md:rounded-3xl object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-4 md:space-y-6">

          {/* LABEL */}
          <div className="flex items-center gap-3">
            <p className="text-s tracking-widest">
              OUR STUDIO
            </p>
            <div className="w-10 h-[1px] bg-gray-400" />
          </div>

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
            Built on Experience,
            <br />
            Driven by Design
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-900 text-base md:text-lg leading-relaxed max-w-md text-justify">
            Beyond our studio, we’re building a curated network for architects, interior designers, builders, developers, and creative professionals.
            <br /><br />
            Through private events, educational sessions, industry insights, and exclusive invitations, we’re creating a space where ambitious people in design and construction can connect, learn, and stay ahead.
            <br /><br />
            This is our way of contributing to the industry.
            Not just through the spaces we create, but through the community we build around them.
          </p>

        </div>

      </div>
    </section>
  );
}