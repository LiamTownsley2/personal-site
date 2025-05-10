import { PostType } from "@/models/post";
import Image from "next/image";
import Link from "next/link";

export type BlogPostPreviewParams = { post: PostType }
export default function BlogPostPreview(params: BlogPostPreviewParams) {
    return (
        <Link key={params.post._id.toString()} href={`/blog/${params.post.slug}`} className="group">
            <div className="overflow-hidden rounded-lg border shadow-sm">
                <div className="aspect-video overflow-hidden">
                    <Image
                        alt={params.post.title}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        height={200}
                        width={400}
                        src={params.post.coverImage || "/placeholder.svg"}
                    />
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <time dateTime={params.post.date}>{params.post.date}</time>
                        <span>•</span>
                        <span>{params.post.readTime}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold group-hover:underline">{params.post.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{params.post.excerpt}</p>
                </div>
            </div>
        </Link>
    )
}