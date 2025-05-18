import { SearchResult } from "@/app/search/page";
import { ButtonParams } from "@/components/button";
import FooterButtonRow from "@/components/footer-button-row";
import PageHeading from "@/components/page-heading";
import Main from "@/components/page-section";
import { SearchInput } from "@/components/search-input";
import SearchResultPreview from "@/components/search/search-result-preview";
import { ArrowLeft, LoaderIcon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "@/context/search-context";
import { fetcher } from "@/lib/utils"
import useSWR from 'swr'

const PAGE_BUTTONS: ButtonParams[] = [
    { href: "/", icon: ArrowLeft, label: "Back to Home", variant: "outline" }
];

export default function SearchContent() {
    const searchParams = useSearchParams();
    const [localQuery, setLocalQuery] = useState("");
    const { searchQuery, setSearchQuery, searchResults, setSearchResults } = useSearch();
    const router = useRouter()

    useEffect(() => {
        const q = searchParams.get("q") || "";
        setLocalQuery(q);
    }, [searchParams]);

    useEffect(() => {
        setSearchQuery(localQuery);
    }, [localQuery, setSearchQuery]);

    const { data, error } = useSWR<SearchResult[]>(
        localQuery ? `/api/search?q=${encodeURIComponent(localQuery)}` : null,
        fetcher
    );

    useEffect(() => {
        if (error?.redirect) {
            setSearchResults([]);
            setLocalQuery("");
            setSearchQuery("");
            router.push(error.redirect);
        } else if (data) {
            setSearchResults(
                data.map((result: SearchResult) => ({
                    ...result,
                    id: result.id,
                }))
            );
        }
    }, [data, error, setSearchResults, setSearchQuery, router]);

    if (error) return <div className="text-center">Failed to load</div>
    if (!data) return <div className="text-center py-12">
        <p className="text-lg text-gray-500 dark:text-gray-400">
            Loading...
        </p>
    </div>;

    return (
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
                {searchResults.length > 0 && <div className="mx-auto max-w-5xl py-8">
                    {searchResults.length === 0 && localQuery ? (
                        <></>
                    ) : (
                        <div className="grid gap-8">
                            {searchResults.map((result, value) => (
                                <SearchResultPreview key={value} result={result} />
                            ))}
                        </div>
                    )}
                </div>}
            </Suspense>
            <FooterButtonRow buttons={PAGE_BUTTONS} />
        </Main >
    );
}