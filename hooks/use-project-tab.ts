"use client"

import {useRouter, useSearchParams, usePathname} from "next/navigation"
import {categoryMap, reverseCategoryMap} from "@/lib/constants/category-mapping"
import type {CategoryWithProjects} from "@/app/detailProject/detail-project-client"

export function useProjectTab(categories: CategoryWithProjects[]) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const categoryParam = searchParams.get("category") ?? ""
    const showAll = searchParams.get("showAll") === "true"
    const activeTab = reverseCategoryMap[categoryParam] ?? categories[0]?.name ?? ""

    function updateParams(updates: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString())
        for (const [key, val] of Object.entries(updates)) {
            if (val === null) params.delete(key)
            else params.set(key, val)
        }
        router.replace(`${pathname}?${params.toString()}`, {scroll: false})
    }

    function setActiveTab(label: string) {
        const slug = categoryMap[label] ?? null
        updateParams({category: slug, showAll: null})
    }

    function toggleShowAll() {
        updateParams({showAll: showAll ? null : "true"})
    }

    return {activeTab, showAll, setActiveTab, toggleShowAll}
}
