import { Button } from "@/components/ui/button";
import { Post } from "@/models/post";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function IndividualPost({ post }: { post: Post }) {
    return (
        <main className="flex-1">
            <article className="container mx-auto px-4 py-12 md:py-20">
                <div className="mx-auto max-w-3xl">
                    <Link href="/blog">
                        <Button variant="ghost" className="mb-6 -ml-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <div className="mt-8">
                        <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div
                        className="prose prose-gray mt-8 max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </main>
    )
}