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
    desc: (
      <>
        Be the first to know about new <strong>Ammache</strong> projects across residential, commercial, and mixed-use. Shared directly with you before they go public.
      </>
    ),
  },
  {
    icon: BookOpen,
    title: "Technical Content",
    desc: "Real insights from real projects. How we think about planning, materials, sustainability, and the decisions that shape spaces people actually want to be in.",
  },
  {
    icon: Calendar,
    title: "Events",
    desc: "Access to Ammache-hosted events and project launches. For professionals who care about where architecture is heading and want to be part of that conversation.",
  },
  {
    icon: Mail,
    title: "Studio Newsletter",
    desc: "A direct line to the Ammache studio. Project milestones, planning updates, and behind-the-scenes thinking delivered to your inbox.",
  },
  {
    icon: Users,
    title: "Direct Access to the Team",
    desc: "VIP members communicate directly with the Ammache principals. No middlemen. The same hands-on approach we bring to every project, extended to every member.",
  },
]

const VipFeatures = () => {
  return (
    <section className="bg-white md:bg-white py-24 md:py-32">

      <div className="max-w-[1200px] mx-auto px-6">

        {/* TITLE */}
        <h2 className="typo-h2 mb-16 max-w-[500px]">
          What You Get as a Member.
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

                <h3 className="typo-h5 mb-3">
                  {item.title}
                </h3>

                <p className="typo-caption text-gray-600">
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

                <h3 className="typo-h5 mb-3">
                  {item.title}
                </h3>

                <p className="typo-caption text-gray-600">
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