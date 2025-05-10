import React from 'react';
import ReactMarkdown from 'react-markdown'

// Plugins
import remarkGfm from 'remark-gfm'
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import remarkSmartypants from 'remark-smartypants';
import remarkEmoji from 'remark-emoji';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export type MarkdownRendererParams = { children?: string | null | undefined }
export default function MarkdownRenderer(params: MarkdownRendererParams) {
    return (
        <div className="prose lg:prose-xl">
            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                    remarkSmartypants,
                    remarkEmoji,
                    remarkMath,
                ]}
                rehypePlugins={[rehypeSanitize, rehypeKatex, rehypeRaw]}
            >
                {params.children}
            </ReactMarkdown>
        </div>
    )
}