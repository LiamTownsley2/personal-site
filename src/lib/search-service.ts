import { getAllPosts, getAllProjects } from "./db-service"

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

export async function searchContent(query: string): Promise<SearchResult[]> {
    if (!query) return []

    const normalizedQuery = query.toLowerCase().trim()

    const [projects, posts] = await Promise.all([getAllProjects(), getAllPosts()])

    const projectResults: SearchResult[] = projects
        .filter(
            (p) =>
                p.title?.toLowerCase().includes(normalizedQuery) ||
                p.description?.toLowerCase().includes(normalizedQuery) ||
                p.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))
        )
        .map((p) => ({
            id: p._id.toString(),
            title: p.title,
            description: p.description,
            type: "project",
            url: `/projects/${p._id.toString()}`,
            coverImage: p.coverImage,
        }))

    const blogResults: SearchResult[] = posts
        .filter(
            (post) =>
                post.title?.toLowerCase().includes(normalizedQuery) ||
                post.excerpt?.toLowerCase().includes(normalizedQuery)
        )
        .map((post) => ({
            id: post._id.toString(),
            title: post.title,
            excerpt: post.excerpt,
            type: "blog",
            url: `/blog/${post._id.toString()}`,
            coverImage: post.coverImage,
            date: post.date,
        }))

    return [...projectResults, ...blogResults]
}
