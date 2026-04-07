"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function SplashScreen() {
  const [phase, setPhase] = useState("enter")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("move"), 1200)
    const t2 = setTimeout(() => setPhase("hide"), 2000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === "hide") return null

  return (
    <div
      className={`
        splash-wrapper
        ${phase === "move" ? "splash-wrapper-exit" : ""}
      `}
    >
      <div
        className={`
          splash-logo
          ${phase === "enter" ? "splash-enter" : ""}
          ${phase === "move" ? "splash-move" : ""}
        `}
      >
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