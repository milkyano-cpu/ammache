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
import { GripVertical, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

type Category = {
  id: number
  name: string
}

type Project = {
  id: number
  name: string
  images: string[]
  order: number | null
  categoryId: number
  category: { id: number; name: string }
}

function SortableRow({ project }: { project: Project }) {
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

      <p className="flex-1 min-w-0 font-medium text-sm truncate">{project.name}</p>
    </div>
  )
}

export default function ProjectOrderClient({
  categories,
  initialProjects,
}: {
  categories: Category[]
  initialProjects: Project[]
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categories[0]?.id ?? 0)
  const [projectsByCategory, setProjectsByCategory] = useState<Record<number, Project[]>>(() => {
    const map: Record<number, Project[]> = {}
    for (const cat of categories) {
      map[cat.id] = initialProjects.filter((p) => p.categoryId === cat.id)
    }
    return map
  })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

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
    setProjectsByCategory((prev) => {
      const list = prev[selectedCategoryId]
      const oldIndex = list.findIndex((p) => p.id === active.id)
      const newIndex = list.findIndex((p) => p.id === over.id)
      return { ...prev, [selectedCategoryId]: arrayMove(list, oldIndex, newIndex) }
    })
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: selectedCategoryId,
          orderedIds: projectsByCategory[selectedCategoryId].map((p) => p.id),
        }),
      })
      if (!res.ok) throw new Error()
      setToast({ message: "Order saved!", type: "success" })
    } catch {
      setToast({ message: "Failed to save. Try again.", type: "error" })
    } finally {
      setSaving(false)
    }
  }

  const currentProjects = projectsByCategory[selectedCategoryId] ?? []

  return (
    <div className="space-y-6 mt-6">
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

      <div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Project Order</h1>
          <p className="text-sm text-gray-500">
            Drag to reorder projects within each category.
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

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap border-b pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategoryId(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
              selectedCategoryId === cat.id
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.name}
            <span className="ml-1.5 text-xs opacity-60">
              {projectsByCategory[cat.id]?.length ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Sortable list */}
      {currentProjects.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-gray-400">
          No projects in this category.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={currentProjects.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 max-w-xl">
              {currentProjects.map((project, index) => (
                <div key={project.id} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-5 text-right flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <SortableRow project={project} />
                  </div>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
