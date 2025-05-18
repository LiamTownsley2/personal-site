"use client"
import BlogPostPreview from "@/components/blog-post-preview"
import { PostType } from "@/models/post"
import { fetcher } from "@/lib/utils"
import useSWR from 'swr'

export default function BlogPostPreviewGrid() {
    const { data, error } = useSWR('/api/posts', { fetcher })

    if (error) return <div className="text-center">Failed to load</div>
    if (!data) return <div className="text-center">Loading...</div>

    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.map((post: PostType) => (
                <BlogPostPreview key={post._id.toString()} post={post} />
            ))}
        </div>
    )
}