"use client"

import {
  Home,
  BookOpen,
  Calendar,
  Mail,
  Users
} from "lucide-react"

const features = [
  {
    icon: Home,
    title: "Property Access",
    desc: "Get first access to new Ammache developments before they are publicly listed. Commercial, residential, mixed-use, and off-market opportunities, shared directly with VIP members as they become available.",
  },
  {
    icon: BookOpen,
    title: "Technical Content",
    desc: "Insights from $700M+ in projects—covering planning, materials, sustainability, and key design decisions behind Ammache’s most complex work.",
  },
  {
    icon: Calendar,
    title: "Events & Webinars",
    desc: "Exclusive invitations to Ammache-hosted events, industry webinars, and project launch evenings. Designed for professionals who want to engage with Melbourne’s most active architecture practice.",
  },
  {
    icon: Mail,
    title: "Studio Newsletter",
    desc: "A curated dispatch from the Ammache studio — project milestones, planning approvals, market intelligence, and behind-the-scenes content delivered directly to your inbox.",
  },
  {
    icon: Users,
    title: "Direct Access to the Team",
    desc: "VIP members communicate directly with the Ammache principals. The same hands-on approach that defines every project extends to every member of the list.",
  },
]

const VipFeatures = () => {
  return (
    <section className="bg-white md:bg-[#f5f5f5] py-24 md:py-32">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-semibold mb-16 max-w-[500px]">
          Everything included in your membership.
        </h2>

        {/* GRID */}
    {/* TOP 3 */}
<div className="grid md:grid-cols-3 gap-8 mb-8">
  {features.slice(0, 3).map((item, i) => {
    const Icon = item.icon
    return (
      <div
        key={i}
        className="bg-white rounded-[20px] border border-gray-200 p-6 md:p-8 hover:shadow-lg transition"
      >
        <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg mb-6">
          <Icon size={20} />
        </div>

        <h3 className="text-[17px] font-semibold mb-3">
          {item.title}
        </h3>

        <p className="text-[14px] text-gray-600 leading-relaxed">
          {item.desc}
        </p>
      </div>
    )
  })}
</div>

{/* BOTTOM 2 (CENTERED) */}
<div className="flex justify-center gap-8 flex-wrap">
  {features.slice(3).map((item, i) => {
    const Icon = item.icon
    return (
      <div
        key={i}
        className="bg-white rounded-[20px] border border-gray-200 p-6 md:p-8 w-full md:w-[calc(33.333%-1rem)] hover:shadow-lg transition"
      >
        <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg mb-6">
          <Icon size={20} />
        </div>

        <h3 className="text-[17px] font-semibold mb-3">
          {item.title}
        </h3>

        <p className="text-[14px] text-gray-600 leading-relaxed">
          {item.desc}
        </p>
      </div>
    )
  })}
</div>

      </div>
    </section>
  )
}

export default VipFeatures