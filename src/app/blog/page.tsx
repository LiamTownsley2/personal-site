import { SiteFooter } from "@/layouts/SiteFooter";
import { SiteHeader } from "@/layouts/SiteHeader";
import { getAllPosts } from "@/lib/db-service";
import PostList from "@/pages/PostList";
import { notFound } from "next/navigation";

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (!posts) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <PostList posts={posts} />
      <SiteFooter />
    </div>
  )
}