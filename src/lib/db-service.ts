"use server"
import { MongoClient, ObjectId } from "mongodb"
import type { PostType, PostFormData } from "@/models/post"
import type { ProjectType, ProjectFormData } from "@/models/project"
import { SearchResult } from "@/app/search/page"

const client = new MongoClient(process.env.MONGODB_URI!)
const db = client.db(process.env.DB_NAME || "myApp")
const posts = db.collection<PostType>("posts")
const projects = db.collection<ProjectType>("projects")

projects.createIndex({ title: "text", description: "text", tags: "text" })
posts.createIndex({ title: "text", excerpt: "text" })

export async function getAllPosts(includeUnpublished = false): Promise<PostType[]> {
  const cursor = posts.find({ ...(includeUnpublished ? {} : { published: true }) }).sort({ createdAt: -1 })
  return await cursor.toArray()
}

export async function getAllPostSlugs(includeUnpublished = false): Promise<string[]> {
  const cursor = posts
    .find({ published: includeUnpublished })
    .project({ slug: 1, _id: 0 })
  const results = await cursor.toArray()
  return results.map(p => p.slug)
}

export async function getPostById(id: string): Promise<PostType | null> {
  return await posts.findOne({ _id: new ObjectId(id) })
}

export async function getPostBySlug(slug: string): Promise<PostType | null> {
  return await posts.findOne({ slug })
}

export async function createPost(postData: PostFormData): Promise<PostType> {
  const result = await posts.insertOne({
    ...postData, createdAt: new Date(), updatedAt: new Date(),
    _id: new ObjectId()
  })
  return await posts.findOne({ _id: result.insertedId }) as PostType
}

export async function updatePost(id: string, postData: PostFormData): Promise<PostType | null> {
  await posts.updateOne({ _id: new ObjectId(id) }, { $set: { ...postData, updatedAt: new Date() } })
  return await posts.findOne({ _id: new ObjectId(id) })
}

export async function deletePost(id: string): Promise<boolean> {
  const result = await posts.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export async function getAllProjects(includeUnpublished = false): Promise<ProjectType[]> {
  const cursor = projects.find({ ...(includeUnpublished ? {} : { published: true }) }).sort({ createdAt: -1 })
  return await cursor.toArray()
}

export async function getAllProjectIds(includeUnpublished = false): Promise<string[]> {
  const cursor = projects
    .find({ published: includeUnpublished })
    .project({ _id: 1 })
  const results = await cursor.toArray()
  return results.map(p => p._id.toString())
}

export async function getProjectById(id: string): Promise<ProjectType | null> {
  return await projects.findOne({ _id: new ObjectId(id) })
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | null> {
  return await projects.findOne({ slug })
}

export async function createProject(projectData: ProjectFormData): Promise<ProjectType> {
  const result = await projects.insertOne({
    ...projectData, createdAt: new Date(), updatedAt: new Date(),
    _id: new ObjectId()
  })
  return await projects.findOne({ _id: result.insertedId }) as ProjectType
}

export async function updateProject(id: string, projectData: ProjectFormData): Promise<ProjectType | null> {
  await projects.updateOne({ _id: new ObjectId(id) }, { $set: { ...projectData, updatedAt: new Date() } })
  return await projects.findOne({ _id: new ObjectId(id) })
}

export async function deleteProject(id: string): Promise<boolean> {
  const result = await projects.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query) return []
  const normalizedQuery = query.toLowerCase().trim()

  const projectResults: SearchResult[] = await projects.find({
    $text: { $search: normalizedQuery }
  })
    .toArray()
    .then(projects =>
      projects.map(p => ({
        id: p._id.toString(),
        title: p.title,
        description: p.description,
        type: 'project',
        url: `/projects/${p._id.toString()}`,
        coverImage: p.coverImage,
      }))
    )

  const blogResults: SearchResult[] = await posts.find({
    $text: { $search: normalizedQuery }
  })
    .toArray()
    .then(posts =>
      posts.map(post => ({
        id: post._id.toString(),
        title: post.title,
        excerpt: post.excerpt,
        type: 'blog',
        url: `/blog/${post.slug}`,
        coverImage: post.coverImage,
        date: post.date,
      }))
    )

  return [...projectResults, ...blogResults]
}
