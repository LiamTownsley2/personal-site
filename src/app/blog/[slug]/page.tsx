import { SiteFooter } from "@/layouts/SiteFooter";
import { SiteHeader } from "@/layouts/SiteHeader";
import { getPostBySlug } from "@/lib/db-service";
import IndividualPost from "@/pages/IndividualPost";
import { notFound } from "next/navigation";

export default async function IndividualBlogPage({ params }: { params: { slug: string } }) {
    const {  slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post || !post.published) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <IndividualPost post={post} />
            {/* {JSON.stringify(post, null, 4)} */}
            {/* <ProjectList projects={projects} /> */}
            <SiteFooter />
        </div>
    )
}