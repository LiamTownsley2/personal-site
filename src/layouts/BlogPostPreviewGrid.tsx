import BlogPostPreview from "@/components/blog-post-preview"
import { PostType } from "@/models/post"

export type BlogPostPreviewGridParams = { posts: PostType[] }
export default function BlogPostPreviewGrid(params: BlogPostPreviewGridParams) {
    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {params.posts.map((post) => (
                <BlogPostPreview key={post._id.toString()} post={post} />
            ))}
        </div>
    )
}