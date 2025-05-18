"use client"
import { Button } from "@/components/button";
import { ArrowLeft } from "lucide-react";
import Main from "@/components/page-section";
import { getProjectById } from "@/lib/db-service";
import ProjectDetails from "@/components/ProjectDetails";

export default function Project({ id }: { id: string }) {
    return (
        <Main>
            <div className="mx-auto max-w-4xl">
                <Button href="/blog" variant="ghost" icon={ArrowLeft} label="Back to Blog" className="mb-6 -ml-4" />
                <ProjectDetails id={id} />
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