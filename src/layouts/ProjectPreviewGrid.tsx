import ProjectPreview from "@/components/project-preview";
import { ProjectType } from "@/models/project";

export type ProjectPreviewGridParams = { projects: ProjectType[] };
export default function ProjectPreviewGrid(params: ProjectPreviewGridParams) {
    return (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {params.projects.map((project) => (
                <ProjectPreview key={project._id.toString()} project={project} />
            ))}
        </div>
    )
}