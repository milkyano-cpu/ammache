"use client"

import React from "react"
import { useSlider } from "@/hooks/use-slider"

interface SliderProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => React.ReactNode
    defaultIndex?: number
    visibleCount?: number
    showArrows?: boolean
}

export function Slider<T>({ items, renderItem, defaultIndex = 0, visibleCount = 1, showArrows = true }: SliderProps<T>) {
    const pageCount = Math.ceil(items.length / visibleCount)
    const { current, prev, next, goTo } = useSlider(pageCount, defaultIndex)

    const startIndex = current * visibleCount
    const visibleItems = items.slice(startIndex, startIndex + visibleCount)

    return (
        <div className="w-full">

            <div className="relative">
                <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}>
                    {visibleItems.map((item, i) => renderItem(item, startIndex + i))}
                </div>

                {showArrows && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 cursor-pointer">
                            ←
                        </button>
                        <button
                            onClick={next}
                            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 cursor-pointer">
                            →
                        </button>
                    </>
                )}
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: pageCount }).map((_, index) => (
                    <div
                        key={index}
                        onClick={() => goTo(index)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                            current === index ? "w-6 bg-black" : "w-2 bg-gray-400"
                        }`}
                    />
                ))}
            </div>

        </div>
    )
}
