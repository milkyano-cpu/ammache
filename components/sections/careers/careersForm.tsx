"use client"

import { useState, useRef } from "react"
import { Loader2, UploadCloud, X, ChevronDown } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"

const careersSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  position: z.string().min(1, "Position is required"),
})

const POSITION_OPTIONS = [
  "Architectural Designer",
  "Architectural Draftsperson",
  "Project Coordinator",
  "3D Visualiser / BIM Coordinator",
  "Speculative — Open Application",
]

const EXPERIENCE_OPTIONS = [
  "0 – 2 years",
  "2 – 5 years",
  "5 – 10 years",
  "10+ years",
]

const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_CV_SIZE = 10 * 1024 * 1024

const CareersForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneCountry, setPhoneCountry] = useState("US")
  const [email, setEmail] = useState("")
  const [position, setPosition] = useState("")
  const [experience, setExperience] = useState("")
  const [software, setSoftware] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [agreedStorage, setAgreedStorage] = useState(false)
  const [agreedUpdates, setAgreedUpdates] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvUrl, setCvUrl] = useState("")
  const initialized = useRef(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Only PDF, DOC, and DOCX files are allowed.")
      return
    }
    if (file.size > MAX_CV_SIZE) {
      toast.error("File size exceeds 10MB limit.")
      return
    }

    setCvFile(file)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload-cv", { method: "POST", body: formData })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed to upload CV.")
        setCvFile(null)
        return
      }

      setCvUrl(data.data.url)
      toast.success("CV uploaded successfully.")
    } catch {
      toast.error("Failed to upload CV. Please try again.")
      setCvFile(null)
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
    e.target.value = ""
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleRemoveCv = () => {
    setCvFile(null)
    setCvUrl("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = careersSchema.safeParse({ firstName, lastName, email, position })
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
                spreadsheetUrl: process.env.NEXT_PUBLIC_CAREERS_SPREADSHEET_URL,
                sampleFormData: {
                  firstName: "Sample",
                  lastName: "Sample",
                  phone: "000",
                  email: "sample@example.com",
                  position: "Sample",
                  experience: "Sample",
                  software: "Sample",
                  portfolio: "Sample",
                  coverLetter: "Sample",
                  cvUrl: "Sample",
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
            formData: {
              firstName,
              lastName,
              phone,
              email,
              position,
              experience,
              software,
              portfolio,
              coverLetter,
              cvUrl,
            },
            spreadsheetUrl: process.env.NEXT_PUBLIC_CAREERS_SPREADSHEET_URL,
            emailReceiver: process.env.NEXT_PUBLIC_FORM_EMAIL_RECEIVER,
            metadata: {
              formType: "careers-form",
              subject: "New Career Application - Ammache Architects",
            },
          }),
        }
      )

      if (res.status === 201) {
        toast.success("Your application has been submitted successfully.")
        setFirstName("")
        setLastName("")
        setPhone("")
        setPhoneCountry("US")
        setEmail("")
        setPosition("")
        setExperience("")
        setSoftware("")
        setPortfolio("")
        setCoverLetter("")
        setCvFile(null)
        setCvUrl("")
        setAgreedStorage(false)
        setAgreedUpdates(false)
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
    <section className="bg-white md:bg-[#f5f5f5] py-16 md:py-32">

      {/* HEADER */}
      <div className="max-w-[1200px] mx-auto px-6 mb-6 md:mb-16">
        <h2 className="typo-h2 mb-3 text-left">
          Submit your application.
        </h2>
        <p className="typo-body text-gray-700 max-w-[600px]">
          Reviewed personally by the Ammache leadership team. We aim to respond within five business days.
        </p>
      </div>

      {/* CARD */}
      <div className="max-w-[800px] mx-auto px-4">
        <div className="bg-white rounded-[30px] shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-5 md:p-10">

          <p className="typo-body text-gray-600 mb-6 md:mb-8">
            If you would like to contact Ammache about our services, please don&apos;t hesitate to reach out.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* FIRST NAME */}
            <div>
              <label className="typo-caption text-gray-700 block mb-1.5 md:mb-2">
                First Name*
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
                placeholder="First Name*"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Last Name*
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
                placeholder="Last Name*"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Phone number
              </label>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">

                {/* COUNTRY SELECT */}
                <div className="relative">
                  <select
                    value={phoneCountry}
                    onChange={(e) => setPhoneCountry(e.target.value)}
                    className="
                      px-4 py-4 pr-10
                      typo-body
                      border-r border-gray-200
                      appearance-none
                      bg-white
                      focus:outline-none
                    "
                  >
                    <option>US</option>
                    <option>ID</option>
                    <option>AU</option>
                  </select>

                  {/* ARROW */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>

                {/* INPUT */}
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-6 py-4 typo-body focus:outline-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Email Address*
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address*"
                className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>

              {/* POSITION */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Position Applying For*
              </label>

              <div className="relative">
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-6 py-4 pr-12 typo-body rounded-lg border border-gray-200 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-black/20"
                >
                  <option value="">Select a role*</option>
                  {POSITION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
                  <ChevronDown size={18} className="text-gray-500" />
                </div>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Years of Experience
              </label>

              <div className="relative">
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-6 py-4 pr-12 typo-body rounded-lg border border-gray-200 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-black/20"
                >
                  <option value="">Select range</option>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
                  <ChevronDown size={18} className="text-gray-500" />
                </div>
              </div>
            </div>

            {/* SOFTWARE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Primary Software
              </label>
              <input
                value={software}
                onChange={(e) => setSoftware(e.target.value)}
                className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200"
                placeholder="e.g. Revit, AutoCAD, ArchiCAD"
              />
            </div>

            {/* PORTFOLIO */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Portfolio URL
              </label>
              <input
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200"
                placeholder="https://yourportfolio.com"
              />
            </div>

            {/* COVER LETTER */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Cover Letter
              </label>
              <textarea
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200 resize-none"
                placeholder="Tell us what draws you to Ammache and what you are looking for..."
              />
            </div>

            {/* UPLOAD CV */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Upload your CV
              </label>

              {cvFile ? (
                <div className="flex items-center justify-between border border-gray-200 rounded-xl px-6 py-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-gray-500 shrink-0" />
                    ) : (
                      <UploadCloud size={20} className="text-gray-500 shrink-0" />
                    )}
                    <span className="typo-body text-gray-700 truncate">
                      {uploading ? "Uploading..." : cvFile.name}
                    </span>
                  </div>
                  {!uploading && (
                    <button
                      type="button"
                      onClick={handleRemoveCv}
                      className="text-gray-400 hover:text-black transition shrink-0 ml-3"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:bg-gray-50 transition"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />

                  <div className="flex flex-col items-center justify-center gap-4">
                    <UploadCloud size={28} className="text-black" />
                    <p className="typo-caption text-gray-500">
                      Browse and choose the files you want to upload from your computer
                    </p>
                    <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-md text-lg">
                      +
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CHECKBOX */}
            <div className="space-y-4 typo-body text-black mt-6">

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedStorage}
                  onChange={(e) => setAgreedStorage(e.target.checked)}
                  className="mt-1 cursor-pointer"
                />
                <span>
                  I consent to Ammache Architects storing my information for the purposes of this application.
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedUpdates}
                  onChange={(e) => setAgreedUpdates(e.target.checked)}
                  className="mt-1 cursor-pointer"
                />
                <span>
                  I would like to receive updates about future opportunities at Ammache Architects.
                </span>
              </label>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full mt-8 py-4 bg-black text-white rounded-lg typo-button hover:bg-gray-800 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>

          </form>
        </div>
      </div>
    </section>
  )
}

export default CareersForm
