"use client"

import {useState} from "react"
import {Star} from "lucide-react"
import type {ReviewData} from "@/lib/constants/reviews"

export function ReviewCard({name, review, rating}: ReviewData) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="flex flex-col gap-4 border px-6 py-8 rounded-2xl">
            <div className="flex gap-1">
                {Array.from({length: rating}).map((_, i) => (
                    <Star key={i} fill="#FFC107" size={20} strokeWidth={0}/>
                ))}
            </div>
            <p className="font-bold">{name}</p>
            <p className={expanded ? "" : "line-clamp-4"}>{review}</p>
            <button
                onClick={() => setExpanded(!expanded)}
                className="self-start cursor-pointer uppercase text-black/40 hover:text-black transition">
                {expanded ? "Read Less" : "Read More"}
            </button>
        </div>
    )
}
