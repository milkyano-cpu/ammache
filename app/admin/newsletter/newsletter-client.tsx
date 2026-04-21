"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Search, Download, Trash2, ToggleLeft, ToggleRight, ChevronLeft, ChevronRight } from "lucide-react"

type Subscriber = {
  id: number
  email: string
  isActive: boolean
  subscribedAt: string
  unsubscribedAt: string | null
  createdAt: string
}

type Tab = "all" | "active" | "inactive"

const PAGE_SIZE = 20

export default function NewsletterClient({
  initialData,
  totalCount,
  activeCount,
}: {
  initialData: Subscriber[]
  totalCount: number
  activeCount: number
}) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialData)
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<Tab>("all")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(totalCount)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const inactiveCount = totalCount - activeCount

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const fetchPage = useCallback(
    async (p: number, q: string, t: Tab) => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: String(p),
          pageSize: String(PAGE_SIZE),
          search: q,
          status: t,
        })
        const res = await fetch(`/api/newsletter?${params}`)
        const data = await res.json()
        setSubscribers(data.subscribers)
        setTotal(data.total)
        setPage(p)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    if (page === 1 && search === "" && tab === "all") return
    fetchPage(1, search, tab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, tab])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const startItem = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const endItem = Math.min(page * PAGE_SIZE, total)

  async function handleToggle(id: number) {
    const res = await fetch(`/api/newsletter/${id}`, { method: "PATCH" })
    if (!res.ok) { setToast({ message: "Failed to update", type: "error" }); return }
    const updated: Subscriber = await res.json()
    setSubscribers((prev) => prev.map((s) => (s.id === id ? updated : s)))
    setToast({ message: updated.isActive ? "Subscriber activated" : "Subscriber deactivated", type: "success" })
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this subscriber?")) return
    const res = await fetch(`/api/newsletter/${id}`, { method: "DELETE" })
    if (!res.ok) { setToast({ message: "Delete failed", type: "error" }); return }
    setSubscribers((prev) => prev.filter((s) => s.id !== id))
    setTotal((prev) => prev - 1)
    setToast({ message: "Subscriber deleted", type: "success" })
  }

  function handleExportCSV() {
    const header = "Email,Status,Subscribed At,Unsubscribed At"
    const rows = subscribers.map((s) =>
      [
        s.email,
        s.isActive ? "Active" : "Inactive",
        new Date(s.subscribedAt).toLocaleDateString("en-GB"),
        s.unsubscribedAt ? new Date(s.unsubscribedAt).toLocaleDateString("en-GB") : "",
      ].join(",")
    )
    const csv = [header, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const tabCounts = useMemo(
    () => ({ all: totalCount, active: activeCount, inactive: inactiveCount }),
    [totalCount, activeCount, inactiveCount]
  )

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
  ]

  return (
    <div className="space-y-6 mt-6">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className={`px-6 py-3 rounded-lg text-white shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Newsletter Subscribers</h1>
          <p className="text-sm text-gray-500">
            {activeCount} active · {inactiveCount} inactive · {totalCount} total
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-50 text-sm cursor-pointer self-start sm:self-auto"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      {/* SEARCH + TABS */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full border rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="flex border rounded-lg overflow-hidden self-start">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setPage(1) }}
              className={`px-4 py-2 text-sm cursor-pointer transition flex items-center gap-1.5 ${
                tab === t.key ? "bg-black text-white" : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                tab === t.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {tabCounts[t.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* TABLE (DESKTOP) */}
      <div className="hidden sm:block border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wide">Subscribed</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wide">Unsubscribed</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 text-xs uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className={loading ? "opacity-50 pointer-events-none" : ""}>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">
                  No subscribers found
                </td>
              </tr>
            ) : (
              subscribers.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      s.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(s.subscribedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {s.unsubscribedAt
                      ? new Date(s.unsubscribedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleToggle(s.id)}
                        title={s.isActive ? "Deactivate" : "Activate"}
                        className="p-2 rounded hover:bg-gray-100 cursor-pointer text-gray-500 hover:text-black transition"
                      >
                        {s.isActive ? <ToggleRight size={18} className="text-green-600" /> : <ToggleLeft size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-2 rounded hover:bg-red-50 cursor-pointer text-red-500 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* LIST (MOBILE) */}
      <div className={`sm:hidden border rounded-lg divide-y ${loading ? "opacity-50 pointer-events-none" : ""}`}>
        {subscribers.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-gray-400">No subscribers found</p>
        ) : (
          subscribers.map((s) => (
            <div key={s.id} className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(s.subscribedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
              </div>
              <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                s.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
                {s.isActive ? "Active" : "Inactive"}
              </span>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => handleToggle(s.id)} className="p-1.5 rounded hover:bg-gray-100 cursor-pointer">
                  {s.isActive ? <ToggleRight size={17} className="text-green-600" /> : <ToggleLeft size={17} className="text-gray-400" />}
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded hover:bg-red-50 cursor-pointer text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-sm text-gray-500">
          {total === 0 ? "No results" : `Showing ${startItem}–${endItem} of ${total}`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => fetchPage(page - 1, search, tab)}
            disabled={page === 1 || loading}
            className="flex items-center gap-1 px-4 py-2 border rounded text-sm hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft size={15} /> Previous
          </button>
          <button
            onClick={() => fetchPage(page + 1, search, tab)}
            disabled={page >= totalPages || loading}
            className="flex items-center gap-1 px-4 py-2 border rounded text-sm hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      </div>

    </div>
  )
}
