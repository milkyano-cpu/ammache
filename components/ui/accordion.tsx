"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

interface AccordionItem {
    question: string
    answer: React.ReactNode
}

interface AccordionProps {
    items: AccordionItem[]
}

function AccordionRow({ item, isOpen, onToggle }: { item: AccordionItem; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center py-5 text-left gap-4 cursor-pointer">
                <span className="typo-body font-medium text-black">{item.question}</span>
                <div className="border border-black md:p-1 md:scale-100 scale-75 rounded-full">
                  {isOpen ? <Minus size={18} className="shrink-0 text-black" /> : <Plus size={18} className="shrink-0 text-black" />}
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}>
                        <div className="typo-body-sm text-gray-600 pb-5">{item.answer}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function Accordion({ items }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index))
    }

    return (
        <div className="w-full divide-y divide-gray-200">
            {items.map((item, i) => (
                <AccordionRow
                    key={i}
                    item={item}
                    isOpen={openIndex === i}
                    onToggle={() => toggle(i)}
                />
            ))}
        </div>
    )
}
