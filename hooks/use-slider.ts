"use client"

import { useState, useEffect } from "react"

export function useSlider(length: number, initialIndex = 0, interval?: number) {
    const [current, setCurrent] = useState(initialIndex)
    const [direction, setDirection] = useState(0)

    const next = () => {
        setDirection(1)
        setCurrent((i) => (i === length - 1 ? 0 : i + 1))
    }
    const prev = () => {
        setDirection(-1)
        setCurrent((i) => (i === 0 ? length - 1 : i - 1))
    }
    const goTo = (index: number) => {
        setDirection(index >= current ? 1 : -1)
        setCurrent(index)
    }

    useEffect(() => {
        if (!interval) return
        const id = setInterval(() => {
            setDirection(1)
            setCurrent((i) => (i === length - 1 ? 0 : i + 1))
        }, interval)
        return () => clearInterval(id)
    }, [interval, length])

    return { current, direction, prev, next, goTo }
}
