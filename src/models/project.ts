import { ObjectId } from "mongodb"

export interface Project {
  _id: ObjectId
  title: string
  slug: string
  description: string
  coverImage: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProjectFormData {
  title: string
  slug: string
  description: string
  coverImage: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  published: boolean
}
