"use client"
import { SiteFooter } from "@/layouts/SiteFooter"
import { SiteHeader } from "@/layouts/SiteHeader"
// import { getAllPosts } from "@/lib/db-service"
import Blog from "@/layouts/BlogList"
// import { notFound } from "next/navigation"

export default function BlogPage() {

  // const posts = await getAllPosts()

  // if (!posts) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <Blog />
      <SiteFooter />
    </div>
  )
}