import type { Project, ProjectType } from "@prisma/client"

export interface Specification {
  key: string
  value: string
}

export interface ProjectWithCategory extends Project {
  category: {
    id: number
    name: string
  }
}

export interface CreateProjectInput {
  name: string
  shortDescription?: string
  description?: string
  images: string[]
  specifications: Specification[]
  scopeStatus: Specification[]
  projectType: ProjectType
  categoryId: number
  published: boolean
  metaTitle?: string
  metaDescription?: string
}

export interface UpdateProjectInput {
  name?: string
  slug?: string
  shortDescription?: string | null
  description?: string | null
  images?: string[]
  specifications?: Specification[]
  scopeStatus?: Specification[]
  projectType?: ProjectType
  categoryId?: number
  published?: boolean
  metaTitle?: string | null
  metaDescription?: string | null
}

export interface ProjectListResponse {
  projects: ProjectWithCategory[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
