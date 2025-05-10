import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getAllPosts, createPost } from "@/lib/db-service"
import type { PostFormData } from "@/models/post"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const includeUnpublished = session?.user?.role === "admin"
    const posts = await getAllPosts(includeUnpublished)
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const postData: PostFormData = await request.json()
    const newPost = await createPost(postData)

    return NextResponse.json(newPost, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
