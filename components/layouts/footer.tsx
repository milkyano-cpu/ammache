'use client'

import Image from 'next/image'
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-10">
      
      <div className="px-6 md:px-12 xl:px-24">
        <div className="max-w-[1400px] mx-auto">

          {/* ================= MOBILE ================= */}
          <div className="md:hidden space-y-12">

            {/* VIP */}
            <div>
              <p className="text-white font-bold mb-2 text-lg">
                Join Ammache Exclusive VIP
              </p>

              <p className="text-white   text-sm mb-6 leading-relaxed">
                First access to new projects before they go public. This isn't a newsletter, it's a seat at the table.
              </p>

              <div className="flex items-center bg-white rounded-full overflow-hidden">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-3 text-black outline-none text-sm"
                />
                <button className="bg-black text-white px-4 py-2 m-1 rounded-full text-xs">
                  Join the list
                </button>
              </div>

              <div className="flex items-start gap-2 mt-4 text-xs text-gray-400  ">
                <input type="checkbox" className="mt-1 cursor-pointer" />
                <span>
                  I agree to receive updates from Ammache. Unsubscribe anytime.
                </span>
              </div>
            </div>

            <div className="border-t border-gray-700 my-8 -mx-6" />

            {/* LOGO + DESC */}
            <div className="text-center">
              <Image
                src="/logo-ammache.png"
                alt="Ammache"
                width={140}
                height={40}
                className="mx-auto mb-6"
              />

              <p className="text-gray-400  text-sm leading-relaxed max-w-xs mx-auto">
                Founded in Melbourne in 1998, Ammache Architects creates thoughtful, innovative architecture designed to endure.
              </p>
            </div>

            {/* SOCIAL */}
            <div className="flex justify-center gap-6 text-white">
              <Instagram size={20} />
              <Linkedin size={20} />
              <Facebook size={20} />
            </div>

            {/* CONTACT */}
            <div className="flex justify-center">
            <div className="space-y-4 text-gray-400 text-sm text-left">

                <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5" />
                <span>11 Meaden St, Southbank VIC 3006</span>
                </div>

                <div className="flex items-center gap-3">
                <Phone size={16} />
                <span>03 9957 1818</span>
                </div>

                <div className="flex items-center gap-3">
                <Mail size={16} />
                <span>enquiries@ammachearchitects.com.au</span>
                </div>

            </div>
            </div>

          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:grid md:grid-cols-2 gap-24">

            {/* LEFT */}
            <div>
              <Image
                src="/logo-ammache.png"
                alt="Ammache"
                width={120}
                height={30}
                className="mb-8"
              />

              <p className="text-white mb-8 max-w-md leading-relaxed text-[15px]">
                Founded in Melbourne in 1998, Ammache Architects creates
                thoughtful, innovative architecture designed to endure.
              </p>

              {/* CONTACT */}
              <div className="space-y-4 text-white   text-sm">

                <a
                  href="https://maps.google.com/?q=11+Meaden+St+Southbank+VIC+3006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 transition-all duration-300 hover:text-white"
                >
                  <MapPin size={16} className="group-hover:translate-x-1 transition" />
                  <span className="group-hover:translate-x-1 transition">
                    11 Meaden St, Southbank VIC 3006
                  </span>
                </a>

                <a
                  href="tel:0399571818"
                  className="group flex items-center gap-3 transition-all duration-300 hover:text-white"
                >
                  <Phone size={16} className="group-hover:translate-x-1 transition" />
                  <span className="group-hover:translate-x-1 transition">
                    03 9957 1818
                  </span>
                </a>

                <a
                  href="mailto:enquiries@ammachearchitects.com.au"
                  className="group flex items-center gap-3 transition-all duration-300 hover:text-white"
                >
                  <Mail size={16} className="group-hover:translate-x-1 transition" />
                  <span className="group-hover:translate-x-1 transition">
                    enquiries@ammachearchitects.com.au
                  </span>
                </a>

              </div>

              {/* SOCIAL */}
              <div className="flex items-center gap-4 mt-8">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-white   hover:text-white hover:border-white transition"
                >
                  <Instagram size={16} />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-white   hover:text-white hover:border-white transition"
                >
                  <Facebook size={16} />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-white   hover:text-white hover:border-white transition"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="max-w-md ml-auto">
              <p className="text-white font-medium mb-2 text-lg">
                Join Ammache Exclusive VIP
              </p>

              <p className="text-white text-sm mb-6 leading-relaxed max-w-sm">
                First access to new projects before they go public. This isn't a newsletter, it's a seat at the table.
              </p>

              <div className="flex items-center bg-white rounded-full overflow-hidden max-w-sm">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-5 py-3 text-black outline-none text-sm"
                />
                <button className="bg-black text-white px-5 py-2 m-1 rounded-full text-sm whitespace-nowrap hover:opacity-80 transition cursor-pointer">
                  Join the list
                </button>
              </div>

              <div className="flex items-start gap-2 mt-5 text-xs text-white">
                <input type="checkbox" className="mt-1 cursor-pointer" />
                <span>
                    I agree to receive updates from Ammache. Unsubscribe anytime.
                </span>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-16 pt-6">
        <div className="text-center text-gray-400 text-xs px-6">
          Copyright © 2026 Ammache Architects. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer