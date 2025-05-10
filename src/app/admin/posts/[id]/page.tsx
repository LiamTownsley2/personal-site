"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PostEditor } from "@/components/post-editor"
import type { Post } from "@/models/post"

export default function EditPostPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${params?.id}`)
        if (res.ok) {
          const data = await res.json()
          setPost(data)
        }
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params?.id) {
      fetchPost()
    }
  }, [params?.id])

  if (isLoading) {
    return <div className="py-8 text-center">Loading...</div>
  }

  if (!post) {
    return <div className="py-8 text-center">Post not found.</div>
  }

  return <PostEditor post={post} />
}
