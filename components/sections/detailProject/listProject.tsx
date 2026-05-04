"use client"

import Image from "next/image"
import Link from "next/link"
import {useState} from "react"
import type {CategoryWithProjects} from "@/app/detailProject/detail-project-client"
import {useProjectTab} from "@/hooks/use-project-tab"
import {getSpecValue} from "@/lib/utils/spec-utils"
import {AnimatedCount} from "@/components/ui/animated-count"

const LIMIT = 12

const DetailProjectsSection = ({categories}: { categories: CategoryWithProjects[] }) => {

    const [open, setOpen] = useState(false)
    const {activeTab, showAll, setActiveTab, toggleShowAll} = useProjectTab(categories)

    const tabs = categories.map((cat) => ({
        label: cat.name,
        count: cat.projects.length,
    }))

    const projects = categories.find((cat) => cat.name === activeTab)?.projects ?? []
    const displayedProjects = showAll ? projects : projects.slice(0, LIMIT)

    return (
        <section id="about" className="bg-white md:bg-white py-10 md:py-24">

            <div className="max-w-300 mx-auto px-4 md:px-6">

                {/* ================= TABS ================= */}
                <div className="hidden md:flex justify-center gap-12 text-lg mb-10 border-b border-gray-300 pb-4">

                    {tabs.map((tab) => (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`
                                relative pb-2 cursor-pointer transition
                                ${activeTab === tab.label
                                ? "text-black font-semibold"
                                : "text-gray-500 hover:text-black"}
                                `}>
                            {tab.label}
                            <span className="text-gold ml-2 font-semibold">
                                <AnimatedCount value={tab.count}/>
                            </span>
                            {activeTab === tab.label && (
                                <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-black"/>
                            )}
                        </button>
                    ))}

                </div>

                {/* ================= MOBILE DROPDOWN ================= */}
                <div className="md:hidden mb-6 relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-full border border-gold rounded-lg px-4 py-3 text-sm flex justify-between items-center">
                        <span>{activeTab}</span>
                        <span className="text-gold font-semibold ml-2">
                            {tabs.find(t => t.label === activeTab)?.count}
                        </span>
                    </button>

                    {open && (
                        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            {
                                tabs.map((tab) => (
                                    <div
                                        key={tab.label}
                                        onClick={() => {
                                            setActiveTab(tab.label)
                                            setOpen(false)
                                        }}
                                        className="px-4 py-3 flex justify-between items-center text-sm hover:bg-gray-100 cursor-pointer">
                                        <span>{tab.label}</span>
                                        <span className="text-gold font-semibold">{tab.count}</span>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>

                {/* ================= GRID ================= */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {
                        displayedProjects.map((item) => (
                            <Link key={item.id} href={`/detailProject/${item.slug}`}>
                                <div className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-4/5">
                                    <Image
                                        src={item.images[0] || "/project1.png"}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="
                                          absolute inset-0
                                          bg-black/45 backdrop-blur-sm
                                          opacity-0 group-hover:opacity-100
                                          transition duration-300
                                          flex flex-col items-center justify-center text-center px-4">
                                        <Image
                                            src="/logo-hover.png"
                                            alt="logo"
                                            width={50}
                                            height={50}
                                            className="mb-4 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition"
                                        />
                                        <p className="typo-h6 text-white">{item.name}</p>
                                        <p className="typo-fine text-white/80 mt-1">
                                            {getSpecValue(item.specifications, "Project") || item.categoryName}
                                        </p>
                                    </div>
                                    <div className="
                                             absolute bottom-4 left-1/2 -translate-x-1/2
                                             text-white typo-caption
                                             opacity-0 group-hover:opacity-100
                                             transition duration-300">
                                      <span className="inline-flex items-center">
                                        <span>View Development</span>
                                        <span className="ml-2">❯</span>
                                      </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>

                {/* ================= BUTTON ================= */}
                {projects.length > LIMIT && (
                    <div className="flex justify-center mt-20">
                        <button
                            onClick={toggleShowAll}
                            className="
                                px-11 py-3
                                rounded-full
                                border-2 border-gray-300
                                typo-button
                                hover:bg-black hover:text-white
                                transition
                                cursor-pointer">
                            {showAll ? "Show Less" : "View More"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default DetailProjectsSection
