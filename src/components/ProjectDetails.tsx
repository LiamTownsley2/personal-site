"use client"
import { ButtonParams } from "./button";
import ButtonRow from "./button-row";
import ProjectImage from "./project-image";
import ProjectTextDetails from "./project-text-details";
import SideBySide from "./side-by-side";
import { ExternalLink, Github } from "lucide-react";
import useSWR from 'swr'
import { fetcher } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ProjectType } from "@/models/project";

export default function ProjectDetails({ id }: { id: string }) {
    const { data, error } = useSWR<ProjectType>(`/api/projects/${id}`, { fetcher })

    if (error) return notFound();
    if (!data) return <div className="text-center">Loading...</div>

    const PAGE_BUTTONS: ButtonParams[] = [];
    if (data.demoUrl) PAGE_BUTTONS.push({ href: data.demoUrl, icon: ExternalLink, label: "Live Demo", variant: "default" });
    if (data.githubUrl) PAGE_BUTTONS.push({ href: data.githubUrl, icon: Github, label: "View Code", variant: "outline" });

    return (
        <SideBySide>
            <ProjectImage src={data.coverImage} alt={data.title} />
            <div className="space-y-4">
                <ProjectTextDetails title={data.title} description={data.description} tags={data.tags} />
                <div className="md:justify-items-start">
                    <ButtonRow buttons={PAGE_BUTTONS} justify="justify-center" gap="gap-4" />
                </div>
            </div>
        </SideBySide>
    )
}