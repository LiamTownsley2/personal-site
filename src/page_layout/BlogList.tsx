import { ButtonParams } from "@/components/button";
import FooterButtonRow from "@/components/footer-button-row";
import PageHeading from "@/components/page-heading";
import Main from "@/components/page-section";
import BlogPostPreviewGrid from "@/layouts/BlogPostPreviewGrid";
import { PostType } from "@/models/post";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PAGE_BUTTONS: ButtonParams[] = [
    { icon: ArrowLeft, variant: "outline", href: "/", label: "Back to Home" },
    { icon: ArrowRight, variant: "outline", href: "/contact", label: "Contact Me", rtl_icon: true }
];

export default function BlogList({ posts }: { posts?: PostType[] }) {
    const POST_LIST = posts || [];
    return (
        <Main>
            <PageHeading title="My Blog" subtitle="Thoughts, ideas, and insights from my journey as a developer" />
            <BlogPostPreviewGrid posts={POST_LIST} />
            <FooterButtonRow buttons={PAGE_BUTTONS} />
        </Main>
    )
}