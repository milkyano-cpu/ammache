"use client"

import { Accordion } from "@/components/ui/accordion"
import { faqItems } from "@/lib/constants/faq"

export default function FaqSection() {
    return (
        <section className="bg-white md:bg-white py-8 md:py-32">
            <div className="max-w-300 mx-auto px-6">
                <div className="space-y-2 mb-12">
                    <h2 className="typo-h2">Everything You Need to Know</h2>
                    <p className="md:w-1/2">We&apos;ve answered the most important questions developers and clients ask before starting a project with <span className="font-bold">Ammache Architects.</span></p>
                </div>
                <Accordion items={faqItems} />
            </div>
        </section>
    )
}
