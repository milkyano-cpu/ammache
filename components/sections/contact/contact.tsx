"use client"

import Image from "next/image"
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin
} from "lucide-react"

/* ================= HERO ================= */
const ContactHero = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[800px] overflow-hidden">
        <Image
         src="/contact-hero.png"
              alt="Hero"
              fill
              priority
              className="object-cover hidden md:block"
            />
      
            {/* MOBILE IMAGE */}
            <Image
              src="/contact-hero-mobile.png"
              alt="Hero Mobile"
              fill
              priority
              className="object-cover block md:hidden"
            />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
    <div className="absolute inset-0 flex items-center">
    <div className="max-w-[90%] md:max-w-[1200px] mx-auto md:ml-30 w-full px-4 md:px-6 text-white">

        <p className="text-xl md:text-2xl mb-4 opacity-80 text-white">
        Home / <span className="font-bold">Contact Us</span>
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-[700px]">
        Lets build something great.
        </h1>

    </div>
    </div>

    </section>
  )
}


/* ================= CONTACT FORM ================= */
const ContactSection = () => {
  return (
     <section className="bg-white md:bg-[#f5f5f5] py-20">

      <div className="max-w-[90%] md:max-w-[1200px] mx-auto px-4 md:px-6">

        {/* GRID LANGSUNG TANPA CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[30px] overflow-hidden">

          {/* ================= LEFT ================= */}
        <div className="hidden md:flex relative bg-black text-white p-10 md:p-14 flex-col justify-between min-h-[650px] overflow-hidden">

        <div className="absolute inset-0 z-0 flex items-end justify-center">
        <Image
            src="/logo-contact.png"
            alt="background shape"
            width={800}
            height={800}
        />
        </div>

    {/* CONTENT WRAPPER (BIAR KE TENGAH) */}
    <div className="relative z-10 max-w-[420px] mx-auto w-full space-y-10">

        {/* ADDRESS */}
        <div className="flex gap-4">
        <MapPin size={22} />
        <p className="leading-relaxed text-[15px]">
            11 Meaden St, Southbank <br /> VIC 3006
        </p>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-white/20 w-[80%]" />

        {/* PHONE */}
        <div className="flex gap-4">
        <Phone size={22} />
        <p className="text-[15px]">03 9957 1818</p>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-white/20 w-[80%]" />

        {/* EMAIL */}
        <div className="flex gap-4">
        <Mail size={22} />
        <p className="text-[15px] break-words">
            enquiries@ammachearchitects.com.au
        </p>
        </div>

        {/* DIVIDER (TOTAL 3 SESUAI DESIGN) */}
        <div className="border-b border-white/20 w-[80%]" />

    </div>

    {/* BOTTOM */}
    <div className="relative z-10 max-w-[420px] mx-auto w-full mt-12">

        <Image
        src="/logo-ammache.png"
        alt="logo"
        width={140}
        height={40}
        className="mb-5"
        />

        <p className="text-sm text-white/70 leading-relaxed">
        Founded in Melbourne in 1998, Ammache Architects creates thoughtful,
        innovative architecture designed to endure.
        </p>

        <div className="flex gap-4 mt-6">
        <Instagram size={18} />
        <Linkedin size={18} />
        <Facebook size={18} />
        </div>

    </div>
    </div>

          {/* ================= RIGHT ================= */}
            <div className="bg-white md:bg-[#f5f5f5] p-6 md:p-10 md:p-14 rounded-[20px] md:rounded-none shadow-sm md:shadow-none">

                <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                    If you would like to contact Ammache about our services and product
                    please don’t hesitate to reach out.
                </p>

                <div className="space-y-5">

                    {/* INPUT TEMPLATE */}
                    {[
                    { label: "First Name*", placeholder: "First Name*" },
                    { label: "Last Name*", placeholder: "Last Name*" },
                    ].map((item, i) => (
                    <div key={i}>
                        <label className="text-sm text-gray-700 block mb-2">
                        {item.label}
                        </label>
                        <input
                        type="text"
                        placeholder={item.placeholder}
                        className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                        />
                    </div>
                    ))}

                    {/* PHONE */}
                    <div>
                    <label className="text-sm text-gray-700 block mb-2">
                        Phone number
                    </label>

                    <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">

                        <select className="px-3 text-sm bg-white outline-none border-r border-gray-300">
                        <option>US</option>
                        <option>ID</option>
                        <option>AU</option>
                        </select>

                        <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        className="flex-1 px-4 py-3.5 outline-none placeholder:text-gray-400"
                        />
                    </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                    <label className="text-sm text-gray-700 block mb-2">
                        Email Address*
                    </label>
                    <input
                        type="email"
                        placeholder="Email Address*"
                        className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    </div>

                    {/* PROJECT TYPE */}
                    <div>
                    <label className="text-sm text-gray-700 block mb-2">
                        Project Type*
                    </label>
                    <input
                        type="text"
                        placeholder="Project Type*"
                        className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    </div>

                    {/* PROJECT LOCATION */}
                    <div>
                    <label className="text-sm text-gray-700 block mb-2">
                        Project Location*
                    </label>
                    <input
                        type="text"
                        placeholder="Project Location*"
                        className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    </div>

                    {/* TEXTAREA */}
                    <div>
                    <label className="text-sm text-gray-700 block mb-2">
                        How can we help?
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Tell us a little about the project..."
                        className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white resize-none placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    </div>

                    {/* CHECKBOX */}
                    <div className="flex items-start gap-3 mt-4 text-sm text-gray-600">
                    <input type="checkbox" className="mt-1" />
                    <p className="leading-relaxed">
                        I agree to receive communications from Ammache Architects.
                        Unsubscribe anytime.
                    </p>
                    </div>

                    {/* BUTTON */}
                    <button className="w-full mt-6 py-4 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                    Submit Enquiry
                    </button>

                </div>
            </div>

        </div>

      </div>

    </section>
  )
}


/* ================= MAP ================= */
const ContactMapSection = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] py-20 md:py-28">

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* ================= LEFT ================= */}
        <div className="max-w-[420px] mx-auto md:mx-0 text-center md:text-left">

          {/* FIND */}
          <p className="text-xs tracking-[0.2em] text-black mb-6">
            FIND THE STUDIO
          </p>

          {/* TITLE */}
          <h2 className="text-[32px] md:text-[56px] font-semibold leading-[1.15] mb-8">
            Southbank, <br /> Melbourne.
          </h2>

          {/* OPEN IN MAPS */}
          <p className="text-xs text-gray-400 tracking-wide mb-4">
            OPEN IN MAPS
          </p>

          {/* BUTTON */}
          <div className="flex justify-center md:justify-start">
            <a
              href="https://www.google.com/maps?q=11+Meaden+St,+Southbank+VIC+3006"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                px-8 py-3
                rounded-full
                border border-gray-300
                text-sm font-medium
                hover:bg-black hover:text-white
                transition-all
              "
            >
              Get Directions
            </a>
          </div>

        </div>

        {/* ================= MAP ================= */}
        <div className="w-full h-[250px] md:h-[520px] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

          <iframe
            src="https://www.google.com/maps?q=11+Meaden+St,+Southbank+VIC+3006&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
          />

        </div>

      </div>

    </section>
  )
}


/* ================= PAGE ================= */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactMapSection />
    </>
  )
}