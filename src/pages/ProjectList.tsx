import ProjectPreview from "@/components/project-preview";
import { Button } from "@/components/ui/button";
import { Project } from "@/models/project";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <main className="flex-1">
            <section className="w-full py-6 md:py-12 lg:py-24">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h1>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            A collection of my work and projects I&apos;ve built
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectPreview key={project._id.toString()} project={project}/>
                    ))}
                    </div>

                    <div className="flex justify-center gap-8">
                        <Link href="/">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/blog">
                            <Button variant="outline">
                                View Blog
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}