import { SiteHeader } from "@/layouts/SiteHeader"
import ProjectList from "@/layouts/ProjectList"
import { SiteFooter } from "@/layouts/SiteFooter"

export default async function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <ProjectList />
      <SiteFooter />
    </div>
  )
}