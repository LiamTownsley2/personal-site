"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProjectEditor } from "@/components/project-editor"
import type { Project } from "@/models/project"

export default function EditProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params?.id}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data)
        }
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params?.id) {
      fetchProject()
    }
  }, [params?.id])

  if (isLoading) {
    return <div className="py-8 text-center">Loading...</div>
  }

  if (!project) {
    return <div className="py-8 text-center">Project not found.</div>
  }

  return <ProjectEditor project={project} />
}
