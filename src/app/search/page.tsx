"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, LoaderIcon } from "lucide-react";
import { useSearch } from "@/context/search-context";
import { SearchInput } from "@/components/search-input";
import { SiteHeader } from "@/layouts/SiteHeader";
import { SiteFooter } from "@/layouts/SiteFooter";
import PageHeading from "@/components/page-heading";
import Main from "@/components/page-section";
import { ButtonParams } from "@/components/button";
import FooterButtonRow from "@/components/footer-button-row";
import NoSearchResults from "@/components/search/no-search-results";
import SearchResultPreview from "@/components/search/search-result-preview";

const PAGE_BUTTONS: ButtonParams[] = [
    { href: "/", icon: ArrowLeft, label: "Back to Home", variant: "outline" }
];

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

function Search() {
    const searchParams = useSearchParams();
    const [localQuery, setLocalQuery] = useState("");
    const { searchQuery, setSearchQuery, searchResults, setSearchResults } = useSearch();
    const router = useRouter()

    useEffect(() => {
        const q = searchParams.get("q") || "";
        setLocalQuery(q);
    }, [searchParams]);

    useEffect(() => {
        if (!localQuery) return;

        async function fetchData() {
            setSearchQuery(localQuery);
            try {
                const response = await fetch(`/api/search?q=${localQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(
                        data.map((result: SearchResult) => ({
                            ...result,
                            id: result.id,
                        }))
                    );
                } else if (response.status == 418) {
                    const redirect_to = response.headers.get('Location');
                    if (!redirect_to) return
                    setSearchResults([]);
                    setLocalQuery("");
                    setSearchQuery("");
                    return router.push(redirect_to)
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
            }
        }

        fetchData();
    }, [localQuery, setSearchQuery, setSearchResults, router]);

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <Main>
                <div className="md:hidden mb-8">
                    <SearchInput />
                </div>
                <Suspense fallback={<LoaderIcon />}>
                    <PageHeading
                        title="Search Results"
                        subtitle={
                            searchResults.length > 0
                                ? `Found ${searchResults.length} results for "${searchQuery}"`
                                : `No results found for "${searchQuery}"`
                        }
                    />
                    <div className="mx-auto max-w-5xl py-8">
                        {searchResults.length === 0 && localQuery ? (
                            <NoSearchResults />
                        ) : (
                            <div className="grid gap-8">
                                {searchResults.map((result, value) => (
                                    <SearchResultPreview key={value} result={result} />
                                ))}
                            </div>
                        )}
                    </div>
                </Suspense>
                <FooterButtonRow buttons={PAGE_BUTTONS} />
            </Main>
            <SiteFooter />
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Search />
        </Suspense>
    )
}