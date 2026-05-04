"use client"

import {useState, useEffect} from "react"

export function AnimatedCount({value}: { value: number }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0

        const counter = setInterval(() => {
            start += (value - start) * 0.15
            if (start >= value - 0.5) {
                setCount(value)
                clearInterval(counter)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(counter)
    }, [value])

    return <>{count}</>
}
