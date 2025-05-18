"use server"
import { Collection, MongoClient, ObjectId } from "mongodb"
import type { PostType, PostFormData } from "@/models/post"
import type { ProjectType, ProjectFormData } from "@/models/project"
import { SearchResult } from "@/app/search/page"

let client: MongoClient
let posts: Collection<PostType>
let projects: Collection<ProjectType>

async function initDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()
    const db = client.db(process.env.DB_NAME || "myApp")
    posts = db.collection<PostType>("posts")
    projects = db.collection<ProjectType>("projects")

    await Promise.all([
      projects.createIndex({ title: "text", description: "text", tags: "text" }),
      posts.createIndex({ title: "text", excerpt: "text" }),
    ])
  }
}
await initDb()

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
  if (!query) return [];

  const normalizedQuery = query.toLowerCase().trim();

  const [projectDocs, blogDocs] = await Promise.all([
    projects.find(
      { $text: { $search: normalizedQuery } },
      {
        projection: {
          title: 1,
          description: 1,
          coverImage: 1,
        },
      }
    ).toArray(),
    posts.find(
      { $text: { $search: normalizedQuery } },
      {
        projection: {
          title: 1,
          excerpt: 1,
          slug: 1,
          coverImage: 1,
          date: 1,
          published: 1
        },
      }
    ).toArray(),
  ]);

  const projectResults: SearchResult[] = projectDocs.map(p => ({
    id: p._id.toString(),
    title: p.title,
    description: p.description,
    type: 'project',
    url: `/projects/${p._id}`,
    coverImage: p.coverImage,
  }));

  const blogResults: SearchResult[] = blogDocs.map(p => ({
    id: p._id.toString(),
    title: p.title,
    excerpt: p.excerpt,
    type: 'blog',
    url: `/blog/${p.slug}`,
    coverImage: p.coverImage,
    date: p.date,
  }));

  return [...projectResults, ...blogResults];
}
