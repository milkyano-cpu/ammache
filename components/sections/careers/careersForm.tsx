"use client"

import { useRef } from "react"
import { UploadCloud } from "lucide-react"

const CareersForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
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
            If you would like to contact Ammache about our services and product please don’t hesitate to reach out.
          </p>

          <div className="space-y-6">

            {/* FIRST NAME */}
            <div>
              <label className="typo-caption text-gray-700 block mb-1.5 md:mb-2">
                First Name*
              </label>
              <input
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
                <select className="px-4 typo-body border-r border-gray-200">
                  <option>US</option>
                  <option>ID</option>
                </select>
                <input
                  className="flex-1 px-6 py-4 typo-body"
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
                placeholder="Email Address*"
                className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>

            {/* POSITION */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Position Applying For*
              </label>
              <select className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200">
                <option>Select a role*</option>
              </select>
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Years of Experience
              </label>
              <select className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200">
                <option>Select range</option>
              </select>
            </div>

            {/* SOFTWARE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Primary Software
              </label>
              <input
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
                className="w-full px-6 py-4 typo-body rounded-lg border border-gray-200 resize-none"
                placeholder="Tell us what draws you to Ammache and what you are looking for..."
              />
            </div>

            {/* UPLOAD CV */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Upload your CV
              </label>

              <div
                onClick={handleClick}
                className="border border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                />

                    <div className="flex flex-col items-center justify-center gap-4">

                    {/* ICON */}
                    <UploadCloud size={28} className="text-black" />

                    {/* TEXT */}
                    <p className="typo-caption text-gray-500">
                        Browse and choose the files you want to upload from your computer
                    </p>

                    {/* BUTTON */}
                    <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-md text-lg">
                        +
                    </div>

                    </div>
              </div>
            </div>

            {/* CHECKBOX */}
            <div className="space-y-4 typo-body text-black mt-6">

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 cursor-pointer" />
                <span>
                  I consent to Ammache Architects storing my information for the purposes of this application.
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 cursor-pointer" />
                <span>
                  I would like to receive updates about future opportunities at Ammache Architects.
                </span>
              </label>

            </div>

            {/* BUTTON */}
            <button className="w-full mt-8 py-4 bg-black text-white rounded-lg typo-button hover:bg-gray-800 transition cursor-pointer">
              Submit Enquiry
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CareersForm