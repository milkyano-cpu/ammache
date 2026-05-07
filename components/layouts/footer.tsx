'use client'

import Image from 'next/image'
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Loader2
} from 'lucide-react'
import { useNewsletterSubscribe } from '@/hooks/use-newsletter-subscribe'

const Footer = () => {
  const mobile = useNewsletterSubscribe()
  const desktop = useNewsletterSubscribe()

  return (
    <footer id="footer" className="bg-white text-black pt-10 pb-10 border-t border-gray-300">

      <div className="px-6 md:px-12 xl:px-24">
        <div className="max-w-[1400px] mx-auto">

          {/* ================= MOBILE ================= */}
          <div className="md:hidden space-y-12">

            {/* VIP */}
            <div>
              <p className="typo-h5 text-black mb-2">
                Join Ammache Exclusive VIP
              </p>

              <p className="typo-body-sm text-black mb-6">
                First access to new projects before they go public. This isn't a newsletter, it's a seat at the table.
              </p>

              <form onSubmit={mobile.handleSubmit}>
                <div className="flex items-center bg-gray-200 rounded-full overflow-hidden">
                  <input
                    type="email"
                    placeholder="Email"
                    value={mobile.email}
                    onChange={(e) => mobile.setEmail(e.target.value)}
                    disabled={mobile.loading}
                    className="flex-1 px-4 py-3 text-black outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={mobile.loading}
                    className="bg-white text-black px-4 py-2 m-1 rounded-full typo-fine disabled:opacity-50 flex items-center gap-2"
                  >
                    {mobile.loading && <Loader2 size={14} className="animate-spin" />}
                    Join the list
                  </button>
                </div>
              </form>

              <div className="flex items-start gap-2 mt-4 typo-fine text-black">
                <input
                  type="checkbox"
                  checked={mobile.consent}
                  onChange={(e) => mobile.setConsent(e.target.checked)}
                  disabled={mobile.loading}
                  className="mt-1 cursor-pointer"
                />
                <span>
                  I agree to receive updates from Ammache. Unsubscribe anytime.
                </span>
              </div>

              {mobile.message && (
                <p className={`typo-fine mt-3 ${mobile.message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {mobile.message.text}
                </p>
              )}
            </div>

            <div className="border-t border-gray-300 my-8 -mx-6" />

            {/* LOGO + DESC */}
            <div className="text-center">
              <Image
                src="/logo-ammache-black.svg"
                alt="Ammache"
                width={140}
                height={40}
                className="mx-auto mb-6"
              />

              <p className="typo-body-sm text-black max-w-xs mx-auto">
                Founded in Melbourne in 1998, Ammache Architects creates thoughtful, innovative architecture designed to endure.
              </p>
            </div>

            {/* SOCIAL */}
            <div className="flex justify-center gap-6 text-black">
              <Instagram size={20} />
              <Linkedin size={20} />
              <Facebook size={20} />
            </div>

            {/* CONTACT */}
            <div className="flex justify-center">
            <div className="space-y-4 typo-body-sm text-black text-left">

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
                src="/logo-ammache-black.svg"
                alt="Ammache"
                width={120}
                height={30}
                className="mb-8"
              />

              <p className="typo-body-sm text-black not-only:mb-8 max-w-md">
                Founded in Melbourne in 1998, Ammache Architects creates
                thoughtful, innovative architecture designed to endure.
              </p>

              {/* CONTACT */}
              <div className="space-y-4 text-black typo-body-sm">

                <a
                  href="https://maps.google.com/?q=11+Meaden+St+Southbank+VIC+3006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 transition-all duration-300 hover:text-black"
                >
                  <MapPin size={16} className="group-hover:translate-x-1 transition" />
                  <span className="group-hover:translate-x-1 transition">
                    11 Meaden St, Southbank VIC 3006
                  </span>
                </a>

                <a
                  href="tel:0399571818"
                  className="group flex items-center gap-3 transition-all duration-300 hover:text-black"
                >
                  <Phone size={16} className="group-hover:translate-x-1 transition" />
                  <span className="group-hover:translate-x-1 transition">
                    03 9957 1818
                  </span>
                </a>

                <a
                  href="mailto:enquiries@ammachearchitects.com.au"
                  className="group flex items-center gap-3 transition-all duration-300 hover:text-blac"
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
                  href="https://www.instagram.com/ammachearchitects/"
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-black text-black hover:opacity-60 transition"
                >
                  <Instagram size={16} />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-black text-black hover:opacity-60 transition"
                >
                  <Facebook size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/company/ammache-architects-pty-ltd/"
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-black text-black hover:opacity-60 transition"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="max-w-md ml-auto">
              <p className="typo-h5 text-black mb-2">
                Join Ammache Exclusive VIP
              </p>

              <p className="typo-body-sm text-black mb-6 max-w-sm">
                First access to new projects before they go public. This isn't a newsletter, it's a seat at the table.
              </p>

              <form onSubmit={desktop.handleSubmit}>
                <div className="flex items-center bg-gray-200 rounded-full overflow-hidden max-w-sm">
                  <input
                    type="email"
                    placeholder="Email"
                    value={desktop.email}
                    onChange={(e) => desktop.setEmail(e.target.value)}
                    disabled={desktop.loading}
                    className="flex-1 px-5 py-3 text-black outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={desktop.loading}
                    className="bg-white text-black px-5 py-2 m-1 rounded-full typo-button whitespace-nowrap hover:opacity-60 transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {desktop.loading && <Loader2 size={14} className="animate-spin" />}
                    Join the list
                  </button>
                </div>
              </form>

              <div className="flex items-start gap-2 mt-5 typo-fine text-black">
                <input
                  type="checkbox"
                  checked={desktop.consent}
                  onChange={(e) => desktop.setConsent(e.target.checked)}
                  disabled={desktop.loading}
                  className="mt-1 cursor-pointer"
                />
                <span>
                    I agree to receive updates from Ammache. Unsubscribe anytime.
                </span>
              </div>

              {desktop.message && (
                <p className={`typo-fine mt-3 ${desktop.message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {desktop.message.text}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-300 mt-16 pt-6">
        <div className="text-center typo-fine text-black px-6">
          Copyright © 2026 Ammache Architects. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
