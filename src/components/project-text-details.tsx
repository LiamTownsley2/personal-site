export type ProjectTextDetailsParams = { title: string, tags: string[], description: string }
export default function ProjectTextDetails(params: ProjectTextDetailsParams) {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">{params.title}</h1>
            <div className="flex flex-wrap gap-2">
                {params.tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400">{params.description}</p>
        </div>
    )
}