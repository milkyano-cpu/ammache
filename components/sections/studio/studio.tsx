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
            <p className="typo-overline">
              OUR STUDIO
            </p>
            <div className="w-10 h-[1px] bg-gray-400" />
          </div>

          {/* TITLE */}
          <h2 className="typo-h2 text-black">
            Built on Collaboration.
            <br className="hidden md:block" />
            Driven by Purpose.
          </h2>

          {/* DESCRIPTION */}
          <p className="typo-body-lg text-gray-900 max-w-md text-justify">
            Beyond the studio, we've spent decades building relationships with the people who shape the built environment architects, developers, builders, and designers who care about more than just construction.
            <br /><br />
            We share knowledge, challenge ideas, and raise the standard of what architecture can do for people.
            <br /><br />
            Because the best spaces aren't built alone they're built with the right people around the table.
          </p>

        </div>

      </div>
    </section>
  );
}