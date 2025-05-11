import { SearchResult } from "@/app/search/page";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultPreview({ result }: { result: SearchResult }) {
    return (
        <Link key={`${result.type}-${result.id}`} href={result.url} className="group">
            <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                {result.coverImage && (
                    <div className="flex-shrink-0">
                        <Image
                            src={result.coverImage || "/placeholder.svg"}
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
    )
}