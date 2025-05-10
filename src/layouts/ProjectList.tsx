import { ButtonParams } from "@/components/button";
import FooterButtonRow from "@/components/footer-button-row";
import PageHeading from "@/components/page-heading";
import Main from "@/components/page-section";
import ProjectPreviewGrid from "@/layouts/ProjectPreviewGrid";
import { ProjectType } from "@/models/project";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PAGE_BUTTONS: ButtonParams[] = [
    { href: "/", icon: ArrowLeft, label: "Back to Home", variant: "outline" },
    { href: "/blog", icon: ArrowRight, label: "Go to Blog", variant: "outline", rtl_icon: true }
];

export default function ProjectList({ projects }: { projects: ProjectType[] }) {
    const safeProjects = projects || [];
    return (
        <Main>
            <PageHeading title="My Projects" subtitle="A collection of my work and projects I&apos;ve built" />
            <ProjectPreviewGrid projects={safeProjects} />
            <FooterButtonRow buttons={PAGE_BUTTONS} />
        </Main>
    )
}