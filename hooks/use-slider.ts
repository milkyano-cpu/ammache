"use client"

import { useState } from "react"

export function useSlider(length: number, initialIndex = 0) {
    const [current, setCurrent] = useState(initialIndex)

    const prev = () => setCurrent((i) => (i === 0 ? length - 1 : i - 1))
    const next = () => setCurrent((i) => (i === length - 1 ? 0 : i + 1))
    const goTo = (index: number) => setCurrent(index)

    return { current, prev, next, goTo }
}
