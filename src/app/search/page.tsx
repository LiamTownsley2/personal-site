"use client";

import { SiteHeader } from "@/layouts/SiteHeader";
import { SiteFooter } from "@/layouts/SiteFooter";
import SearchContent from "@/layouts/SearchContent";

export type SearchResult = {
    id: string
    title: string
    description?: string
    excerpt?: string
    type: "project" | "blog"
    url: string
    coverImage?: string
    date?: string
}

export default function Search() {

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <SearchContent />
            <SiteFooter />
        </div>
    );
}