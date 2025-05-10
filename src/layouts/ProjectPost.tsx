import { notFound } from "next/navigation";
import { Button, ButtonParams } from "@/components/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { ProjectType } from "@/models/project";
import ButtonRow from "@/components/button-row";
import SideBySide from "@/components/side-by-side";
import Main from "@/components/page-section";
import ProjectImage from "@/components/project-image";
import ProjectDetails from "@/components/project-details";
import { getProjectById } from "@/lib/db-service";

export default async function Project({ project }: { project: ProjectType }) {
    if (!project || !project.published) {
        notFound();
    }

    const PAGE_BUTTONS: ButtonParams[] = [];
    if (project.demoUrl) PAGE_BUTTONS.push({ href: project.demoUrl, icon: ExternalLink, label: "Live Demo", variant: "default" });
    if (project.githubUrl) PAGE_BUTTONS.push({ href: project.githubUrl, icon: Github, label: "View Code", variant: "outline" });

    return (
        <Main>
            <div className="mx-auto max-w-4xl">
                <Button href="/blog" variant="ghost" icon={ArrowLeft} label="Back to Blog" className="mb-6 -ml-4" />
                <SideBySide>
                    <ProjectImage project={project} />
                    <div className="space-y-4">
                        <ProjectDetails project={project} />
                        <ButtonRow buttons={PAGE_BUTTONS} justify="justify-start" gap="gap-4" />
                    </div>
                </SideBySide>
            </div>
        </Main>
    );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const project = await getProjectById(params.id);

    if (!project) {
        return { notFound: true };
    }

    return {
        props: {
            project,
        },
    };
}