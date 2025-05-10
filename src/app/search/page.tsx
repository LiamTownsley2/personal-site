"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useSearch } from "@/context/search-context";
import { SearchInput } from "@/components/search-input";
import { SiteHeader } from "@/layouts/SiteHeader";
import { SiteFooter } from "@/layouts/SiteFooter";
import PageHeading from "@/components/page-heading";
import Main from "@/components/page-section";
import { SearchResult } from "@/lib/search-service";
import { ButtonParams } from "@/components/button";
import FooterButtonRow from "@/components/footer-button-row";

const PAGE_BUTTONS: ButtonParams[] = [
    { href: "/", icon: ArrowLeft, label: "Back to Home", variant: "outline" }
];
export default function SearchPage() {
    const searchParams = useSearchParams();
    const [localQuery, setLocalQuery] = useState("");
    const { searchQuery, setSearchQuery, searchResults, setSearchResults } = useSearch();

    useEffect(() => {
        const q = searchParams.get("q") || "";
        setLocalQuery(q);
    }, [searchParams]);

    useEffect(() => {
        if (!localQuery) return;

        async function fetchData() {
            setSearchQuery(localQuery);
            try {
                const response = await fetch(`/api/search?query=${localQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(
                        data.map((result: SearchResult) => ({
                            ...result,
                            id: Math.random(),
                        }))
                    );
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
            }
        }

        fetchData();
    }, [localQuery, setSearchQuery, setSearchResults]);

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <Main>
                <div className="md:hidden mb-8">
                    <SearchInput />
                </div>
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
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-500 dark:text-gray-400">
                                No results found. Try a different search term.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8">
                            {searchResults.map((result) => (
                                <Link key={`${result.type}-${result.id}`} href={result.url} className="group">
                                    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                                        {result.image && (
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src={result.image || "/placeholder.svg"}
                                                    alt={result.title}
                                                    width={200}
                                                    height={120}
                                                    className="rounded-md object-cover w-full md:w-[200px] h-[120px]"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize">
                                                    {result.type}
                                                </span>
                                                {result.date && <span className="text-sm text-gray-500">{result.date}</span>}
                                            </div>
                                            <h2 className="text-xl font-bold group-hover:underline">{result.title}</h2>
                                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                                {result.description || result.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <FooterButtonRow buttons={PAGE_BUTTONS} />
            </Main>
            <SiteFooter />
        </div>
    );
}
