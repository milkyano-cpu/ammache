"use client"

const VipForm = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] py-16 md:py-18">

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

          <div className="space-y-5 md:space-y-6">

            {/* FIRST NAME */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                First Name*
              </label>
              <input
                placeholder="First Name*"
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
                className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Phone number
              </label>

              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <select className="px-3 md:px-4 typo-body border-r border-gray-200">
                  <option>US</option>
                  <option>ID</option>
                  <option>AU</option>
                </select>

                <input
                  placeholder="+1 (555) 000-0000"
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
                className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black/20"
              />
            </div>

            {/* PROFESSION */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                My Profession
              </label>
              <select className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200">
                <option>Select your profession*</option>
              </select>
            </div>

            {/* INTEREST */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                Most Interested in
              </label>
              <select className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200">
                <option>Select your primary interest*</option>
              </select>
            </div>

            {/* SOURCE */}
            <div>
              <label className="typo-caption text-gray-700 block mb-2">
                How Did You Hear About Us
              </label>
              <select className="w-full px-4 md:px-6 py-3.5 md:py-4 typo-body rounded-lg border border-gray-200">
                <option>Select an option</option>
              </select>
            </div>

            {/* CHECKBOX */}
            <label className="flex items-start gap-3 mt-6 cursor-pointer">
              <input type="checkbox" className="mt-1 cursor-pointer" />
              <p className="typo-fine text-black">
                I consent to Ammache Architects contacting me with VIP updates, project news,
                event invitations, and design content. My details will not be shared with third parties.
              </p>
            </label>

            {/* BUTTON */}
            <button className="w-full mt-6 py-3.5 md:py-4 bg-black text-white rounded-lg typo-button hover:bg-gray-800 transition cursor-pointer">
              Join Ammache VIP
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default VipForm