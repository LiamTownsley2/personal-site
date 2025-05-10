import { SiteFooter } from "@/layouts/SiteFooter";
import { SiteHeader } from "@/layouts/SiteHeader";
import { getAllPosts } from "@/lib/db-service";
import Blog from "@/pages/BlogList";
import { notFound } from "next/navigation";

export default async function _BlogPage() {
  const posts = await getAllPosts();

  if (!posts) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <Blog posts={posts} />
      <SiteFooter />
    </div>
  )
}