export interface FaqItem {
    question: string
    answer: React.ReactNode
}

export const faqItems: FaqItem[] = [
    {
        question: "What types of projects does Ammache Architects work on?",
        answer: (
            <>
                <p>We work across four core sectors:</p>
                <ul className="list-disc list-inside">
                    <li>Residential</li>
                    <li>Commercial</li>
                    <li>Industrial</li>
                    <li>Interior Fit-Outs</li>
                </ul>
                <p>Our projects range from custom homes and multi-residential developments to workplaces, industrial facilities, and refined interior environments.</p>
            </>
        ),
    },
    {
        question: "Do you specialise in residential, commercial, or industrial projects?",
        answer: (
            <>
                <p>We work across residential, commercial, industrial, and mixed-use developments.</p>
                <p>Our strength is not the category — it&apos;s our ability to design spaces that maximise value, usability, and long-term performance across any sector.</p>
            </>
        ),
    },
    {
        question: "Can you handle the entire process from concept to approval?",
        answer: (
            <>
                <p>Yes.</p>
                <p>We manage the full journey:</p>
                <ul className="list-disc list-inside">
                    <li>Feasibility & concept design</li>
                    <li>Town planning & council approvals</li>
                    <li>Design development</li>
                    <li>Construction documentation</li>
                </ul>
            </>
        ),
    },
    {
        question: "How do you approach design differently?",
        answer: (
            <>
                <p>We don&apos;t start with buildings — we start with people.</p>
                <p>Our design process focuses on how people actually live, work, and interact. This creates spaces that are more desirable, more functional, and ultimately more valuable.</p>
            </>
        ),
    },
    {
        question: "How long does the process take?",
        answer: (
            <>
                <p>Every project is different.</p>
                <p>However, most projects move through:</p>
                <ul className="list-disc list-inside">
                    <li>Concept Design: 2–6 weeks</li>
                    <li>Planning & Approvals: 3–9 months</li>
                    <li>Documentation: 1–3 months</li>
                </ul>
                <p>We guide you through realistic timelines based on your project type and council.</p>
            </>
        ),
    },
    {
        question: "Can you help maximise my site's development potential?",
        answer: (
            <>
                <p>Absolutely.</p>
                <p>One of our core strengths is identifying opportunities others miss — whether it&apos;s yield, layout efficiency, or planning strategy.</p>
                <p>We design with both approval success and profitability in mind.</p>
            </>
        ),
    },
    {
        question: "Do you work with developers or private clients?",
        answer: (
            <>
                <p>Both.</p>
                <p>However, we are particularly experienced working with:</p>
                <ul className="list-disc list-inside">
                    <li>Property developers</li>
                    <li>Investors</li>
                    <li>Builders</li>
                </ul>
                <p>Our approach aligns design decisions with financial outcomes.</p>
            </>
        ),
    },
    {
        question: "Do you offer interior design as well?",
        answer: (
            <>
                <p>Yes.</p>
                <p>We ensure the interior aligns with the architectural intent — creating a cohesive experience from exterior to interior.</p>
            </>
        ),
    },
    {
        question: "How involved are you during construction?",
        answer: (
            <>
                <p>We remain involved throughout construction to:</p>
                <ul className="list-disc list-inside">
                    <li>Ensure design integrity</li>
                    <li>Resolve on-site challenges</li>
                    <li>Maintain quality outcomes</li>
                </ul>
            </>
        ),
    },
    {
        question: "What makes Ammache Architects different?",
        answer: (
            <>
                <p>We don&apos;t design for approval.</p>
                <p>We design for:</p>
                <ul className="list-disc list-inside">
                    <li>Faster sales</li>
                    <li>Higher value</li>
                    <li>Better living outcomes</li>
                </ul>
                <p>Because great architecture is not measured by drawings — it&apos;s measured by how people live inside it.</p>
            </>
        ),
    },
    {
        question: "How do I get started?",
        answer: (
            <>
                <p>Start with a conversation.</p>
                <p>We&apos;ll assess your site, your goals, and your opportunity — then guide you on the best next step.</p>
            </>
        ),
    },
]
