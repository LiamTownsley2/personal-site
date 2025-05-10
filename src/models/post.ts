import { ObjectId } from "mongodb"

export interface Post {
  _id: ObjectId
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readTime: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readTime: string
  published: boolean
}
