"use server"
import { MongoClient, ObjectId } from "mongodb"
import type { Post, PostFormData } from "@/models/post"
import type { Project, ProjectFormData } from "@/models/project"

const client = new MongoClient(process.env.MONGODB_URI!)
const db = client.db(process.env.DB_NAME || "myApp")
const posts = db.collection<Post>("posts")
const projects = db.collection<Project>("projects")

export async function getAllPosts(includeUnpublished = false): Promise<Post[]> {
  const cursor = posts.find({ ...(includeUnpublished ? {} : { published: true }) }).sort({ createdAt: -1 })
  return await cursor.toArray()
}

export async function getPostById(id: string): Promise<Post | null> {
  return await posts.findOne({ _id: new ObjectId(id) })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await posts.findOne({ slug })
}

export async function createPost(postData: PostFormData): Promise<Post> {
  const result = await posts.insertOne({
    ...postData, createdAt: new Date(), updatedAt: new Date(),
    _id: new ObjectId()
  })
  return await posts.findOne({ _id: result.insertedId }) as Post
}

export async function updatePost(id: string, postData: PostFormData): Promise<Post | null> {
  await posts.updateOne({ _id: new ObjectId(id) }, { $set: { ...postData, updatedAt: new Date() } })
  return await posts.findOne({ _id: new ObjectId(id) })
}

export async function deletePost(id: string): Promise<boolean> {
  const result = await posts.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

export async function getAllProjects(includeUnpublished = false): Promise<Project[]> {
  const cursor = projects.find({ ...(includeUnpublished ? {} : { published: true }) }).sort({ createdAt: -1 })
  return await cursor.toArray()
}

export async function getProjectById(id: string): Promise<Project | null> {
  return await projects.findOne({ _id: new ObjectId(id) })
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return await projects.findOne({ slug })
}

export async function createProject(projectData: ProjectFormData): Promise<Project> {
  const result = await projects.insertOne({
    ...projectData, createdAt: new Date(), updatedAt: new Date(),
    _id: new ObjectId()
  })
  return await projects.findOne({ _id: result.insertedId }) as Project
}

export async function updateProject(id: string, projectData: ProjectFormData): Promise<Project | null> {
  await projects.updateOne({ _id: new ObjectId(id) }, { $set: { ...projectData, updatedAt: new Date() } })
  return await projects.findOne({ _id: new ObjectId(id) })
}

export async function deleteProject(id: string): Promise<boolean> {
  const result = await projects.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}
