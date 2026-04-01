import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"
import type { ProjectWithCategory, ProjectListResponse, CreateProjectInput, UpdateProjectInput } from "@/lib/types/project"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function generateUniqueSlug(
  name: string,
  excludeId?: number
): Promise<string> {
  const baseSlug = slugify(name)
  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await prisma.project.findUnique({
      where: { slug },
      select: { id: true },
    })

    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug
    }

    slug = `${baseSlug}-${counter}`
    counter++
  }
}

const categorySelect = {
  id: true,
  name: true,
}

export async function getProjects(options: {
  page?: number
  pageSize?: number
  categoryId?: number
  published?: boolean
  search?: string
  projectType?: string
}): Promise<ProjectListResponse> {
  const {
    page = 1,
    pageSize = 10,
    categoryId,
    published,
    search,
    projectType,
  } = options

  const where: Record<string, unknown> = {}

  if (categoryId) where.categoryId = categoryId
  if (published !== undefined) where.published = published
  if (projectType) where.projectType = projectType
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { shortDescription: { contains: search, mode: "insensitive" } },
    ]
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: { category: { select: categorySelect } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.project.count({ where }),
  ])

  return {
    projects: projects as ProjectWithCategory[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getProjectById(
  id: number
): Promise<ProjectWithCategory | null> {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { category: { select: categorySelect } },
  })

  return project as ProjectWithCategory | null
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectWithCategory | null> {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { category: { select: categorySelect } },
  })

  return project as ProjectWithCategory | null
}

export async function createProject(
  data: CreateProjectInput
): Promise<ProjectWithCategory> {
  const slug = await generateUniqueSlug(data.name)

  const project = await prisma.project.create({
    data: {
      slug,
      name: data.name,
      shortDescription: data.shortDescription || null,
      description: data.description || null,
      images: data.images,
      specifications: data.specifications as unknown as Prisma.InputJsonValue,
      scopeStatus: data.scopeStatus as unknown as Prisma.InputJsonValue,
      projectType: data.projectType || "OTHER",
      categoryId: data.categoryId,
      published: data.published,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
    },
    include: { category: { select: categorySelect } },
  })

  return project as ProjectWithCategory
}

export async function updateProject(
  id: number,
  data: UpdateProjectInput
): Promise<ProjectWithCategory> {
  const updateData: Record<string, unknown> = { ...data }

  if (data.specifications) {
    updateData.specifications = data.specifications as unknown as Prisma.InputJsonValue
  }

  if (data.scopeStatus) {
    updateData.scopeStatus = data.scopeStatus as unknown as Prisma.InputJsonValue
  }

  if (data.name && !data.slug) {
    updateData.slug = await generateUniqueSlug(data.name, id)
  }

  if (data.shortDescription === "") updateData.shortDescription = null
  if (data.description === "") updateData.description = null
  if (data.metaTitle === "") updateData.metaTitle = null
  if (data.metaDescription === "") updateData.metaDescription = null

  const project = await prisma.project.update({
    where: { id },
    data: updateData,
    include: { category: { select: categorySelect } },
  })

  return project as ProjectWithCategory
}

export async function deleteProject(id: number): Promise<void> {
  await prisma.project.delete({ where: { id } })
}

export async function getRelatedProjects(
  projectId: number,
  categoryId: number,
  limit: number = 4,
  projectType?: string
): Promise<ProjectWithCategory[]> {
  const where: Record<string, unknown> = {
    categoryId,
    id: { not: projectId },
    published: true,
  }
  if (projectType) where.projectType = projectType

  const projects = await prisma.project.findMany({
    where,
    include: { category: { select: categorySelect } },
    orderBy: { createdAt: "desc" },
    take: limit,
  })

  return projects as ProjectWithCategory[]
}

export async function getPublishedProjects(
  categoryId?: number
): Promise<ProjectWithCategory[]> {
  const where: Record<string, unknown> = { published: true }
  if (categoryId) where.categoryId = categoryId

  const projects = await prisma.project.findMany({
    where,
    include: { category: { select: categorySelect } },
    orderBy: { createdAt: "desc" },
  })

  return projects as ProjectWithCategory[]
}
