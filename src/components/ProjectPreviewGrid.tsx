"use client"
import ProjectPreview from "@/components/project-preview";
import { fetcher } from "@/lib/utils";
import { ProjectType } from "@/models/project";
import useSWR from 'swr'

export default function ProjectPreviewGrid() {
    const { data, error } = useSWR('/api/projects', { fetcher })

    if (error) return <div className="text-center">Failed to load</div>
    if (!data) return <div className="text-center">Loading...</div>

    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.map((project: ProjectType) => (
                <ProjectPreview key={project._id.toString()} project={project} />
            ))}
        </div>
    )
}