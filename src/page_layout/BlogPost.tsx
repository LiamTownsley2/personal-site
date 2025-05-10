import BlogPostDetails from "@/components/blog-post-details"
import Main from "@/components/page-section"
import { Button } from "@/components/button"
import { PostType } from "@/models/post"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import ArticleImage from "@/components/article-image"
import MarkdownRenderer from "@/components/markdown-renderer"

export default async function Post({ post }: { post: PostType }) {
    if (!post || !post.published) {
        notFound()
    }

    return (
        <Main>
            <div className="mx-auto max-w-3xl">
                <Button href="/blog" variant="ghost" icon={ArrowLeft} label="Back to Blog" className="mb-6 -ml-4" />
                <BlogPostDetails post={post} />
                <ArticleImage post={post} />

                <MarkdownRenderer>
                    {post.content}
                </MarkdownRenderer>

            </div>
        </Main>
    )
}