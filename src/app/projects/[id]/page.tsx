import { getProjectById } from "@/lib/db-service"
import { notFound } from "next/navigation"
import ProjectPage from "@/pages/IndividualProject";
import { SiteHeader } from "@/layouts/SiteHeader";
import { SiteFooter } from "@/layouts/SiteFooter";

export default async function IndividualProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const project = await getProjectById(id)

  if (!project || !project.published) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <ProjectPage project={project} />
      <SiteFooter />
    </div>
  )
}
