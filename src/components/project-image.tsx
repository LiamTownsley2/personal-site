import { ProjectType } from "@/models/project"
import Image from "next/image";

export type ProjectImageParams = { project: ProjectType };
export default function ProjectImage(params: ProjectImageParams) {
    return (
        <div>
            <Image
                src={params.project?.coverImage || "/placeholder.svg"}
                alt={params.project?.title}
                width={600}
                height={400}
                className="rounded-lg object-cover"
            />
        </div>
    )
}