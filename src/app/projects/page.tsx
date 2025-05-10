import { getAllProjects } from "@/lib/db-service"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/layouts/SiteHeader"
import ProjectList from "@/pages/ProjectList";
import { SiteFooter } from "@/layouts/SiteFooter";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  if (!projects) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <ProjectList projects={projects} />
      <SiteFooter />
    </div>
  )
}
