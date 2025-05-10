"use client";
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, FolderKanban } from "lucide-react"
import { useEffect, useState } from "react";
import { PostType } from "@/models/post";
import { ProjectType } from "@/models/project";

export default function AdminIndex() {
    const [posts, setPosts] = useState<PostType[]>([])
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const [postsRes, projectsRes] = await Promise.all([fetch("/api/posts"), fetch("/api/projects")])

                if (postsRes.ok && projectsRes.ok) {
                    const [postsData, projectsData] = await Promise.all([postsRes.json(), projectsRes.json()])

                    setPosts(postsData)
                    setProjects(projectsData)
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="recent">Recent Content</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{isLoading ? "..." : posts.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {isLoading ? "" : `${posts.filter((p) => p.published).length} published`}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{isLoading ? "..." : projects.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {isLoading ? "" : `${projects.filter((p) => p.published).length} published`}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Blog Posts</CardTitle>
                                    <CardDescription>Manage your blog posts</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Total Posts</span>
                                        <span>{isLoading ? "..." : posts.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Published</span>
                                        <span>{isLoading ? "..." : posts.filter((p) => p.published).length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Drafts</span>
                                        <span>{isLoading ? "..." : posts.filter((p) => !p.published).length}</span>
                                    </div>
                                    <div className="pt-4">
                                        <Link href="/admin/posts">
                                            <Button className="w-full">Manage Posts</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Projects</CardTitle>
                                    <CardDescription>Manage your projects</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Total Projects</span>
                                        <span>{isLoading ? "..." : projects.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Published</span>
                                        <span>{isLoading ? "..." : projects.filter((p) => p.published).length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Drafts</span>
                                        <span>{isLoading ? "..." : projects.filter((p) => !p.published).length}</span>
                                    </div>
                                    <div className="pt-4">
                                        <Link href="/admin/projects">
                                            <Button className="w-full">Manage Projects</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="recent" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Blog Posts</CardTitle>
                                <CardDescription>Your most recently updated blog posts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : posts.length > 0 ? (
                                    <div className="space-y-4">
                                        {posts.slice(0, 5).map((post) => (
                                            <div key={post._id.toString()} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{post.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {post.published ? "Published" : "Draft"} • {new Date(post.updatedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Link href={`/admin/posts/${post._id.toString()}`}>
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No blog posts found.</p>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Projects</CardTitle>
                                <CardDescription>Your most recently updated projects</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : projects.length > 0 ? (
                                    <div className="space-y-4">
                                        {projects.slice(0, 5).map((project) => (
                                            <div key={project._id.toString()} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{project.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {project.published ? "Published" : "Draft"} •{" "}
                                                        {new Date(project.updatedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Link href={`/admin/projects/${project._id.toString()}`}>
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No projects found.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}