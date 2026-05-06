"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Loader2,
} from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"
import { dataLayer } from "@/lib/gtm/data-layer"

const contactSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  projectType: z.string().min(1, "Project Type is required"),
  projectLocation: z.string().min(1, "Project Location is required"),
})

const ContactHero = () => {
  return (
    <section id="about" className="relative w-full h-112.5 sm:h-120 md:h-150 overflow-hidden">
        <Image
          src="/contact-hero-v2.png"
          alt="Hero"
          fill
          priority
          className="object-cover object-[center_top] scale-105 md:object-center md:scale-100"
        />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">
      <div className="max-w-[90%] md:max-w-300 mx-auto md:ml-30 w-full px-4 md:px-6 text-white">

      <p className="typo-body-lg mb-4 flex gap-1 flex-wrap">

        <Link
          href="/"
          className="text-white/70 hover:underline transition"
        >
          Home
        </Link>

        <span className="text-white/40">/</span>

        <span className="text-white font-semibold">
          Contact Us
        </span>

      </p>
          <h1 className="typo-h1 max-w-250">
          Let&#39;s Create Something People Will Love Living In.
          </h1>

      </div>
      </div>

    </section>
  )
}

const ContactSection = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneCountry, setPhoneCountry] = useState("AU")
  const [email, setEmail] = useState("")
  const [projectType, setProjectType] = useState("")
  const [projectLocation, setProjectLocation] = useState("")
  const [message, setMessage] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const initialized = useRef(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = contactSchema.safeParse({ firstName, lastName, email, projectType, projectLocation })
    if (!result.success) {
      result.error.issues.forEach((err) => toast.error(err.message))
      return
    }

    setLoading(true)
    try {
      if (!initialized.current) {
        try {
          const initRes = await fetch(
            `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/api/form-submissions/init-spreadsheet`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                spreadsheetUrl: process.env.NEXT_PUBLIC_SPREADSHEET_URL,
                sampleFormData: {
                  firstName: "Sample",
                  lastName: "Sample",
                  phone: "000",
                  email: "sample@example.com",
                  projectType: "Sample",
                  projectLocation: "Sample",
                  message: "Sample",
                },
              }),
            }
          )
          if (initRes.ok) {
            initialized.current = true
          }
        } catch {
          // Spreadsheet may already be initialized — continue with submission
        }
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/api/form-submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: { firstName, lastName, phone, email, projectType, projectLocation, message },
            spreadsheetUrl: process.env.NEXT_PUBLIC_SPREADSHEET_URL,
            emailReceiver: process.env.NEXT_PUBLIC_FORM_EMAIL_RECEIVER,
            cc: process.env.NEXT_PUBLIC_FORM_EMAIL_CC?.split(",").filter(Boolean),
            bcc: process.env.NEXT_PUBLIC_FORM_EMAIL_BCC?.split(",").filter(Boolean),
            metadata: {
              formType: "contact-form",
              subject: "New Contact Form - Ammache Architects",
            },
          }),
        }
      )

      if (res.status === 201) {
        toast.success("Your enquiry has been submitted successfully!")
        dataLayer.contactFormSubmit({
          project_type: projectType,
          project_location: projectLocation,
          has_phone: phone.trim().length > 0,
          has_message: message.trim().length > 0,
        })
        setFirstName("")
        setLastName("")
        setPhone("")
        setPhoneCountry("AU")
        setEmail("")
        setProjectType("")
        setProjectLocation("")
        setMessage("")
        setAgreed(false)
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.message || "Failed to submit. Please try again.")
      }
    } catch {
      toast.error("A network error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
     <section className="bg-white md:bg-white py-12 md:py-20">

      <div className="w-full max-w-350 mx-auto px-4 md:px-10">

        {/* GRID LANGSUNG TANPA CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 rounded-[20px] overflow-hidden">

          {/* ================= LEFT ================= */}
        <div className="
          relative bg-white text-black
          p-6 md:px-16 md:py-16
          flex flex-col justify-between
          rounded-[20px] md:rounded-l-[20px]
          min-h-125 md:min-h-162.5
          overflow-hidden
        ">

        <div className="absolute inset-0 z-0 flex items-end justify-end pointer-events-none">
            <Image
            src="/background-contact.png"
            alt="background shape"
            fill
            className="scale-50 opacity-10"
          />
        </div>

    {/* CONTENT WRAPPER (BIAR KE TENGAH) */}
      <div className="
          relative z-10
          max-w-105
          w-full
          space-y-5 md:space-y-12
          mx-auto md:mx-0
          md:pl-10
        ">

        {/* ADDRESS */}
        <div className="flex gap-4">
          <a
          href="https://maps.google.com/?q=11+Meaden+St+Southbank+VIC+3006"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex gap-4 items-center"
        >
          <MapPin size={22} className="group-hover:translate-x-1 transition" />
          <p className="typo-body-sm group-hover:translate-x-1 transition">
            11 Meaden St, Southbank <br /> VIC 3006
          </p>
        </a>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-black w-full" />

        {/* PHONE */}
        <div className="flex gap-4">
        <a
          href="tel:0399571818"
          className="group flex gap-4 items-center"
        >
          <Phone size={22} className="group-hover:translate-x-1 transition" />
          <p className="typo-body-sm group-hover:translate-x-1 transition">
            03 9957 1818
          </p>
        </a>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-black w-full" />

        {/* EMAIL */}
        <div className="flex gap-4">
        <a
          href="mailto:enquiries@ammachearchitects.com.au"
          className="group flex gap-4 items-center"
        >
          <Mail size={22} className="group-hover:translate-x-1 transition" />
          <p className="typo-body-sm wrap-break-word group-hover:translate-x-1 transition">
            enquiries@ammachearchitects.com.au
          </p>
        </a>
        </div>

        {/* DIVIDER (TOTAL 3 SESUAI DESIGN) */}
        <div className="border-b border-black w-full" />

    </div>

    {/* BOTTOM */}
    <div className="relative z-10 max-w-105 mx-auto w-full mt-16 md:mt-24">

        <Image
        src="/logo-ammache.svg"
        alt="logo"
        width={140}
        height={40}
        className="mb-5"
        />

        <p className="typo-body-sm text-white/80">
        Founded in Melbourne in 1998, Ammache Architects creates thoughtful,
        innovative architecture designed to endure.
        </p>

        <div className="flex gap-4 mt-6">

          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:opacity-70 transition"
          >
            <Instagram size={18} />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:opacity-70 transition"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:opacity-70 transition"
          >
            <Facebook size={18} />
          </a>

        </div>

    </div>
    </div>

        {/* ================= RIGHT ================= */}
          <div className="bg-white p-6 md:p-10 rounded-[20px] border border-gray-200">

              <p className="typo-body-sm text-gray-600 mb-8">
                  Tell us about your site or project. We&#39;ll get back to you with honest thoughts on what it could become.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">

                  {/* FIRST NAME */}
                  <div>
                      <label className="typo-caption text-gray-700 block mb-2">
                      First Name*
                      </label>
                      <input
                      type="text"
                      placeholder="First Name*"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                      />
                  </div>

                  {/* LAST NAME */}
                  <div>
                      <label className="typo-caption text-gray-700 block mb-2">
                      Last Name*
                      </label>
                      <input
                      type="text"
                      placeholder="Last Name*"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                      />
                  </div>

                  {/* PHONE */}
                  <div>
                  <label className="typo-caption text-gray-700 block mb-2">
                      Phone number
                  </label>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">

                      <select
                      value={phoneCountry}
                      onChange={(e) => setPhoneCountry(e.target.value)}
                      className="px-3 text-sm bg-white outline-none border-r border-gray-300"
                      >
                      <option>US</option>
                      <option>ID</option>
                      <option>AU</option>
                      </select>

                      <input
                      type="text"
                      placeholder="+61 4XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-4 py-3.5 outline-none placeholder:text-gray-400"
                      />
                  </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                  <label className="typo-caption text-gray-700 block mb-2">
                      Email Address*
                  </label>
                  <input
                      type="email"
                      placeholder="Email Address*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  </div>

                  {/* PROJECT TYPE */}
                  <div>
                  <label className="typo-caption text-gray-700 block mb-2">
                      Project Type*
                  </label>
                  <input
                      type="text"
                      placeholder="Project Type*"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  </div>

                  {/* PROJECT LOCATION */}
                  <div>
                  <label className="typo-caption text-gray-700 block mb-2">
                      Project Location*
                  </label>
                  <input
                      type="text"
                      placeholder="Project Location*"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  </div>

                  {/* TEXTAREA */}
                  <div>
                  <label className="typo-caption text-gray-700 block mb-2">
                      How can we help?
                  </label>
                  <textarea
                      rows={4}
                      placeholder="Tell us a little about the project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white resize-none placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  </div>

                  {/* CHECKBOX */}
                  <div className="flex items-start gap-2 mt-5 typo-fine text-black">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 cursor-pointer"
                    />
                    <span>
                        I agree to receive communications from Ammache Architechs. Unsubscribe anytime.
                    </span>
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-4 rounded-lg bg-black text-white typo-button hover:bg-gray-800 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 className="animate-spin" size={18} />}
                    {loading ? "Submitting..." : "Book a Concept Review"}
                  </button>

              </form>
          </div>

        </div>

      </div>

    </section>
  )
}

const ContactMapSection = () => {
  return (
    <section className="bg-white md:bg-white py-20 md:py-28">

      <div className="max-w-300 mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* ================= LEFT ================= */}
        <div className="max-w-105 mx-auto md:mx-0 text-center md:text-left">

          {/* FIND */}
          <p className="typo-overline text-black mb-6">
            FIND THE STUDIO
          </p>

          {/* TITLE */}
          <h2 className="typo-h1 mb-8">
            Southbank, <br /> Melbourne.
          </h2>

          {/* OPEN IN MAPS */}
          <p className="typo-fine text-gray-500 mb-4 md:ml-10">
            OPEN IN MAPS
          </p>

          {/* BUTTON */}
          <div className="flex justify-center md:justify-start">
            <a
              href="https://www.google.com/maps/place/Ammache+Architects+Melbourne/@-37.8285323,144.9541625,17z/data=!3m1!4b1!4m6!3m5!1s0x6ad66aae90425cb5:0xb4efe264d0ad907!8m2!3d-37.8285323!4d144.9541625!16s%2Fg%2F1tgcy610?hl=en&entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                px-10 py-3
                rounded-full
                border-2 border-gray-300
                typo-button
                hover:bg-black hover:text-white
                transition-all
              "
            >
              Get Directions
            </a>
          </div>

        </div>

        {/* ================= MAP ================= */}
          <div className="w-full h-62.5 md:h-130 rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.356792922645!2d144.9541625!3d-37.8285323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66aae90425cb5%3A0xb4efe264d0ad907!2sAmmache%20Architects%20Melbourne!5e0!3m2!1sen!2sid!4v1777907905729!5m2!1sen!2sid"
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

export default function ContactPage() {
    return (
        <>
            <ContactHero/>
            <div
                className="
          relative
          z-20
          -mt-10 md:-mt-12
          bg-white md:bg-white
          rounded-t-[20px] md:rounded-t-[30px]
          overflow-hidden
        "
            >
                <ContactSection/>
                <ContactMapSection/>
            </div>
        </>
    )
}
