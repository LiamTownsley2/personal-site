"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/context/search-context"
import { Button as LegacyButton } from "./ui/button";

export function SearchInput({ ...props }: { className?: string }) {
    const { searchQuery, setSearchQuery, setIsSearching } = useSearch()
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setLocalSearchQuery(searchQuery)
    }, [searchQuery])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setSearchQuery(localSearchQuery)
        setIsSearching(true)
        router.push(`/search?q=${encodeURIComponent(localSearchQuery)}`)
    }

    const clearSearch = () => {
        setLocalSearchQuery("")
        setSearchQuery("")
        setIsSearching(false)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <form onSubmit={handleSearch} className={"relative w-full max-w-sm " + props?.className || ""}>
            <div className={`flex relative items-center`}>
                <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    type="search"
                    placeholder="Search posts and projects..."
                    className="pl-8 pr-10 [&::-webkit-search-cancel-button]:hidden"
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                />
                {localSearchQuery && (
                    <LegacyButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={clearSearch}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                    </LegacyButton>
                )}
            </div>
        </form>
    )
}
