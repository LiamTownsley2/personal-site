import BlogPostDetails from "@/components/blog-post-details"
import Main from "@/components/page-section"
import { Button } from "@/components/button"
import { PostType } from "@/models/post"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import ArticleImage from "@/components/article-image"
import DOMPurify from 'isomorphic-dompurify';
import parse, { domToReact, Element } from 'html-react-parser';

import type { DOMNode } from 'html-react-parser';
const tagMap: Record<string, string> = {
    code: "dark:bg-gray-700 bg-gray-200 whitespace-pre overflow-y-auto max-h-64 p-4 rounded-lg",
    h1: "text-2xl font-bold",
    ul: "list-disc pl-8",
};

const transform = (domNode: DOMNode, index: number) => {
    if (domNode.type !== 'tag') return;

    const tag = (domNode as Element).name;
    const className = tagMap[tag];
    if (!className) return;

    const children = domToReact((domNode as Element).children as DOMNode[]);
    return (
        <div key={index} className={className}>
            {children}
        </div>
    );
};


export default async function Post({ post }: { post: PostType }) {
    if (!post || !post.published) {
        notFound()
    }

    const safeHTML = DOMPurify.sanitize(post.content, { USE_PROFILES: { html: true } });

    return (
        <Main>
            <div className="mx-auto max-w-3xl">
                <Button href="/blog" variant="ghost" icon={ArrowLeft} label="Back to Blog" className="mb-6 -ml-4" />
                <BlogPostDetails post={post} />
                <ArticleImage post={post} />

                {/* <MarkdownRenderer> */}
                <div>{parse(safeHTML, { replace: transform })}</div>
                {/* </MarkdownRenderer> */}

            </div>
        </Main>
    )
}