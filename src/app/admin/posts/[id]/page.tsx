"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PostEditor } from "@/components/post-editor"
import type { PostType } from "@/models/post"

// export async function generateStaticParams() {
//   const slugs = await getAllPostSlugs() // returns string[]
//   return slugs.map(slug => ({ slug }))
// }

export default function EditPostPage() {
  const params = useParams()
  const postId = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [post, setPost] = useState<PostType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!postId) return

    const controller = new AbortController()

    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          signal: controller.signal,
        })
        if (res.ok) {
          const data = await res.json()
          setPost(data)
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching post:", error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()

    return () => controller.abort()
  }, [postId])

  if (isLoading) {
    return <div className="py-8 text-center">Loading...</div>
  }

  if (!post) {
    return <div className="py-8 text-center">Post not found.</div>
  }

  return <PostEditor post={post} />
}
