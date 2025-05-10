import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { notFound } from "next/navigation"
import { Project } from "@/models/project"

export default async function IndividualProject({ project }: { project: Project }) {
    if (!project || !project.published) {
        notFound()
    }
    return (
        <main className="flex-1">
            <article className="container mx-auto px-4 py-12 md:py-20">
                <div className="mx-auto max-w-4xl">
                    <Link href="/projects">
                        <Button variant="ghost" className="mb-6 -ml-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Button>
                    </Link>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <Image
                                src={project.coverImage || "/placeholder.svg"}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold">{project.title}</h1>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                            <div className="flex gap-4 pt-4">
                                {project.demoUrl && (
                                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                        <Button>
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            Live Demo
                                        </Button>
                                    </Link>
                                )}
                                {project.githubUrl && (
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline">
                                            <Github className="mr-2 h-4 w-4" />
                                            View Code
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    )
}