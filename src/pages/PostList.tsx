import { Button } from "@/components/ui/button";
import { Post } from "@/models/post";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostList({ posts }: { posts: Post[] }) {
    return (
        <main className="flex-1">
            <section className="w-full py-6 md:py-12 lg:py-24">
                {/* <div className="container px-4 md:px-6"> */}
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Blog</h1>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Thoughts, ideas, and insights from my journey as a developer
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post._id.toString()} href={`/blog/${post.slug}`} className="group">
                            <div className="overflow-hidden rounded-lg border shadow-sm">
                                <div className="aspect-video overflow-hidden">
                                    <Image
                                        alt={post.title}
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        height={200}
                                        width={400}
                                        src={post.coverImage || "/placeholder.svg"}
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <time dateTime={post.date}>{post.date}</time>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="mt-2 text-lg font-bold group-hover:underline">{post.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center gap-8">
                    <Link href="/">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline">
                            Contact Me
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                {/* </div> */}
            </section>
        </main>
    )
}