"use client"

import { useState, useEffect } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Plus, X, Save, Search } from "lucide-react"

type Project = {
  id: number
  name: string
  slug: string
  images: string[]
  isHomepage: boolean
  homepageOrder: number | null
  category: { name: string }
}

function SortableRow({
  project,
  onRemove,
}: {
  project: Project
  onRemove: (id: number) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-white border rounded-lg"
    >
      <button
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing touch-none"
        type="button"
      >
        <GripVertical size={18} />
      </button>

      {project.images?.[0] ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.images[0]}
          alt=""
          className="w-10 h-10 rounded object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{project.name}</p>
        <p className="text-xs text-gray-500">{project.category.name}</p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(project.id)}
        className="text-gray-400 hover:text-red-500 transition cursor-pointer p-1"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default function HomepageProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[]
}) {
  const [featured, setFeatured] = useState<Project[]>(
    [...initialProjects]
      .filter((p) => p.isHomepage)
      .sort((a, b) => (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0))
  )
  const [available, setAvailable] = useState<Project[]>(
    initialProjects.filter((p) => !p.isHomepage)
  )
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setFeatured((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === active.id)
      const newIndex = prev.findIndex((p) => p.id === over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  function addToFeatured(project: Project) {
    setAvailable((prev) => prev.filter((p) => p.id !== project.id))
    setFeatured((prev) => [...prev, project])
  }

  function removeFromFeatured(id: number) {
    const project = featured.find((p) => p.id === id)!
    setFeatured((prev) => prev.filter((p) => p.id !== id))
    setAvailable((prev) => [project, ...prev])
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/projects/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: featured.map((p) => p.id) }),
      })
      if (!res.ok) throw new Error()
      setToast({ message: "Homepage projects saved!", type: "success" })
    } catch {
      setToast({ message: "Failed to save. Try again.", type: "error" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 mt-6">
      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`px-6 py-3 rounded-lg text-white shadow-lg ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Homepage Projects</h1>
          <p className="text-sm text-gray-500">
            Pick and reorder projects shown on the homepage. If none are selected, the latest published projects appear automatically.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* FEATURED PANEL */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
              Featured on Homepage
            </h2>
            <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
              {featured.length}
            </span>
          </div>

          {featured.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-gray-400">
              No projects selected. Add projects from the right panel.
              <br />
              <span className="text-xs mt-1 block">Homepage will show latest published projects.</span>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={featured.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {featured.map((project, index) => (
                    <div key={project.id} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-5 text-right flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <SortableRow project={project} onRemove={removeFromFeatured} />
                      </div>
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* AVAILABLE PANEL */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
              Published Projects
            </h2>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {available.length}
            </span>
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {available.length === 0 ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-gray-400">
              All published projects are already featured.
            </div>
          ) : (
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {available
                .filter((p) =>
                  search
                    ? p.name.toLowerCase().includes(search.toLowerCase()) ||
                      p.category.name.toLowerCase().includes(search.toLowerCase())
                    : true
                )
                .map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-3 p-3 bg-white border rounded-lg"
                >
                  {project.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.images[0]}
                      alt=""
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.category.name}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToFeatured(project)}
                    className="text-gray-400 hover:text-green-600 transition cursor-pointer p-1"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
