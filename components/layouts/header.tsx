'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Facebook
} from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Main' },
  { href: '/team', label: 'Team' },
  { href: '/detailProject', label: 'Projects' },
  { href: '/careers', label: 'Join Our Team' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/vip', label: 'Ammache VIP' },
]

const Header = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 text-white">
        
        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center cursor-pointer"
        >
          {!open ? (
            <Image
              src="/ammache.png"
              alt="Ammache"
              width={140}
              height={40}
              priority
            />
          ) : (
            <Image
              src="/logo-ammache.png"
              alt="Ammache"
              width={140}
              height={40}
            />
          )}
        </Link>

        {/* BURGER */}
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer hover:opacity-70 transition"
        >
          <Menu size={26} />
        </button>
      </header>

      {/* OVERLAY */}
      <div
        className={cn(
          'fixed inset-0 z-[100] bg-black text-white transition-all duration-500 flex flex-col',
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-8 py-6">
          
          {/* LOGO */}
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/logo-ammache.png"
              alt="Ammache"
              width={140}
              height={40}
              className="cursor-pointer"
            />
          </Link>

          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer hover:opacity-70 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="flex flex-col gap-5">
            {navLinks.map((item, i) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'text-3xl md:text-5xl font-light tracking-wide transition cursor-pointer',
                    isActive
                      ? 'text-gray-500'
                      : 'text-white hover:opacity-70'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-800 py-12">

          {/* MOBILE VERSION */}
          <div className="md:hidden px-6">

            <p className="text-white font-medium mb-2">
              Join Our Mailing List
            </p>

            <p className="text-white text-sm mb-6 leading-relaxed">
              Stay updated with new developments, projects, and announcements from Ammache.
            </p>

            {/* INPUT */}
            <div className="flex items-center bg-white rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 text-black outline-none text-sm"
              />
              <button className="bg-black text-white px-4 py-2 m-1 rounded-full text-xs">
                Subscribe
              </button>
            </div>

            <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
              <input type="checkbox" className="mt-1 cursor-pointer" />
              <span>
                I agree to receive communications from Ammache.
              </span>
            </div>
          </div>

          {/* DESKTOP VERSION */}
          <div className="hidden md:block">
            <div className="px-6 md:px-12 xl:px-24">
              <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-24">
                
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

                <div className="space-y-4 text-white text-sm">

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

                <div className="flex items-center gap-4 mt-8">
  
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-white hover:text-white hover:border-white transition-all duration-300"
                  >
                    <Instagram size={16} />
                  </a>

                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-white hover:text-white hover:border-white transition-all duration-300"
                  >
                    <Facebook size={16} />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-white hover:text-white hover:border-white transition-all duration-300"
                  >
                    <Linkedin size={16} />
                  </a>

                </div>
                </div>

                {/* RIGHT */}
                <div className="max-w-md ml-auto">
                  <p className="text-white font-bold mb-2 text-lg">
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
                      Join The List
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
          <div className="text-center text-white text-xs mt-10 px-6">
            Copyright © 2026 Ammache Architects. All rights reserved.
          </div>
        </div>
      </div>
    </>
  )
}

export default Header