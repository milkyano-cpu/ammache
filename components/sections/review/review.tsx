"use client"

import Link from "next/link"
import {Slider} from "@/components/ui/slider"
import {ReviewCard} from "@/components/sections/review/review-card"
import {reviews} from "@/lib/constants/reviews"
import {useBreakpoint} from "@/hooks/use-mobile"

const visibleCountMap = {mobile: 1, tablet: 1, desktop: 3}

export default function Review() {
    const breakpoint = useBreakpoint()

    return (
        <div className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white md:bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-start">
                <div className="flex flex-col gap-2">
                    <h2 className="typo-h2">Hear from<br className="hidden md:block"/>our clients</h2>
                    <span className="typo-body-sm text-gray-600">Spaces designed for people, shared through real client stories.</span>
                    <Link
                        href="/contact"
                        className="md:flex hidden mt-4 px-8 py-3.5 border border-black rounded-full typo-button bg-black text-white transition cursor-pointer justify-center items-center md:w-50">
                        Contact Us
                    </Link>
                </div>

                <div className="lg:col-span-3">
                    <Slider
                        items={reviews}
                        showArrows={false}
                        animate
                        visibleCount={visibleCountMap[breakpoint]}
                        interval={8000}
                        renderItem={(review, i) => <ReviewCard key={i} {...review} />}
                    />
                </div>

            </div>
        </div>
    )
}
