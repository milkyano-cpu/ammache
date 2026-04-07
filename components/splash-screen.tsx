"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function SplashScreen() {
  const [phase, setPhase] = useState("enter") 

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1400)
    const t2 = setTimeout(() => setPhase("hide"), 2200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === "hide") return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden">
      <div className={`logo ${phase === "exit" ? "logo-exit" : "logo-enter"}`}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  )
}