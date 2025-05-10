import { PostType } from "@/models/post"

export type BlogPostDetailsParams = { post: PostType }
export default function BlogPostDetails(params: BlogPostDetailsParams) {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{params.post.title}</h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <time dateTime={params.post.date}>{params.post.date}</time>
                <span>•</span>
                <span>{params.post.readTime}</span>
            </div>
        </div>
    )
}