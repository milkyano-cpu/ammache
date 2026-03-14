'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // useEffect(() => {
  //   setOpen(false)
  // }, [pathname])

  return (
    <header
      className={`w-full z-20 transition-[background-color,box-shadow,padding] duration-500 ease-in-out ${
        scrolled ?
        // 'bg-[#4A7D6D] shadow-lg py-3'
        ''
        :
        'bg-transparent'
      }`}
    >
    </header>
  )
}
export default Header
