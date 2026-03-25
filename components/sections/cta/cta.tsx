export default function CTA() {
  return (
    <section className="w-full py-28 px-6 md:px-12 lg:px-20 bg-white md:bg-[#f5f5f5]  text-center">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold text-black">
          Have a Project in Mind?
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-800 text-s md:text-base leading-relaxed">
          Tell us about your vision and our team
          <br />
          will get in touch.
        </p>

        {/* BUTTON */}
        <div className="pt-4">
          <button className="px-10 py-3 rounded-full border-2 border-gray-300 text-sm hover:bg-black hover:text-white transition cursor-pointer">
            Enquire
          </button>
        </div>

      </div>
    </section>
  );
}