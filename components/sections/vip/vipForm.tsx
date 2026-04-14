"use client"

import { useState, useRef } from "react"
import { Loader2, ChevronDown } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"
import { dataLayer } from "@/lib/gtm/data-layer"

const vipSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
})

const VipForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneCountry, setPhoneCountry] = useState("US")
  const [email, setEmail] = useState("")
  const [profession, setProfession] = useState("")
  const [interest, setInterest] = useState("")
  const [source, setSource] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const initialized = useRef(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = vipSchema.safeParse({ firstName, lastName, email })
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
                spreadsheetUrl: process.env.NEXT_PUBLIC_VIP_SPREADSHEET_URL,
                sampleFormData: {
                  firstName: "Sample",
                  lastName: "Sample",
                  phone: "000",
                  email: "sample@example.com",
                  profession: "Sample",
                  interest: "Sample",
                  source: "Sample",
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
            formData: { firstName, lastName, phone, email, profession, interest, source },
            spreadsheetUrl: process.env.NEXT_PUBLIC_VIP_SPREADSHEET_URL,
            emailReceiver: process.env.NEXT_PUBLIC_FORM_EMAIL_RECEIVER,
            cc: process.env.NEXT_PUBLIC_FORM_EMAIL_CC?.split(",").filter(Boolean),
            bcc: process.env.NEXT_PUBLIC_FORM_EMAIL_BCC?.split(",").filter(Boolean),
            metadata: {
              formType: "vip-form",
              subject: "New VIP Registration - Ammache Architects",
            },
          }),
        }
      )

      if (res.status === 201) {
        toast.success("Welcome to Ammache VIP! Your registration has been submitted successfully.")
        dataLayer.vipFormSubmit({
          profession: profession,
          interest: interest,
          source: source,
        })
        setFirstName("")
        setLastName("")
        setPhone("")
        setPhoneCountry("US")
        setEmail("")
        setProfession("")
        setInterest("")
        setSource("")
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
    <section id="about" className="bg-white md:bg-[#f5f5f5] py-16 md:py-18">

  <div className="max-w-[1200px] mx-auto px-5 md:px-6 mb-10 md:mb-16">

    <h2 className="typo-h2 mb-4">
      Join Ammache VIP today.
    </h2>

    <p className="typo-body text-gray-600 max-w-[700px]">
      Ammache VIP is open to architects, developers, and designers who want direct access to
      our projects and thinking. Membership is complimentary and there is no obligation.
    </p>

  </div>

      {/* CARD */}
      <div className="max-w-[700px] mx-auto px-4">
        <div className="bg-white rounded-[20px] md:rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-5 md:p-10">

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">

            {/* FIRST NAME */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                First Name*
              </label>
              <input
                placeholder="First Name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Last Name*
              </label>
              <input
                placeholder="Last Name*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Phone number
              </label>

              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <select
                  value={phoneCountry}
                  onChange={(e) => setPhoneCountry(e.target.value)}
                  className="px-3 md:px-4 typo-body border-r border-gray-200"
                >
                  <option>US</option>
                  <option>ID</option>
                  <option>AU</option>
                </select>

                <input
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 md:px-6 py-3.5 md:py-4 typo-body"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Email Address*
              </label>
              <input
                placeholder="Email Address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>

            {/* PROFESSION */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                My Profession
              </label>
              <div className="relative">
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200 appearance-none bg-white" 
                >
                  <option value="">Select your profession*</option>
                  <option value="Architect">Architect</option>
                  <option value="Developer / Builder">Developer / Builder</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Real Estate Agent">Real Estate Agent</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Investor">Investor</option>
                  <option value="Other">Other</option>
                </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>

            {/* INTEREST */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Most Interested in
              </label>
              <div className="relative">
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200 appearance-none bg-white"
                >
                  <option value="">Select your primary interest</option>
                  <option value="Residential Development">Residential Development</option>
                  <option value="Commercial & Industrial Projects">Commercial & Industrial Projects</option>
                  <option value="Off-Market Opportunities">Off-Market Opportunities</option>
                  <option value="Design Insights & Studio Content">Design Insights & Studio Content</option>
                  <option value="General — All Updates">General — All Updates</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <ChevronDown size={18} className="text-gray-500" />
                </div>
              </div>
            </div>

            {/* SOURCE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                How Did You Hear About Us
              </label>
              <div className="relative">
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200 appearance-none bg-white"
              >
                <option value="">Select an option</option>
                <option value="Referral — Existing VIP Member">Referral — Existing VIP Member</option>
                <option value="Google Search">Google Search</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Ammache Website">Ammache Website</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <ChevronDown size={18} className="text-gray-500" />
              </div>
            </div>
            </div>

            {/* CHECKBOX */}
            <label className="flex items-start gap-3 mt-6 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 cursor-pointer"
              />
              <p className="typo-fine text-black">
                I consent to Ammache Architects contacting me with VIP updates, project news,
                event invitations, and design content. My details will not be shared with third parties.
              </p>
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3.5 md:py-4 bg-black text-white rounded-lg typo-button hover:bg-gray-800 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Submitting..." : "Join Ammache VIP"}
            </button>

          </form>
        </div>
      </div>
    </section>
  )
}

export default VipForm
