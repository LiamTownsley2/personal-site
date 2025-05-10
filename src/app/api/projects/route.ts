import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getAllProjects, createProject } from "@/lib/db-service"
import type { ProjectFormData } from "@/models/project"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const includeUnpublished = session?.user?.role === "admin"
    const projects = await getAllProjects(includeUnpublished)
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectData: ProjectFormData = await request.json()
    const newProject = await createProject(projectData)

    return NextResponse.json(newProject, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
