import { Project } from "@/models/project";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LinkIcon } from "lucide-react";

export default function ProjectPreview({ project }: { project: Project }) {
    return (
        <div className="flex flex-col gap-1 border rounded-lg p-4">
            <Image
                src={project.coverImage || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="rounded-lg object-cover"
            />
            <div className="h-full flex flex-col gap-2 text-left">
                <div>
                    <h2 className="font-extrabold text-xl">{project.title}</h2>
                    <p className="font-light text-base">{project.description}</p>
                </div>

                <div className="flex flex-row items-center gap-2 flex-wrap">
                    {project.tags.map((tag, value) => (
                        <div key={value} className="border rounded-full select-none">
                            <p className="text-xs font-semibold rounded-full border px-2.5 py-0.5">{tag}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-auto">
                    <Link href={`/projects/` + project.id }>
                        <Button variant={"outline"} className="w-full">
                            <LinkIcon />
                            <p>View Project</p>
                        </Button>
                    </Link>
                </div>

            </div>

        </div>
    )
}