import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { FolderKanban, Eye, FileX, Star, Tags, Mail } from "lucide-react"
import DashboardCharts from "./dashboard-charts"

export default async function AdminDashboard() {
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    homepageProjects,
    totalCategories,
    newsletterSubs,
    categoryCounts,
    typeCounts,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.project.count({ where: { published: false } }),
    prisma.project.count({ where: { isHomepage: true } }),
    prisma.category.count(),
    prisma.newsletter.count({ where: { isActive: true } }),
    prisma.category.findMany({
      select: { name: true, _count: { select: { projects: true } } },
      orderBy: { projects: { _count: "desc" } },
    }),
    prisma.project.groupBy({ by: ["projectType"], _count: { id: true } }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        published: true,
        isHomepage: true,
        createdAt: true,
        category: { select: { name: true } },
      },
    }),
  ])

  const categoryData = categoryCounts.map((c) => ({
    name: c.name,
    count: c._count.projects,
  }))

  const typeData = typeCounts.map((t) => ({
    type: t.projectType,
    count: t._count.id,
  }))

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FolderKanban,
      sub: `${totalCategories} ${totalCategories === 1 ? "category" : "categories"}`,
      href: "/admin/projects",
    },
    {
      label: "Published",
      value: publishedProjects,
      icon: Eye,
      sub: "Visible on site",
      href: "/admin/projects",
    },
    {
      label: "Drafts",
      value: draftProjects,
      icon: FileX,
      sub: "Not yet published",
      href: "/admin/projects",
    },
    {
      label: "Featured",
      value: homepageProjects,
      icon: Star,
      sub: "On homepage",
      href: "/admin/homepage-projects",
    },
    {
      label: "Subscribers",
      value: newsletterSubs,
      icon: Mail,
      sub: "Active newsletter",
      href: null,
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: Tags,
      sub: "Project categories",
      href: "/admin/categories",
    },
  ]

  return (
    <div className="space-y-8 mt-6">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your content</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          const card = (
            <div className="border rounded-xl p-4 bg-white space-y-3 hover:shadow-sm transition">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {s.label}
                </p>
                <Icon size={16} className="text-gray-400" />
              </div>
              <p className="text-3xl font-bold text-black">{s.value}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          )
          return s.href ? (
            <Link key={s.label} href={s.href}>
              {card}
            </Link>
          ) : (
            <div key={s.label}>{card}</div>
          )
        })}
      </div>

      {/* CHARTS */}
      <DashboardCharts categoryData={categoryData} typeData={typeData} />

      {/* RECENT PROJECTS */}
      <div className="border rounded-xl bg-white overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">Recent Projects</p>
          <Link href="/admin/projects" className="text-xs text-gray-400 hover:text-black transition">
            View all →
          </Link>
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:block">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wide">Project</th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wide">Category</th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wide">Status</th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wide">Added</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/projects/${p.id}/edit`} className="hover:underline">
                      {p.name}
                    </Link>
                    {p.isHomepage && (
                      <span className="ml-2 inline-block px-1.5 py-0.5 rounded text-xs bg-black text-white">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{p.category.name}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {new Date(p.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}
        <div className="sm:hidden divide-y">
          {recentProjects.map((p) => (
            <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{p.name}</p>
                <p className="text-xs text-gray-400">{p.category.name}</p>
              </div>
              <span className={`flex-shrink-0 inline-block px-2 py-0.5 rounded text-xs font-medium ${
                p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
                {p.published ? "Published" : "Draft"}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}
